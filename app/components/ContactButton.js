import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { useFormikContext } from 'formik'
import AppText from '../components/AppText'
import Separator from '../components/Separator'
import colors from '../config/colors'
import ButtonIcon from '../components/ButtonIcon'

const ContactButton = ({
  initials,
  title,
  onPress,
  name,
  noIcon,
  menuPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.contactButton}>
      <View style={styles.contactView}>
        <View style={styles.textView}>
          <AppText onPress={onPress} fontSize={20} style={styles.name}>
            {name}
          </AppText>
        </View>
        <View style={styles.btnView}>
          {!noIcon && (
            <ButtonIcon
              name="dots-horizontal"
              backgroundColor={'transparent'}
              size={35}
              iconColor={colors.red}
              onPress={menuPress}
            />
          )}
        </View>
      </View>
      <Separator />
    </TouchableOpacity>
  )
}

export default ContactButton

const styles = StyleSheet.create({
  contactButton: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    padding: 5,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
  },
  contactView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 7,
  },
})
