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

// COMPONENTS
import AppText from '../../../components/AppText'
import Screen from '../../../components/Screen'
import AppButton from '../../../components/AppButton'
import ButtonIcon from '../../../components/ButtonIcon'
import ButtonText from '../../../components/ButtonText'
import Separator from '../../../components/Separator'

// MODELS
import UserModel from '../../../api/users'

// FORM
import { AppForm, AppFormField, SubmitButton } from '../../../components/forms'
import * as Yup from 'yup'

// STORE
import currentUser from '../../../stores/UserStore'

// CONFIG
import colors from '../../../config/colors'

const validationSchema = Yup.object().shape({
  artistName: Yup.string().required().label('Artist name'),
})

const zip = currentUser.zipCode.toString()

const Edit = ({ navigation }) => {
  //Submit function to update item
  const handleEdit = async (values) => {
    parseInt(values.zipCode)
    values.id = currentUser._id
    values.firstName = currentUser.firstName
    values.lastName = currentUser.lastName
    values.email = currentUser.email
    currentUser.setUser(values)
    await UserModel.update(values)
    navigation.navigate('Profile')
  }
  return (
    <Screen>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.mainView}
          >
            <View style={styles.registerView}>
              <AppForm
                initialValues={{
                  address: currentUser.address,
                  city: currentUser.city,
                  state: currentUser.state,
                  zipCode: currentUser.zipCode,
                  artistName: currentUser.artistName,
                  companyName: currentUser.companyName,
                }}
                onSubmit={(values) => handleEdit(values)}
                validationSchema={validationSchema}
              >
                <AppText style={styles.label}>Address</AppText>
                <AppFormField
                  style={styles.input}
                  name="address"
                  label="Address"
                  placeholder={currentUser.address}
                  // data={currentUser.address}
                  autoCorrect={false}
                  textContentType="fullStreetAddress"
                />
                <AppText style={styles.label}>City</AppText>
                <AppFormField
                  style={styles.input}
                  name="city"
                  placeholder={currentUser.city}
                  // data={currentUser.city}
                  autoCorrect={false}
                  // width={"120%"}
                  textContentType="addressCity"
                />
                <AppText style={styles.label}>State</AppText>
                <AppFormField
                  style={styles.input}
                  // data={currentUser.state}
                  name="state"
                  autoCorrect={false}
                  placeholder={currentUser.state}
                  // width={"90%"}
                  textContentType="addressState"
                />
                <AppText style={styles.label}>Zip Code</AppText>
                <AppFormField
                  style={styles.input}
                  name="zipCode"
                  // data={currentUser.zipCode}
                  placeholder={zip}
                  autoCorrect={false}
                  // textContentType="postalCode"
                  keyboardType="number-pad"
                />
                <AppText style={styles.label}>Artist Name</AppText>
                <AppFormField
                  style={styles.input}
                  name="artistName"
                  placeholder={currentUser.artistName}
                  // data={currentUser.artistName}
                  autoCorrect={false}
                />
                <AppText style={styles.label}>Company Name</AppText>
                <AppFormField
                  style={styles.input}
                  name="companyName"
                  placeholder={currentUser.companyName}
                  // data={currentUser.companyName}
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
