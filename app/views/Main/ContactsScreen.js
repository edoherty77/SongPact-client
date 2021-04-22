import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
// import { Header, Item, Input, Icon } from 'native-base'
import Head from '../../components/Header'
import Screen from '../../components/Screen'
import AppTextInput from '../../components/AppTextInput'
import ContactButton from '../../components/ContactButton'
import { observer } from 'mobx-react'

import { API, Auth, graphqlOperation } from 'aws-amplify'
import AppButton from '../../components/AppButton'
import currentUser from '../../stores/UserStore'
import UserModel from '../../api/users'
const Contacts = ({ navigation }) => {
  const [friends, setFriends] = useState([])
  // const onMenuPress = async (person) => {
  //   const foundFriend = await API.graphql(
  //     graphqlOperation(getUser, { id: person.userId }),
  //   )

  //   console.log('FOUNDFRIEND', foundFriend)
  //   const friendsFriendshipId = foundFriend.data.getUser.friends.items.find(
  //     (item) => {
  //       return (item = User.id)
  //     },
  //   )
  //   const currentUserFriendshipId = User.friends.items.find((item) => {
  //     return (item = person.id)
  //   })

  //   await API.graphql(
  //     graphqlOperation(deleteFriend, {
  //       input: { id: friendsFriendshipId.id },
  //     }),
  //   )
  //   await API.graphql(
  //     graphqlOperation(deleteFriend, {
  //       input: { id: currentUserFriendshipId.id },
  //     }),
  //   )

  //   // console.log('FRIENDSFRIENDSIPID', friendsFriendshipId.id)
  //   // console.log('CURRENT', currentUserFriendshipId.id)
  //   // console.log('MENUPRESS', person)
  // }

  // const fetchFriends = async () => {
  //   const userFriends = User.friends.items
  //   setFriends(userFriends)
  // }

  const fetchFriends = async () => {
    const response = await UserModel.all()
    const users = response.data
    // console.log('users', users)
    console.log('currentUser', currentUser)
  }

  useEffect(() => {
    fetchFriends()
  }, [])

  // useEffect(() => {
  //   fetchFriends()
  //   const createFriendListener = API.graphql(
  //     graphqlOperation(onCreateFriend),
  //   ).subscribe({
  //     next: (userFriend) => {
  //       const createdFriend = userFriend.value.data.onCreateFriend
  //       if (createdFriend.userId === User.id) {
  //         setFriends([...friends, createdFriend.user])
  //       }
  //     },
  //   })

  //   return () => {
  //     // Unsubscribe for the focus Listener
  //     createFriendListener.unsubscribe()
  //   }
  // }, [navigation])

  return (
    <Screen>
      <Head title="Contacts" />
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
        {/* <FlatList
          data={User.friends.items}
          keyExtractor={(user) => user.id}
          renderItem={({ item, index }) => (
            <ContactButton
              name={item.firstName + ' ' + item.lastName}
              menuPress={() => onMenuPress(item)}
              onPress={() => {
                // setModalVisible(true)
                // setFriendInfo(item)
              }}
            />
          )}
        /> */}
      </View>
      <AppButton
        title="Find an artist"
        onPress={() => navigation.navigate('Find')}
      />
    </Screen>
  )
}

export default Contacts

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
