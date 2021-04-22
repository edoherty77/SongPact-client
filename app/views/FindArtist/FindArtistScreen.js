import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
// import { Header, Item, Input, Icon } from 'native-base'
import Head from '../../components/Header'
import Screen from '../../components/Screen'
import AppTextInput from '../../components/AppTextInput'
import ContactButton from '../../components/ContactButton'
import ConfirmModal from '../../components/ConfirmModal'
import UserModel from '../../api/users'
import FriendRequestModel from '../../api/friendRequests'
import AppButton from '../../components/AppButton'

import currentUser from '../../stores/UserStore'
import { observer } from 'mobx-react'
import { get } from 'mobx'

const FindArtist = observer(({ navigation }) => {
  const [users, setUsers] = useState('')
  const [friendInfo, setFriendInfo] = useState('')
  const [isModalVisible, setModalVisible] = useState(false)
  // const currentUserFriends = store.friends.items

  const findUsers = async () => {
    try {
      const getUsers = await UserModel.all()
      // console.log('GETUSERS', getUsers)
      const arr = getUsers.data.users
      let notCurrentUser = arr.filter(function (user) {
        return user._id !== currentUser._id
      })
      setUsers(notCurrentUser)
      // console.log('NOT CURRENT', notCurrentUser)
      // console.log('FRIENDS', currentUserFriends)
      // const notFriends = notCurrentUser.filter(
      //   (user) => !currentUserFriends.find(({ userId }) => user.id === userId),
      // )

      // setUsers(notFriends)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    findUsers()
  }, [])

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

  return (
    <Screen>
      <Head title="Find an Artist" />
      {/* <Header
        transparent={true}
        searchBar
        noshadow
        rounded
        width={300}
        alignSelf="center"
      >
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
          <Icon name="ios-people" />
        </Item>
      </Header> */}

      <View>
        <FlatList
          data={users}
          keyExtractor={(user) => user._id}
          renderItem={({ item, index }) => (
            <ContactButton
              name={item.firstName + ' ' + item.lastName}
              onPress={() => {
                addFriend(item._id)
                // setModalVisible(true)
                // setFriendInfo(item)
              }}
            />
          )}
        />
      </View>
      <AppButton
        title="Your Contacts"
        onPress={() => navigation.navigate('Contacts')}
      />
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
  inputView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
    marginTop: 5,
  },
})

export default FindArtist
