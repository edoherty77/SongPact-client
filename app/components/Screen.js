import React from 'react'
import { StyleSheet, View } from 'react-native'
import colors from '../config/colors'

const Screen = ({ children, backgroundColor }) => {
  return <View style={styles.screen}>{children}</View>
}

export default Screen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
})
