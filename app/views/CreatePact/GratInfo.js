import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

// CONFIG
import colors from '../../config/colors'

//COMPONENTTS
import Screen from '../../components/Screen'
import AppText from '../../components/AppText'
import Header from '../../components/Header'
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
          producer: '',
          advancePercent: '',
          publisherPercent: '',
          credit: '',
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
              Who is the producer for this pact?
            </AppText>
            <AppFormSelect
              data={currentPact.users}
              setItem={setProducer}
              item={producer}
            />
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
            <View style={styles.credText}>
              <AppText style={styles.text}>Producer Credit</AppText>
              <AntDesign
                name="questioncircle"
                size={14}
                color="black"
                style={styles.icon}
              />
            </View>
            <View style={styles.credInput}>
              <AppFormField
                name="credit"
                height={50}
                style={styles.input}
                // placeholder="Producer Credit"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={colors.black}
              />
            </View>
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
  credInput: {
    marginBottom: 0,
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
