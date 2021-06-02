import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useFormikContext } from 'formik'
import RNCheckboxCard from 'react-native-checkbox-card'

const ContactCheckBox = ({ children, title, onPress, name }) => {
  const [isSelected, setSelection] = useState(false)

  return (
    <View style={styles.mainView}>
      <RNCheckboxCard
        text={title}
        height={40}
        backgroundColor="transparent"
        textStyle={styles.checkbox}
        onPress={onPress}
        // sortIconImageSource={'null'}
        // onPress={(checked: boolean) => console.log('Checked: ', checked)}
      />
    </View>
  )
}

export default ContactCheckBox

const styles = StyleSheet.create({
  mainView: { paddingBottom: 5 },
  checkbox: {
    fontFamily: 'Futura',
    fontSize: 20,
    textDecorationLine: 'none',
  },
})
