import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

// CONFIG
import colors from '../../config/colors'

// COMPONENTS
import Screen from '../../components/Screen'
import Separator from '../../components/Separator'
import AppProgressBar from '../../components/AppProgressBar'
import AppText from '../../components/AppText'
import Header from '../../components/Header'

// STORE
import currentPactStore from '../../stores/CreatePactStore'

// FORM
import { Formik } from 'formik'
import {
  AppFormField,
  SubmitButton,
  AppFormSwitch,
} from '../../components/forms'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  recordTitle: Yup.string().required().label('Record Title'),
  role: Yup.string().required().label('role'),
  // .test(
  //   'is-true',
  //   'Must agree to terms to continue',
  //   (value) => value === true,
  // ),
})

export default function RecordInfo({ navigation }) {
  const [isInputVisible, setInputVisible] = useState(false)

  async function nextScreen(values) {
    currentPactStore.setRecordInfo(values)
    navigation.navigate('ReviewData')
  }

  const toggleInput = () => {
    setInputVisible(!isInputVisible)
  }

  return (
    <Screen>
      <Header
        title="Create a new pact"
        subTitle="Record Info"
        back={() => navigation.navigate('GratInfoCont')}
        icon="chevron-back"
      />
      <AppProgressBar value={60} />
      <Separator />
      <Formik
        initialValues={{
          recordTitle: '',
          sample: false,
          recordLabel: false,
          labelName: '',
        }}
        enableReinitialize
        onSubmit={(values) => nextScreen(values)}
      >
        {() => (
          <View style={styles.mainView}>
            <View style={styles.switchView}>
              <View style={styles.titleView}>
                <AppText fontSize={18}>Record Title</AppText>
                <AppFormField
                  name="recordTitle"
                  style={styles.input}
                  // placeholder="Record title"
                  autoCorrect={false}
                  height={50}
                  placeholderTextColor={colors.black}
                />
              </View>
              <AppFormSwitch
                name="sample"
                label="Is this a record sample?"
                formikKey="sample"
              />
              <AppFormSwitch
                name="recordLabel"
                label="Is this for a record label?"
                formikKey="recordLabel"
                onChange={toggleInput}
              />
            </View>
            {isInputVisible ? (
              <View style={styles.labelView}>
                <View style={styles.labelText}>
                  <AppText fontSize={18}>Label Name</AppText>
                </View>
                <AppFormField
                  name="labelName"
                  style={styles.input}
                  autoCorrect={false}
                  height={50}
                  placeholderTextColor={colors.black}
                />
              </View>
            ) : (
              <View style={styles.noLabelView}></View>
            )}
            <View style={styles.footer}>
              <SubmitButton title="Continue" />
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
  switchView: {
    justifyContent: 'space-evenly',
    flex: 3,
    paddingTop: 20,
  },
  labelView: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  noLabelView: {
    flex: 1,
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
  footer: {
    flex: 2,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: -10,
  },
})
