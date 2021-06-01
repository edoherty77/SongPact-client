import React from 'react'
import { useFormikContext } from 'formik'

import AppTextInput from '../AppTextInput'
import ErrorMessage from './ErrorMessage'

const AppFormField = ({ name, width, height, ...props }) => {
  const {
    setFieldTouched,
    handleChange,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext()

  return (
    <>
      <AppTextInput
        onChangeText={handleChange(name)}
        width={width}
        height={height}
        {...props}
        onBlur={() => setFieldTouched(name)}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  )
}

export default AppFormField
