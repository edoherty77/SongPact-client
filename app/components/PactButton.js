import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import AppText from './AppText'
import colors from '../config/colors'

const PactButton = ({ type, title, name, status, onPress }) => {
  return (
    <TouchableOpacity style={styles.pactButton} onPress={onPress}>
      <View style={styles.left}>
        <View style={styles.status}></View>
      </View>
      <View style={styles.middle}>
        <AppText style={styles.title}>{title}</AppText>
        <AppText style={styles.text}>
          Started By: <AppText style={styles.name}>{name}</AppText>
        </AppText>
        <AppText style={styles.text}>Type: {type}</AppText>
      </View>
      <View style={styles.right}>
        <AppText style={styles.updated}>Last updated: 05/02/2021</AppText>
      </View>
    </TouchableOpacity>
  )
}

export default PactButton

const styles = StyleSheet.create({
  pactButton: {
    backgroundColor: '#FFFFFF',
    // marginLeft: 10,
    // marginRight: 10,
    marginBottom: 10,
    padding: 15,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
  },
  left: {
    // backgroundColor: 'blue',
    // position: 'relative',
  },
  status: {
    backgroundColor: '#F2C94C',
    // position: 'absolute',
    top: 5,
    height: 10,
    width: 10,
    borderRadius: 20,
    marginRight: 15,
  },
  middle: {
    margin: 0,
    // backgroundColor: 'red',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  right: {
    display: 'flex',
    position: 'absolute',
    top: 20,
    right: 20,
  },
  updated: {
    color: 'rgba(34, 34, 34, 0.8)',
    fontSize: 10,
  },
})
