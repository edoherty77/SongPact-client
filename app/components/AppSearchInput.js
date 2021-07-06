import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Icon, extendTheme } from 'native-base'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'

const theme = extendTheme({
  components: {
    Input: {
      baseStyle: {},
      defaultProps: {},
      variants: {},
      sizes: {},
    },
  },
})
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
            setSearchValue(value)
          }}
          placeholder="Search..."
        />
      </View>
    </View>
  )
}

export default AppSearchInput

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    flexDirection: 'row',
    // marginLeft: 25,
    // marginRight: 25,
    marginBottom: 10,
    // marginTop: 10,
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
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    width: '85%',
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
})
