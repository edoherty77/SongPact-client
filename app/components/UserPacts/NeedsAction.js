import React, { useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import PactButton from '../PactButton'
import currentUser from '../../stores/UserStore'
import pactStore from '../../stores/CreatePactStore'
import colors from '../../config/colors'

const NeedsAction = ({ navigation }) => {
  const reviewPact = (pact) => {
    navigation.navigate('ReviewData', {
      currentPact: pact,
    })
  }

  return (
    <View style={styles.mainView}>
      <FlatList
        data={currentUser.pacts}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <PactButton
            onPress={() => reviewPact(item)}
            type={item.type}
            title={item.recordTitle}
            name={item.initBy.name}
            status={item.status === 1 && 'Pending'}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    padding: 20,
    backgroundColor: colors.background,
  },
})

export default NeedsAction
