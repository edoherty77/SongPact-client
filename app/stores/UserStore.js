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
    // this.friendRequests = values.friendRequests
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

  setAccessToken(token) {
    this.accessToken = token
  }

  removeNotification(item) {
    for (let i = 0; i <= this.notifications.length; i++) {
      if (this.notifications[i]._id === item._id) {
        this.notifications.splice(i, 1)
      }
    }
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
  }

  constructor() {
    makeAutoObservable(this)
  }
}

const store = new UserStore()
export default store
