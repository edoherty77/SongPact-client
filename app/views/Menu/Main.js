import { Auth } from 'aws-amplify'
import React from 'react'
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native'
import Header from '../../components/Header'
import AppText from '../../components/AppText'
import Screen from '../../components/Screen'
import store from '../../stores/UserStore'
import MenuButton from '../../components/Menu/MenuButton'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../../config/colors'

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

export default function Main({ updateAuthState, navigation }) {
  const signOut = async () => {
    try {
      await Auth.signOut()
      store.resetUser()
      updateAuthState('loggedOut')
    } catch (error) {
      console.log('error signing out: ', error)
    }
  }

  return (
    <Screen>
      <Header title="Menu" />
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
              onPress={() => navigation.navigate(item.nav)}
            />
          )}
        />
        <TouchableOpacity style={styles.signoutContainer} onPress={signOut}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons size={20} name="logout-variant" />
          </View>
          <AppText style={styles.signoutText}>Sign Out</AppText>
        </TouchableOpacity>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  menuContainer: {
    // display: 'flex',
    flex: 1,
    marginVertical: 30,
    marginHorizontal: 30,
    // backgroundColor: 'red',
  },
  signoutContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    height: 40,
    backgroundColor: colors.red,
    width: 200,
  },
  iconContainer: {
    position: 'absolute',
    left: 10,
  },
  menuItem: {
    fontSize: 30,
    marginLeft: 35,
  },
  signoutText: {
    fontSize: 30,
  },
})
