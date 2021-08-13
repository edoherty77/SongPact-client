import React from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

// CONFIG
import colors from '../../config/colors'

//COMPONENTTS
import Screen from '../../components/Screen'
import AppText from '../../components/AppText'
import Separator from '../../components/Separator'
import AppProgressBar from '../../components/AppProgressBar'

// FORM
import { Formik } from 'formik'
import {
  SubmitButton,
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

  let names = currentPact.users.map((user) => {
    return user.name
  })

  function nextScreen(values) {
    currentPact.setProducer(values)
    currentPact.setProducerInfo(values)
    navigation.navigate('GratInfoCont')
  }

  return (
    <Screen>
      <AppProgressBar value={20} />
      <Separator />
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
                data={names}
                setItem={setProducer}
                item={producer}
                placeHolder="Choose Producer"
                name="producer"
                height={names.length * 42}
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
                data={names}
                setItem={setCredit}
                item={credit}
                placeHolder="Choose Person"
                name="credit"
                height={names.length * 42}
              />
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
            <View style={styles.footer}>
              <SubmitButton
                // disabled={values.collabs.length === 0 ? true : false}
                style={styles.nextButton}
                title="Continue"
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
  footer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  nextButton: {
    marginBottom: 40,
  },
})
