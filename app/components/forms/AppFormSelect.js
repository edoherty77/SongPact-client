import React from 'react'
import { StyleSheet, FlatList, View } from 'react-native'
import { Select, VStack } from 'native-base'
import { Ionicons } from '@expo/vector-icons'

// FORM
import { useFormikContext } from 'formik'

// STORE
import currentPact from '../../stores/CreatePactStore'
import currentUser from '../../stores/UserStore'

const AppFormSelect = ({ data, setItem, item }) => {
  const { setFieldValue } = useFormikContext()
  return (
    <View style={styles.selectView}>
      <Select
        style={styles.select}
        variant="unstyled"
        selectedValue={item}
        placeholder="Choose producer"
        onValueChange={(itemValue) => {
          setFieldValue('producer', itemValue), setItem(itemValue)
        }}
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
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    marginVertical: 10,
  },
  select: {
    // padding: 40,
    // backgroundColor: 'red',
  },
})
