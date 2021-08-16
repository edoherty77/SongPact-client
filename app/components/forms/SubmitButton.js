import React from 'react'
import { StyleSheet } from 'react-native'
import { useFormikContext } from 'formik'
import AppButton from '../AppButton'
import colors from '../../config/colors'

const SubmitButton = ({
  title,
  style,
  disabled,
  nextIcon,
  width,
  fontWeight,
}) => {
  const { handleSubmit, values } = useFormikContext()

  return (
    <AppButton
      title={title}
      onPress={handleSubmit}
      style={[style, styles.button]}
      disabled={disabled}
      textColor="white"
      nextIcon={nextIcon}
      width={width}
      fontWeight={fontWeight}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 20,
    borderRadius: 5,
    height: 45,
    backgroundColor: colors.green,
    // width: '100%',
  },
})

export default SubmitButton
