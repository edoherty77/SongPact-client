import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native'

import UserModel from '../../api/users'
import AuthModel from '../../api/auth'
// import AsyncStorage from '@react-native-community/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Screen from '../../components/Screen'
import AppTextInput from '../../components/AppTextInput'
import AppButton from '../../components/AppButton'
import SocialMediaBtn from '../../components/SocialMediaBtn'
import AppText from '../../components/AppText'
import Header from '../../components/Header'
import colors from '../../config/colors'
import CurrentUser from '../../stores/UserStore'
import * as Google from 'expo-google-app-auth'
import * as Facebook from 'expo-facebook'

const Onboarding = ({ navigation, updateAuthState }) => {
  return (
    <Screen>
      <View style={styles.mainContainer}>
        <View style={styles.messageContainer}>
          <AppText style={styles.messageTitle}>Welcome to SongPact!</AppText>
          <AppText style={styles.message}>
            First thing's first, we need a bit more information before you begin
            creating your first pact
          </AppText>
          <AppText style={styles.optOut}>I'll do this later</AppText>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.signInContainer}>
              <AppText style={styles.inputTitle}>Artist Name</AppText>
              <AppTextInput
                style={styles.input}
                // value={password}
                onChangeText={(text) => setPassword(text)}
                autoCapitalize="none"
                textContentType="password"
                autoCorrect={false}
              />
              <AppText style={styles.inputTitle}>
                Company Name (optional)
              </AppText>
              <AppTextInput
                style={styles.input}
                // value={password}
                onChangeText={(text) => setPassword(text)}
                autoCapitalize="none"
                textContentType="password"
                autoCorrect={false}
              />
              <AppText style={styles.inputTitle}>Address</AppText>
              <AppTextInput
                style={styles.input}
                // value={password}
                onChangeText={(text) => setPassword(text)}
                autoCapitalize="none"
                textContentType="password"
                autoCorrect={false}
              />
              <AppText style={styles.inputTitle}>
                Apartment, suite, etc. (optional)
              </AppText>
              <AppTextInput
                style={styles.input}
                // value={password}
                onChangeText={(text) => setPassword(text)}
                autoCapitalize="none"
                textContentType="password"
                autoCorrect={false}
              />
              <AppText style={styles.inputTitle}>City</AppText>
              <AppTextInput
                style={styles.input}
                // value={password}
                onChangeText={(text) => setPassword(text)}
                autoCapitalize="none"
                textContentType="password"
                autoCorrect={false}
              />
              <AppText style={styles.inputTitle}>State</AppText>
              <AppTextInput
                style={styles.input}
                // value={password}
                onChangeText={(text) => setPassword(text)}
                autoCapitalize="none"
                textContentType="password"
                autoCorrect={false}
              />
              <AppText style={styles.inputTitle}>Zip Code</AppText>
              <AppTextInput
                style={styles.input}
                // value={password}
                onChangeText={(text) => setPassword(text)}
                autoCapitalize="none"
                textContentType="password"
                autoCorrect={false}
              />

              <AppButton
                title="Next"
                // onPress={signIn}
                textColor={colors.white}
                style={styles.loginButton}
              />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <AppText style={styles.footertext}>
            Don't have an accout?{' '}
            <AppText
              style={styles.textBtn}
              onPress={() => navigation.navigate('Onboarding')}
            >
              Sign Up
            </AppText>
          </AppText>
        </View>
      </View>
    </Screen>
  )
}

export default Onboarding

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30,
    flex: 1,
    display: 'flex',
    // justifyContent: 'center'
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 50,
  },
  messageTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    textAlign: 'center',
    fontSize: 18,
    width: '100%',
    marginBottom: 10,
  },
  optOut: {},
  input: {
    width: '100%',
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1,
    fontSize: 18,
    height: 50,
    paddingLeft: 20,
    borderRadius: 7,
    marginBottom: 5,
  },
  forgot: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  loginButton: {
    marginTop: 40,
    borderRadius: 7,
    height: 50,
    color: 'white',
    backgroundColor: colors.green,
    width: '100%',
  },
  socialContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  socialText: {
    marginTop: 40,
    marginBottom: 20,
    fontSize: 18,
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
