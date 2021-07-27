import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

// COMPONENTS
import ButtonIcon from '../ButtonIcon'
import AppText from '../AppText'

// CONFIG
import colors from '../../config/colors'

const FriendRequest = ({ item, viewProfile }) => {
  console.log('item', item)
  return (
    <View style={styles.notificationButton}>
      <View style={styles.textView}>
        <AppText style={styles.text}>
          <AppText style={styles.name}>{item.name}</AppText> has sent you a
          friend request.
        </AppText>
      </View>
      <View style={styles.timeView}>
        <AppText style={styles.timeText}>July 26th, 2021 9:16PM</AppText>
      </View>
      <View style={styles.iconView}>
        <ButtonIcon
          name="chevron-right"
          backgroundColor={'transparent'}
          size={45}
          iconColor={colors.black}
          onPress={viewProfile}
        />
      </View>
    </View>
  )
}

export default FriendRequest

const styles = StyleSheet.create({
  notificationButton: {
    position: 'relative',
    marginBottom: 10,
    marginTop: 0,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
    display: 'flex',
    borderStyle: 'solid',
    borderColor: 'black',
    justifyContent: 'space-between',
    borderWidth: 1,
    flexDirection: 'column',
    backgroundColor: colors.white,
  },
  textView: {
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
  },
  timeText: {
    color: colors.gray,
  },
  iconView: {
    position: 'absolute',
    right: 0,
    top: 5,
  },
})
