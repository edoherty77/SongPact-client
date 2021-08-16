import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { SubmitButton } from './forms'

const FooterNext = () => {
  return (
    <View style={styles.footer}>
      <SubmitButton
        // disabled={values.collabs.length === 0 ? true : false}
        style={styles.nextButton}
        width="30%"
        title="Next"
        nextIcon
        fontWeight="800"
      />
    </View>
  )
}

export default FooterNext

const styles = StyleSheet.create({
  footer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    // backgroundColor: 'red',
  },
})
