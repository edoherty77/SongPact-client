import React from 'react'
import { View, StyleSheet, FlatList, Image } from 'react-native'

// FORM
import { SubmitButton } from '../../components/forms'
import { Formik, FieldArray } from 'formik'

// COMPONENTS
import Screen from '../../components/Screen'
import colors from '../../config/colors'
import ContactCheckBox from '../../components/ContactCheckBox'
import UserIcon from '../../components/UserIcon'
import Separator from '../../components/Separator'
import AppSearchInput from '../../components/AppSearchInput'
import AppProgressBar from '../../components/AppProgressBar'

// STORE
import currentPact from '../../stores/CreatePactStore'
import currentUser from '../../stores/UserStore'

function ChooseCollabs({ navigation }) {
  const nextScreen = (values) => {
    currentPact.setCollabInfo(values, currentUser)
    navigation.navigate('GratInfo')
  }

  return (
    <Screen>
      <AppProgressBar value={0} />
      <Separator />
      <View style={styles.mainView}>
        <Formik
          enableReinitialize
          initialValues={{ collabs: [] }}
          onSubmit={(values) => nextScreen(values)}
        >
          {({ values }) => (
            <View style={styles.formView}>
              <View style={styles.inputView}>
                <AppSearchInput />
              </View>
              <View style={styles.addedCollabView}>
                <FieldArray name="collabs">
                  {() => (
                    <FlatList
                      horizontal={true}
                      contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                      }}
                      style={styles.addedCollabsList}
                      data={values.collabs}
                      keyExtractor={(collab) => collab._id}
                      renderItem={({ item, index }) =>
                        item.googlePhotoUrl ? (
                          <Image
                            source={{ uri: item.googlePhotoUrl }}
                            style={styles.image}
                          />
                        ) : (
                          <UserIcon
                            name={`collabs.${index}`}
                            title={item.name}
                            style={styles.image}
                            fontSize={20}
                            color={colors.white}
                            backgroundColor={colors.blue}
                          />
                        )
                      }
                    />
                  )}
                </FieldArray>
              </View>
              <View style={styles.contactsView}>
                <FieldArray name="collabs">
                  {({ remove, push }) => (
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={currentUser.friends
                        .slice()
                        .sort((a, b) => a.name.localeCompare(b.name))}
                      keyExtractor={(item) => item._id}
                      renderItem={({ item }) => (
                        <ContactCheckBox
                          photo={item.googlePhotoUrl}
                          name={`collabs.${item._id}`}
                          title={`${item.name}`}
                          onPress={(checked) => {
                            console.log('item', item)
                            const index = values.collabs.findIndex(
                              (person) => person._id === item._id,
                            )
                            if (checked === true) {
                              push(item)
                            } else {
                              remove(index)
                            }
                          }}
                        />
                      )}
                    />
                  )}
                </FieldArray>
              </View>
              <View style={styles.footer}>
                <SubmitButton
                  disabled={values.collabs.length === 0 ? true : false}
                  style={styles.nextButton}
                  title="Continue"
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    flex: 1,
    marginBottom: 30,
    marginHorizontal: 25,
  },
  formView: {
    flex: 1,
  },
  addedCollabView: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: 55,
    alignItems: 'center',
  },
  image: {
    height: 42,
    width: 42,
    borderRadius: 20,
    marginHorizontal: 3,
  },

  inputView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50,
    marginTop: 20,
  },
  contactsView: {
    marginTop: 15,
    flex: 1,
  },
  footer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
})

export default ChooseCollabs
