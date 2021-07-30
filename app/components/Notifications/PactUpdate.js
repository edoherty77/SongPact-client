import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

// COMPONENTS
import ButtonIcon from '../ButtonIcon'
import AppText from '../AppText'

// CONFIG
import colors from '../../config/colors'

const PactUpdate = ({ item, viewPact }) => {
  return (
    <View style={styles.notificationButton}>
      <View style={styles.textView}>
        <AppText style={styles.text}>
          <AppText style={styles.name}>{item.initBy}</AppText>
          {item.text}
          <AppText style={styles.title} onPress={viewPact}>
            {item.recordTitle}
          </AppText>
        </AppText>
      </View>
      <View style={styles.timeView}>
        <AppText style={styles.timeText}>July 26th, 2021 9:16PM</AppText>
      </View>
      <View style={styles.iconView}>
        <ButtonIcon
          name="close"
          backgroundColor={'transparent'}
          size={30}
          iconColor="rgba(34, 34, 34, 0.8)"
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
