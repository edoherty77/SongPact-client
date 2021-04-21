const url = `http://192.168.1.8:4000/api/v1`
const axios = require('axios')

export default class PactModel {
  static all = async () => {
    console.log('url', url)
    // console.log('yo')
    try {
      const response = await fetch(`${url}/`)
      console.log('response', response)
      const pacts = await response.json()
      console.log('pacts', pacts)
      return pacts
    } catch (error) {
      console.log(error)
    }
  }
}
