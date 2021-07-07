//home
const url = `http://192.168.1.8:4000/api/v1`
//queensroom
// const url = 'http://192.168.1.203:4000/api/v1'
const axios = require('axios')

export default class PactModel {
  static all = async (id) => {
    try {
      const response = await axios.get(`${url}/pacts/${id}`)
      return response.data
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
    try {
      const updatedPact = await axios.put(`${url}/pacts/${data.id}`, data)
      return updatedPact
    } catch (error) {
      console.log(error)
    }
  }

  static delete = async (pactData) => {
    try {
      const deletedPact = await axios.delete(
        `${url}/pacts/${pactData.id}`,
        pactData,
      )
      return deletedPact
    } catch (error) {
      console.log(error)
    }
  }
}
