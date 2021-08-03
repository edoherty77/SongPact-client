import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// STACKS
import MenuStack from './MenuStack'

// SCREENS
import Contacts from '../views/Main/ContactsScreen'
import ArtistProfile from '../views/FindArtist/ArtistProfile'

// COMPONENTS
import Header from '../components/Header'

const Stack = createStackNavigator()

const ContactsStack = ({ updateAuthState, logout }) => {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Contacts"
        component={Contacts}
        options={({ navigation, route }) => ({
          header: (props) => <Header title="Contacts" noBack {...props} />,
        })}
      />
      <Stack.Screen
        name="ArtistProfile"
        component={ArtistProfile}
        options={({ navigation, route }) => ({
          header: (props) => <Header title="" {...props} />,
        })}
      />
      <Stack.Screen name="Menu" options={{ headerShown: false }}>
        {(screenProps) => (
          <MenuStack
            {...screenProps}
            updateAuthState={updateAuthState}
            logout={logout}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default ContactsStack
