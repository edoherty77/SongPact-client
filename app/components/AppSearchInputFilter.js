import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Select } from 'native-base'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'

// CONFIG
import colors from '../config/colors'

const AppSearchInput = ({ filter, searchValue, setSearchValue }) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.leftIconView}>
        <Ionicons name="search-outline" size={24} />
      </View>
      <View style={styles.inputView}>
        <Input
          style={styles.input}
          variant="unstyled"
          rounded={0}
          value={searchValue}
          placeholder="Search"
          onChangeText={(value) => {
            if (value !== undefined) {
              setSearchValue(value)
            }
          }}
          placeholder="Search..."
        />
      </View>
      <View style={styles.selectView}>
        <Select
          style={styles.select}
          variant="unstyled"
          // selectedValue={language}
          // width={20}
          // accessibilityLabel="Select your favorite programming language"
          placeholder="Filters"
          onValueChange={(itemValue) => setLanguage(itemValue)}
          _selectedItem={{
            bg: 'cyan.600',
            endIcon: <Ionicons name="chevron-down" size={4} />,
          }}
        >
          <Select.Item label="Name" value="name" />
          <Select.Item label="Artist Name" value="artist" />
          <Select.Item label="Email" value="email" />
        </Select>
      </View>
    </View>
  )
}

export default AppSearchInput

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  leftIconView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    padding: 1,
    height: 50,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: '15%',
  },
  inputView: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderLeftColor: 'white',
    borderRightColor: 'white',
    width: '50%',
    height: 50,
  },
  input: {
    backgroundColor: 'white',
    height: '100%',
    width: '98%',
  },
  leftIcon: {
    padding: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    width: '15%',
    height: '90%',
  },
  selectView: {
    backgroundColor: colors.gray,
    width: '35%',
    height: 50,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  select: {
    height: 50,
  },
})
