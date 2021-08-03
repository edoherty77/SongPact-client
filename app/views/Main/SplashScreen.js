import React from 'react'
import { StyleSheet, View } from 'react-native'
import AppText from '../../components/AppText'
import colors from '../../config/colors'

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.content}>
        <AppText fontSize={150} color={colors.white}>
          SP
        </AppText>
        <AppText fontSize={30} color={colors.white} style={styles.tagline}>
          Manage your contracts.
        </AppText>
        <AppText fontSize={25} color={colors.white} style={styles.tagline}>
          Seamlessly.
        </AppText>
      </View>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 180,
    padding: 30,
  },
  tagline: {
    fontWeight: 'bold',
    alignContent: 'center',
    textAlign: 'center',
    marginBottom: 15,
  },
})
