const axios = require('axios')
//home
const url = 'http://192.168.1.8:4000/api/v1'
//queensroom
// const url = 'http://192.168.1.203:4000/api/v1'

export default class FriendRequestModel {
  static all = async (id) => {
    try {
      const allUsers = await axios.get(`${url}/friendRequests/${id}`)
      return allUsers
    } catch (error) {
      console.log(error)
    }
  }

  static create = async (requestData) => {
    // console.log('requestData', requestData)
    try {
      const newUser = await axios.post(`${url}/friendRequests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
      return newUser
    } catch (error) {
      console.log(error)
    }
  }

  static update = async (data) => {
    console.log(data)
    try {
      const updatedRequest = await axios.put(
        `${url}/friendRequests/${data.id}`,
        data.values,
      )
      return updatedRequest
    } catch (error) {
      console.log(error)
    }
  }

  static delete = async (id) => {
    try {
      await axios.delete(`${url}/friendRequests/${id}`)
    } catch (error) {
      console.log(error)
    }
  }

  // static show = async (id) => {
  //   try {
  //     const result = await axios.get(`${url}/users/${id}`)
  //     return result.data
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
}
