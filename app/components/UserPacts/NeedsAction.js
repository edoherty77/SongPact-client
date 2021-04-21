import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import PactButton from '../PactButton'
import CurrentUser from '../../stores/UserStore'

import AppText from '../AppText'

const NeedsAction = () => {
  // console.log('CURRENT USER FROM STORE', CurrentUser.pacts.items)
  return (
    <View style={styles.mainView}>
      <FlatList
        data={CurrentUser.pacts.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <PactButton
            type={item.id}
            title={item.recordTitle}
            name={item.initBy === CurrentUser.artistName ? 'Me' : item.initBy}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    display: 'flex',
    padding: 10,
    margin: 30,
    // alignItems: 'center',
    // justifyContent: 'flex-end',
    // backgroundColor: 'red',
  },
  card: {
    backgroundColor: 'blue',
    elevation: 3,
    width: '100%',
    height: 200,
    flex: 1,
  },
  body: {
    flex: 1,
    backgroundColor: 'green',
  },
})

export default NeedsAction
