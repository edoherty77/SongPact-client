import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import { View, StyleSheet, Switch } from 'react-native'
import AppText from '../AppText'
import ErrorMessage from './ErrorMessage'

const AppFormSwitch = ({
  name,
  formikKey,
  width,
  onPress,
  label,
  ...otherProps
}) => {
  const {
    setFieldValue,
    handleChange,
    errors,
    touched,
    values,
  } = useFormikContext()
  const [value, setValue] = useState('first')

  return (
    <View style={styles.view}>
      <AppText fontSize={18}>{label}</AppText>
      <View style={styles.switchView}>
        <Switch
          onChange={onPress}
          onValueChange={(value) => {
            setFieldValue(formikKey, value), setValue(value)
          }}
          value={value}
          {...otherProps}
        />
      </View>

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
  switchView: {
    // marginRight: 20,
  },
})
