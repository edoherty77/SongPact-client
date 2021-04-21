import React from 'react'
import { useFormikContext } from 'formik'
import AppButton from '../AppButton'

const SubmitButton = ({
  title,
  style,
  dismissKey,
  mode,
  onPress,
  disabled,
  props,
}) => {
  const { handleSubmit, values } = useFormikContext()

  return (
    <AppButton
      title={title}
      onPress={handleSubmit}
      style={style}
      disabled={disabled}
    />
    /* <AppButton onPress={onPress} title={title} style={style} /> */
  )
}

export default SubmitButton
