import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import moment from 'moment'
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

// STORE
import currentUser from '../../stores/UserStore'

// MODELS
import MessagesModel from '../../api/messages'

const ChatRoom = ({ navigation, route }) => {
  const { chatRoom } = route.params
  const [message, setMessage] = useState('')
  console.log('chatroom', chatRoom)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: (props) => (
        <ChatHeader title="fuck" {...props} rightIcon="phone" />
      ),
    })
  }, [navigation])

  const handleMessage = async () => {
    try {
      let obj = {
        message: {
          user: currentUser.email,
          name: currentUser.name,
          message: message,
          timestamp: moment().format('hh:mm A'),
        },
        chatRoom: chatRoom,
      }
      await MessagesModel.create(obj)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const socket = io('http://192.168.1.8:4000')
    // socket.connect()
    // socket.on('message', (message) => {
    //   'fuckyou'
    // })
    // console.log('socket', socket)
  }, [])

  return (
    <Screen>
      <View style={styles.mainView}>
        <View style={styles.messagesView}>
          <View style={styles.date}>
            <AppText fontSize={20}>Today</AppText>
          </View>
          <View style={styles.messages}>
            <FlatList
              data={chatRoom.messages}
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
