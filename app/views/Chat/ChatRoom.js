import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import moment from 'moment'
import io from 'socket.io-client'

// COMPONENTS
import ChatHeader from '../../components/Chat/ChatHeader'
import Screen from '../../components/Screen'
import Separator from '../../components/Separator'
import AppText from '../../components/AppText'
import FriendMessage from '../../components/Chat/FriendMessage'
import OwnMessage from '../../components/Chat/OwnMessage'

// CONFIG
import colors from '../../config/colors'

// STORE
import currentUser from '../../stores/UserStore'

// MODELS
import MessagesModel from '../../api/messages'

const socket = io('http://192.168.1.8:4000')

const ChatRoom = ({ navigation, route }) => {
  const { chatRoom } = route.params
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (props) => (
        <ChatHeader title="shit" {...props} rightIcon="phone" />
      ),
    })
  }, [navigation])

  const handleMessage = async () => {
    // console.log('yooo')
    try {
      let messageInfo = {
        user: currentUser.email,
        name: currentUser.name,
        message: message,
        timestamp: moment().format('hh:mm A'),
      }
      let chatRoomInfo = chatRoom

      if (socket) {
        socket.emit('chatroomMessage', { messageInfo, chatRoomInfo })
        setMessage('')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (messageInfo) => {
        const newMessages = [...messages, messageInfo]
        setMessages(newMessages)
      })
    }
  }, [messages])

  useEffect(() => {
    socket.on('joinRoom', (currentRoom) => {
      setMessages(currentRoom.messages)
    })
  }, [])

  useEffect(() => {
    if (socket) {
      socket.emit('joinRoom', chatRoom._id)
    }

    return () => {
      //Component Unmount
      if (socket) {
        socket.emit('leaveRoom', chatRoom._id)
      }
    }
  }, [])

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <Screen>
        <View style={styles.mainView}>
          <View style={styles.messagesView}>
            <View style={styles.date}>
              <AppText fontSize={20}>Today</AppText>
            </View>
            <View style={styles.messages}>
              <FlatList
                data={messages}
                keyExtractor={(message) => message._id}
                renderItem={({ item }) =>
                  item.user === currentUser.email ? (
                    <OwnMessage item={item} />
                  ) : (
                    <FriendMessage item={item} />
                  )
                }
              />
            </View>
          </View>
        </View>
        <View style={styles.sendView}>
          <MaterialCommunityIcons name="paperclip" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Type something..."
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="send-outline"
              size={24}
              color="black"
              onPress={handleMessage}
            />
          </TouchableOpacity>
        </View>
      </Screen>
    </KeyboardAvoidingView>
  )
}

export default ChatRoom

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    height: 110,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: -32,
  },
  input: {
    height: 40,
    width: 250,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: colors.background,
  },
})
