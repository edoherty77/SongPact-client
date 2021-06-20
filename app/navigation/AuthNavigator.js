import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import SignIn from '../views/Auth/SignIn'
import SignUp from '../views/Auth/SignUp'
import Onboarding from '../views/Auth/Onboarding'

const Stack = createStackNavigator()

const AuthNavigator = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn">
          {(screenProps) => (
            <SignIn {...screenProps} updateAuthState={props.updateAuthState} />
          )}
        </Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthNavigator
