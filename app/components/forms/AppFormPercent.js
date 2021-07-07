import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

// COMPONENTS
import AppText from '../AppText'

// FORM
import { useFormikContext } from 'formik'

// CONFIG
import colors from '../../config/colors'

export default function AppFormPercent({
  name,
  title,
  editable,
  selectTextOnFocus,
  placeholder,
  icon,
  ...props
}) {
  const { setFieldTouched, handleChange, errors, touched } = useFormikContext()
  return (
    <View style={styles.mainView}>
      <View style={styles.left}>
        <AppText style={styles.text}>{title}</AppText>
        {icon && (
          <AntDesign
            name="questioncircle"
            size={14}
            color="black"
            style={styles.icon}
          />
        )}
      </View>
      <View style={styles.right}>
        <View style={styles.inputView}>
          <TextInput
            editable={editable}
            selectTextOnFocus={selectTextOnFocus}
            placeholderTextColor="#18181b"
            placeholder={
              placeholder !== undefined ? placeholder.toString() : null
            }
            style={[
              styles.input,
              editable === false
                ? { backgroundColor: '#E0E0E0' }
                : { backgroundColor: 'white' },
            ]}
            {...props}
            onChangeText={handleChange(name)}
            onBlur={() => setFieldTouched(name)}
            keyboardType="number-pad"
            maxLength={3}
            returnKeyType="done"
            textAlign="center"
          />
        </View>
        <View style={styles.percentView}>
          <AppText fontSize={20} fontWeight="bold">
            %
          </AppText>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '50%',
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
    height: 40,
  },
  inputView: {
    // width: '100%',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
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
  icon: {
    position: 'absolute',
    right: 0,
  },
})
