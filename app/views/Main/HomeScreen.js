import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppText from '../../components/AppText'
import colors from '../../config/colors'

const HomeScreen = () => {
  return (
    <View style={styles.mainView}>
      <View style={styles.content}>
        <AppText fontSize={150} color={colors.white} style={styles.title}>
          SP
        </AppText>
        <AppText fontSize={30} color={colors.white} style={styles.tagline}>
          Some sort of tagline for SongPact
        </AppText>
        <View style={styles.footerView}>
          <AppText fontSize={25} style={styles.footerText}>
            Manage your contracts.
          </AppText>
          <AppText fontSize={25} style={styles.footerText}>
            Seamlessly.
          </AppText>
        </View>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
    flex: 1,
  },
  title: {},
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 250,
    padding: 30,
  },
  tagline: {
    fontWeight: 'bold',
    alignContent: 'center',
    textAlign: 'center',
    marginBottom: 15,
  },
  footerView: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  footerText: {
    textAlign: 'center',
    color: 'rgba(238, 238, 238, 0.8)',
  },
})
