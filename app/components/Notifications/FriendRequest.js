import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

// COMPONENTS
import ButtonIcon from '../ButtonIcon'
import AppText from '../AppText'
import AppButton from '../AppButton'

// CONFIG
import colors from '../../config/colors'

const FriendRequest = ({ item, viewProfile }) => {
  return (
    <View style={styles.notificationButton}>
      <View style={styles.left}>
        <View style={styles.textView}>
          <AppText style={styles.text}>
            <AppText style={styles.name}>{item.requesterInfo.name}</AppText> has
            sent you a friend request.
          </AppText>
        </View>
        <View style={styles.timeView}>
          <AppText style={styles.timeText}>{item.date}</AppText>
        </View>
      </View>
      <AppButton
        title="View"
        onPress={viewProfile}
        textColor="white"
        style={styles.button}
      />
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
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  button: {
    marginTop: 5,
    width: 80,
    borderRadius: 5,
    height: 30,
    backgroundColor: colors.green,
  },
  left: {
    width: 200,
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
})
