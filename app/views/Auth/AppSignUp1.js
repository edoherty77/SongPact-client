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

import AppButton from '../../components/AppButton'
import { AppForm, AppFormField, SubmitButton } from '../../components/forms'
import AppText from '../../components/AppText'
import Header from '../../components/Header'
import Screen from '../../components/Screen'

import store from '../../stores/SignUpStore'
import colors from '../../config/colors'

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label('First name'),
  lastName: Yup.string().required().label('Last name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().label('Password'),
  password2: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
})

const AppSignUp1 = observer(({ navigation }) => {
  const nextSignUpScreen = (values) => {
    store.setUserInfo(values)
    navigation.navigate('SignUp2')
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
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                  password2: '',
                }}
                onSubmit={(values) => nextSignUpScreen(values)}
                validationSchema={validationSchema}
              >
                <AppFormField
                  style={styles.input}
                  name="firstName"
                  placeholder="First Name*"
                  autoCorrect={false}
                  textContentType="givenName"
                />
                <AppFormField
                  style={styles.input}
                  name="lastName"
                  placeholder="Last Name*"
                  autoCorrect={false}
                  textContentType="familyName"
                />
                <AppFormField
                  style={styles.input}
                  name="email"
                  placeholder="Email*"
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="emailAddress"
                  keyboardType="email-address"
                />
                <AppFormField
                  style={styles.input}
                  name="password"
                  placeholder="Password*"
                  autoCapitalize="none"
                  autoCorrect={false}
                  // textContentType="password" // TODO uncomment!!!
                  // secureTextEntry // TODO uncomment!!!
                />
                <AppFormField
                  style={styles.input}
                  name="password2"
                  placeholder="Confirm Password*"
                  autoCapitalize="none"
                  autoCorrect={false}
                  // textContentType="password" // TODO uncomment!!!
                  // secureTextEntry // TODO uncomment!!!
                />
                <SubmitButton
                  style={styles.signUpButton}
                  title="Next"
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

export default AppSignUp1

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
