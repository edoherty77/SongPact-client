import React, { useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import PactButton from '../PactButton'
import currentUser from '../../stores/UserStore'
import pactStore from '../../stores/CreatePactStore'
import sortedPacts from '../../stores/SortedPactStore'
import colors from '../../config/colors'
import AppSearchInput from '../AppSearchInput'

const Archive = ({ navigation }) => {
  const reviewPact = (pact) => {
    pactStore.setPact(pact)
    pactStore.setSigned()
    navigation.navigate('ReviewData')
  }

  return (
    <View style={styles.mainView}>
      <FlatList
        contentContainerStyle={{
          flex: 1,
          marginTop: 82,
        }}
        data={sortedPacts.archive}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <PactButton
            onPress={() => reviewPact(item)}
            type={item.type}
            title={item.recordTitle}
            name={item.initBy.name}
            status={colors.archive}
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
    flex: 1,
    marginBottom: 35,
    marginHorizontal: 20,
    backgroundColor: colors.background,
  },
})

export default Archive
