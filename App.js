import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

// AUTH
import AuthModel from './app/api/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Google from 'expo-google-app-auth'

// NAV
import AuthNavigator from './app/navigation/AuthNavigator'
import Main from './app/navigation/main'

// DATA FLOW
import currentUser from './app/stores/UserStore'
import { observer } from 'mobx-react'

// MODELS
import UserModel from './app/api/users'

const Initializing = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="tomato" />
    </View>
  )
}

const App = observer(() => {
  const [user, setUser] = useState({
    email: '',
    userId: '',
  })

  const checkForUser = async () => {
    console.log('current', currentUser)
    try {
      const localUser = await AsyncStorage.getItem('email')
      const localId = await AsyncStorage.getItem('userId')
      if (localUser)
        setUser({
          email: localUser,
          userId: localId,
        })
    } catch (error) {
      console.log(error)
    }
  }

  const checkForFriends = async () => {
    let friends = currentUser.friends
    let arr = []
    try {
      if (friends) {
        friends.map(async (friend) => {
          let response = await UserModel.show(friend)
          let friendInfo = response.user
          arr.push(friendInfo)
          await currentUser.setFriends([...arr])
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkForUser()
    // checkForFriends()
  }, [user.userId])

  const googleConfig = {
    androidClientId:
      '350040199389-gjbgtaas95ofd5hd9ojotcfht73gj407.apps.googleusercontent.com',
    iosClientId:
      '350040199389-e8iqt2rlahdmgeslat7eq51944dcbb7c.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
  }

  const logout = async () => {
    let accessToken = currentUser.accessToken
    console.log(currentUser)
    try {
      if (accessToken) {
        await Google.logOutAsync({ accessToken, ...googleConfig })
      } else {
        await AuthModel.logout()
      }
      await AsyncStorage.setItem('email', '')
      await AsyncStorage.setItem('userId', '')
      currentUser.resetUser()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <SafeAreaProvider>
        {user.email === 'initializing' && <Initializing />}
        {currentUser.email !== '' ? (
          <Main logout={logout} />
        ) : (
          <AuthNavigator />
        )}
      </SafeAreaProvider>
      <StatusBar style={'auto'} />
    </>
  )
})

export default App
