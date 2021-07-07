import React, { useState } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import UserIcon from './UserIcon'
import RNCheckboxCard from 'react-native-checkbox-card'
import colors from '../config/colors'

const ContactCheckBox = ({ title, onPress, photo }) => {
  return (
    <View style={styles.mainView}>
      <RNCheckboxCard
        text={title}
        height={40}
        width={350}
        backgroundColor="transparent"
        textStyle={styles.name}
        onPress={onPress}
        rightIconComponent={
          photo ? (
            <Image source={{ uri: photo }} style={styles.image} />
          ) : null
          // <UserIcon
          //   title={title}
          //   style={styles.image}
          //   fontSize={20}
          //   color={colors.white}
          //   backgroundColor={colors.blue}
          // />
        }
        circleBorderRadius={3}
        circleSize={18}
        circleBackgroundColor={colors.green}
        checkIconComponent={
          <Ionicons
            name="checkmark-sharp"
            size={12}
            color="white"
            style={styles.icon}
          />
        }
      />
    </View>
  )
}

export default ContactCheckBox

const styles = StyleSheet.create({
  mainView: {
    position: 'relative',
    marginBottom: 10,
    marginTop: 0,
    paddingVertical: 5,
    borderRadius: 10,
    display: 'flex',
    borderStyle: 'solid',
    borderColor: 'black',
    justifyContent: 'space-between',
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  name: {
    fontFamily: 'Futura',
    fontSize: 20,
    marginLeft: 70,
    textDecorationLine: 'none',
  },
  image: {
    height: 35,
    width: 35,
    borderRadius: 20,
    margin: 0,
    position: 'absolute',
    right: 250,
    top: -18,
  },
})
