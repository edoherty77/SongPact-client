import React, { useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import PactButton from '../PactButton'
import currentUser from '../../stores/UserStore'
import pactStore from '../../stores/CreatePactStore'
import sortedPacts from '../../stores/SortedPactStore'
import colors from '../../config/colors'

const Pending = ({ navigation }) => {
  console.log('aaactiooon', sortedPacts.pending)
  const reviewPact = (pact) => {
    pactStore.setPact(pact)
    navigation.navigate('ReviewData')
  }

  return (
    <View style={styles.mainView}>
      <FlatList
        data={sortedPacts.pending}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <PactButton
            onPress={() => reviewPact(item)}
            type={item.type}
            title={item.recordTitle}
            name={item.initBy.name}
            status={item.status === 2 && 'Pending'}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    // display: 'flex',
    // padding: 20,
    // flex: 1,
    marginHorizontal: 20,
    backgroundColor: colors.background,
  },
})

export default Pending
