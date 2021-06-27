import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function AppButton({
  title,
  onPress,
  color,
  textColor,
  style,
  fontSize,
  disabled,
  fontWeight,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          { fontSize: fontSize, color: textColor, fontWeight: fontWeight },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 40,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  text: {
    fontSize: 18,
    fontFamily: 'Futura',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
})
