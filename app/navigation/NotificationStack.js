import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Notifications from '../views/Main/NotificationsScreen'
import ArtistProfile from '../views/FindArtist/ArtistProfile'

const Stack = createStackNavigator()

const NotificationsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Notifications"
      headerMode="screen"
    >
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="ReqArtistProfile" component={ArtistProfile} />
    </Stack.Navigator>
  )
}

export default NotificationsStack
