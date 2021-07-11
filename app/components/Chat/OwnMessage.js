import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

// COMPONENTS
import AppText from '../AppText'
import UserIcon from '../UserIcon'

// CONFIG
import colors from '../../config/colors'

const OwnMessage = () => {
  return (
    <View style={styles.messageView}>
      <View style={styles.messageText}>
        <AppText fontSize={18} color="white">
          Okay perfect. Let me know if there’s anything in there that you’d like
          to change.
        </AppText>
      </View>
      <View style={styles.iconView}>
        <UserIcon
          title="Evan Doherty"
          style={styles.image}
          fontSize={20}
          color={colors.white}
          backgroundColor={colors.blue}
        />
      </View>
      <View style={styles.time}>
        <AppText>8:30PM</AppText>
      </View>
    </View>
  )
}

export default OwnMessage

const styles = StyleSheet.create({
  messageView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  iconView: {
    marginLeft: 30,
  },
  image: {
    height: 42,
    width: 42,
    borderRadius: 20,
    margin: 0,
  },
  messageText: {
    backgroundColor: colors.green,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    width: '70%',
  },
  time: {
    display: 'none',
  },
})
