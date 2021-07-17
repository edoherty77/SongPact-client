import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import AppText from './AppText'
import colors from '../config/colors'

export default function UserIcon({
  title,
  onPress,
  style,
  fontSize,
  backgroundColor,
  color,
}) {
  let initials
  if (title !== undefined) {
    const arr = title.split(' ')
    initials = arr[0][0] + arr[1][0]
  }

  return (
    <TouchableOpacity
      style={[styles.view, style, { backgroundColor: backgroundColor }]}
      onPress={onPress}
      // activeOpacity={activeOpacity}
    >
      <AppText fontSize={fontSize} color={color} onPress={onPress}>
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
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
