import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// MODEL
import UserModel from '../../api/users'

// STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage'

// COMPONENTS
import Screen from '../../components/Screen'
import AppTextInput from '../../components/AppTextInput'
import AppButton from '../../components/AppButton'
import AppText from '../../components/AppText'

// CONFIG
import colors from '../../config/colors'

// STORE
import currentUser from '../../stores/UserStore'

// FORMS
import { AppForm, AppFormField, SubmitButton } from '../../components/forms'

const Onboarding = ({ navigation, route }) => {
  const { user, status } = route.params

  const toLogin = () => {
    navigation.navigate('SignIn')
  }

  const updateUser = async (values) => {
    let friends
    if (currentUser.friends.length > 0) {
      friends = currentUser.friends
    }
    try {
      let address
      let googlePhotoUrl
      if (user.googlePhotoUrl) {
        googlePhotoUrl = user.googlePhotoUrl
      } else {
        googlePhotoUrl = ''
      }
      if (values.apartment !== '') {
        address = values.address.concat(' ', values.apartment)
      }
      const obj = {
        name: user.name,
        email: user.email,
        artistName: values.artistName,
        address: address,
        city: values.city,
        state: values.state,
        zipCode: parseInt(values.zipCode),
        companyName: values.companyName,
        phoneNumber: parseInt(values.phoneNumber),
        googlePhotoUrl: googlePhotoUrl,
        friends: friends,
      }
      await UserModel.update(obj)
      if (status === 'signing up') {
        // await AsyncStorage.setItem('email', user.email)
        // await AsyncStorage.setItem('userId', user.email)
        // await currentUser.setUser(obj)
        navigation.navigate('SignIn')
      } else {
        await currentUser.setUser(obj)
        navigation.navigate('New')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Screen>
      <ScrollView
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}
      >
        {status === 'signing up' ? (
          <View style={styles.messageContainer}>
            <AppText style={styles.messageTitle}>Welcome to SongPact</AppText>
            <AppText style={styles.message}>
              First thing's first, we need a bit more information before you
              begin creating your first pact
            </AppText>
            <View style={styles.doLater}>
              <AppText color="rgba(34, 34, 34, 0.4)" onPress={toLogin}>
                I'll do this later
              </AppText>
              <MaterialCommunityIcons
                name="arrow-right"
                size={18}
                color="rgba(34, 34, 34, 0.4)"
                style={{ paddingLeft: 5 }}
              />
            </View>
          </View>
        ) : (
          <View style={styles.signedInContainer}>
            <AppText style={styles.messageTitle}>Hi {user.name}</AppText>
            <AppText style={styles.message}>
              We need a bit more information before you begin creating your
              first pact.
            </AppText>
          </View>
        )}
        <AppForm
          initialValues={{
            artistName: '',
            address: '',
            apartment: '',
            city: '',
            state: '',
            zipCode: '',
            companyName: '',
            phoneNumber: '',
          }}
          onSubmit={(values) => updateUser(values)}
        >
          <AppText style={styles.inputTitle}>Artist Name</AppText>
          <AppFormField
            style={styles.input}
            name="artistName"
            autoCapitalize="words"
            textContentType="password"
            autoCorrect={false}
            returnKeyType="done"
          />
          <AppText style={styles.inputTitle}>Company Name (optional)</AppText>
          <AppFormField
            style={styles.input}
            name="companyName"
            textContentType="password"
            autoCorrect={false}
            autoCapitalize="words"
            returnKeyType="done"
          />
          <AppText style={styles.inputTitle}>Address</AppText>
          <AppFormField
            style={styles.input}
            name="address"
            autoCapitalize="words"
            textContentType="password"
            autoCorrect={false}
            returnKeyType="done"
          />
          <AppText style={styles.inputTitle}>
            Apartment, suite, etc. (optional)
          </AppText>
          <AppFormField
            style={styles.input}
            name="apartment"
            autoCapitalize="words"
            textContentType="password"
            autoCorrect={false}
            returnKeyType="done"
          />
          <AppText style={styles.inputTitle}>City</AppText>
          <AppFormField
            style={styles.input}
            name="city"
            autoCapitalize="words"
            textContentType="password"
            autoCorrect={false}
            returnKeyType="done"
          />
          <AppText style={styles.inputTitle}>State</AppText>
          <AppFormField
            style={styles.input}
            name="state"
            autoCapitalize="words"
            textContentType="password"
            autoCorrect={false}
            returnKeyType="done"
          />
          <AppText style={styles.inputTitle}>Zip Code</AppText>
          <AppFormField
            style={styles.input}
            name="zipCode"
            autoCapitalize="words"
            textContentType="password"
            autoCorrect={false}
            keyboardType="number-pad"
            returnKeyType="done"
          />
          <AppText style={styles.inputTitle}>Phone Number</AppText>
          <AppFormField
            style={styles.input}
            name="phoneNumber"
            autoCapitalize="words"
            textContentType="password"
            keyboardType="number-pad"
            returnKeyType="done"
          />
          <SubmitButton
            title="Next"
            textColor={colors.white}
            style={styles.submitButton}
          />
        </AppForm>
      </ScrollView>
    </Screen>
  )
}

export default Onboarding

const styles = StyleSheet.create({
  mainContainer: {
    padding: 30,
    flex: 1,
    display: 'flex',
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  signedInContainer: {
    alignItems: 'center',
    marginBottom: 30,
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
  doLater: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '100%',
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
  submitButton: {
    marginTop: 20,
    marginBottom: 50,
    borderRadius: 7,
    height: 50,
    color: 'white',
    backgroundColor: colors.green,
    width: '30%',
    alignSelf: 'flex-end',
  },
  textBtn: {
    fontWeight: 'bold',
  },
})
