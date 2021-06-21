import React from 'react'
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { AppForm, AppFormField, SubmitButton } from '../../components/forms'
// import AsyncStorage from '@react-native-community/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import UserModel from '../../api/users'
import AuthModel from '../../api/auth'
import * as Yup from 'yup'
import Screen from '../../components/Screen'

import AppText from '../../components/AppText'
import Header from '../../components/Header'
import SocialMediaBtn from '../../components/SocialMediaBtn'
import colors from '../../config/colors'
import * as Google from 'expo-google-app-auth'
import * as Facebook from 'expo-facebook'
import CurrentUser from '../../stores/UserStore'

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
      navigation.navigate('SignIn')
    } catch (error) {
      console.log('❌ Error signing up...', error)
    }
  }

  const googleSignIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          '350040199389-gjbgtaas95ofd5hd9ojotcfht73gj407.apps.googleusercontent.com',
        iosClientId:
          '350040199389-e8iqt2rlahdmgeslat7eq51944dcbb7c.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      })

      if (result.type === 'success') {
        const user = {
          _id: result.user.email,
          name: result.user.name,
          email: result.user.email,
          googleId: result.user.id,
          googlePhotoUrl: result.user.photoUrl,
        }

        const foundUser = await UserModel.show(result.user.email)

        if (foundUser.user !== null && foundUser.user !== undefined) {
          await AsyncStorage.setItem('email', foundUser.user.email)
          await AsyncStorage.setItem('userId', foundUser.user.googleId)
          await CurrentUser.setUser(foundUser.user)
        } else {
          const newUser = await UserModel.create(user)
          await AsyncStorage.setItem('email', newUser.data.user.email)
          await AsyncStorage.setItem('userId', newUser.data.user._id)
          await CurrentUser.setUser(newUser.data.user)
        }
      } else {
        return { cancelled: true }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const facebookSignIn = async () => {
    try {
      await Facebook.initializeAsync({
        appId: '976030243163813',
      })
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      })

      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`,
        )
        const result = await response.json()
        console.log
        const user = {
          // firstName: result.user.givenName,
          // lastName: result.user.familyName,
          _id: result.email,
          name: result.name,
          email: result.email,
          facebookId: result.id,
        }

        const foundUser = await UserModel.show(result.email)
        console.log('fb found user', foundUser)
        if (foundUser.user !== null && foundUser.user !== undefined) {
          await AsyncStorage.setItem('email', foundUser.user.email)
          await AsyncStorage.setItem('userId', foundUser.user.facebookId)
          await CurrentUser.setUser(foundUser.user)
        } else {
          const newUser = await UserModel.create(user)
          await AsyncStorage.setItem('email', newUser.data.user.email)
          await AsyncStorage.setItem('userId', newUser.data.user._id)
          await CurrentUser.setUser(newUser.data.user)
        }
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`)
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
                // firstName: '',
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
              <View style={styles.socialBtns}>
                <SocialMediaBtn
                  name="google"
                  color="white"
                  backgroundColor="black"
                  title="Google"
                  onPress={googleSignIn}
                />
                <SocialMediaBtn
                  name="facebook-square"
                  color="white"
                  backgroundColor="black"
                  title="Facebook"
                  onPress={facebookSignIn}
                />
              </View>
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
    width: '100%',
    height: 100,
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1,
    fontSize: 18,
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
