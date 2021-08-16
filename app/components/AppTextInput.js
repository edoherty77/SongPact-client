import React, { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import defaultStyles from '../config/styles'

// CONFIG
import colors from '../config/colors'

const AppTextInput = ({
  placeholderTextColor,
  style,
  icon,
  width,
  ...otherProps
}) => {
  const [borderColor, setBorderColor] = useState({ borderColor: 'black' })

  const setFocusStyle = () => {
    return {
      borderColor: colors.green,
      shadowColor: colors.green,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      elevation: 9,
    }
  }
  return (
    <View style={[styles.container, { width: width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        onFocus={() => setBorderColor(setFocusStyle)}
        onBlur={() => setBorderColor({ borderColor: 'black' })}
        placeholderTextColor={placeholderTextColor}
        style={[styles.input, style, borderColor]}
        {...otherProps}
      />
    </View>
  )
}

export default AppTextInput

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    flexDirection: 'row',
    marginVertical: 10,
    height: 50,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    fontSize: 18,
    width: '100%',
    backgroundColor: colors.white,
  },
})
