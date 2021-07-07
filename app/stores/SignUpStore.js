import { makeAutoObservable } from 'mobx'

class SignUpStore {
  name = ''
  email = ''
  password = ''
  address = ''
  city = ''
  state = ''
  zipCode = ''
  artistName = ''
  companyName = ''

  setUserInfo(values) {
    this.name = values.name
    this.email = values.email
    this.password = values.password
  }

  setAddress(values) {
    this.address = values.address
    this.city = values.city
    this.state = values.state
    this.zipCode = values.zipCode
  }

  setArtistCompany(values) {
    this.artistName = values.artistName
    this.companyName = values.companyName
  }

  resetSignUp() {
    this.name = ''
    this.email = ''
    this.password = ''
    this.address = ''
    this.city = ''
    this.state = ''
    this.zipCode = ''
    this.artistName = ''
    this.companyName = ''
  }
}

const store = new SignUpStore()
export default store
