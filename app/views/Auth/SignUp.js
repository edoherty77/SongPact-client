import React, { useState } from 'react'
import {
  ImageBackground,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native'
import { AppForm, AppFormField, SubmitButton } from '../../components/forms'
import { Auth } from 'aws-amplify'
import UserModel from '../../api/users'
import AuthModel from '../../api/auth'
import * as Yup from 'yup'
import Screen from '../../components/Screen'
import AppTextInput from '../../components/AppTextInput'
import AppButton from '../../components/AppButton'
import AppText from '../../components/AppText'
import Header from '../../components/Header'
import colors from '../../config/colors'
import store from '../../stores/UserStore'
import { observer } from 'mobx-react'

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
    console.log(values)
    try {
      await AuthModel.register(values)
      // sign up with Amplify
      // const data = await Auth.signUp({
      //   username: store.email,
      //   password: store.password,
      //   attributes: {
      //     email: store.email,
      //   },
      // })
      // console.log('✅ Sign-up Confirmed')
      // await addUserToAPIByID(data.userSub)
      // // go to confirmation screen
      // navigation.navigate('ConfirmSignUp')
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
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={styles.mainView}
        >
          <View>
            <AppForm
              initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
              }}
              onSubmit={(values) => register(values)}
              // validationSchema={validationSchema}
            >
              <AppText style={styles.inputTitle}>First Name</AppText>
              <AppFormField
                style={styles.input}
                name="firstName"
                autoCorrect={false}
                textContentType="givenName"
              />
              <AppText style={styles.inputTitle}>Last Name</AppText>
              <AppFormField
                style={styles.input}
                name="lastName"
                autoCorrect={false}
                textContentType="familyName"
              />
              <AppText style={styles.inputTitle}>Email</AppText>
              <AppFormField
                style={styles.input}
                name="email"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                keyboardType="email-address"
              />
              <AppText style={styles.inputTitle}>Password</AppText>
              <AppFormField
                style={styles.input}
                name="password"
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
                or sign in with your social account
              </AppText>
              <View style={styles.socialBtns}>
                <AppButton
                  style={styles.socialBtn}
                  textColor={colors.white}
                  title="Google"
                />
                <AppButton
                  style={styles.socialBtn}
                  textColor={colors.white}
                  title="Facebook"
                />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
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
  },
  messageContainer: {
    marginBottom: 30,
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
    width: '100%',
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1,
    fontSize: 18,
    paddingLeft: 20,
    height: 45,
    borderRadius: 7,
    marginBottom: 5,
  },
  forgot: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  loginButton: {
    marginTop: 30,
    borderRadius: 7,
    height: 45,
    color: 'white',
    backgroundColor: colors.green,
    width: '100%',
  },
  socialContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  socialText: {
    marginTop: 30,
    fontSize: 18,
    marginBottom: 20,
  },
  socialBtns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  socialBtn: {
    width: '40%',
    backgroundColor: colors.black,
    borderRadius: 7,
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    // marginBottom: 20,
  },
  footertext: {
    textAlign: 'center',
  },
  textBtn: {
    fontWeight: 'bold',
  },
})
