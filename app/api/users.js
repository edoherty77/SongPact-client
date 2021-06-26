const axios = require('axios')
//home
const url = 'http://192.168.1.8:4000/api/v1'
// queensroom
// const url = 'http://192.168.1.203:4000/api/v1'

export default class UserModel {
  static all = async (name) => {
    try {
      const findUsers = await axios.get(`${url}/users/search/${name}`)
      console.log(findUsers.data)
    } catch (error) {
      console.log(error)
    }
  }
  static create = async (userData) => {
    console.log('create route', userData)
    try {
      const newUser = await axios.post(`${url}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      return newUser
    } catch (error) {
      console.log(error)
    }
  }
  static show = async (id) => {
    9
    try {
      const result = await axios.get(`${url}/users/${id}`)
      return result.data
    } catch (error) {
      console.log(error)
    }
  }

  static update = async (data) => {
    console.log(data)
    try {
      const updatedUser = await axios.put(`${url}/users/${data.id}`, data)
      return updatedUser
    } catch (error) {
      console.log(error)
    }
  }
}
