import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// MODEL
import UserModel from '../../api/users'

// COMPONENTS
import Screen from '../../components/Screen'
import AppText from '../../components/AppText'

// CONFIG
import colors from '../../config/colors'

// STORE
import currentUser from '../../stores/UserStore'

// FORMS
import {
  AppForm,
  AppFormField,
  SubmitButton,
  AppFormSelect,
} from '../../components/forms'

const states = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Federated States of Micronesia',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Marshall Islands',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Northern Mariana Islands',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Palau',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virgin Island',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
]

const Onboarding = ({ navigation, route }) => {
  const { user, status } = route.params
  const [state, setState] = useState('')

  const toLogin = () => {
    navigation.navigate('SignIn')
  }

  const updateUser = async (values) => {
    try {
      let address
      if (values.apartment !== '') {
        address = values.address.concat(' ', values.apartment)
      } else {
        address = values.address
      }
      const obj = {
        name: user.name,
        email: user.email,
        artistName: values.artistName,
        address: address,
        city: values.city,
        state: state,
        zipCode: parseInt(values.zipCode),
        companyName: values.companyName,
        phoneNumber: parseInt(values.phoneNumber),
      }
      await UserModel.update(obj)
      if (status === 'signing up') {
        navigation.navigate('SignIn')
      } else {
        await currentUser.setOnboarding(obj)
        navigation.navigate('New')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Screen>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
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
              <TouchableOpacity style={styles.doLater} onPress={toLogin}>
                <AppText color="rgba(34, 34, 34, 0.4)">
                  I'll do this later
                </AppText>
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={18}
                  color="rgba(34, 34, 34, 0.4)"
                  style={{ paddingLeft: 5 }}
                />
              </TouchableOpacity>
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
            <AppFormSelect
              data={states}
              setItem={setState}
              item={state}
              placeHolder="Choose State"
              name="state"
              height={300}
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
      </KeyboardAvoidingView>
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
