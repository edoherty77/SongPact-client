import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import colors from '../config/colors'

function Separator({ Children }) {
  return (
    <View style={styles.separatorView}>
      <View style={styles.separator} />
    </View>
  )
}

const styles = StyleSheet.create({
  separatorView: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  separator: {
    borderBottomColor: colors.black,
    borderBottomWidth: 0.5,
    width: '95%',
  },
})

export default Separator
