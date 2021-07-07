import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { NativeBaseProvider } from 'native-base'

import { SafeAreaProvider } from 'react-native-safe-area-context'

// AUTH
import AuthModel from './app/api/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Google from 'expo-google-app-auth'

// NAV
import AuthNavigator from './app/navigation/AuthNavigator'
import Main from './app/navigation/main'
import Home from './app/views/Main/HomeScreen'

// DATA FLOW
import currentUser from './app/stores/UserStore'
import currentPact from './app/stores/CreatePactStore'
import { observer } from 'mobx-react'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

// MODELS
import UserModel from './app/api/users'

// Create a client
const queryClient = new QueryClient()

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

  useEffect(() => {
    checkForUser()
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
      currentPact.resetPact()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <SafeAreaProvider>
          {user.email === 'initializing' && <Initializing />}
          {currentUser.email !== '' ? (
            <Main logout={logout} />
          ) : (
            // <Home />
            <AuthNavigator />
          )}
        </SafeAreaProvider>
        <StatusBar style={'auto'} />
      </NativeBaseProvider>
    </QueryClientProvider>
  )
})

export default App
