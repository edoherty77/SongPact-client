import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native'
import { useQuery, useMutation, useQueryClient } from 'react-query'

// MODELS/STORAGE
import UserModel from '../../api/users'
import PactModel from '../../api/pacts'
import AuthModel from '../../api/auth'
import FriendRequestModel from '../../api/friendRequests'
import AsyncStorage from '@react-native-async-storage/async-storage'
import currentUser from '../../stores/UserStore'
import sortedPacts from '../../stores/SortedPactStore'

// COMPONENTS
import Screen from '../../components/Screen'
import AppTextInput from '../../components/AppTextInput'
import AppButton from '../../components/AppButton'
import AppText from '../../components/AppText'
import Header from '../../components/Header'
import colors from '../../config/colors'
import SocMediaSignIn from './SocMediaSignIn'

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function toOnboarding(user) {
    navigation.navigate('Onboarding', {
      user: user,
      status: 'signing up',
    })
  }

  async function checkForFriends() {
    let friends = currentUser.friends
    let arr = []
    try {
      if (friends) {
        friends.map(async (friend) => {
          let response = await UserModel.show(friend)
          let friendInfo = response.user
          arr.push(friendInfo)
          await currentUser.setFriends([...arr])
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchRequests() {
    let arr = []
    try {
      const response = await FriendRequestModel.all(currentUser._id)
      const requests = await response.data.friendRequests
      if (requests) {
        requests.map(async (request) => {
          let obj = {}
          let requester = await UserModel.show(request.requester)
          let requesterInfo = requester.user
          obj['friendRequestId'] = request._id
          obj['requesterInfo'] = requesterInfo
          obj['date'] = request.date
          arr.push(obj)
          await currentUser.setFriendRequests([...arr])
          await currentUser.setBadgeNum(arr.length)
        })
      } else {
        await currentUser.setFriendRequests('')
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function sortPacts(id) {
    try {
      const data = await PactModel.all(id)
      const pacts = data.pact
      pacts.map((pact) => {
        pact.users.find((user) => {
          if (user.user === currentUser._id) {
            if (pact.status === 1 && user.userStatus === 1) {
              sortedPacts.setAction(pact)
            } else if (pact.status === 1 && user.userStatus === 2) {
              sortedPacts.setPending(pact)
            } else if (pact.status === 2) {
              sortedPacts.setArchive(pact)
            } else if (pact.status === 0) {
              sortedPacts.setDrafts(pact)
            }
          }
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  async function signIn() {
    try {
      const userData = { email: email, password: password }
      const dbUser = await UserModel.show(email)
      const foundUser = await AuthModel.login(userData)
      if (foundUser) {
        if (foundUser.user.notifications.length > 0) {
          await currentUser.setBadgeNum(foundUser.user.notifications.length)
        }
        await AsyncStorage.setItem('email', foundUser.user.email)
        await AsyncStorage.setItem('userId', foundUser.user._id)
        await currentUser.setUser(dbUser.user)
        await fetchRequests()
        await checkForFriends()
        await sortPacts(email)
      }
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
                value={email}
                onChangeText={(text) => setEmail(text)}
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
                secureTextEntry={true}
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
                <SocMediaSignIn
                  checkForFriends={checkForFriends}
                  fetchRequests={fetchRequests}
                  sortPacts={sortPacts}
                  toOnboarding={toOnboarding}
                />
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
