import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTabs from './BottomTabs'
import ReviewPact from '../views/ReviewPact/ReviewPact'
import ReviewData from '../views/ReviewPact/ReviewData'
import SignContract from '../views/ReviewPact/SignContract'
import ViewContract from '../views/ReviewPact/ViewContract'

const Stack = createStackNavigator()

export default function DashboardStack({ updateAuthState, logout }) {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Dashboard">
        {(screenProps) => (
          <BottomTabs
            {...screenProps}
            updateAuthState={updateAuthState}
            logout={logout}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="ReviewPact" component={ReviewPact} />
      <Stack.Screen name="ReviewData" component={ReviewData} />
      <Stack.Screen name="ViewContract" component={ViewContract} />
      <Stack.Screen name="SignContract" component={SignContract} />
      {/* component={BottomTabs} /> */}
    </Stack.Navigator>
  )
}
