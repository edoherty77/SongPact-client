import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import AppText from '../components/AppText'
import colors from '../config/colors'
import ButtonIcon from '../components/ButtonIcon'

const ContactButton = ({
  initials,
  title,
  email,
  onPress,
  item,
  name,
  noIcon,
  viewProfile,
}) => {
  return (
    <View style={styles.contactButton}>
      <View style={styles.contactView}>
        <View style={styles.picContainer}>
          <AppText></AppText>
        </View>
        <View style={styles.infoContainer}>
          <AppText style={styles.name}>{item.name}</AppText>
          <AppText style={styles.email}>{item.email}</AppText>
          <View style={styles.infoButtonContainer}>
            <AppText>516-780-3566</AppText>
            {/* <AppText>Performer</AppText> */}
          </View>
        </View>
      </View>
      <View style={styles.iconView}>
        {!noIcon && (
          <ButtonIcon
            name="chevron-right"
            backgroundColor={'transparent'}
            size={45}
            iconColor={colors.black}
            onPress={viewProfile}
          />
        )}
      </View>
    </View>
  )
}

export default ContactButton

const styles = StyleSheet.create({
  contactButton: {
    position: 'relative',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
    display: 'flex',
    borderStyle: 'solid',
    borderColor: 'black',
    justifyContent: 'space-between',
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  contactView: {
    flexDirection: 'row',
  },
  picContainer: {
    // padding: 10,
    height: 42,
    width: 42,
    marginRight: 20,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 50,
    borderWidth: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 3,
  },
  email: {
    color: '#222222',
    opacity: 0.5,
    marginBottom: 2,
  },
  infoButtonContainer: {
    flexDirection: 'row',
  },
  iconView: {
    display: 'flex',
    position: 'absolute',
    right: 0,
    top: 5,
  },
})
