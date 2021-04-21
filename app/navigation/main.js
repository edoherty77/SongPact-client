import React from 'react'
import {
  Provider as PaperProvider,
  DefaultTheme,
  DarkTheme,
} from 'react-native-paper'
import { RootNavigator } from './rootNavigator'

export default function Main({ updateAuthState }) {
  return (
    <PaperProvider>
      <RootNavigator updateAuthState={updateAuthState} />
    </PaperProvider>
  )
}
