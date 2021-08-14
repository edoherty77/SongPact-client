import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { RootNavigator } from './rootNavigator'

export default function Main({ updateAuthState, logout }) {
  return (
    <PaperProvider>
      <RootNavigator updateAuthState={updateAuthState} logout={logout} />
    </PaperProvider>
  )
}
