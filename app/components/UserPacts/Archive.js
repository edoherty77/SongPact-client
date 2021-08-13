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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          height: sortedPacts.archive.length * 140,
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
            lastUpdated={item.lastUpdated}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    // flexGrow: 1,
    marginBottom: 35,
    marginHorizontal: 20,
  },
})

export default Archive
