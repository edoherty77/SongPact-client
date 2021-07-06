import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import colors from '../../config/colors'
import Screen from '../../components/Screen'
import Separator from '../../components/Separator'
import AppText from '../../components/AppText'
import Header from '../../components/Header'
import { Formik } from 'formik'
import ButtonIcon from '../../components/ButtonIcon'
import ConfirmModal from '../../components/ConfirmModal'
import AppButton from '../../components/AppButton'
import store from '../../stores/CreatePactStore'

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
    store.setRecordInfo(values)
    navigation.navigate('ReviewAndSign')
  }

  const toggleInput = () => {
    setInputVisible(!isInputVisible)
  }

  return (
    <Screen>
      <Header
        title="Create a new pact"
        subTitle="Record Info"
        back={() => navigation.navigate('PerformerInfo')}
        icon="chevron-back"
      />
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
                label="Are you signed to a record label?"
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
                  placeholder="Name"
                  autoCorrect={false}
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
    flex: 1,
    // backgroundColor: 'orange',
  },
  switchView: {
    justifyContent: 'space-evenly',
    flex: 3,
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    // backgroundColor: 'lightgray',
  },
  labelView: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'flex-start',
  },
  noLabelView: {
    flex: 1,
  },
  input: {
    width: '90%',
    backgroundColor: 'rgba(250, 250, 250, 0.8)',
    fontSize: 18,
    paddingLeft: 20,
    height: 45,
    borderRadius: 25,
  },
  footer: {
    flex: 2,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
})
