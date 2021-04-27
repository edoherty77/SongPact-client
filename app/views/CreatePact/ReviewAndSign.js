import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'

import colors from '../../config/colors'
import Screen from '../../components/Screen'
import AppText from '../../components/AppText'
import Header from '../../components/Header'
import AppButton from '../../components/AppButton'
import ButtonIcon from '../../components/ButtonIcon'
import ConfirmModal from '../../components/ConfirmModal'
import PactModel from '../../api/pacts'
import config from '../../../src/aws-exports'
import store from '../../stores/CreatePactStore'

import { SubmitButton } from '../../components/forms'

export default function ReviewAndSign({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false)
  console.log('pact store', store)

  const createPact = async () => {
    let performArr = []
    let usersArr = [store.producer.user]
    try {
      store.performers.map((performer) => {
        let obj = {}
        obj['user'] = performer._id
        obj['publisherPercent'] = parseInt(performer.publisherPercent)
        obj['firstName'] = performer.firstName
        obj['lastName'] = performer.lastName
        obj['companyName'] = performer.companyName
        obj['artistName'] = performer.artistName
        obj['address'] = performer.address
        obj['city'] = performer.city
        obj['state'] = performer.state
        obj['zipCode'] = performer.zipCode
        obj['email'] = performer.email
        performArr.push(obj)
        usersArr.push(performer._id)
      })
      let obj = {
        status: 1,
        users: usersArr,
        producer: store.producer,
        type: store.type,
        sample: store.sample,
        recordLabel: store.recordLabel,
        labelName: store.labelName,
        recordTitle: store.recordTitle,
        initBy: store.initBy,
        collaborators: store.collaborators,
        performers: performArr,
      }
      await PactModel.create(obj)
      store.resetPact()
      navigation.navigate('New')
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   createPact()
  // }, [])

  function trash() {
    setModalVisible(true)
  }

  function trashDeny() {
    setModalVisible(false)
  }

  function trashConfirm() {
    store.resetPact()
    setModalVisible(false)
    navigation.navigate('New')
  }

  return (
    <Screen>
      <Header
        back={() => navigation.navigate('RecordInfo')}
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
            title="Sign and Send"
            style={styles.nextButton}
            onPress={createPact}
          />
          <View style={styles.iconView}>
            <ButtonIcon
              onPress={trash}
              name="delete"
              backgroundColor="transparent"
              iconColor={colors.red}
            />
          </View>
        </View>
      </ScrollView>

      <ConfirmModal
        text="Are you sure you'd like to delete?"
        onBackdropPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
        confirm={trashConfirm}
        deny={trashDeny}
      />
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
