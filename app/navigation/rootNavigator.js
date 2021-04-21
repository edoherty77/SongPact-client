import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import DashboardStack from './DashboardStack'

const Drawer = createDrawerNavigator()

export const RootNavigator = ({ updateAuthState }) => {
  return (
    <NavigationContainer>
      {/* <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}> */}
      <Drawer.Navigator>
        {/* <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}> */}
        <Drawer.Screen name="Home">
          {(screenProps) => (
            <DashboardStack
              {...screenProps}
              updateAuthState={updateAuthState}
            />
          )}
        </Drawer.Screen>
        {/* component={DashboardStack} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
