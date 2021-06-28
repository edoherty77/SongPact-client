import React, { useContext, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// Stacks
import CreatePactStack from './CreatePactStack'
import ContactStack from './ContactStack'
import NotificationsStack from './NotificationStack'

// Screens
import Dashboard from '../views/Main/DashboardScreen'

import colors from '../config/colors'
import MenuStack from './MenuStack'

const Tab = createBottomTabNavigator()

export default function BottomTabs({ updateAuthState, logout }) {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      tabBarOptions={{
        showLabel: false,
        style: {
          height: 110,
          marginTop: 0,
          borderTopColor: 'black',
          display: 'flex',
          backgroundColor: colors.black,
        },
        activeTintColor: colors.green,
        inactiveTintColor: colors.white,
        labelStyle: {
          display: 'flex',
          fontSize: 10,
          fontWeight: 'bold',
          paddingBottom: 45,
          fontFamily: 'Futura',
        },
        // tabStyle: {
        //   height: 90,
        //   backgroundColor: colors.gray,
        //   paddingBottom: 10,
        // },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={38}
              backgroundColor="red"
            />
          ),
        }}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-multiple"
              color={color}
              size={38}
            />
          ),
          // tabBarLabel: 'Contacts',
        }}
        name="Contacts"
        component={ContactStack}
      />
      <Tab.Screen
        options={{
          // tabBarVisible: false,
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                position: 'absolute',
                top: -35,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: colors.background,
                borderStyle: 'solid',
                borderRadius: 40,
                width: 67,
                height: 67,
                backgroundColor: colors.background,
              }}
            >
              <MaterialCommunityIcons
                name="plus-circle"
                color={colors.green}
                size={70}
                style={{
                  width: 70,
                  height: 70,
                }}
              />
            </View>
          ),
          // tabBarLabel: '',
        }}
        name="New"
        component={CreatePactStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={38} />
          ),
          // tabBarBadge: 3,
          // tabBarLabel: 'Notifications',
        }}
        name="Notifications"
        component={NotificationsStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={38} />
          ),

          // tabBarLabel: 'Menu',
        }}
        name="Menu"
      >
        {(screenProps) => (
          <MenuStack
            {...screenProps}
            updateAuthState={updateAuthState}
            logout={logout}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#30BCED',
  },
})
