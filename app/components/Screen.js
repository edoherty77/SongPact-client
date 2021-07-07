import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import colors from '../config/colors'

const Screen = ({ children, backgroundColor }) => {
  return <SafeAreaView style={styles.screen}>{children}</SafeAreaView>
}

export default Screen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
})
