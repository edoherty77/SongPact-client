import { observer } from 'mobx-react'
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import AppText from '../../components/AppText'
import AppTextInput from '../../components/AppTextInput'
import Screen from '../../components/Screen'
import Header from '../../components/Header'
import ContactButton from '../../components/ContactButton'
import FriendRequestModel from '../../api/friendRequests'
import UserModel from '../../api/users'
import colors from '../../config/colors'
import currentUser from '../../stores/UserStore'

const NotificationsScreen = observer(({ navigation }) => {
  const viewProfile = (item) => {
    navigation.navigate('ReqArtistProfile', {
      item: item.requesterInfo,
    })
  }

  return (
    <Screen>
      <Header title="Notifications" noBack />
      <View style={styles.mainView}>
        <FlatList
          data={currentUser.friendRequests}
          keyExtractor={(friendRequests) => friendRequests.friendRequestId}
          renderItem={({ item, index }) => (
            <ContactButton
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
