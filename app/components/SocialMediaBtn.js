import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import AppText from './AppText'
import colors from '../config/colors'

const SocialMediaBtn = ({ name, onPress, color, backgroundColor, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
      {/* <View style={styles.btnContainer}> */}
      <FontAwesome
        name={name}
        size={30}
        color={color}
        style={{ backgroundColor: backgroundColor }}
      />
      <AppText style={styles.title}>{title}</AppText>
      {/* </View> */}
    </TouchableOpacity>
  )
}

export default SocialMediaBtn

const styles = StyleSheet.create({
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 150,
    height: 50,
  },
  title: {
    marginLeft: 15,
    marginRight: 10,
    color: colors.white,
    fontSize: 18,
  },
})
