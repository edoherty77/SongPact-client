import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import moment from 'moment'

// MODELS
import FriendRequestModel from '../../api/friendRequests'

// COMPONENTS
import Screen from '../../components/Screen'
import AppText from '../../components/AppTextInput'
import AppButton from '../../components/AppButton'
import ButtonIcon from '../../components/ButtonIcon'
import UserIcon from '../../components/UserIcon'

// CONFIG
import colors from '../../config/colors'

// STORE
import currentUser from '../../stores/UserStore'
import { observer } from 'mobx-react'

const FindArtist = observer(({ route, navigation }) => {
  const { item } = route.params
  const [requestId, setRequestId] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [isDisabled, setDisabled] = useState(false)
  const [btnText, setBtnText] = useState('Request')
  const [btnBackground, setBtnBackground] = useState(colors.green)
  const [btnBorder, setBtnBorder] = useState(1)
  const [btnTextColor, setBtnTextColor] = useState(colors.white)
  const [isFriend, setFriend] = useState(false)

  const checkFriend = () => {
    if (currentUser.friends.length > 0) {
      currentUser.friends.find((friend) => {
        if (friend.email === item.email) {
          setFriend(true)
        }
      })
    }
  }

  const checkRequestStatus = () => {
    if (currentUser.friendRequests.length > 0) {
      currentUser.friendRequests.find((request) => {
        if (request.requesterInfo.email === item.email) {
          setBtnText('Accept')
          setRequestId(request.friendRequestId)
        } else if (request.requesterInfo.email === currentUser.email) {
          setBtnText('Requested')
          setDisabled(true)
          setBtnBackground(colors.gray)
          setBtnTextColor(colors.black)
        }
      })
    }
  }

  useEffect(() => {
    checkFriend()
  }, [])

  useEffect(() => {
    checkRequestStatus()
  }, [])

  const friendBtnLogic = (contactId) => {
    if (btnText === 'Request') {
      addFriend(contactId)
    } else {
      answerRequest(contactId)
    }
  }

  const addFriend = async (contactId) => {
    setDisabled(true)
    setBtnBackground(colors.background)
    setBtnBorder(0)
    setBtnTextColor(colors.black)
    setBtnText('Requested')

    const obj = {
      requester: currentUser._id,
      recipient: contactId,
      status: 1,
      date: moment().format('MMMM Do YYYY hh:mm A'),
    }
    await FriendRequestModel.create(obj)
    // store.addFriend(friendInfo)
    // setModalVisible(false)
    // navigation.navigate('Contacts')
  }

  const answerRequest = async (contactId) => {
    setDisabled(true)
    setBtnBackground(colors.background)
    setBtnBorder(0)
    setBtnTextColor(colors.black)
    setBtnText('Accepted')
    let values = {
      status: 2,
      requester: contactId,
      recipient: currentUser._id,
    }
    let data = { requestId, values }
    currentUser.removeFriendRequest(requestId, item)
    await FriendRequestModel.update(data)
    await FriendRequestModel.delete(requestId)
    currentUser.subtractBadgeNum()
  }

  return (
    <Screen>
      <View style={styles.mainView}>
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.picContainer}>
              {item.googlePhotoUrl ? (
                <Image
                  source={{ uri: item.googlePhotoUrl }}
                  style={styles.image}
                />
              ) : (
                <UserIcon
                  title={item.name}
                  style={styles.image}
                  fontSize={35}
                  color={colors.white}
                  backgroundColor={colors.black}
                />
              )}
            </View>
            <View style={styles.nameView}>
              <AppText style={styles.name}>{item.name}</AppText>
            </View>
            {item.artistName !== undefined && (
              <View style={styles.textView}>
                <AppText style={styles.artistName}>
                  {item.artistName}
                </AppText>
              </View>
            )}
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.infoHeaderContainer}>
            <View style={styles.infoHeaderContent}>
              <AppText style={styles.infoHeaderText}>Contact Info</AppText>
              {isFriend === false && currentUser.email !== item.email && (
                <AppButton
                  item={item}
                  onPress={() => friendBtnLogic(item._id)}
                  fontSize={13}
                  fontWeight="normal"
                  style={[
                    styles.button,
                    accepted === false
                      ? { dislay: 'inline' }
                      : { display: 'none' },
                  ]}
                  color={btnBackground}
                  title={btnText}
                  textColor={btnTextColor}
                  border={btnBorder}
                  disabled={isDisabled}
                />
              )}
            </View>
          </View>
          <View style={styles.infoBodyContainer}>
            <View style={styles.contentContainer}>
              <MaterialCommunityIcons
                name="email"
                size={20}
                color="black"
                style={{ marginRight: 10 }}
              />
              <AppText style={styles.text}>{item.email}</AppText>
            </View>
            {item.phoneNumber !== undefined && (
              <View style={styles.contentContainer}>
                <MaterialCommunityIcons
                  name="phone"
                  size={20}
                  color="black"
                  style={{ marginRight: 10 }}
                />
                <AppText style={styles.text}>{item.phoneNumber}</AppText>
              </View>
            )}
            {item.city !== undefined && (
              <View style={styles.location}>
                <MaterialCommunityIcons
                  name="home"
                  size={24}
                  color="black"
                  style={{ marginRight: 7 }}
                />
                <View style={styles.locationContent}>
                  <AppText style={styles.text}>{item.city}, {item.state}</AppText>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </Screen>
  )
})

const styles = StyleSheet.create({
  mainView: {
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
  },
  container: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.white,
    marginTop: 20,
  },
  topContainer: {
    alignItems: 'center',
    height: 140,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 35,
    margin: 0,
  },
  iconView: {
    position: 'absolute',
    top: 15,
    zIndex: 2,
    right: 10,
  },
  picContainer: {
    position: 'absolute',
    top: -35,
    height: 70,
    width: 70,
    marginRight: 20,
  },
  button: {
    borderRadius: 5,
    borderColor: 'black',
    borderStyle: 'solid',
    width: 100,
  },
  nameView: {
    marginTop: 30,
  },
  name: {
    display: 'flex',
    fontWeight: 'bold',
    fontSize: 30,
    color: colors.green,
    borderWidth: 0,
  },
  artistName: {
    color: '#222222',
    width: '90%',
    borderWidth: 0,
    paddingLeft: 7,
  },
  textView: {
    marginTop: -30,
  },
  text: {
    color: '#222222',
    width: '90%',
    borderWidth: 0,
  },
  infoHeaderContainer: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  infoHeaderContent: {
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoHeaderText: {
    fontWeight: 'bold',
    fontSize: 20,
    borderWidth: 0,
  },
  infoBodyContainer: {
    padding: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    marginBottom: 10,
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 30,
  },
  location: {
    flexDirection: 'row',
  },
})

export default FindArtist
