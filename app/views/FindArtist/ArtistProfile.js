import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// MODELS
import FriendRequestModel from '../../api/friendRequests'

// COMPONENTS
import Header from '../../components/Header'
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
    console.log('data', data)
    await FriendRequestModel.update(data)
    await FriendRequestModel.delete(requestId)
  }

  return (
    <Screen>
      <View style={styles.mainContainer}>
        <View style={styles.heroView}>
          <View style={styles.iconView}>
            <ButtonIcon
              name="send"
              backgroundColor={'transparent'}
              size={35}
              iconColor={colors.black}
            />
          </View>
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
          <AppText style={styles.name}>{item.name}</AppText>
          <AppText style={styles.email}>{item.email}</AppText>
          <View style={styles.infoButtonContainer}>
            <AppText>516-780-3566</AppText>
            {/* <AppText>Performer</AppText> */}
          </View>
        </View>
        <View style={styles.pactsView}></View>
        <View style={styles.contactView}>
          <View style={styles.infoHeaderContainer}>
            <View style={styles.infoHeaderContent}>
              <AppText style={styles.infoHeaderText}>Pacts</AppText>
              <ButtonIcon
                name="plus"
                backgroundColor={colors.green}
                style={{
                  borderRadius: 5,
                  borderColor: 'black',
                  borderWidth: 1,
                  borderStyle: 'solid',
                }}
                size={35}
                iconColor={colors.background}
              />
            </View>
          </View>
          <View style={styles.infoBodyContainer}></View>
        </View>
        <View style={styles.contactView}>
          <View style={styles.infoHeaderContainer}>
            <View style={styles.infoHeaderContent}>
              <AppText style={styles.infoHeaderText}>Contact Info</AppText>
              {isFriend === false && (
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
              <AppText style={{ fontWeight: 'bold', fontSize: 20 }}>
                {item.name}
              </AppText>
            </View>
            <View style={styles.contentContainer}>
              <MaterialCommunityIcons
                name="email"
                size={20}
                color="black"
                style={{ marginRight: 10 }}
              />
              <AppText style={styles.contactText}>{item.email}</AppText>
            </View>
            <View style={styles.contentContainer}>
              <MaterialCommunityIcons
                name="phone"
                size={20}
                color="black"
                style={{ marginRight: 10 }}
              />
              <AppText style={styles.contactText}>(516) 780-3566</AppText>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  )
})

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    marginLeft: 30,
    marginRight: 30,
  },
  heroView: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    zIndex: 0,
    backgroundColor: colors.white,
    marginTop: 20,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 35,
    margin: 0,
  },
  iconView: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  picContainer: {
    position: 'absolute',
    top: -35,
    zIndex: 1,
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
  name: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: -10,
    marginTop: 30,
    color: colors.green,
  },
  email: {
    color: '#222222',
  },
  pactsView: {},
  contactView: {
    display: 'flex',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    zIndex: 0,
    backgroundColor: colors.white,
    marginTop: 20,
  },
  infoHeaderContainer: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  infoHeaderContent: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoBodyContainer: {
    padding: 20,
  },
  infoHeaderText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -10,
  },
})

export default FindArtist
