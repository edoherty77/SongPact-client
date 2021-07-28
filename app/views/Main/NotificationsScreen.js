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
import NotificationsModel from '../../api/notifications'
import PactModel from '../../api/pacts'

// CONFIG
import colors from '../../config/colors'

// STORE
import currentUser from '../../stores/UserStore'
import pactStore from '../../stores/CreatePactStore'

const NotificationsScreen = observer(({ navigation }) => {
  const viewProfile = (item) => {
    navigation.navigate('ReqArtistProfile', {
      item: item.requesterInfo,
    })
  }
  const reviewPact = async (pactId) => {
    const pact = await PactModel.show(pactId)
    pactStore.setPact(pact)
    navigation.navigate('ReviewData')
  }

  return (
    <Screen>
      <View style={styles.mainView}>
        {currentUser.friendRequests.length > 0 && (
          <View style={styles.list}>
            <AppText style={styles.listHeader}>Friend Requests</AppText>

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
        )}
        {currentUser.notifications.length > 0 && (
          <View style={styles.list}>
            <AppText style={styles.listHeader}>Contracts</AppText>
            <FlatList
              data={currentUser.notifications}
              keyExtractor={(notifications) => notifications._id}
              renderItem={({ item, index }) => (
                <PactUpdate
                  item={item}
                  viewPact={() => {
                    reviewPact(item.pactId)
                  }}
                />
              )}
            />
          </View>
        )}
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
    // flex: 1,
  },
  list: {
    marginBottom: 25,
  },
  listHeader: {
    marginBottom: 5,
    fontSize: 16,
    // color: colors.gray,
  },
})
