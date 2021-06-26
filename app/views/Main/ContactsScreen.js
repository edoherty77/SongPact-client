import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Header, Item, Input, Icon } from 'native-base'
import Head from '../../components/Header'
import Screen from '../../components/Screen'
import colors from '../../config/colors'
import ContactButton from '../../components/ContactButton'
import ConfirmModal from '../../components/ConfirmModal'
import UserModel from '../../api/users'
import FriendRequestModel from '../../api/friendRequests'
import AppButton from '../../components/AppButton'

import currentUser from '../../stores/UserStore'
import { observer } from 'mobx-react'
import { get } from 'mobx'

const ContactsScreen = observer(({ navigation }) => {
  const [users, setUsers] = useState('')
  const [friends, setFriends] = useState(currentUser.friends)
  const [inMemoryFriends, setInMemoryFriends] = useState(currentUser.friends)
  const [toggleList, setToggleList] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [isModalVisible, setModalVisible] = useState(false)

  const findUser = async () => {
    await UserModel.all(searchValue)
  }

  const findFriend = async () => {
    const filteredContacts = inMemoryFriends.filter((contact) => {
      let contactLowercase = contact.name.toLowerCase()

      let searchTermLowercase = searchValue.toLowerCase()

      return contactLowercase.indexOf(searchTermLowercase) > -1
    })
    setFriends(filteredContacts)
  }

  useEffect(() => {
    if (toggleList === true) {
      findUser()
    } else {
      findFriend()
    }
  }, [searchValue])

  // function cancel() {
  //   setModalVisible(false)
  //   // console.log('users', users)
  // }

  const addFriend = async (recipientId) => {
    console.log('id', recipientId)
    const obj = {
      requester: currentUser._id,
      recipient: recipientId,
      status: 1,
    }
    await FriendRequestModel.create(obj)
    // store.addFriend(friendInfo)
    // setModalVisible(false)
    // navigation.navigate('Contacts')
  }

  const viewProfile = (item) => {
    navigation.navigate('ArtistProfile', {
      item: item,
    })
  }

  return (
    <Screen>
      <Head noBack title="Contacts" />
      <Header
        transparent={true}
        searchBar
        noshadow
        rounded
        width={300}
        alignSelf="center"
      >
        <Item>
          <Icon name="ios-search" />
          <Input
            value={searchValue}
            placeholder="Search"
            onChangeText={(value) => {
              setSearchValue(value)
            }}
          />
          <Icon name="ios-people" />
        </Item>
      </Header>
      <View style={styles.mainView}>
        <FlatList
          data={friends}
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => (
            <ContactButton
              // viewProfile={() => viewProfile(item)}
              item={item}
              onPress={() => {
                // setModalVisible(true)
                // setFriendInfo(item)
              }}
            />
          )}
        />
        <FlatList
          data={users}
          contentContainerStyle={
            toggleList === true ? { display: 'inline' } : { display: 'none' }
          }
          keyExtractor={(users) => users._id}
          renderItem={({ item, index }) => (
            <ContactButton
              // viewProfile={() => viewProfile(item)}
              item={item}
              onPress={() => {
                addFriend(item._id)
                // setModalVisible(true)
                // setFriendInfo(item)
              }}
            />
          )}
        />
      </View>
      <ConfirmModal
        text="Add Friend?"
        // onBackdropPress={() => setModalVisible(false)}
        // isVisible={isModalVisible}
        // confirm={addFriend}
        // deny={cancel}
      />
    </Screen>
  )
})

const styles = StyleSheet.create({
  mainView: {
    marginLeft: 25,
    marginRight: 25,
  },
  searchInput: {
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.white,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  inputView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
    marginTop: 5,
  },
})

export default ContactsScreen
