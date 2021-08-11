import { observer } from 'mobx-react'
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

// COMPONENTS
import AppText from '../../components/AppText'
import AppButton from '../../components/AppButton'
import Screen from '../../components/Screen'
import FriendRequest from '../../components/Notifications/FriendRequest'
import PactUpdate from '../../components/Notifications/PactUpdate'

// MODELS
import NotificationsModel from '../../api/notifications'
import PactModel from '../../api/pacts'

// CONFIG
import colors from '../../config/colors'

// STORE
import currentUser from '../../stores/UserStore'
import currentPact from '../../stores/CreatePactStore'

const NotificationsScreen = observer(({ navigation }) => {
  const viewProfile = (item) => {
    navigation.navigate('ReqArtistProfile', {
      item: item.requesterInfo,
    })
  }

  const reviewPact = async (pactId) => {
    const pact = await PactModel.show(pactId)
    currentPact.setPact(pact)
    pact.users.find((user) => {
      if (user.user === currentUser._id) {
        if (user.userStatus === 2) {
          currentPact.setSigned()
        }
      }
    })
    navigation.navigate('ReviewData')
  }

  const deleteNotification = async (item) => {
    const data = {
      notificationId: item._id,
      userId: currentUser._id,
    }
    currentUser.removeNotification(item)
    currentUser.subtractBadgeNum()
    await NotificationsModel.delete(data)
  }

  return (
    <Screen>
      <View style={styles.mainView}>
        {currentUser.friendRequests.length > 0 && (
          <View>
            <FlatList
              data={currentUser.friendRequests}
              keyExtractor={(friendRequests) => friendRequests.friendRequestId}
              renderItem={({ item, index }) => (
                <FriendRequest
                  item={item}
                  viewProfile={() => viewProfile(item)}
                />
              )}
            />
          </View>
        )}
        {currentUser.notifications.length > 0 && (
          <View style={styles.notifications}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={currentUser.notifications}
              keyExtractor={(notifications) => notifications._id}
              renderItem={({ item, index }) => (
                <PactUpdate
                  item={item}
                  deleteNotification={deleteNotification}
                  viewPact={() => {
                    reviewPact(item._id)
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
    marginTop: 30,
    flex: 1,
  },
  notifications: {
    flex: 1,
    marginBottom: 35,
  },
})
