import React from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'

import ButtonIcon from './ButtonIcon'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import AppText from '../components/AppText'
import colors from '../config/colors'

const Header = ({
  onPress,
  title,
  noIcon,
  back,
  icon,
  name = 'message-text',
  iconPress,
  borderBottomColor,
  borderBottomWidth,
  ...otherProps
}) => {
  return (
    <SafeAreaView
      style={[styles.screenContainer, { borderBottomColor, borderBottomWidth }]}
      // onPress={onPress}
    >
      <View style={styles.appHeader}>
        <View
          style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
        >
          {icon && (
            <MaterialCommunityIcons
              onPress={back}
              name={icon}
              size={35}
              color="#42C1FC"
            />
          )}
        </View>
        <View style={{ alignItems: 'center', flex: 5 }}>
          <AppText style={styles.screenName}>{title}</AppText>
        </View>

        {!noIcon && (
          <ButtonIcon
            onPress={iconPress}
            style={styles.messageBtn}
            iconColor={colors.red}
            size={45}
            name={name}
            backgroundColor="transparent"
            {...otherProps}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: colors.background,
    // borderBottomColor: 'black',
    elevation: 1,
    borderBottomWidth: 0.4,
  },
  appHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  screenName: {
    fontSize: 40,
    color: colors.black,
    // fontWeight: "bold",
  },
  messageBtn: {
    // marginTop: 4,
    // color: defaultStyles.colors.black,
    // backgroundColor: 'transparent',
  },
})

export default Header
