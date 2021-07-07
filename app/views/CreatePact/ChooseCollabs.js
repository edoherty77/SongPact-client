import React from 'react'
import { View, StyleSheet, FlatList, Image } from 'react-native'
import { Header, Item, Icon, Input } from 'native-base'

// FORM
import { SubmitButton } from '../../components/forms'
import { Formik, FieldArray } from 'formik'

// COMPONENTS
import Head from '../../components/Header'
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
      <Head
        title="Create a new pact"
        subTitle="Add Collaborators"
        icon="arrow-back"
        // back={() => navigation.navigate('First')}
      />
      <AppProgressBar value={10} />
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
                          name={`collabs.${item.id}`}
                          title={`${item.name}`}
                          onPress={(checked) => {
                            const index = values.collabs.findIndex(
                              (person) => person.id === item.id,
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
  emptyView: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
  },
  empty: {
    fontSize: 20,
    color: colors.gray,
  },
  addedCollabsList: {
    // flexWrap: 'wrap',
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
    // backgroundColor: colors.white,
    // marginHorizontal: 35,
  },
  footer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
})

export default ChooseCollabs
