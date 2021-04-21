import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import colors from '../../config/colors'
import Screen from '../../components/Screen'
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
  const [isModalVisible, setModalVisible] = useState(false)
  const [isInputVisible, setInputVisible] = useState(false)

  async function nextScreen(values) {
    store.setRecordInfo(values)

    // const newPact = await API.graphql(
    //   graphqlOperation(createPact, {
    //     input: {
    //       type: store.type,
    //       recordTitle: store.recordTitle,
    //       initBy: store.initBy,
    //       sample: store.sample,
    //       labelName: store.labelName,
    //       recordLabel: store.recordLabel,
    //       createdAt: new Date().toISOString(),
    //     },
    //   }),
    // )
    // store.setPactId(newPact.data.createPact.id)
    navigation.navigate('ReviewAndSign')
  }

  function trash() {
    setModalVisible(true)
  }

  function trashDeny() {
    setModalVisible(false)
  }

  function trashConfirm() {
    setModalVisible(false)
    store.resetPact()
    navigation.navigate('New')
  }

  const toggleInput = () => {
    setInputVisible(!isInputVisible)
  }

  return (
    <Screen>
      <Header
        back={() => navigation.navigate('PerformerInfo')}
        icon="arrow-left-bold"
      />
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
        {({ values, errors, handleSubmit }) => (
          <View style={styles.mainView}>
            <View style={styles.formView}>
              <View style={styles.switchView}>
                <View style={styles.titleView}>
                  <View style={styles.sectionText}>
                    <AppText fontSize={30}>Record Title</AppText>
                  </View>
                  <AppFormField
                    name="recordTitle"
                    style={styles.input}
                    placeholder="Record Title"
                    autoCorrect={false}
                    placeholderTextColor={colors.black}
                  />
                </View>
                <AppFormSwitch
                  name="sample"
                  label="Sample?"
                  formikKey="sample"
                />
                <AppFormSwitch
                  name="recordLabel"
                  label="Record Label?"
                  formikKey="recordLabel"
                  onChange={toggleInput}
                />
              </View>
              {isInputVisible ? (
                <View style={styles.labelView}>
                  <View style={styles.labelText}>
                    <AppText fontSize={30}>Label Name</AppText>
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
            </View>
            <View style={styles.footer}>
              <SubmitButton
                title="Review"
                style={styles.nextButton}
                // onPress={() => {
                //   navigation.push('ReviewAndSign'), console.log(values)
                // }}
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
          </View>
        )}
      </Formik>
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
  },
  formView: {
    // backgroundColor: 'gray',
    flex: 1,
    margin: 40,
    // padding: 20,
  },
  switchView: {
    justifyContent: 'space-evenly',
    flex: 2,
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: 'lightgray',
  },
  labelView: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'lightgray',
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
