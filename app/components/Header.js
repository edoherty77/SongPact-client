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
    <SafeAreaView>
      <View style={styles.appHeader}>
        {/* <View
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
        </View> */}
        <View style={styles.titleContainer}>
          <AppText style={styles.screenName}>{title}</AppText>
        </View>

        {!noIcon && (
          <ButtonIcon
            onPress={iconPress}
            style={styles.messageBtn}
            iconColor={colors.black}
            size={45}
            name="menu"
            backgroundColor="transparent"
            {...otherProps}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  appHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingRight: 25,
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  screenName: {
    fontSize: 22,
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
