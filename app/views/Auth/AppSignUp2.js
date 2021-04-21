import React from 'react'
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from 'react-native'

import * as Yup from 'yup'
import { observer } from 'mobx-react'

import AppButton from '../../components/AppButton'
import { AppForm, AppFormField, SubmitButton } from '../../components/forms'
import AppText from '../../components/AppText'
import Header from '../../components/Header'
import Screen from '../../components/Screen'

import store from '../../stores/SignUpStore'
import colors from '../../config/colors'

const validationSchema = Yup.object().shape({
  address: Yup.string().required().label('Address'),
  city: Yup.string().required().label('City'),
  state: Yup.string().required().label('State'),
  zipCode: Yup.number().required().label('Zip Code'),
})

const AppSignUp2 = observer(({ navigation }) => {
  const nextSignUpScreen = (values) => {
    store.setAddress(values)
    navigation.navigate('SignUp3')
  }

  return (
    <Screen>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Header title="Sign Up" noIcon />
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={styles.mainView}
          >
            <View style={styles.registerView}>
              <AppForm
                initialValues={{
                  address: '',
                  city: '',
                  state: '',
                  zipCode: '',
                }}
                onSubmit={(values) => nextSignUpScreen(values)}
                validationSchema={validationSchema}
              >
                <AppFormField
                  style={styles.input}
                  name="address"
                  placeholder="Street Address*"
                  autoCorrect={false}
                  textContentType="fullStreetAddress"
                />
                <AppFormField
                  style={styles.input}
                  name="city"
                  placeholder="City*"
                  autoCorrect={false}
                  // width={"120%"}
                  textContentType="addressCity"
                />
                <AppFormField
                  style={styles.input}
                  name="state"
                  placeholder="State*"
                  autoCorrect={false}
                  // width={"90%"}
                  textContentType="addressState"
                />
                <AppFormField
                  style={styles.input}
                  name="zipCode"
                  placeholder="Zip Code*"
                  autoCorrect={false}
                  // width={"70%"}
                  textContentType="postalCode"
                  keyboardType="number-pad"
                />
                <SubmitButton
                  style={styles.signUpButton}
                  title="Next"
                  color={colors.confirm}
                  dismissKey={Keyboard.dismiss}
                />
              </AppForm>
            </View>
          </KeyboardAvoidingView>
          <View style={styles.loginView}>
            <AppText>Already have an account?</AppText>
            <AppButton
              title="Sign In"
              onPress={() => navigation.navigate('SignIn')}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Screen>
  )
})

export default AppSignUp2

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lttan,
  },
  mainView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  registerView: {
    // flex: 1,
    alignItems: 'center',
    // width: "100%",
    justifyContent: 'center',
    // paddingTop: "70%",
  },
  input: {
    width: '80%',
    backgroundColor: 'rgba(250, 250, 250, 0.8)',
    fontSize: 18,
    paddingLeft: 20,
    height: 35,
    borderRadius: 15,
  },
  signUpButton: {
    marginTop: 20,
    borderRadius: 50,
    height: 40,
    backgroundColor: colors.red,
    paddingHorizontal: '15%',
    // width: 200,
  },
  loginView: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: 50,
  },
})
