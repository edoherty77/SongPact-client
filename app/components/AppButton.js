import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function AppButton({
  title,
  onPress,
  color,
  textColor,
  style,
  fontSize,
  disabled,
  fontWeight,
  border,
  nextIcon,
  width,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color, borderWidth: border, width: width },
        style,
      ]}
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
      {nextIcon && (
        <MaterialCommunityIcons
          name="arrow-right-bold"
          size={24}
          color="white"
          style={{ marginLeft: 10, marginRight: -10 }}
        />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
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
