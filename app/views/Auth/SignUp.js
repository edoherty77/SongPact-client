import React from 'react'
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'

// FORMS
import { AppForm, AppFormField, SubmitButton } from '../../components/forms'
import * as Yup from 'yup'

// AUTH
import AuthModel from '../../api/auth'

// COMPONENTS
import Screen from '../../components/Screen'
import AppText from '../../components/AppText'
import Header from '../../components/Header'
import SocMediaSignIn from './SocMediaSignIn'
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

const SignUp = ({ navigation }) => {
  const register = async (values) => {
    try {
      await AuthModel.register(values)
      navigation.navigate('Onboarding', { user: values, status: 'signing up' })
    } catch (error) {
      console.log('❌ Error signing up...', error)
    }
  }

  return (
    <Screen>
      <Header icon="chevron-back" noIcon />
      <View style={styles.mainContainer}>
        <View style={styles.messageContainer}>
          <AppText style={styles.messageTitle}>Create your account</AppText>
          <AppText style={styles.message}>
            Aleady have an account?{' '}
            <AppText
              style={styles.textBtn}
              onPress={() => navigation.navigate('SignIn')}
            >
              Log in
            </AppText>
          </AppText>
        </View>
        {/* <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={styles.mainView}
        > */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <AppForm
              initialValues={{
                name: '',
                email: '',
                password: '',
              }}
              onSubmit={(values) => register(values)}
              // validationSchema={validationSchema}
            >
              <AppText style={styles.inputTitle}>Full Name</AppText>
              <AppFormField
                style={styles.input}
                name="name"
                height={50}
                autoCorrect={false}
                autoCapitalize="words"
                textContentType="givenName"
              />
              <AppText style={styles.inputTitle}>Email</AppText>
              <AppFormField
                style={styles.input}
                name="email"
                height={50}
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                keyboardType="email-address"
              />
              <AppText style={styles.inputTitle}>Password</AppText>
              <AppFormField
                style={styles.input}
                name="password"
                height={50}
                autoCapitalize="none"
                autoCorrect={false}
                // textContentType="password" // TODO uncomment!!!
                // secureTextEntry // TODO uncomment!!!
              />
              <SubmitButton
                title="Create Account"
                textColor={colors.white}
                style={styles.loginButton}
              />
            </AppForm>
            <View style={styles.socialContainer}>
              <AppText style={styles.socialText}>
                or sign up with your social account
              </AppText>
              <SocMediaSignIn />
            </View>
          </View>
        </TouchableWithoutFeedback>
        {/* </KeyboardAvoidingView> */}
        <View style={styles.footer}>
          <AppText style={styles.footertext}>
            By clicking "Create Account" you agree to our{' '}
            <AppText
              style={styles.textBtn}
              onPress={() => navigation.navigate('SignIn')}
            >
              Terms & Conditions
            </AppText>{' '}
            and{' '}
            <AppText
              style={styles.textBtn}
              onPress={() => navigation.navigate('SignIn')}
            >
              Privacy Policy
            </AppText>
          </AppText>
        </View>
      </View>
    </Screen>
  )
}

export default SignUp

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30,
    flex: 1,
    display: 'flex',
    // marginTop: 30,
  },
  messageContainer: {
    marginBottom: 50,
  },
  messageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  message: {
    fontSize: 20,
  },
  input: {
    paddingLeft: 20,
    borderRadius: 7,
    marginBottom: 5,
  },
  forgot: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  loginButton: {
    marginTop: 30,
    borderRadius: 7,
    height: 50,
    color: 'white',
    backgroundColor: colors.green,
    width: '100%',
  },
  socialContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 10,
  },
  socialText: {
    marginTop: 20,
    fontSize: 18,
    marginBottom: 20,
  },
  socialBtns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    marginBottom: 50,
  },
  footertext: {
    textAlign: 'center',
  },
  textBtn: {
    fontWeight: 'bold',
  },
})
