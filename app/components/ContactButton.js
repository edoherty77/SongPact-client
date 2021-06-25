import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
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
  // console.log('item', item)
  return (
    <TouchableOpacity style={styles.contactButton} onPress={onPress}>
      <View style={styles.contactView}>
        <View style={styles.picContainer}>
          <Image source={{ uri: item.googlePhotoUrl }} style={styles.image} />
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
            // onPress={viewProfile}
          />
        )}
      </View>
    </TouchableOpacity>
  )
}

export default ContactButton

const styles = StyleSheet.create({
  contactButton: {
    position: 'relative',
    marginBottom: 5,
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
    height: 42,
    width: 42,
    marginRight: 20,
    borderRadius: 50,
  },
  image: {
    height: 42,
    width: 42,
    borderRadius: 20,
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
