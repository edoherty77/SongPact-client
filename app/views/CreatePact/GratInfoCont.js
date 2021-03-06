import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'

//COMPONENTTS
import Screen from '../../components/Screen'
import AppText from '../../components/AppText'
import Separator from '../../components/Separator'
import AppProgressBar from '../../components/AppProgressBar'
import FooterNext from '../../components/FooterNext'

// FORM
import { Formik, FieldArray } from 'formik'
import { AppFormPercent } from '../../components/forms'
import * as Yup from 'yup'

// STORE
import currentPact from '../../stores/CreatePactStore'

export default function GratInfoCont({ navigation }) {
  function nextScreen(values) {
    currentPact.setPerformerInfo(values)
    navigation.navigate('RecordInfo')
  }

  return (
    <Screen>
      <AppProgressBar value={40} />
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
                    keyExtractor={(values) => values.user}
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
            <FooterNext />
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
})
