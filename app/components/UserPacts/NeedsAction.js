import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import PactButton from '../PactButton'
import currentUser from '../../stores/UserStore'

import AppText from '../AppText'

const NeedsAction = () => {
  const pacts = currentUser.pacts
  // console.log('CURRENT USER FROM STORE', currentUser.pacts)
  return (
    <View style={styles.mainView}>
      <FlatList
        data={pacts}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <PactButton
            type={item.type}
            title={item.recordTitle}
            name={item.initBy.firstName}
            status={item.status === 1 && 'Pending'}
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
