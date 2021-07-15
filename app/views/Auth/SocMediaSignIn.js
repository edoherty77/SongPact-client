import React from 'react'
import { StyleSheet, View } from 'react-native'

// COMPONENT
import SocialMediaBtn from '../../components/SocialMediaBtn'

// STORE
import currentUser from '../../stores/UserStore'

// AUTH
import AsyncStorage from '@react-native-async-storage/async-storage'
import UserModel from '../../api/users'
import * as Google from 'expo-google-app-auth'
import * as Facebook from 'expo-facebook'

const SocMediaSignIn = ({
  checkForFriends,
  fetchRequests,
  sortPacts,
  toOnboarding,
}) => {
  const googleSignIn = async () => {
    const googleConfig = {
      androidClientId:
        '350040199389-gjbgtaas95ofd5hd9ojotcfht73gj407.apps.googleusercontent.com',
      iosClientId:
        '350040199389-e8iqt2rlahdmgeslat7eq51944dcbb7c.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    }
    try {
      const result = await Google.logInAsync(googleConfig)

      if (result.type === 'success') {
        currentUser.setAccessToken(result.accessToken)
        const user = {
          _id: result.user.email,
          name: result.user.name,
          email: result.user.email,
          googleId: result.user.id,
          googlePhotoUrl: result.user.photoUrl,
          password: result.idToken,
        }

        const foundUser = await UserModel.show(result.user.email)

        if (foundUser.user !== null && foundUser.user !== undefined) {
          await AsyncStorage.setItem('email', foundUser.user.email)
          await AsyncStorage.setItem('userId', foundUser.user.googleId)
          await currentUser.setUser(foundUser.user)
          await checkForFriends()
          await fetchRequests()
          await sortPacts(foundUser.user.email)
        } else {
          const newUser = await UserModel.create(user)
          await toOnboarding(newUser.data)
          // await AsyncStorage.setItem('email', newUser.data.user.email)
          // await AsyncStorage.setItem('userId', newUser.data.user._id)
          // await currentUser.setUser(newUser.data.user)
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
        const user = {
          _id: result.email,
          name: result.name,
          email: result.email,
          facebookId: result.id,
        }

        const foundUser = await UserModel.show(result.email)
        if (foundUser.user !== null && foundUser.user !== undefined) {
          await AsyncStorage.setItem('email', foundUser.user.email)
          await AsyncStorage.setItem('userId', foundUser.user.facebookId)
          await currentUser.setUser(foundUser.user)
          await checkForFriends()
          await fetchRequests()
        } else {
          const newUser = await UserModel.create(user)
          await AsyncStorage.setItem('email', newUser.data.user.email)
          await AsyncStorage.setItem('userId', newUser.data.user._id)
          await currentUser.setUser(newUser.data.user)
        }
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`)
    }
  }
  return (
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
  )
}

export default SocMediaSignIn

const styles = StyleSheet.create({
  socialBtns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
})
