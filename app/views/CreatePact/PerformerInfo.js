import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { SubmitButton, AppFormPercent } from '../../components/forms'
import * as Yup from 'yup'
import Screen from '../../components/Screen'
import Header from '../../components/Header'

import ConfirmModal from '../../components/ConfirmModal'

import { Formik, FieldArray } from 'formik'
import colors from '../../config/colors'
import ButtonIcon from '../../components/ButtonIcon'
import AppButton from '../../components/AppButton'

import store from '../../stores/CreatePactStore'
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
})

export default function PerformerInfo({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false)
  const [performers, setPerformers] = useState('')

  const getPerformers = () => {
    // console.log(store.producer)
    setPerformers(store.performers)
  }

  useEffect(() => {
    getPerformers()
    console.log('performers', performers)
  }, [])

  function nextScreen(values) {
    // console.log(values)
    store.setPerformerInfo(values)
    navigation.navigate('RecordInfo')
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

  return (
    <Screen>
      <Header
        title="Performer Info"
        icon="arrow-left-bold"
        back={() => navigation.navigate('ProducerInfo')}
      />
      <Formik
        initialValues={performers}
        enableReinitialize
        onSubmit={(values) => nextScreen(values)}
      >
        {({ values, errors, handleSubmit }) => (
          <View style={styles.mainView}>
            <View style={styles.formView}>
              <View style={styles.roleView}>
                <FieldArray name="performers">
                  {({ push, remove }) => (
                    <FlatList
                      // contentContainerStyle={{
                      //   alignItems: 'center',
                      //   justifyContent: 'center',
                      //   // backgroundColor: 'blue',
                      //   width: '100%',
                      // }}
                      style={styles.addedCollabsList}
                      data={values}
                      keyExtractor={(performer) => performer.id}
                      renderItem={({ item, index }) => (
                        <AppFormPercent
                          name={`${index}.publisherPercent`}
                          title={item.firstName + ' ' + item.lastName}
                        />
                      )}
                    />
                  )}
                </FieldArray>
              </View>
            </View>
            <View style={styles.footer}>
              <SubmitButton
                style={styles.nextButton}
                title="Next"
                // onPress={() => {
                //   navigation.push('Last')
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
    // backgroundColor: 'green',
    display: 'flex',
    flex: 1,
  },
  formView: {
    margin: 40,
    backgroundColor: 'gray',
    justifyContent: 'space-between',
    padding: 10,
    flex: 1,
  },
  top: {
    paddingLeft: 7,
    flexDirection: 'row',
  },
  textInput: {
    width: '90%',
    backgroundColor: 'rgba(250, 250, 250, 0.8)',
    fontSize: 18,
    paddingLeft: 20,
    height: 45,
    borderRadius: 25,
  },
  btnView: {
    alignItems: 'center',
    marginBottom: 20,
  },
  reviewButton: {
    marginTop: 10,
    borderRadius: 50,
    height: 45,
    backgroundColor: colors.red,
    width: '80%',
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
