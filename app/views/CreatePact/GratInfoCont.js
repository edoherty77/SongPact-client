import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'

//COMPONENTTS
import Screen from '../../components/Screen'
import AppText from '../../components/AppText'
import Header from '../../components/Header'
import Separator from '../../components/Separator'
import AppProgressBar from '../../components/AppProgressBar'

// FORM
import { Formik, FieldArray } from 'formik'
import { SubmitButton, AppFormPercent } from '../../components/forms'
import * as Yup from 'yup'

// STORE
import currentPact from '../../stores/CreatePactStore'

// const validationSchema = Yup.object().shape({
//   recordTitle: Yup.string().required().label('Record Title'),
//   role: Yup.string().required().label('role'),

// })

export default function GratInfoCont({ navigation }) {
  function nextScreen(values) {
    currentPact.setPerformerInfo(values)
    navigation.navigate('RecordInfo')
  }

  useEffect(() => {}, [])
  return (
    <Screen>
      <Header
        title="Create a new pact"
        subTitle="Gratuity Info"
        icon="arrow-back"
        back={() => navigation.navigate('GratInfo')}
      />
      <AppProgressBar value={60} />
      <Separator />
      <Formik
        enableReinitialize
        initialValues={currentPact.performers}
        onSubmit={(values) => nextScreen(values)}
      >
        {({ values }) => (
          <View style={styles.mainView}>
            <AppText fontWeight="bold" style={styles.sectionHeader}>
              Performer Info
            </AppText>
            <View style={styles.roleView}>
              <FieldArray name="performers">
                {() => (
                  <FlatList
                    data={values}
                    keyExtractor={(performer) => performer._id}
                    renderItem={({ item, index }) => (
                      <AppFormPercent
                        icon
                        name={`${index}.publisherPercent`}
                        title={item.name}
                      />
                    )}
                  />
                )}
              </FieldArray>
            </View>
            <View style={styles.footer}>
              <SubmitButton
                // disabled={values.collabs.length === 0 ? true : false}
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
  footer: {
    marginHorizontal: 15,
    position: 'absolute',
    width: '100%',
    bottom: 40,
  },
})
