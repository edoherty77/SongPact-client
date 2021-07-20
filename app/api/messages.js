const axios = require('axios')
//home
const url = 'http://192.168.1.8:4000/api/v1'
// queensroom
// const url = 'http://192.168.1.203:4000/api/v1'

export default class MessagesModel {
  // static all = async (data) => {
  //   try {
  //     const response = await axios.get(`${url}/chatRoom/all/${data}`)
  //     const foundChatRooms = response.data
  //     return foundChatRooms
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  static create = async (obj) => {
    const roomId = obj.chatRoom._id
    try {
      const response = await axios.post(`${url}/message/${roomId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })
      const message = await response.data
      return message
      // console.log('message response', message)
    } catch (error) {
      console.log(error)
    }
  }

  // static show = async (id) => {
  //   console.log('id', id)
  //   try {
  //     const result = await axios.get(`${url}/chatRoom/${id}`)
  //     return result.data
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  static update = async (data) => {
    console.log(data)
    try {
      const updatedUser = await axios.put(`${url}/users/${data.email}`, data)
      return updatedUser
    } catch (error) {
      console.log(error)
    }
  }
}
