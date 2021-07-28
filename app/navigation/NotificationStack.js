import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// SCREENS
import Notifications from '../views/Main/NotificationsScreen'
import ArtistProfile from '../views/FindArtist/ArtistProfile'
import ReviewData from '../views/ReviewPact/ReviewData'
import ReviewContract from '../views/ReviewPact/ReviewContract'

// STACKS
import MenuStack from './MenuStack'

// COMPONENTS
import Header from '../components/Header'

const Stack = createStackNavigator()

const NotificationsStack = ({ updateAuthState, logout }) => {
  return (
    <Stack.Navigator initialRouteName="Notifications" headerMode="screen">
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={({ navigation, route }) => ({
          header: (props) => <Header title="Notifications" noBack {...props} />,
        })}
      />
      <Stack.Screen name="ReqArtistProfile" component={ArtistProfile} />
      <Stack.Screen
        name="ReviewData"
        component={ReviewData}
        options={({ navigation, route }) => ({
          header: (props) => <Header {...props} />,
        })}
      />
      <Stack.Screen
        name="ViewContract"
        component={ReviewContract}
        options={({ navigation, route }) => ({
          header: (props) => <Header {...props} title="Sign" />,
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

export default NotificationsStack
