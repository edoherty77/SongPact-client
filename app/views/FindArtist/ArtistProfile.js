import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import Header from '../../components/Header'
import Screen from '../../components/Screen'
import AppText from '../../components/AppTextInput'
import ButtonIcon from '../../components/ButtonIcon'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../../config/colors'
import { observer } from 'mobx-react'

const FindArtist = observer(({ route, navigation }) => {
  const { item } = route.params
  return (
    <Screen>
      <Header icon="chevron-back" back={() => navigation.navigate('Find')} />
      <View style={styles.mainContainer}>
        <View style={styles.heroView}>
          <View style={styles.iconView}>
            <ButtonIcon
              name="send"
              backgroundColor={'transparent'}
              size={35}
              iconColor={colors.black}
            />
          </View>
          <View style={styles.picContainer}>
            <AppText></AppText>
          </View>
          <AppText style={styles.name}>{item.name}</AppText>
          <AppText style={styles.email}>{item.email}</AppText>
          <View style={styles.infoButtonContainer}>
            <AppText>516-780-3566</AppText>
            {/* <AppText>Performer</AppText> */}
          </View>
        </View>
        <View style={styles.pactsView}></View>
        <View style={styles.contactView}>
          <View style={styles.infoHeaderContainer}>
            <View style={styles.infoHeaderContent}>
              <AppText style={styles.infoHeaderText}>
                Contact Information
              </AppText>
              <ButtonIcon
                name="plus"
                backgroundColor={colors.green}
                style={{
                  borderRadius: 5,
                  borderColor: 'black',
                  borderWidth: 1,
                  borderStyle: 'solid',
                }}
                size={35}
                iconColor={colors.background}
              />
            </View>
          </View>
          <View style={styles.infoBodyContainer}>
            <View style={styles.contentContainer}>
              <AppText style={{ fontWeight: 'bold', fontSize: 20 }}>
                {item.name}
              </AppText>
            </View>
            <View style={styles.contentContainer}>
              <MaterialCommunityIcons
                name="email"
                size={20}
                color="black"
                style={{ marginRight: 10 }}
              />
              <AppText style={styles.contactText}>{item.email}</AppText>
            </View>
            <View style={styles.contentContainer}>
              <MaterialCommunityIcons
                name="phone"
                size={20}
                color="black"
                style={{ marginRight: 10 }}
              />
              <AppText style={styles.contactText}>(516) 780-3566</AppText>
            </View>
          </View>
        </View>
      </View>
    </Screen>
  )
})

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    marginLeft: 30,
    marginRight: 30,
  },
  heroView: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    zIndex: 0,
    backgroundColor: colors.white,
    marginTop: 50,
  },
  iconView: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  picContainer: {
    position: 'absolute',
    top: -35,
    zIndex: 1,
    height: 70,
    width: 70,
    marginRight: 20,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 50,
    borderWidth: 1,
    backgroundColor: colors.blue,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: -10,
    marginTop: 30,
    color: colors.green,
  },
  email: {
    color: '#222222',
  },
  pactsView: {},
  contactView: {
    display: 'flex',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    zIndex: 0,
    backgroundColor: colors.white,
    marginTop: 50,
  },
  infoHeaderContainer: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  infoHeaderContent: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoBodyContainer: {
    padding: 20,
  },
  infoHeaderText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -10,
  },
})

export default FindArtist
