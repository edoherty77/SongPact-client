import { makeAutoObservable } from 'mobx'

class UserStore {
  _id = ''
  name = ''
  artistName = ''
  companyName = ''
  address = ''
  city = ''
  phoneNumber = ''
  state = ''
  zipCode = ''
  email = ''
  pacts = []
  friends = ''
  friendRequests = []
  googlePhotoUrl = ''
  accessToken = ''
  chatRooms = []
  notifications = ''
  badgeNum = 0

  setID(id) {
    this._id = id
  }

  setUser(values) {
    this._id = values._id
    this.name = values.name
    this.artistName = values.artistName
    this.companyName = values.companyName
    this.address = values.address
    this.city = values.city
    this.state = values.state
    this.zipCode = values.zipCode
    this.email = values.email
    this.pacts = values.pacts
    this.friends = values.friends
    this.phoneNumber = values.phoneNumber
    this.googlePhotoUrl = values.googlePhotoUrl
    this.chatRooms = values.chatRooms
    this.notifications = values.notifications
  }

  setOnboarding(values) {
    this.artistName = values.artistName
    this.companyName = values.companyName
    this.address = values.address
    this.city = values.city
    this.state = values.state
    this.zipCode = values.zipCode
    this.phoneNumber = values.phoneNumber
  }

  setChats(values) {
    this.chatRooms.push(values)
  }

  setFriends(values) {
    this.friends = values
  }

  setFriendRequests(values) {
    this.friendRequests = values
  }

  setBadgeNum(num) {
    this.badgeNum = this.badgeNum + num
  }

  setAccessToken(token) {
    this.accessToken = token
  }

  subtractBadgeNum() {
    this.badgeNum = this.badgeNum - 1
  }

  removeFriendRequest(item) {}

  removeNotification(item) {
    this.notifications = this.notifications.filter(
      (notification) => notification._id !== item._id,
    )
  }

  resetUser() {
    this._id = ''
    this.name = ''
    this.artistName = ''
    this.companyName = ''
    this.address = ''
    this.city = ''
    this.state = ''
    this.zipCode = ''
    this.email = ''
    this.pacts = []
    this.friends = ''
    this.googlePhotoUrl = ''
    this.accessToken = ''
    this.friendRequests = ''
    this.chatRooms = []
    this.notifications = ''
    this.badgeNum = 0
  }

  constructor() {
    makeAutoObservable(this)
  }
}

const store = new UserStore()
export default store
