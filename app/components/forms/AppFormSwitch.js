import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { View, StyleSheet, Switch } from 'react-native'

// FORM
import { useFormikContext } from 'formik'
import ErrorMessage from './ErrorMessage'

// COMPONENTS
import AppText from '../AppText'

const AppFormSwitch = ({
  name,
  formikKey,
  width,
  onPress,
  label,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext()
  const [value, setValue] = useState('first')

  return (
    <View style={styles.view}>
      <View style={styles.textView}>
        <AppText fontSize={18}>{label}</AppText>
        <AntDesign
          name="questioncircle"
          size={14}
          color="black"
          style={styles.icon}
        />
      </View>
      <Switch
        onChange={onPress}
        onValueChange={(value) => {
          setFieldValue(formikKey, value), setValue(value)
        }}
        value={value}
        {...otherProps}
      />

      {/* <ErrorMessage error={errors[name]} visible={touched[name]} /> */}
    </View>
  )
}

export default AppFormSwitch

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
  },
  icon: {
    position: 'absolute',
    right: 0,
  },
})
