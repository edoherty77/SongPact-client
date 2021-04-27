import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Header, Item, Icon, Input } from 'native-base'
import Head from '../../components/Header'
import Screen from '../../components/Screen'
import colors from '../../config/colors'
import AppButton from '../../components/AppButton'
import ContactCheckBox from '../../components/ContactCheckBox'
import UserIcon from '../../components/UserIcon'
import Separator from '../../components/Separator'
import { SubmitButton } from '../../components/forms'
import ButtonIcon from '../../components/ButtonIcon'
import { Formik, FieldArray } from 'formik'
import ConfirmModal from '../../components/ConfirmModal'
import Amplify, { API, Auth, graphqlOperation } from 'aws-amplify'
// import { listUsers } from '../../../src/graphql/queries'
import config from '../../../src/aws-exports'
Amplify.configure(config)
import store from '../../stores/CreatePactStore'
import currentUser from '../../stores/UserStore'
import AppText from '../../components/AppText'
import UserModel from '../../api/users'
function ChooseCollabs({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false)
  const [friends, setFriends] = useState([])

  const fetchFriends = () => {
    let arr = []
    currentUser.friends.map(async (id) => {
      const response = await UserModel.show(id)
      const user = await response.user
      arr.push(user)
      await setFriends([...arr])
      console.log('arr', arr)
    })
  }

  useEffect(() => {
    store.resetPact()
    fetchFriends()
  }, [])

  const nextScreen = (values) => {
    store.setCollabInfo(values, currentUser)
    navigation.navigate('Producer')
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
      <Head
        title="Collaborators"
        // icon="arrow-left-bold"
        // back={() => navigation.navigate('First')}
      />
      <View style={styles.mainView}>
        <Formik
          enableReinitialize
          initialValues={{ collabs: [] }}
          onSubmit={(values) => nextScreen(values)}
        >
          {({ values, errors, handleSubmit }) => (
            <View style={styles.formView}>
              <View style={styles.inputView}>
                <Header
                  transparent={true}
                  searchBar
                  noshadow
                  rounded
                  width={300}
                  alignSelf="center"
                >
                  <Item>
                    <Icon name="ios-search" />
                    <Input placeholder="Search" />
                    <Icon name="ios-people" />
                  </Item>
                </Header>
              </View>
              <View style={styles.addedCollabView}>
                {values.collabs.length === 0 ? (
                  <View style={styles.emptyView}>
                    <AppText style={styles.empty}>
                      Add collabrators to the contract
                    </AppText>
                  </View>
                ) : null}
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
                      renderItem={({ item, index }) => (
                        <UserIcon
                          name={`collabs.${index}`}
                          title={`${item.firstName} ${item.lastName}`}
                        />
                      )}
                    />
                  )}
                </FieldArray>
              </View>
              <Separator />
              <View style={styles.contactsView}>
                <FieldArray name="collabs">
                  {({ remove, push }) => (
                    <FlatList
                      style={styles.contactsList}
                      data={friends}
                      keyExtractor={(item) => item._id}
                      renderItem={({ item }) => (
                        <ContactCheckBox
                          name={`collabs.${item.id}`}
                          title={`${item.firstName} ${item.lastName}`}
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
                  title="Next"
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
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  mainView: {
    // backgroundColor: 'yellow',
    display: 'flex',
    flex: 1,
    marginBottom: 30,
    // marginHorizontal: 30,
  },
  formView: {
    // backgroundColor: 'gray',
    flex: 1,
  },
  addedCollabView: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: 70,
    // backgroundColor: 'green',
    alignItems: 'center',
    // flex: 1,
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
    // marginBottom: 5,
    height: 50,
    marginTop: 5,
    // backgroundColor: 'purple',
  },
  contactsView: {
    // backgroundColor: 'orange',
    marginTop: 15,
    flex: 1,
  },
  footer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    // backgroundColor: 'pink',
    // alignSelf: 'flex-end',
    // justifyContent: 'space-between',
  },
  iconView: {
    position: 'absolute',
    right: 10,
  },
  nextButton: {
    // marginTop: 10,
    borderRadius: 50,
    height: 45,
    backgroundColor: colors.red,
    width: '50%',
  },
})

export default ChooseCollabs
