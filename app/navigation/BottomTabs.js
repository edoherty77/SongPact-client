import React, { useContext, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// Stacks
import CreatePactStack from './CreatePactStack'
import ContactStack from './ContactStack'
import NotificationsStack from './NotificationStack'
import DashboardStack from './DashboardStack'
import ChatStack from './ChatStack'

// Screens

// CONFIG
import colors from '../config/colors'

const Tab = createBottomTabNavigator()

export default function BottomTabs({ updateAuthState, logout }) {
  return (
    <Tab.Navigator
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
      }}
    >
      <Tab.Screen
        name="Dashboard"
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
      >
        {(screenProps) => (
          <DashboardStack
            {...screenProps}
            updateAuthState={updateAuthState}
            logout={logout}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-multiple"
              color={color}
              size={38}
            />
          ),
        }}
        name="Contacts"
      >
        {(screenProps) => (
          <ContactStack
            {...screenProps}
            updateAuthState={updateAuthState}
            logout={logout}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        options={{
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
        }}
        name="New"
      >
        {(screenProps) => (
          <CreatePactStack
            {...screenProps}
            updateAuthState={updateAuthState}
            logout={logout}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={38} />
          ),
        }}
        name="Notifications"
        component={NotificationsStack}
      />

      <Tab.Screen
        name="ChatMain"
        options={{
          tabBarIcon: ({ color, navigation }) => (
            <MaterialCommunityIcons
              name="chat"
              color={color}
              size={38}
              backgroundColor="red"
            />
          ),
        }}
      >
        {(screenProps) => (
          <ChatStack
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
