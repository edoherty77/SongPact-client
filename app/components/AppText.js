import React from 'react'
import { Text, StyleSheet } from 'react-native'
import colors from '../config/colors'

export default function AppText({
  fontWeight,
  children,
  style,
  fontSize,
  color,
  onPress,
}) {
  return (
    <Text
      onPress={onPress}
      style={[
        styles.text,
        { fontSize: fontSize, color: color, fontWeight: fontWeight },
        style,
      ]}
    >
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: 'Futura',
    color: colors.text,
  },
})
