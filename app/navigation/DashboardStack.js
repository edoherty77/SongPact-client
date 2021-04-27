import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTabs from './BottomTabs'
import ReviewPact from '../views/ReviewPact/ReviewPact'
import Signature from '../views/ReviewPact/Signature'

const Stack = createStackNavigator()

export default function DashboardStack({ updateAuthState }) {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Dashboard">
        {(screenProps) => (
          <BottomTabs {...screenProps} updateAuthState={updateAuthState} />
        )}
      </Stack.Screen>
      <Stack.Screen name="ReviewPact" component={ReviewPact} />
      <Stack.Screen name="Signature" component={Signature} />
      {/* component={BottomTabs} /> */}
    </Stack.Navigator>
  )
}
