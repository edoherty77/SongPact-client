import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import Header from '../../components/Header'
import Screen from '../../components/Screen'
import AppTextInput from '../../components/AppTextInput'
import ContactButton from '../../components/ContactButton'
import ConfirmModal from '../../components/ConfirmModal'
import UserModel from '../../api/users'
import FriendRequestModel from '../../api/friendRequests'
import AppButton from '../../components/AppButton'

import currentUser from '../../stores/UserStore'
import { observer } from 'mobx-react'
import { get } from 'mobx'

const FindArtist = observer(({ route, navigation }) => {
  const { item } = route.params
  console.log(item)
  return (
    <Screen>
      <Header icon="chevron-back" back={() => navigation.navigate('Find')} />
    </Screen>
  )
})

const styles = StyleSheet.create({
  inputView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
    marginTop: 5,
  },
})

export default FindArtist
