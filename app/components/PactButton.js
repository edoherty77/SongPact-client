import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import ButtonIcon from './ButtonIcon'
import AppText from './AppText'
import colors from '../config/colors'

const PactButton = ({ type, title, name, status, onPress, lastUpdated }) => {
  return (
    <TouchableOpacity style={styles.pactButton} onPress={onPress}>
      <View style={[styles.status, { backgroundColor: status }]}></View>
      <View>
        <AppText style={styles.title}>{title}</AppText>
        <AppText style={styles.text}>
          Created By: <AppText style={styles.name}>{name}</AppText>
        </AppText>
        <AppText fontSize={14}>Type: {type}</AppText>
      </View>
      <View style={styles.dateView}>
        <AppText style={styles.updated}>Last updated</AppText>
        <AppText style={styles.updated}>{lastUpdated}</AppText>
      </View>
    </TouchableOpacity>
  )
}

export default PactButton

const styles = StyleSheet.create({
  pactButton: {
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    padding: 15,
    paddingRight: 0,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    // height: 100,
  },
  status: {
    top: 5,
    height: 10,
    width: 10,
    borderRadius: 20,
    marginRight: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 4,
    // width: 130,
  },
  text: {
    fontSize: 14,
    // marginTop: 4,
  },
  dateView: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'flex-end',
    right: 25,
    bottom: 16,
    // backgroundColor: 'red',
  },
  updated: {
    fontSize: 12,
    color: 'rgba(34, 34, 34, 0.8)',
  },
})
