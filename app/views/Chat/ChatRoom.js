import React, { useEffect } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import io from 'socket.io-client'

// COMPONENTS
import ChatHeader from '../../components/ChatHeader'
import Screen from '../../components/Screen'
import Separator from '../../components/Separator'
import AppText from '../../components/AppText'
import FriendMessage from '../../components/Chat/FriendMessage'
import OwnMessage from '../../components/Chat/OwnMessage'

// CONFIG
import colors from '../../config/colors'

// MODELS
import ChatRoomModel from '../../api/chatRoom'
import { get } from 'mobx'

const ChatRoom = ({ navigation, route }) => {
  const { chatRoom } = route.params
  const getChat = async () => {
    try {
      const chat = await ChatRoomModel.show(chatRoom.chatRoom._id)
      console.log('chat', chat)
    } catch (error) {
      console.log(error)
    }
  }
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (props) => (
        <ChatHeader title="fuck" {...props} rightIcon="phone" />
      ),
    })
  }, [navigation])

  useEffect(() => {
    getChat()
    // const socket = io('http://192.168.1.8:4000')
  }, [])

  return (
    <Screen>
      <View style={styles.mainView}>
        <View style={styles.messagesView}>
          <View style={styles.date}>
            <AppText fontSize={20}>Today</AppText>
          </View>
          <View style={styles.messages}>
            <FriendMessage />
            <OwnMessage />
            <FriendMessage />
            <OwnMessage />
          </View>
        </View>
      </View>
      <View style={styles.sendView}>
        <MaterialCommunityIcons name="paperclip" size={24} color="black" />
        <TextInput style={styles.input} placeholder="Type something..." />
        <MaterialCommunityIcons name="send-outline" size={24} color="black" />
      </View>
    </Screen>
  )
}

export default ChatRoom

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginHorizontal: 30,
  },
  messagesView: {
    flex: 5,
    marginTop: 20,
  },
  date: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendView: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 50,
  },
  input: {
    height: 40,
    width: 250,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: colors.background,
  },
})
