import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

// COMPONENTS
import AppSearchInput from '../../components/AppSearchInput'
import Screen from '../../components/Screen'

// MODELS
import ChatRoomModel from '../../api/chatRoom'

// STORE
import currentUser from '../../stores/UserStore'

const ChatMain = () => {
  const getChatRooms = async () => {
    const response = await ChatRoomModel.all(currentUser.chatRooms)
    const chatRooms = response.foundChatRooms
    console.log('chatrooms', chatRooms)
  }

  useEffect(() => {
    getChatRooms()
  }, [])
  return (
    <Screen>
      <View style={styles.mainView}>
        <AppSearchInput />
        <View style={styles.chatRooms}></View>
      </View>
    </Screen>
  )
}

export default ChatMain

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: 30,
  },
})
