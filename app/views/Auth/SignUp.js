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

import { Auth } from 'aws-amplify'
import UserModel from '../../api/users'

import Screen from '../../components/Screen'
import AppTextInput from '../../components/AppTextInput'
import AppButton from '../../components/AppButton'
import AppText from '../../components/AppText'
import Header from '../../components/Header'
import colors from '../../config/colors'
import store from '../../stores/UserStore'
import { observer } from 'mobx-react'

const SignUp = ({ navigation }) => {
  return (
    <Screen>
      <Header icon="chevron-back" noIcon />
      <View style={styles.mainContainer}>
        <View style={styles.messageContainer}>
          <AppText style={styles.messageTitle}>Create your account</AppText>
          <AppText style={styles.message}>
            Aleady have an account?{' '}
            <AppText style={{ fontWeight: 'bold' }}>Log in</AppText>
          </AppText>
        </View>
        <View style={styles.signInContainer}>
          <AppText style={styles.inputTitle}>Full Name</AppText>
          <AppTextInput
            style={styles.input}
            // value={username}
            // onChangeText={(text) => setUsername(text)}
            // icon="email"
            // placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="username"
            autoCorrect={false}
          />
          <AppText style={styles.inputTitle}>Email</AppText>
          <AppTextInput
            style={styles.input}
            // value={username}
            // onChangeText={(text) => setUsername(text)}
            // icon="email"
            // placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="username"
            autoCorrect={false}
          />
          <AppText style={styles.inputTitle}>Password</AppText>
          <AppTextInput
            style={styles.input}
            // value={password}
            // onChangeText={(text) => setUsername(text)}
            autoCapitalize="none"
            textContentType="password"
            autoCorrect={false}
          />
          <AppText style={styles.forgot}>Forgot password?</AppText>
          <AppButton
            title="Create Account"
            textColor={colors.white}
            // onPress={signIn}
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
        <View style={styles.footer}>
          <AppText style={styles.footertext}>
            By clicking "Create Account" you agree to our Terms & Conditions and
            Privacy Policy
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
    marginTop: 20,
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
    marginBottom: 20,
  },
  footertext: {
    textAlign: 'center',
  },
})
