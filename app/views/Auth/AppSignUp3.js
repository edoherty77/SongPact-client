import React from 'react'
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native'

import * as Yup from 'yup'
import { observer } from 'mobx-react'
import Amplify, { Auth } from 'aws-amplify'
import awsconfig from '../../../src/aws-exports'
Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true, // kills unhandled promise warning
  },
})
import UserModel from '../../api/users'
import AppButton from '../../components/AppButton'
import { AppForm, AppFormField, SubmitButton } from '../../components/forms'
import AppText from '../../components/AppText'
import Header from '../../components/Header'
import Screen from '../../components/Screen'

import store from '../../stores/SignUpStore'
import colors from '../../config/colors'

const validationSchema = Yup.object().shape({
  artistName: Yup.string().required().label('Artist name'),
})

const AppSignUp3 = observer(({ navigation }) => {
  async function finishSignUp(values) {
    store.setArtistCompany(values)

    try {
      // sign up with Amplify
      const data = await Auth.signUp({
        username: store.email,
        password: store.password,
        attributes: {
          email: store.email,
        },
      })
      console.log('✅ Sign-up Confirmed')
      await addUserToAPIByID(data.userSub)

      // go to confirmation screen
      navigation.navigate('ConfirmSignUp')
    } catch (error) {
      console.log('❌ Error signing up...', error)
    }
  }

  const addUserToAPIByID = async (id) => {
    try {
      const userObj = {
        _id: id,
        firstName: store.firstName,
        lastName: store.lastName,
        artistName: store.artistName,
        companyName: store.companyName,
        email: store.email,
        address: store.address,
        city: store.city,
        state: store.state,
        zipCode: store.zipCode,
      }

      // create user in db with userObj
      await UserModel.create(userObj)
      console.log('user successfully created')
    } catch (error) {
      console.log('Error adding user: ', error)
    }
  }

  return (
    <Screen>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Header title="Sign Up" noIcon />
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.mainView}
          >
            <View style={styles.registerView}>
              <AppForm
                initialValues={{
                  artistName: '',
                  companyName: '',
                }}
                onSubmit={(values) => finishSignUp(values)}
                validationSchema={validationSchema}
              >
                <AppFormField
                  style={styles.input}
                  name="artistName"
                  placeholder="Artist Name*"
                  autoCorrect={false}
                />
                <AppFormField
                  style={styles.input}
                  name="companyName"
                  placeholder="Company Name"
                  autoCorrect={false}
                />
                <SubmitButton
                  style={styles.signUpButton}
                  title="Get Confirmation Code"
                  color={colors.confirm}
                  dismissKey={Keyboard.dismiss}
                />
              </AppForm>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.loginView}>
            <AppText>Already have an account?</AppText>
            <AppButton
              title="Sign In"
              onPress={() => navigation.navigate('SignIn')}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Screen>
  )
})

export default AppSignUp3

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lttan,
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
  },
  signUpButton: {
    marginTop: 20,
    borderRadius: 50,
    height: 40,
    backgroundColor: colors.red,
    paddingHorizontal: '15%',
    // width: 200,
  },
  loginView: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: 50,
  },
})
