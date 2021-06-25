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

const NotificationsScreen = observer(() => {
  const [friendRequests, setFriendRequests] = useState('')

  const fetchRequests = async () => {
    let arr = []
    try {
      const response = await FriendRequestModel.all(currentUser._id)
      const requests = await response.data.friendRequests
      requests.map(async (request) => {
        let obj = {}
        let requester = await UserModel.show(request.requester)
        let requesterInfo = requester.user
        obj['friendRequestId'] = request._id
        obj['requesterInfo'] = requesterInfo
        arr.push(obj)
        await setFriendRequests([...arr])
        console.log('req', friendRequests)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const answerRequest = async (id, requesterId) => {
    let status = 2
    let values = {
      status: 2,
      requester: requesterId,
      recipient: currentUser._id,
    }
    let data = { id, values }
    await FriendRequestModel.update(data)
    await FriendRequestModel.delete(id)
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  return (
    <Screen>
      <Header title="Notifications" noBack />
      <FlatList
        data={Object.values(friendRequests)}
        keyExtractor={(friendRequests) => friendRequests.friendRequestId}
        renderItem={({ item, index }) => (
          <ContactButton
            item={item.requesterInfo}
            onPress={() => {
              answerRequest(item.friendRequestId, item.requesterInfo._id)
              // setModalVisible(true)
              // setFriendInfo(item)
            }}
          />
        )}
      />
    </Screen>
  )
})

export default NotificationsScreen

const styles = StyleSheet.create({
  notifications: {
    flex: 1,
    backgroundColor: '#30BCED',
  },
  stateDisplay: {
    flex: 1,
    marginHorizontal: 30,
  },
  update: {
    flex: 1,
    marginHorizontal: 30,
  },
  input: {},
})
