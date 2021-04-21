import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'

import colors from '../../config/colors'
import Screen from '../../components/Screen'
import AppText from '../../components/AppText'
import Header from '../../components/Header'
import { Formik } from 'formik'
import AppButton from '../../components/AppButton'
import ButtonIcon from '../../components/ButtonIcon'
import ConfirmModal from '../../components/ConfirmModal'
// import { useFormState, useFormDispatch } from '../../context/form-context'
import Amplify, { API, Auth, graphqlOperation } from 'aws-amplify'
// import {
//   createPact,
//   createProducer,
//   createPerformer,
//   createUserPact,
// } from '../../../src/graphql/mutations'
import config from '../../../src/aws-exports'
Amplify.configure(config)
import store from '../../stores/CreatePactStore'

import { SubmitButton } from '../../components/forms'
import * as Yup from 'yup'

export default function ReviewAndSign({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false)

  // const handleAddPact = async () => {
  // try {
  //   const newPact = await API.graphql(
  //     graphqlOperation(createPact, {
  //       input: {
  //         type: store.type,
  //         recordTitle: store.recordTitle,
  //         initBy: store.initBy,
  //         sample: store.sample,
  //         labelName: store.labelName,
  //         recordLabel: store.recordLabel,
  //         createdAt: new Date().toISOString(),
  //       },
  //     }),
  //   )
  //   store.setPactId(newPact.data.createPact.id)
  // } catch (error) {
  //   console.log(error)
  // }

  // try {
  //   for (let i = 0; i < store.performers.length; i++) {
  //     console.log('performersID', store.performers[i].userId)
  //     await API.graphql(
  //       graphqlOperation(createPerformer, {
  //         input: {
  //           performerUserId: store.performers[i].userId,
  //           performerPactId: store.pactId,
  //           userId: store.performers[i].userId,
  //           firstName: store.performers[i].firstName,
  //           lastName: store.performers[i].lastName,
  //           artistName: store.performers[i].artistName,
  //           publisherPercent: parseInt(store.performers[i].publisherPercent),
  //         },
  //       }),
  //     )
  //   }
  // } catch (error) {
  //   console.log(error)
  // }

  // try {
  //   for (let i = 0; i < store.performers.length; i++) {
  //     console.log('USERPACTPERF', store.performers[i].userId)
  //     await API.graphql(
  //       graphqlOperation(createUserPact, {
  //         input: {
  //           userId: store.performers[i].userId,
  //           userPactPactId: store.pactId,
  //           userPactUserId: store.performers[i].userId,
  //           pactId: store.pactId,
  //           confirmed: false,
  //         },
  //       }),
  //     )
  //   }
  // } catch (error) {
  //   console.log(error)
  // }

  // try {
  //   console.log('CREATEPROD', store.producer.userId)
  //   await API.graphql(
  //     graphqlOperation(createProducer, {
  //       input: {
  //         producerPactId: store.pactId,
  //         producerUserId: store.producer.userId,
  //         advancePercent: parseInt(store.producer.advancePercent),
  //         royaltyPercent: parseInt(store.producer.royaltyPercent),
  //         publisherPercent: parseInt(store.producer.publisherPercent),
  //         credit: store.producer.credit,
  //         userId: store.producer.userId,
  //         artistName: store.producer.artistName,
  //         firstName: store.producer.firstName,
  //         lastName: store.producer.lastName,
  //       },
  //     }),
  //   )
  // } catch (error) {
  //   console.log(error)
  // }

  // try {
  //   await API.graphql(
  //     graphqlOperation(createUserPact, {
  //       input: {
  //         userId: store.producer.userId,
  //         userPactPactId: store.pactId,
  //         userPactUserId: store.producer.userId,
  //         pactId: store.pactId,
  //         confirmed: false,
  //       },
  //     }),
  //   )
  // } catch (error) {
  //   console.log(error)
  // }

  //   store.resetPact()
  //   navigation.navigate('New')
  // }

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

  // async function addPact(values) {
  //   try {
  //     await API.graphql(graphqlOperation(createPact, values))
  //     console.log('pact successfully created.')
  //   } catch (err) {
  //     console.log('error creating pact...', err)
  //   }
  // }

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
              keyExtractor={(item) => item.id}
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
            // onPress={handleAddPact}
          />
          <View style={styles.iconView}>
            <ButtonIcon
              // onPress={trash}
              name="delete"
              backgroundColor="transparent"
              iconColor={colors.red}
            />
          </View>
        </View>
      </ScrollView>

      <ConfirmModal
        text="Are you sure you'd like to delete?"
        // onBackdropPress={() => setModalVisible(false)}
        // isVisible={isModalVisible}
        // confirm={trashConfirm}
        // deny={trashDeny}
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
