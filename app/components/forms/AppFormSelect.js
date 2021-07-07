import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { Select, VStack } from 'native-base'
import { Ionicons } from '@expo/vector-icons'

// FORM
import { useFormikContext } from 'formik'

// STORE
import currentPact from '../../stores/CreatePactStore'
import currentUser from '../../stores/UserStore'

const AppFormSelect = ({ data, setItem, item, isDisabled, defaultValue }) => {
  const { setFieldValue } = useFormikContext()
  return (
    <View
      style={[
        styles.selectView,
        isDisabled === true
          ? { backgroundColor: '#E0E0E0' }
          : { backgroundColor: 'white' },
      ]}
    >
      <Select
        isDisabled={isDisabled}
        style={[
          styles.select,
          isDisabled === true
            ? { backgroundColor: '#E0E0E0' }
            : { backgroundColor: 'white' },
        ]}
        variant="unstyled"
        selectedValue={item}
        placeholderTextColor={isDisabled === true ? 'dark.50' : '#18181b'}
        placeholder={defaultValue !== null ? defaultValue : 'Choose Producer'}
        onValueChange={(itemValue) => {
          setFieldValue('producer', itemValue), setItem(itemValue)
        }}
        _item={
          {
            // bg: 'cyan.600',
          }
        }
        _selectedItem={{
          // bg: 'cyan.600',
          endIcon: <Ionicons name="chevron-down" size={4} />,
        }}
      >
        {data.map((element) => {
          return (
            <Select.Item
              label={element._id === currentUser._id ? 'Me' : element.name}
              value={element._id}
              key={element._id}
            />
          )
        })}
      </Select>
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
