import React from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

// COMPONENTS
import ButtonIcon from './ButtonIcon'
import AppText from '../components/AppText'

//CONFIG
import colors from '../config/colors'

// STORE
import currentPact from '../stores/CreatePactStore'

const Header = ({
  onPress,
  title,
  subTitle,
  noIcon,
  back,
  edit,
  icon,
  noBack,
  navigation,
  clearCollabs,
  name = 'message-text',
  iconPress,
  borderBottomColor,
  borderBottomWidth,
  ...otherProps
}) => {
  const goToMenu = () => {
    navigation.navigate('Menu')
  }

  const goToEdit = () => {
    navigation.navigate('Edit')
  }
  const goBack = () => {
    navigation.goBack()
  }
  return (
    <SafeAreaView style={{ backgroundColor: colors.background }}>
      <View style={styles.appHeader}>
        {!noBack && (
          <Ionicons
            onPress={goBack}
            name="chevron-back"
            size={35}
            color={colors.black}
          />
        )}
        <View style={styles.titleContainer}>
          <AppText style={styles.screenName}>{title}</AppText>
        </View>
        {edit && (
          <ButtonIcon
            onPress={goToEdit}
            style={styles.messageBtn}
            iconColor={colors.black}
            size={45}
            name="pencil-box-multiple"
            backgroundColor="transparent"
            {...otherProps}
          />
        )}
        {!noIcon && (
          <ButtonIcon
            onPress={goToMenu}
            style={styles.messageBtn}
            iconColor={colors.black}
            size={45}
            name="menu"
            backgroundColor="transparent"
            {...otherProps}
          />
        )}
      </View>
      {subTitle && (
        <View style={styles.titleContainer}>
          <AppText style={styles.subTitle}>{subTitle}</AppText>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  appHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: 10,
    backgroundColor: colors.background,
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenName: {
    fontSize: 30,
    color: colors.black,
    fontWeight: 'bold',
  },
  messageBtn: {
    // marginTop: 4,
    // color: defaultStyles.colors.black,
    // backgroundColor: 'transparent',
  },
})

export default Header
