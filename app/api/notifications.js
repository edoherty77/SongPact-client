const axios = require('axios')
//home
const url = 'http://192.168.1.8:4000/api/v1'

export default class NotificationsModel {
  static all = async (name) => {
    try {
      const response = await axios.get(`${url}/notification/${id}`)
      // const foundNotifications = response.data

      // return foundNotifications
    } catch (error) {
      console.log(error)
    }
  }
  // static create = async (userData) => {
  //   try {
  //     const newUser = await axios.post(`${url}/users`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(userData),
  //     })
  //     return newUser
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // static show = async (id) => {
  //   try {
  //     const result = await axios.get(`${url}/users/${id}`)
  //     return result.data
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // static update = async (data) => {
  //   console.log(data)
  //   try {
  //     const updatedUser = await axios.put(`${url}/users/${data.email}`, data)
  //     return updatedUser
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  static delete = async (data) => {
    console.log('data', data)
    try {
      const deletedNotification = await axios.delete(
        `${url}/notification/${data.notificationId}`,
        { data: data },
      )
      return deletedNotification
    } catch (error) {
      console.log(error)
    }
  }
}
