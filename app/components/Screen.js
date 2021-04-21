import React from 'react'
import { StyleSheet, View } from 'react-native'

const Screen = ({ children, backgroundColor }) => {
  return (
    <View style={[styles.screen, { backgroundColor: backgroundColor }]}>
      {children}
    </View>
  )
}

export default Screen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
})
