import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native'
import AppText from '../../../components/AppText'
// import { API, graphqlOperation } from 'aws-amplify'

// import { updateUser } from '../../../../src/graphql/mutations'
import * as Yup from 'yup'
import AppButton from '../../../components/AppButton'
import { AppForm, AppFormField, SubmitButton } from '../../../components/forms'
import ButtonIcon from '../../../components/ButtonIcon'

import Header from '../../../components/Header'
import Screen from '../../../components/Screen'
import ButtonText from '../../../components/ButtonText'
import colors from '../../../config/colors'
import Separator from '../../../components/Separator'
import store from '../../../stores/UserStore'

const validationSchema = Yup.object().shape({
  artistName: Yup.string().required().label('Artist name'),
})

const zip = store.zipCode.toString()

const Edit = ({ navigation }) => {
  //Submit function to update item
  // const handleEdit = async (values) => {
  //   parseInt(values.zipCode)
  //   values.id = store.id
  //   values.firstName = store.firstName
  //   values.lastName = store.lastName
  //   values.email = store.email
  //   store.setUser(values)
  //   await API.graphql(graphqlOperation(updateUser, { input: values }))
  //   navigation.navigate('Profile')
  // }
  return (
    <Screen>
      <Header
        icon="arrow-left-bold"
        // noIcon
        title="Edit"
        back={() => navigation.navigate('Profile')}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.mainView}
          >
            <View style={styles.registerView}>
              <AppForm
                initialValues={{
                  address: store.address,
                  city: store.city,
                  state: store.state,
                  zipCode: store.zipCode,
                  artistName: store.artistName,
                  companyName: store.companyName,
                }}
                // onSubmit={(values) => handleEdit(values)}
                validationSchema={validationSchema}
              >
                <AppText style={styles.label}>Address</AppText>
                <AppFormField
                  style={styles.input}
                  name="address"
                  label="Address"
                  placeholder={store.address}
                  // data={store.address}
                  autoCorrect={false}
                  textContentType="fullStreetAddress"
                />
                <AppText style={styles.label}>City</AppText>
                <AppFormField
                  style={styles.input}
                  name="city"
                  placeholder={store.city}
                  // data={store.city}
                  autoCorrect={false}
                  // width={"120%"}
                  textContentType="addressCity"
                />
                <AppText style={styles.label}>State</AppText>
                <AppFormField
                  style={styles.input}
                  // data={store.state}
                  name="state"
                  autoCorrect={false}
                  placeholder={store.state}
                  // width={"90%"}
                  textContentType="addressState"
                />
                <AppText style={styles.label}>Zip Code</AppText>
                <AppFormField
                  style={styles.input}
                  name="zipCode"
                  // data={store.zipCode}
                  placeholder={zip}
                  autoCorrect={false}
                  // textContentType="postalCode"
                  keyboardType="number-pad"
                />
                <AppText style={styles.label}>Artist Name</AppText>
                <AppFormField
                  style={styles.input}
                  name="artistName"
                  placeholder={store.artistName}
                  // data={store.artistName}
                  autoCorrect={false}
                />
                <AppText style={styles.label}>Company Name</AppText>
                <AppFormField
                  style={styles.input}
                  name="companyName"
                  placeholder={store.companyName}
                  // data={store.companyName}
                  autoCorrect={false}
                />
                <SubmitButton
                  style={styles.signUpButton}
                  title="Submit Changes"
                  color={colors.confirm}
                  dismissKey={Keyboard.dismiss}
                />
              </AppForm>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Screen>
  )
}

export default Edit

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.lttan,
  },
  mainView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  registerView: {
    // flex: 1,
    alignItems: 'center',
    // width: "100%",
    justifyContent: 'center',
    // paddingTop: "70%",
  },
  input: {
    width: '80%',
    backgroundColor: 'rgba(250, 250, 250, 0.8)',
    fontSize: 18,
    paddingLeft: 20,
    height: 35,
    borderRadius: 15,
    marginBottom: 10,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    fontSize: 18,
  },
  signUpButton: {
    marginTop: 20,
    borderRadius: 50,
    height: 40,
    backgroundColor: colors.red,
    paddingHorizontal: '15%',
    // width: 200,
  },
})
