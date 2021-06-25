import { makeAutoObservable } from 'mobx'

class UserStore {
  _id = ''
  // firstName = ''
  // lastName = ''
  name = ''
  artistName = ''
  companyName = ''
  address = ''
  city = ''
  state = ''
  zipCode = ''
  email = ''
  pacts = []
  friends = []
  notFriends = []
  googlePhotoUrl = ''

  setID(id) {
    this._id = id
  }

  setUser(values) {
    // this.firstName = values.firstName
    // this.lastName = values.lastName
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
    this._id = values._id
    this.googlePhotoUrl = values.googlePhotoUrl
  }

  addFriend(value) {
    this.friends.items.push(value)
    // for (let i = 0; i < this.notFriends.length; i++) {
    //   if (this.notFriends[i].id === value.id) {
    //     this.notFriends.splice(i, 1)
    //   }
    // }
  }

  resetUser() {
    console.log('resetting User in UserStore...')
    this._id = ''
    // this.firstName = ''
    // this.lastName = ''
    this.name = ''
    this.artistName = ''
    this.companyName = ''
    this.address = ''
    this.city = ''
    this.state = ''
    this.zipCode = ''
    this.email = ''
    this.pacts = []
    this.friends = []
    this.googlePhotoUrl = ''
  }

  constructor() {
    makeAutoObservable(this)
  }
}

const store = new UserStore()
export default store
