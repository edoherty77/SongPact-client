import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

// AUTH
import AuthModel from './app/api/auth'
// import AsyncStorage from '@react-native-community/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
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
