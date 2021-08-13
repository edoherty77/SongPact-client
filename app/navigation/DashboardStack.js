import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

// SCREENS
import ReviewData from '../views/ReviewPact/ReviewData'
import ReviewContract from '../views/ReviewPact/ReviewContract'
import DashboardScreen from '../views/Main/DashboardScreen'

// STACKS
import MenuStack from './MenuStack'

// COMPONENTS
import Header from '../components/Header'

const Stack = createStackNavigator()

export default function DashboardStack({
  updateAuthState,
  logout,
  route,
  navigation,
}) {
  React.useLayoutEffect(() => {
    if (getFocusedRouteNameFromRoute(route) == 'ViewContract') {
      navigation.setOptions({ tabBarVisible: false })
    } else {
      navigation.setOptions({ tabBarVisible: true })
    }
  }, [getFocusedRouteNameFromRoute(route)])
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Dashboard"
        options={({ navigation, route }) => ({
          header: (props) => <Header title="Your Pacts" noBack {...props} />,
        })}
        component={DashboardScreen}
      />
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
          header: (props) => <Header {...props} title="" />,
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
