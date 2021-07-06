import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

// COMPONENTS
import Head from '../../components/Header'
import Screen from '../../components/Screen'
import colors from '../../config/colors'
import ContactButton from '../../components/ContactButton'
import ConfirmModal from '../../components/ConfirmModal'
import AppText from '../../components/AppText'
import AppButton from '../../components/AppButton'
import AppSearchInputFilter from '../../components/AppSearchInputFilter'

// MODELS
import UserModel from '../../api/users'

// STORE
import currentUser from '../../stores/UserStore'
import { observer } from 'mobx-react'

const ContactsScreen = observer(({ navigation }) => {
  const [users, setUsers] = useState('')
  const [friends, setFriends] = useState(currentUser.friends)
  const [inMemoryFriends, setInMemoryFriends] = useState(currentUser.friends)
  const [toggleList, setToggleList] = useState(false)
  const [toggleSearchBtn, setToggleSearchBtn] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [isModalVisible, setModalVisible] = useState(false)

  const findUser = async () => {
    let arr = []
    setToggleList(true)
    setToggleSearchBtn(false)
    const foundUsers = await UserModel.all(searchValue)
    try {
      if (foundUsers.length > 0) {
        foundUsers.map(async (user) => {
          arr.push(user)
          await setUsers([...arr])
        })
      } else if (foundUsers.length === 0) {
        users.length === 0
        setUsers('')
        console.log('sorry no user foundddd')
      } else if (searchValue === '') {
        setToggleList(false)
      }
    } catch (error) {
      console.log(error)
    }
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
    if (friends.length === 0) {
      setToggleSearchBtn(true)
    }
    if (friends.length > 0) {
      setToggleSearchBtn(false)
    }
  }, [friends])

  useEffect(() => {
    if (toggleList === true) {
      findUser()
    } else {
      findFriend()
    }
    if (searchValue === '') {
      users.length === 0
      setUsers('')
      setToggleList(false)
    }
  }, [searchValue])

  // function cancel() {
  //   setModalVisible(false)
  //   // console.log('users', users)
  // }

  const viewProfile = (item) => {
    navigation.navigate('ArtistProfile', {
      item: item,
    })
  }

  return (
    <Screen>
      <Head noBack title="Contacts" />
      <AppSearchInputFilter
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <AppButton
        title="Click here to search more"
        onPress={findUser}
        style={[
          styles.searchMoreView,
          toggleSearchBtn === false ? { display: 'none' } : { display: 'flex' },
        ]}
      />
      <View style={styles.mainView}>
        {friends.length > 0 && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={friends.slice().sort((a, b) => a.name.localeCompare(b.name))}
            contentContainerStyle={
              toggleList === false ? { display: 'inline' } : { display: 'none' }
            }
            keyExtractor={(item, index) => item._id}
            renderItem={({ item }) => {
              return (
                <ContactButton
                  viewProfile={() => viewProfile(item)}
                  item={item}
                />
              )
            }}
          />
        )}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={users}
          contentContainerStyle={
            toggleList === true ? { display: 'inline' } : { display: 'none' }
          }
          keyExtractor={(users) => users._id}
          renderItem={({ item, index }) => (
            <ContactButton
              viewProfile={() => viewProfile(item)}
              item={item}
              onPress={() => {
                // addFriend(item._id)
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
    flex: 1,
  },
  searchMoreView: {
    // display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  searchMoreText: {
    // fontSize: 15,
  },
})

export default ContactsScreen
