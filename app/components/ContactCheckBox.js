import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import RNCheckboxCard from 'react-native-checkbox-card'
import colors from '../config/colors'

const ContactCheckBox = ({ title, onPress }) => {
  return (
    <View style={styles.mainView}>
      <RNCheckboxCard
        text={title}
        height={40}
        backgroundColor="transparent"
        textStyle={styles.name}
        onPress={onPress}
        sortIconImageSource={false}
        circleBorderRadius={0}
        circleSize={20}
        circleBackgroundColor={colors.green}
        checkIconComponent={
          <Ionicons name="checkmark-sharp" size={15} color="white" />
        }
      />
    </View>
  )
}

export default ContactCheckBox

const styles = StyleSheet.create({
  mainView: {
    position: 'relative',
    marginBottom: 10,
    marginTop: 0,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    display: 'flex',
    borderStyle: 'solid',
    borderColor: 'black',
    justifyContent: 'space-between',
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  name: {
    fontFamily: 'Futura',
    fontSize: 20,
    marginLeft: 20,
    textDecorationLine: 'none',
  },
})
