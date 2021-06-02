import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import AppText from '../AppText'
import colors from '../../config/colors'

import { MaterialCommunityIcons } from '@expo/vector-icons'

const MenuButton = ({ iconName, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          size={20}
          name={iconName}
          color={colors.primary}
        />
      </View>
      <AppText style={styles.menuItem}>{title}</AppText>
      <MaterialCommunityIcons
        style={{ position: 'absolute', right: 0 }}
        // onPress={back}
        name="chevron-right"
        size={35}
        color={colors.black}
      />
    </TouchableOpacity>
  )
}

export default MenuButton

const styles = StyleSheet.create({
  optionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  iconContainer: {
    position: 'absolute',
  },
  menuItem: {
    fontSize: 30,
    marginLeft: 35,
  },
})
