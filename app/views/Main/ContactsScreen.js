// import React, { useState, useEffect } from 'react'
// import { View, StyleSheet, FlatList } from 'react-native'
// import { Header, Item, Input, Icon } from 'native-base'
// import Head from '../../components/Header'
// import Screen from '../../components/Screen'
// import AppTextInput from '../../components/AppTextInput'
// import ContactButton from '../../components/ContactButton'
// import { observer } from 'mobx-react'

// import { API, Auth, graphqlOperation } from 'aws-amplify'
// import AppButton from '../../components/AppButton'
// import currentUser from '../../stores/UserStore'
// import UserModel from '../../api/users'
// const Contacts = ({ navigation }) => {
//   const [friends, setFriends] = useState([])
//   const onMenuPress = async (person) => {
//     const foundFriend = await API.graphql(
//       graphqlOperation(getUser, { id: person.userId }),
//     )

//     console.log('FOUNDFRIEND', foundFriend)
//     const friendsFriendshipId = foundFriend.data.getUser.friends.items.find(
//       (item) => {
//         return (item = User.id)
//       },
//     )
//     const currentUserFriendshipId = User.friends.items.find((item) => {
//       return (item = person.id)
//     })

//     await API.graphql(
//       graphqlOperation(deleteFriend, {
//         input: { id: friendsFriendshipId.id },
//       }),
//     )
//     await API.graphql(
//       graphqlOperation(deleteFriend, {
//         input: { id: currentUserFriendshipId.id },
//       }),
//     )
//   }

//   const fetchFriends = () => {
//     let arr = []
//     currentUser.friends.map(async (id) => {
//       const response = await UserModel.show(id)
//       const user = await response.user
//       arr.push(user)
//       await setFriends([...arr])
//     })
//   }

//   useEffect(() => {
//     fetchFriends()
//   }, [])

//   useEffect(() => {
//     fetchFriends()
//     const createFriendListener = API.graphql(
//       graphqlOperation(onCreateFriend),
//     ).subscribe({
//       next: (userFriend) => {
//         const createdFriend = userFriend.value.data.onCreateFriend
//         if (createdFriend.userId === User.id) {
//           setFriends([...friends, createdFriend.user])
//         }
//       },
//     })

//     return () => {
//       // Unsubscribe for the focus Listener
//       createFriendListener.unsubscribe()
//     }
//   }, [navigation])

//   return (
//     <Screen>
//       <Head title="Contacts" noBack />
//       <Header
//         transparent={true}
//         searchBar
//         noshadow
//         rounded
//         width={300}
//         alignSelf="center"
//       >
//         <Item>
//           <Icon name="ios-search" />
//           <Input placeholder="Search" />
//           <Icon name="ios-people" />
//         </Item>
//       </Header>

//       <View>
//         <FlatList
//           data={friends}
//           keyExtractor={(user) => user._id}
//           renderItem={({ item, index }) => (
//             <ContactButton
//               // name={item}
//               name={item.firstName + ' ' + item.lastName}
//               menuPress={() => onMenuPress(item)}
//               onPress={() => {
//                 // setModalVisible(true)
//                 // setFriendInfo(item)
//               }}
//             />
//           )}
//         />
//       </View>
//       <AppButton
//         title="Find an artist"
//         onPress={() => navigation.navigate('Find')}
//       />
//     </Screen>
//   )
// }

// export default Contacts

// const styles = StyleSheet.create({
//   inputView: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     marginBottom: 5,
//     marginTop: 5,
//   },
// })
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
  const [friendInfo, setFriendInfo] = useState('')
  const [isModalVisible, setModalVisible] = useState(false)
  const currentUserFriends = currentUser.friends

  const findUsers = async () => {
    // console.log('curentUser', currentUser)
    // console.log('ccurentFriends', currentUser.friends)
    try {
      const getUsers = await UserModel.all()
      // console.log('GETUSERS', getUsers)
      const arr = getUsers.data.users
      let notCurrentUser = arr.filter(function (user) {
        return user._id !== currentUser._id
      })
      // setUsers(notCurrentUser)
      console.log('NOT CURRENT', notCurrentUser)
      console.log('FRIENDS', currentUserFriends)
      const notFriends = notCurrentUser.filter((user) =>
        currentUser.friends.find(({ _id }) => user._id !== _id),
      )
      console.log('not friends', notFriends)
      setUsers(notCurrentUser)
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
        // width={300}
        alignSelf="center"
        height={20}
        style={{ paddingRight: 22, paddingLeft: 22 }}
      >
        {/* <Item style={{ padding: 20 }}> */}
        <Item style={styles.searchInput}>
          <Icon name="ios-search" />
          <Input placeholder="Search" />
          <Icon name="ios-people" />
        </Item>
      </Header>

      <View style={styles.mainView}>
        <FlatList
          data={users}
          keyExtractor={(user) => user._id}
          renderItem={({ item, index }) => (
            <ContactButton
              viewProfile={() => viewProfile(item)}
              item={item}
              // onPress={() => {
              //   addFriend(item._id)
              //   setModalVisible(true)
              //   setFriendInfo(item)
              // }}
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
