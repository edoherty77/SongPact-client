import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import ModalDropdown from 'react-native-modal-dropdown-v2'

// FORM
import { useFormikContext } from 'formik'

// STORE
import currentPact from '../../stores/CreatePactStore'
import currentUser from '../../stores/UserStore'

// CONFIG
import colors from '../../config/colors'

const AppFormSelect = ({
  data,
  setItem,
  height,
  isDisabled,
  defaultValue,
  placeHolder,
}) => {
  const { setFieldValue } = useFormikContext()

  return (
    // <View
    //   style={[
    //     styles.selectView,
    //     isDisabled === true
    //       ? { backgroundColor: '#E0E0E0' }
    //       : { backgroundColor: 'white' },
    //   ]}
    // >
    //   <Select
    //     isDisabled={isDisabled}
    //     style={[
    //       styles.select,
    //       isDisabled === true
    //         ? { backgroundColor: '#E0E0E0' }
    //         : { backgroundColor: 'white' },
    //     ]}
    //     variant="unstyled"
    //     selectedValue={item}
    //     placeholderTextColor={isDisabled === true ? 'dark.50' : '#18181b'}
    //     placeholder={
    //       defaultValue !== undefined ? defaultValue : 'Choose Producer'
    //     }
    //     onValueChange={(itemValue) => {
    //       setFieldValue('producer', itemValue), setItem(itemValue)
    //     }}
    //     _item={
    //       {
    //         // bg: 'cyan.600',
    //       }
    //     }
    //     _selectedItem={{
    //       // bg: 'cyan.600',
    //       endIcon: <Ionicons name="chevron-down" size={4} />,
    //     }}
    //   >
    //     {data.map((element) => {
    //       return (
    //         <Select.Item
    //           label={element.user === currentUser._id ? 'Me' : element.name}
    //           value={element.user}
    //           key={element.user}
    //         />
    //       )
    //     })}
    //   </Select>
    // </View>
    <View style={styles.mainView}>
      <ModalDropdown
        options={data}
        defaultValue={defaultValue !== undefined ? defaultValue : placeHolder}
        onSelect={(itemIndex, itemValue) => {
          setFieldValue(data, itemValue), setItem(itemValue)
        }}
        style={[
          styles.selectStyle,
          isDisabled === true
            ? { backgroundColor: '#E0E0E0' }
            : { backgroundColor: 'white' },
        ]}
        textStyle={styles.textStyle}
        dropdownStyle={[styles.dropdownStyle, { height: height }]}
        dropdownTextStyle={styles.dropdownTextStyle}
        dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
      />
      <View style={styles.iconView}>
        <Ionicons name="chevron-down" size={18} />
      </View>
    </View>
  )
}

export default AppFormSelect

const styles = StyleSheet.create({
  mainView: {
    width: '100%',
    position: 'relative',
  },
  iconView: {
    position: 'absolute',
    zIndex: 2,
    top: 25,
    right: 20,
  },
  selectStyle: {
    borderColor: 'black',
    borderRadius: 7,
    borderWidth: 1,
    borderStyle: 'solid',
    marginVertical: 10,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 20,
    position: 'relative',
  },
  textStyle: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Avenir Next',
  },
  dropdownStyle: {
    borderColor: 'black',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderStyle: 'solid',
    marginLeft: -21,
    marginTop: 13,
    paddingBottom: 2,
  },
  dropdownTextStyle: {
    fontSize: 18,
    fontFamily: 'Avenir Next',
    color: 'black',
    paddingHorizontal: 20,
  },
  dropdownTextHighlightStyle: {
    backgroundColor: colors.green,
    color: colors.white,
  },
})
