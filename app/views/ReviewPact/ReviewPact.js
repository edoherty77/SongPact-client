import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'

import colors from '../../config/colors'
import Screen from '../../components/Screen'
import AppText from '../../components/AppText'
import Header from '../../components/Header'
import AppButton from '../../components/AppButton'
import ButtonIcon from '../../components/ButtonIcon'
import ConfirmModal from '../../components/ConfirmModal'
import PactModel from '../../api/pacts'
import store from '../../stores/CreatePactStore'
import Signature from 'react-native-signature-canvas'
import { SubmitButton } from '../../components/forms'

export default function ReviewAndSign({ route, navigation }) {
  const [isModalVisible, setModalVisible] = useState(false)
  const [pactObj, setPactObj] = useState('')
  const { pact } = route.params
  const acceptPact = async () => {
    navigation.navigate('ViewContract', {
      pact: pact,
    })
  }

  useEffect(() => {
    if (pact !== undefined) {
      console.log('currentPactStore', store.producer)
    }
  }, [])

  const deletePact = async () => {
    const obj = {
      id: pact._id,
      users: pact.users,
    }
    await PactModel.delete(obj)
    console.log('trash')
    navigation.navigate('Dashboard')
  }

  return (
    <Screen>
      <Header
        back={() => navigation.navigate('Dashboard')}
        icon="arrow-left-bold"
        title="Review"
      />
      <ScrollView style={styles.mainView}>
        <View style={styles.dataBlock}>
          <View style={styles.header}>
            <AppText style={styles.headerText}>Record Title</AppText>
          </View>
          <View style={styles.recordDataContainer}>
            <AppText style={styles.recordDataText}>{store.recordTitle}</AppText>
          </View>
        </View>
        <View style={styles.dataBlock}>
          <View style={styles.header}>
            <AppText style={styles.headerText}>Sample</AppText>
          </View>
          <View style={styles.recordDataContainer}>
            <AppText style={styles.recordDataText}>
              {store.sample === true ? 'Yes' : 'No'}
            </AppText>
          </View>
        </View>
        <View style={styles.dataBlock}>
          <View style={styles.header}>
            <AppText style={styles.headerText}>Label</AppText>
          </View>
          <View style={styles.recordDataContainer}>
            <AppText style={styles.recordDataText}>
              {store.recordLabel === true ? store.labelName : 'None'}
            </AppText>
          </View>
        </View>
        <View style={styles.dataBlock}>
          <View style={styles.header}>
            <AppText style={styles.headerText}>Producer</AppText>
          </View>
          <View style={styles.data}>
            <AppText style={styles.artistNameText}>
              {store.producer.artistName}
            </AppText>
            <View style={styles.percView}>
              <AppText style={styles.subHeaderText}>Advance %</AppText>
              <AppText style={styles.perc}>
                {store.producer.advancePercent}%
              </AppText>
            </View>
            <View style={styles.percView}>
              <AppText style={styles.subHeaderText}>Publisher %</AppText>
              <AppText style={styles.perc}>
                {store.producer.publisherPercent}%
              </AppText>
            </View>
            <View style={styles.percView}>
              <AppText style={styles.subHeaderText}>Royalty %</AppText>
              <AppText style={styles.perc}>
                {store.producer.royaltyPercent}%
              </AppText>
            </View>
          </View>
        </View>
        <View style={styles.dataBlock}>
          <View style={styles.header}>
            <AppText style={styles.headerText}>Performers</AppText>
          </View>
          <View style={styles.data}>
            <FlatList
              data={store.performers}
              keyExtractor={(item) => item._id}
              renderItem={({ item, index }) => (
                <View style={styles.dataBlock}>
                  <AppText style={styles.artistNameText}>
                    {item.artistName}
                  </AppText>
                  <View style={styles.percView}>
                    <AppText style={styles.subHeaderText}>Publisher %</AppText>
                    <AppText style={styles.perc}>
                      {item.publisherPercent}%
                    </AppText>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <AppButton
            title="Accept"
            style={styles.nextButton}
            onPress={acceptPact}
          />
        </View>
        <View style={styles.iconView}>
          <ButtonIcon
            // onPress={deletePact}
            name="delete"
            backgroundColor="transparent"
            iconColor={colors.red}
          />
        </View>
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    // backgroundColor: 'orange',
    paddingHorizontal: 20,
  },
  dataBlock: {
    // backgroundColor: 'red',
    marginVertical: 10,
  },
  header: {},
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginVertical: 10,
  },
  artistNameText: {
    marginLeft: 10,
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  recordDataContainer: {
    // backgroundColor: 'green',
    marginLeft: 10,
  },
  recordDataText: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  percView: {
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: 'blue',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  perc: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  iconView: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  nextButton: {
    marginBottom: 10,
    borderRadius: 50,
    height: 45,
    backgroundColor: colors.red,
    width: '50%',
  },
})
