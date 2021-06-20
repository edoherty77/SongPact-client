import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Contacts from '../views/Main/ContactsScreen'
import Find from '../views/FindArtist/FindArtistScreen'
import ArtistProfile from '../views/FindArtist/ArtistProfile'

const Stack = createStackNavigator()

const CreatePactStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      // initialRouteName="First"
      headerMode="screen"
    >
      <Stack.Screen name="Contacts" component={Contacts} />
      <Stack.Screen name="Find" component={Find} />
      <Stack.Screen name="ArtistProfile" component={ArtistProfile} />
    </Stack.Navigator>
  )
}

export default CreatePactStack
