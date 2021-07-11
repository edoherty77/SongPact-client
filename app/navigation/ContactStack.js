import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// STACKS
import MenuStack from './MenuStack'

// SCREENS
import Contacts from '../views/Main/ContactsScreen'
import Find from '../views/FindArtist/FindArtistScreen'
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
      <Stack.Screen name="Find" component={Find} />
      <Stack.Screen
        name="ArtistProfile"
        component={ArtistProfile}
        options={({ navigation, route }) => ({
          header: (props) => <Header title="Artist Profile" {...props} />,
        })}
      />
      <Stack.Screen name="Menu">
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
