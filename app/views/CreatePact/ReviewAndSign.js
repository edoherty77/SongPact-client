import React from 'react'
import { StyleSheet, View, FlatList, ScrollView } from 'react-native'

import colors from '../../config/colors'
import Screen from '../../components/Screen'
import AppText from '../../components/AppText'
import Header from '../../components/Header'
import Separator from '../../components/Separator'
import AppButton from '../../components/AppButton'
import AppProgressBar from '../../components/AppProgressBar'
import PactModel from '../../api/pacts'
import currentPact from '../../stores/CreatePactStore'

// FORM
import { Formik } from 'formik'
import {
  AppFormField,
  SubmitButton,
  AppFormSelect,
  AppFormPercent,
} from '../../components/forms'

export default function ReviewAndSign({ navigation }) {
  console.log('pact currentPact', currentPact)

  const createPact = async () => {
    let performArr = []
    let usersArr = [currentPact.producer.user]
    try {
      currentPact.performers.map((performer) => {
        let obj = {}
        obj['user'] = performer._id
        obj['publisherPercent'] = parseInt(performer.publisherPercent)
        obj['name'] = performer.name
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
        producer: currentPact.producer,
        type: currentPact.type,
        sample: currentPact.sample,
        recordLabel: currentPact.recordLabel,
        labelName: currentPact.labelName,
        recordTitle: currentPact.recordTitle,
        initBy: currentPact.initBy,
        collaborators: currentPact.collaborators,
        performers: performArr,
      }
      await PactModel.create(obj)
      currentPact.resetPact()
      navigation.navigate('New')
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   createPact()
  // }, [])

  return (
    <Screen>
      <Header
        back={() => navigation.navigate('RecordInfo')}
        icon="arrow-back"
        title="Create a new pact"
        subTitle="Review"
      />
      <AppProgressBar value={90} />
      <Separator />
      <Formik
        initialValues={{
          recordTitle: '',
          sample: false,
          recordLabel: false,
          labelName: '',
          advancePercent: currentPact.producer.advancePercent,
        }}
        enableReinitialize
        onSubmit={(values) => nextScreen(values)}
      >
        {({ values }) => (
          <View style={styles.mainView}>
            <View style={styles.infoSection}>
              <View style={styles.titleView}>
                <AppText style={styles.text}>Record Title</AppText>
                <AppFormField
                  editable={false}
                  selectTextOnFocus={false}
                  name="recordTitle"
                  style={styles.input}
                  placeholder={currentPact.recordTitle}
                  autoCorrect={false}
                  height={50}
                  placeholderTextColor="#18181b"
                />
              </View>
              <View style={styles.recordInfo}>
                <View>
                  <AppText style={styles.text}>Is this a sample?</AppText>
                  {currentPact.sample ? (
                    <AppText style={styles.text}>Yes</AppText>
                  ) : (
                    <AppText style={styles.text}>No</AppText>
                  )}
                </View>
                <View>
                  <AppText style={styles.text}>Label Name</AppText>
                  {currentPact.labelName ? (
                    <AppText style={styles.text}>
                      {currentPact.labelName}
                    </AppText>
                  ) : (
                    <AppText style={styles.text}>-</AppText>
                  )}
                </View>
              </View>
            </View>
            <Separator />
            <View style={styles.infoSection}>
              <AppText fontWeight="bold" style={styles.sectionHeader}>
                Producer Info
              </AppText>
              <AppText style={styles.text}>
                Who is the producer for this pact?
              </AppText>
              <AppFormSelect
                defaultValue={currentPact.producer.name}
                isDisabled={true}
                data={currentPact.users}
                // setItem={setProducer}
                item={currentPact.producer.name}
              />
              <AppFormPercent
                editable={false}
                selectTextOnFocus={false}
                name="advancePercent"
                title="Producer Advance"
                placeholder={currentPact.producer.advancePercent}
              />
              <AppFormPercent
                editable={false}
                selectTextOnFocus={false}
                name="royaltyPercent"
                title="Producer Royalty"
                placeholder={currentPact.producer.royaltyPercent}
              />
              <AppFormPercent
                editable={false}
                selectTextOnFocus={false}
                name="publisherPercent"
                title="Producer Publish"
                placeholder={currentPact.producer.publisherPercent}
              />
              <View style={styles.credText}>
                <AppText style={styles.text}>Producer Credit</AppText>
              </View>
              <View style={styles.credInput}>
                <AppFormField
                  editable={false}
                  selectTextOnFocus={false}
                  name="credit"
                  height={50}
                  style={styles.input}
                  placeholder={currentPact.producer.credit}
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor={colors.black}
                />
              </View>
            </View>
            <View style={styles.performerInfo}></View>
            <View style={styles.footer}>
              <AppButton
                textColor="white"
                title="Create Pact"
                style={styles.button}
                // onPress={createPact}
              />
            </View>
          </View>
        )}
      </Formik>
    </Screen>
  )
}

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    flex: 1,
    padding: 10,
    marginHorizontal: 30,
  },
  sectionHeader: {
    fontSize: 20,
  },
  text: {
    fontSize: 18,
  },
  infoSection: {
    display: 'flex',
    marginVertical: 15,
  },
  recordInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: '100%',
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1,
    fontSize: 18,
    height: 100,
    paddingLeft: 20,
    borderRadius: 7,
    marginBottom: 5,
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
  button: {
    marginVertical: 20,
    borderRadius: 5,
    height: 45,
    backgroundColor: colors.green,
    width: '100%',
  },
})
