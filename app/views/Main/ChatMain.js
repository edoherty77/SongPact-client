import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'

// COMPONENTS
import AppSearchInput from '../../components/AppSearchInput'
import Screen from '../../components/Screen'
import ChatRoomButton from '../../components/Chat/ChatRoomButton'

// MODELS
import ChatRoomModel from '../../api/chatRoom'

// STORE
import currentUser from '../../stores/UserStore'

const ChatMain = ({ navigation }) => {
  const [chatRooms, setChatRooms] = useState('')

  const getChatRooms = async () => {
    const response = await ChatRoomModel.all(currentUser.chatRooms)
    const chatRooms = response.foundChatRooms
    setChatRooms(chatRooms)
  }

  useEffect(() => {
    if (currentUser.chatRooms.length !== 0) {
      getChatRooms()
    }
  }, [])

  const viewChatRoom = (item) => {
    navigation.navigate('Chat Room', {
      chatRoom: item,
    })
  }
  console.log('chatroom', chatRooms)

  return (
    <Screen>
      <View style={styles.mainView}>
        <AppSearchInput />
        <View style={styles.chatRooms}>
          <FlatList
            data={chatRooms}
            keyExtractor={(chatroom) => chatroom._id}
            renderItem={({ item }) => (
              <ChatRoomButton
                item={item.members}
                viewChatRoom={() => viewChatRoom(item)}
              />
            )}
          />
        </View>
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
