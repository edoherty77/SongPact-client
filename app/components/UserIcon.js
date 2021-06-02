import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import AppText from './AppText'
import colors from '../config/colors'

export default function UserIcon({ title, onPress }) {
  const arr = title.split(' ')
  const initials = arr[0][0] + arr[1][0]

  return (
    <TouchableOpacity
      style={styles.view}
      onPress={onPress}
      // activeOpacity={activeOpacity}
    >
      <AppText fontSize={30} onPress={onPress}>
        {initials}
      </AppText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  view: {
    margin: 10,
    width: 55,
    height: 55,
    backgroundColor: colors.red,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
