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
  friendRequests = ''
  googlePhotoUrl = ''
  accessToken = ''

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
    this.requests = values.requests
    this.googlePhotoUrl = values.googlePhotoUrl
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
  }

  constructor() {
    makeAutoObservable(this)
  }
}

const store = new UserStore()
export default store
