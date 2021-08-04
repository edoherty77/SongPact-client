import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

// COMPONENTS
import ButtonIcon from '../ButtonIcon'
import AppText from '../AppText'

// STORE
import currentUser from '../../stores/UserStore'

// CONFIG
import colors from '../../config/colors'

// MODELS
import NotificationsModel from '../../api/notifications'

const PactUpdate = ({ item, viewPact, deleteNotification }) => {
  return (
    <View style={styles.notificationButton}>
      <View style={styles.textView}>
        {item.pactStatus === 1 ? (
          <AppText style={styles.text}>
            <AppText style={styles.name}>{item.initBy}</AppText>
            {item.text}
            <AppText style={styles.title} onPress={viewPact}>
              {item.recordTitle}
            </AppText>
          </AppText>
        ) : (
          <AppText style={styles.text}>
            {item.text}
            <AppText style={styles.title} onPress={viewPact}>
              {item.recordTitle}
            </AppText>
            <AppText style={{ fontWeight: 'normal' }}> is complete</AppText>
          </AppText>
        )}
      </View>
      <View style={styles.timeView}>
        <AppText style={styles.timeText}>{item.date}</AppText>
      </View>
      <View style={styles.iconView}>
        <ButtonIcon
          name="close"
          backgroundColor={'transparent'}
          size={30}
          iconColor="rgba(34, 34, 34, 0.8)"
          onPress={() => deleteNotification(item)}
        />
      </View>
    </View>
  )
}

export default PactUpdate

const styles = StyleSheet.create({
  notificationButton: {
    position: 'relative',
    marginBottom: 10,
    marginTop: 0,
    paddingLeft: 15,
    paddingRight: 20,
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
    display: 'flex',
    flexDirection: 'row',
    width: '90%',
    // flexWrap: 'wrap'
  },
  text: {
    fontSize: 20,
    lineHeight: 30,
  },
  name: {
    fontWeight: 'bold',
  },
  title: {
    fontWeight: '500',
    textDecorationColor: colors.black,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  timeText: {
    color: colors.gray,
  },
  iconView: {
    position: 'absolute',
    right: 5,
    top: 7,
  },
})
