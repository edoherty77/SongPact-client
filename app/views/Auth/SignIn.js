import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native'

import AuthModel from '../../api/auth'
import AsyncStorage from '@react-native-community/async-storage'
import Screen from '../../components/Screen'
import AppTextInput from '../../components/AppTextInput'
import AppButton from '../../components/AppButton'
import AppText from '../../components/AppText'
import Header from '../../components/Header'
import colors from '../../config/colors'
import CurrentUser from '../../stores/UserStore'
import { observer } from 'mobx-react'

const SignIn = ({ navigation, updateAuthState }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function signIn() {
    try {
      const userData = { email: username, password: password }
      const foundUser = await AuthModel.login(userData)
      if (foundUser) {
        await AsyncStorage.setItem('email', foundUser.user.email)
        await AsyncStorage.setItem('userId', foundUser.user._id)
        await CurrentUser.setUser(foundUser.user)
      }
      console.log('current', CurrentUser)
    } catch (err) {
      console.log('Error signing in...', err)
    }
  }
  return (
    <Screen>
      <Header icon="chevron-back" noIcon />
      <View style={styles.mainContainer}>
        <View style={styles.messageContainer}>
          <AppText style={styles.messageTitle}>Welcome Back!</AppText>
          <AppText style={styles.message}>
            Sign in to start organizing your contracts, safely and all in one
            place.
          </AppText>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.signInContainer}>
              <AppText style={styles.inputTitle}>Email</AppText>
              <AppTextInput
                style={styles.input}
                value={username}
                onChangeText={(text) => setUsername(text)}
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="username"
                autoCorrect={false}
              />
              <AppText style={styles.inputTitle}>Password</AppText>
              <AppTextInput
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                autoCapitalize="none"
                textContentType="password"
                autoCorrect={false}
              />
              <AppText style={styles.forgot}>Forgot password?</AppText>
              <AppButton
                title="Sign In"
                onPress={signIn}
                textColor={colors.white}
                style={styles.loginButton}
              />
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
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <AppText style={styles.footertext}>
            Don't have an accout?{' '}
            <AppText
              style={styles.textBtn}
              onPress={() => navigation.navigate('SignUp')}
            >
              Sign Up
            </AppText>
          </AppText>
        </View>
      </View>
    </Screen>
  )
}

export default SignIn

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30,
    flex: 1,
    display: 'flex',
  },
  messageContainer: {
    marginBottom: 30,
    marginTop: 30,
  },
  messageTitle: {
    fontSize: 25,
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
    marginTop: 40,
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
    marginTop: 40,
    marginBottom: 20,
    fontSize: 18,
  },
  socialBtns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  socialBtn: {
    width: '30%',
    backgroundColor: colors.black,
    borderRadius: 7,
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 40,
    alignItems: 'center',
    flex: 1,
  },
  footertext: {
    fontSize: 16,
  },
  textBtn: {
    fontWeight: 'bold',
  },
})
