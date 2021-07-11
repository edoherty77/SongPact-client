import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

// COMPONENTS
import AppSearchInput from '../../components/AppSearchInput'
import Screen from '../../components/Screen'

const ChatMain = () => {
  return (
    <Screen>
      <View style={styles.mainView}>
        <AppSearchInput />
      </View>
    </Screen>
  )
}

export default ChatMain

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: 30,
  },
})
