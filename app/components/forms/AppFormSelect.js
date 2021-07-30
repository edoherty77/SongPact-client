import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { Select } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import ModalDropdown from 'react-native-modal-dropdown'

// FORM
import { useFormikContext } from 'formik'

// STORE
import currentPact from '../../stores/CreatePactStore'
import currentUser from '../../stores/UserStore'

const AppFormSelect = ({ data, setItem, item, isDisabled, defaultValue }) => {
  const { setFieldValue } = useFormikContext()
  let names = data.map((user) => {
    return user.name
  })
  console.log('data', data)
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
    <View>
      <ModalDropdown
        options={names}
        defaultValue={
          defaultValue !== undefined ? defaultValue : 'Choose Producer'
        }
        onSelect={(itemIndex, itemValue) => {
          // console.log('itemValue', value)
          setFieldValue('producer', itemValue), setItem(itemValue)
        }}
      />
    </View>
  )
}

export default AppFormSelect

const styles = StyleSheet.create({
  selectView: {
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    marginVertical: 10,
    height: 50,
  },
  select: {
    height: 47,
  },
})
