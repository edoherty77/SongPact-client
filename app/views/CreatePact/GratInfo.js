import React from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'

// CONFIG
import colors from '../../config/colors'

//COMPONENTTS
import Screen from '../../components/Screen'
import AppText from '../../components/AppText'
import Separator from '../../components/Separator'
import AppProgressBar from '../../components/AppProgressBar'
import FooterNext from '../../components/FooterNext'

// FORM
import { Formik } from 'formik'
import {
  AppFormSelect,
  AppFormPercent,
  AppFormField,
} from '../../components/forms'
import * as Yup from 'yup'

// STORE
import currentPact from '../../stores/CreatePactStore'

// const validationSchema = Yup.object().shape({
//   recordTitle: Yup.string().required().label('Record Title'),
//   role: Yup.string().required().label('role'),

// })

export default function GratInfo({ navigation }) {
  const [producer, setProducer] = React.useState('')
  const [credit, setCredit] = React.useState('')

  let producers = currentPact.users.map((user) => {
    return user.name
  })
  let credits = currentPact.users.map((user) => {
    return user.name
  })

  credits.push('Other')

  function nextScreen(values) {
    console.log('values', values)
    currentPact.setProducer(values)
    currentPact.setProducerInfo(values)
    navigation.navigate('GratInfoCont')
  }

  return (
    <Screen>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <AppProgressBar value={20} />
        <Separator />
        <ScrollView style={styles.scrollView}>
          <Formik
            enableReinitialize
            initialValues={{
              producer: producer,
              advancePercent: '',
              publisherPercent: '',
              credit: credit,
              royaltyPercent: '',
            }}
            onSubmit={(values) => nextScreen(values)}
          >
            {() => (
              <View style={styles.mainView}>
                <AppText fontWeight="bold" style={styles.sectionHeader}>
                  Producer Info
                </AppText>
                <AppText style={styles.text}>
                  Who is the producer for this record?
                </AppText>
                <View style={{ width: '100%' }}>
                  <AppFormSelect
                    data={producers}
                    setItem={setProducer}
                    item={producer}
                    placeHolder="Choose Producer"
                    name="producer"
                    height={producers.length * 42}
                  />
                </View>
                <View style={styles.credText}>
                  <AppText style={styles.text}>Producer Credit</AppText>
                  <AntDesign
                    name="questioncircle"
                    size={14}
                    color="black"
                    style={styles.icon}
                  />
                </View>
                <View style={{ width: '100%' }}>
                  <AppFormSelect
                    data={credits}
                    setItem={setCredit}
                    item={credit}
                    placeHolder="Choose Person"
                    name="credit"
                    height={credits.length * 42}
                  />
                  {credit === 'Other' && (
                    <AppFormField
                      name="credit"
                      height={50}
                      placeholder="Other Producer"
                    />
                  )}
                </View>
                <AppFormPercent
                  icon
                  name="advancePercent"
                  title="Producer Advance"
                />
                <AppFormPercent
                  icon
                  name="royaltyPercent"
                  title="Producer Royalty"
                />
                <AppFormPercent
                  icon
                  name="publisherPercent"
                  title="Producer Publish"
                />
                <FooterNext />
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    display: 'flex',
  },
  mainView: {
    display: 'flex',
    // flex: 1,
    padding: 10,
    paddingBottom: 50,
    marginHorizontal: 30,
    position: 'relative',
  },
  sectionHeader: {
    marginVertical: 15,
    fontSize: 20,
  },
  text: {
    fontSize: 18,
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
  credText: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '50%',
    marginTop: 10,
  },
  icon: {
    position: 'absolute',
    right: 0,
  },
})
