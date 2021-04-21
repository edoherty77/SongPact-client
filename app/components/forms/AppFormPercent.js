import React from 'react'
import { StyleSheet, View } from 'react-native'
import AppFormField from './AppFormField'
import { useFormikContext } from 'formik'

import AppText from '../AppText'

import colors from '../../config/colors'
import ButtonIcon from '../ButtonIcon'

export default function AppFormPercent({ title, name, info }) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext()
  return (
    <View style={styles.percentView}>
      <View style={styles.left}>
        <AppText fontSize={25}>{title}:</AppText>
        <ButtonIcon
          name="information"
          backgroundColor="transparent"
          size={35}
          iconColor="#42C1FC"
          onPress={() => handleInfoPress()}
        />
      </View>
      <View style={styles.right}>
        <AppFormField
          name={name}
          style={styles.numInput}
          placeholder="%"
          placeholderTextColor={colors.black}
          keyboardType="number-pad"
          maxLength={3}
          returnKeyType="done"
          textAlign="center"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  percentView: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  left: {
    paddingLeft: 7,
    justifyContent: 'center',
  },
  right: {
    display: 'flex',
    alignSelf: 'flex-start',
    // backgroundColor: 'green',
  },
  numInput: {
    width: 35,
    backgroundColor: 'rgba(250, 250, 250, 0.8)',
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
  },
})
