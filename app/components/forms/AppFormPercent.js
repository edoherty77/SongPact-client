import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import AppFormField from './AppFormField'
import { useFormikContext } from 'formik'

import AppText from '../AppText'

import colors from '../../config/colors'
import ButtonIcon from '../ButtonIcon'

export default function AppFormPercent({ title, name, info }) {
  // const { setFieldTouched, handleChange, errors, touched } = useFormikContext()
  return (
    <View style={styles.mainView}>
      <View style={styles.inputView}>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.percentView}>
        <AppText fontSize={20} fontWeight="bold">
          %
        </AppText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    flexDirection: 'row',
    height: 40,
  },
  inputView: {
    // width: '100%',
    backgroundColor: 'white',
  },
  input: {
    width: 50,
    height: 40,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  percentView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: colors.gray,
    borderColor: 'black',
    borderStyle: 'solid',
    borderLeftWidth: 0,
    borderWidth: 1,
    borderLeftColor: 'white',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
})
