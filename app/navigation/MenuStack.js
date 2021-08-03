import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import ArtistProfile from '../views/FindArtist/ArtistProfile'
import {
  Main,
  Profile,
  Edit,
  HowItWorks,
  Help,
  Preferences,
} from '../views/Menu/index'

// COMPONENTS
import Header from '../components/Header'

const Stack = createStackNavigator()

const MenuStack = (props) => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Main"
        options={({ navigation, route }) => ({
          header: (props) => (
            <Header title="Menu" {...props} rightIcon="menu" />
          ),
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
        component={ArtistProfile}
        options={({ navigation, route }) => ({
          header: (props) => (
            <Header {...props} title="Profile" rightIcon="menu" />
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
