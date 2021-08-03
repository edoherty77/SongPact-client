import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

// STACKS
import MenuStack from './MenuStack'

// SCREENS
import ChatMain from '../views/Main/ChatMain'
import ChatRoom from '../views/Chat/ChatRoom'
import NewMessage from '../views/Chat/NewMessage'

// COMPONENTS
import ChatHeader from '../components/ChatHeader'

const Stack = createStackNavigator()

const ChatStack = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    if (getFocusedRouteNameFromRoute(route) == 'Chat Room') {
      navigation.setOptions({ tabBarVisible: false })
    } else {
      navigation.setOptions({ tabBarVisible: true })
    }
  }, [getFocusedRouteNameFromRoute(route)])

  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Chat Main"
        component={ChatMain}
        options={({ navigation, route }) => ({
          header: (props) => (
            <ChatHeader
              title="Inbox"
              noBack
              {...props}
              rightIcon="pencil-box-outline"
            />
          ),
        })}
      />
      <Stack.Screen
        name="New Message"
        component={NewMessage}
        options={({ navigation, route }) => ({
          header: (props) => (
            <ChatHeader
              title="New Message"
              {...props}

              // rightIcon="pencil-box-outline"
            />
          ),
        })}
      />
      <Stack.Screen
        name="Chat Room"
        component={ChatRoom}
        options={({ navigation, route }) => ({
          header: (props) => <ChatHeader {...props} rightIcon="phone" />,
        })}
      />
    </Stack.Navigator>
  )
}

export default ChatStack
