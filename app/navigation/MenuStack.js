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

// COMPONENTS
import ChatHeader from '../components/ChatHeader'

const Stack = createStackNavigator()

const MenuStack = (props) => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Main"
        options={({ navigation, route }) => ({
          header: (props) => <ChatHeader {...props} rightIcon="menu" />,
        })}
      >
        {(screenprops) => (
          <Main
            {...screenprops}
            updateAuthState={props.updateAuthState}
            logout={props.logout}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation, route }) => ({
          header: (props) => (
            <ChatHeader {...props} title="Profile" rightIcon="menu" />
          ),
        })}
      />
      <Stack.Screen name="Edit" component={Edit} />
      <Stack.Screen name="HowItWorks" component={HowItWorks} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="Preferences" component={Preferences} />
    </Stack.Navigator>
  )
}

export default MenuStack
