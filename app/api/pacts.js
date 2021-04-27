const url = `http://192.168.1.8:4000/api/v1`
const axios = require('axios')

export default class PactModel {
  static all = async () => {
    try {
      const response = await fetch(`${url}/`)
      console.log('response', response)
      const pacts = await response.json()
      return pacts
    } catch (error) {
      console.log(error)
    }
  }

  static create = async (pactData) => {
    try {
      const newPact = await axios.post(`${url}/pacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pactData),
      })
      return newPact
    } catch (error) {
      console.log(error)
    }
  }

  static update = async (data) => {
    // console.log(data)
    try {
      const updatedPact = await axios.put(`${url}/pacts/${data.id}`, data)
      return updatedPact
    } catch (error) {
      console.log(error)
    }
  }
}
