import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import AppText from '../components/AppText'
import ButtonIcon from '../components/ButtonIcon'

import colors from '../config/colors'

export default function Collaborator({ name, role, onPress }) {
  return (
    <View style={styles.collab}>
      <View style={styles.collabText}>
        <AppText fontSize={20}>{name}</AppText>
        <AppText>Role: {role}</AppText>
      </View>
      <View style={styles.collabMore}>
        <ButtonIcon
          name="dots-horizontal"
          backgroundColor={'transparent'}
          size={35}
          iconColor={colors.red}
          onPress={onPress}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  collab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: colors.tan,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
})
