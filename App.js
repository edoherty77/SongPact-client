import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

// AMPLIFY & AUTH
import Amplify, { Auth } from 'aws-amplify'
import awsconfig from './src/aws-exports'
Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true, // kills unhandled promise warning
  },
})
import AuthModel from './app/api/auth'
import AsyncStorage from '@react-native-community/async-storage'
// NAV
import AuthNavigator from './app/navigation/AuthNavigator'
import Main from './app/navigation/main'

// DATA FLOW
import CurrentUser from './app/stores/UserStore'
import { observer } from 'mobx-react'

const Initializing = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="tomato" />
    </View>
  )
}

const App = observer(() => {
  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing')
  const [user, setUser] = useState({
    email: '',
    userId: '',
  })

  // async function checkAuthState() {
  //   try {
  //     const user = await Auth.currentAuthenticatedUser()
  //     console.log('✅ User is signed in')
  //     console.log(user.username)
  //     setUserLoggedIn('loggedIn')
  //   } catch (error) {
  //     console.log('❌ User is not signed in')
  //     store.resetUser()
  //     setUserLoggedIn('loggedOut')
  //   }
  // }

  // const updateAuthState = (isUserLoggedIn) => {
  //   setUserLoggedIn(isUserLoggedIn)
  // }

  // useEffect(() => {
  //   checkAuthState()
  // }, [])
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

  const logout = async () => {
    try {
      await AuthModel.logout()
      await AsyncStorage.setItem('email', '')
      await AsyncStorage.setItem('userId', '')
      CurrentUser.resetUser()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <SafeAreaProvider>
        {user.email === 'initializing' && <Initializing />}
        {/* {isUserLoggedIn === 'loggedIn' && (
          <Main updateAuthState={updateAuthState} />
        )}
        {isUserLoggedIn === 'loggedOut' && (
          <AuthNavigator updateAuthState={updateAuthState} />
        )} */}
        {CurrentUser.email !== '' ? (
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
