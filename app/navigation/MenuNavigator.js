import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import {
  Main,
  Profile,
  Edit,
  HowItWorks,
  Help,
  Preferences,
} from '../views/Menu/index'

const Stack = createStackNavigator()

const MenuNavigator = (props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} headerMode="screen">
      <Stack.Screen name="Main">
        {(screenprops) => (
          <Main {...screenprops} updateAuthState={props.updateAuthState} />
        )}
      </Stack.Screen>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Edit" component={Edit} />
      <Stack.Screen name="HowItWorks" component={HowItWorks} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="Preferences" component={Preferences} />
    </Stack.Navigator>
  )
}

export default MenuNavigator
