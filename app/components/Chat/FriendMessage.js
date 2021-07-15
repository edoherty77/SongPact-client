import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

// COMPONENTS
import AppText from '../AppText'
import UserIcon from '../UserIcon'

// CONFIG
import colors from '../../config/colors'

const FriendMessage = () => {
  return (
    <View style={styles.messageView}>
      <View style={styles.iconView}>
        <UserIcon
          title="Stephen Glandsburg"
          style={styles.image}
          fontSize={20}
          color={colors.white}
          backgroundColor={colors.black}
        />
      </View>
      <View style={styles.messageText}>
        <AppText fontSize={18}>Hey! Just got the contract!</AppText>
      </View>
      <View style={styles.time}>
        <AppText>8:30PM</AppText>
      </View>
    </View>
  )
}

export default FriendMessage

const styles = StyleSheet.create({
  messageView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginVertical: 15,
  },
  iconView: {
    marginRight: 10,
  },
  image: {
    height: 42,
    width: 42,
    borderRadius: 20,
    margin: 0,
  },
  messageText: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    width: '70%',
  },
  time: {
    display: 'none',
  },
})
