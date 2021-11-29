import React from 'react'
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

// COMPONENTS
import AppText from '../../components/AppText'
import Screen from '../../components/Screen'
import MenuButton from '../../components/Menu/MenuButton'

// CONFIG
import colors from '../../config/colors'

// STORE
import CurrentUser from '../../stores/UserStore'

const menuItems = [
  {
    title: 'Profile',
    iconName: 'account',
    nav: 'Profile',
    id: '1',
  },
  {
    title: 'How It Works',
    iconName: 'help-circle-outline',
    nav: 'HowItWorks',
    id: '2',
  },
  {
    title: 'Support',
    iconName: 'console-network-outline',
    nav: 'Help',
    id: '3',
  },
  {
    title: 'Preferences',
    iconName: 'cog-outline',
    nav: 'Preferences',
    id: '4',
  },
]

export default function Main({ updateAuthState, navigation, logout }) {
  return (
    <Screen>
      <View style={styles.menuContainer}>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <MenuButton
              key={item.id}
              title={item.title}
              iconName={item.iconName}
              nav={item.nav}
              arrow
              onPress={() =>
                navigation.navigate(item.nav, {
                  item: CurrentUser,
                })
              }
            />
          )}
        />
        <MenuButton title="Sign Out" onPress={logout} iconName="logout-variant"/>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  menuContainer: {
    marginVertical: 30,
    marginHorizontal: 30,
  }
})
