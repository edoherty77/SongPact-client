import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useQuery } from 'react-query'

import BottomTabs from './BottomTabs'

import currentUser from '../stores/UserStore'
import PactModel from '../api/pacts'
import sortedPacts from '../stores/SortedPactStore'

const Drawer = createDrawerNavigator()

export const RootNavigator = ({ updateAuthState, logout }) => {
  // const { data } = useQuery('pacts', () => PactModel.all(currentUser.email))
  // console.log('data', data)
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home">
          {(screenProps) => (
            <BottomTabs
              {...screenProps}
              updateAuthState={updateAuthState}
              logout={logout}
            />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
