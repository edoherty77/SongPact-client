import { observer } from 'mobx-react'
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

// COMPONENTS
import AppText from '../../components/AppText'
import AppTextInput from '../../components/AppTextInput'
import Screen from '../../components/Screen'
import Separator from '../../components/Separator'
import ContactButton from '../../components/ContactButton'
import FriendRequest from '../../components/Notifications/FriendRequest'
import PactUpdate from '../../components/Notifications/PactUpdate'

// MODELS
import UserModel from '../../api/users'

// CONFIG
import colors from '../../config/colors'

// STORE
import currentUser from '../../stores/UserStore'

const NotificationsScreen = observer(({ navigation }) => {
  console.log('currentUser', currentUser.notifications)
  const viewProfile = (item) => {
    navigation.navigate('ReqArtistProfile', {
      item: item.requesterInfo,
    })
  }

  return (
    <Screen>
      <View style={styles.mainView}>
        <FlatList
          data={currentUser.friendRequests}
          keyExtractor={(friendRequests) => friendRequests.friendRequestId}
          renderItem={({ item, index }) => (
            <FriendRequest
              item={item.requesterInfo}
              viewProfile={() => viewProfile(item)}
              onPress={() => {
                // answerRequest(item.friendRequestId, item.requesterInfo._id)
                // setModalVisible(true)
                // setFriendInfo(item)
              }}
            />
          )}
        />
      </View>
    </Screen>
  )
})

export default NotificationsScreen

const styles = StyleSheet.create({
  mainView: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 25,
    flex: 1,
  },
})
