import React, { useState } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import AppText from './AppText'
import colors from '../config/colors'
import ButtonIcon from './ButtonIcon'
import UserIcon from './UserIcon'

const ContactButton = ({ onPress, item, noIcon, viewProfile }) => {
  const initials =
    item.name.split(' ')[0].split('')[0] + item.name.split(' ')[1].split('')[0]

  return (
    <View style={styles.contactButton}>
      <View style={styles.contactView}>
        <View style={styles.picContainer}>
          {item.googlePhotoUrl ? (
            <Image source={{ uri: item.googlePhotoUrl }} style={styles.image} />
          ) : (
            <UserIcon
              title={item.name}
              style={styles.image}
              fontSize={20}
              color={colors.white}
              backgroundColor={colors.blue}
            />
          )}
        </View>
        <View style={styles.infoContainer}>
          <AppText style={styles.name}>{item.name}</AppText>
          <AppText style={styles.email}>{item.email}</AppText>
          <View style={styles.infoButtonContainer}>
            {/* <AppText>516-780-3566</AppsText> */}
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
    marginBottom: 10,
    marginTop: 0,
    padding: 10,
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
    marginRight: 13,
    borderRadius: 50,
  },
  image: {
    height: 42,
    width: 42,
    borderRadius: 20,
    margin: 0,
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
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    // right: 0,
    // top: 5,
  },
})
