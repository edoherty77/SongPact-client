import React from "react"
import { Text, StyleSheet, TouchableOpacity } from "react-native"

export default function ButtonText({ style, title, onPress, color, fontSize }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.text, style, { fontSize: fontSize, color: color }]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: "Futura",
    fontWeight: "bold",
    padding: 0,
    margin: 0,
  },
})
