import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

// COMPONENTS
import AppText from '../AppText'
import UserIcon from '../UserIcon'

// CONFIG
import colors from '../../config/colors'

const OwnMessage = ({ item }) => {
  return (
    <View style={styles.messageView}>
      <View style={styles.messageText}>
        <AppText fontSize={18} color="white">
          {item.message}
        </AppText>
      </View>
      <View style={styles.iconView}>
        <UserIcon
          title={item.name}
          style={styles.image}
          fontSize={20}
          color={colors.white}
          backgroundColor={colors.black}
        />
      </View>
      <View style={styles.time}>
        <AppText>{item.timestamp}</AppText>
      </View>
    </View>
  )
}

export default OwnMessage

const styles = StyleSheet.create({
  messageView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    marginVertical: 15,
  },
  iconView: {
    marginLeft: 10,
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
    borderRadius: 30,
    width: '70%',
  },
  time: {
    display: 'none',
  },
})
