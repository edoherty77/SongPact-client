import React, { useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'

// COMPONENTS
import PactButton from '../PactButton'

// STORE
import pactStore from '../../stores/CreatePactStore'
import sortedPacts from '../../stores/SortedPactStore'

// CONFIG
import colors from '../../config/colors'

const Pending = ({ navigation }) => {
  const reviewPact = (pact) => {
    pactStore.setPact(pact)
    pactStore.setSigned()
    navigation.navigate('ReviewData')
  }

  return (
    <View style={styles.mainView}>
      <FlatList
        contentContainerStyle={{
          marginTop: 82,
        }}
        data={sortedPacts.pending}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <PactButton
            onPress={() => reviewPact(item)}
            type={item.type}
            title={item.recordTitle}
            name={item.initBy.name}
            status={colors.pending}
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
