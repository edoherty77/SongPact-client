import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Progress } from 'native-base'
import colors from '../config/colors'

const AppProgressBar = ({ value }) => {
  return (
    <View style={styles.progressBarView}>
      <Progress value={value} mx={9} mb={3} colorScheme="green" />
    </View>
  )
}

export default AppProgressBar

const styles = StyleSheet.create({
  progressBarView: {
    marginTop: 10,
    marginBottom: 10,
  },
})
