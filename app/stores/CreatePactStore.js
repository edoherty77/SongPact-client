import { makeAutoObservable } from 'mobx'

class CreatePactStore {
  type = ''
  pactId = ''
  sample = false
  recordLabel = false
  signed = false
  labelName = ''
  collaborators = []
  users = []
  recordTitle = ''
  initBy = {
    user: '',
    name: '',
  }
  performers = []
  producer = {
    name: '',
    user: '',
    advancePercent: '',
    publisherPercent: '',
    royaltyPercent: '',
    credit: '',
    artistName: '',
    companyName: '',
    signatureImg: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    email: '',
  }
  status = ''

  setPact(pact) {
    this.type = pact.type
    this.pactId = pact._id
    this.labelName = pact.labelName
    this.recordLabel = pact.recordLabel
    this.sample = pact.sample
    this.recordTitle = pact.recordTitle
    this.initBy = pact.initBy
    this.performers = pact.performers
    this.producer = pact.producer
    this.status = pact.status
    this.users = pact.users
  }

  setType(type) {
    this.type = type
  }

  setSignature(sig, currentUser) {
    this.users.find((user) => {
      if (user.user === currentUser._id) {
        return (user['signatureImg'] = sig), (user['userStatus'] = 2)
      }
    })
    const status = this.users.every((user) => {
      return user.userStatus === 2
    })
    if (status === true) {
      this.status = 2
    } else {
      this.status = 1
    }
    console.log('status', status)
  }

  setSigned() {
    this.signed = true
  }

  setCollabInfo(values, foundUser) {
    //Set initBy value with foundUser
    this.initBy.user = foundUser._id
    this.initBy.name = foundUser.name
    this.users.push({
      user: foundUser._id,
      // userStatus: 2,
      name: foundUser.name,
    })

    //Find everyone else involved in agreement and push in to collaborator array
    const collabsArr = values.collabs
    collabsArr.map((collab) => {
      let obj = {}
      obj['user'] = collab._id
      obj['name'] = collab.name
      obj['artistName'] = collab.artistName
      obj['companyName'] = collab.companyName
      obj['address'] = collab.address
      obj['city'] = collab.city
      obj['state'] = collab.state
      obj['zipCode'] = collab.zipCode
      obj['email'] = collab.email
      this.collaborators.push(obj)
      this.users.push({ user: collab._id, userStatus: 1, name: collab.name })
    })
  }

  setProducer(values) {
    //Find the one producer and add to object
    let foundProducer = this.users.find((x) => x.name === values.producer)
    this.producer.user = foundProducer.user
    this.producer.artistName = foundProducer.artistName
    this.producer.name = foundProducer.name
    this.producer.companyName = foundProducer.companyName
    this.producer.address = foundProducer.address
    this.producer.city = foundProducer.city
    this.producer.state = foundProducer.state
    this.producer.zipCode = foundProducer.zipCode
    this.producer.email = foundProducer.email
    //The rest must be performers. find and push into array
    let foundPerformers = this.users.filter(function (x) {
      return x !== foundProducer
    })

    for (let i = 0; i < foundPerformers.length; i++) {
      this.performers.push(foundPerformers[i])
    }
  }

  setProducerInfo(values) {
    this.producer.advancePercent = parseInt(values.advancePercent)
    this.producer.royaltyPercent = parseInt(values.royaltyPercent)
    this.producer.publisherPercent = parseInt(values.publisherPercent)
    this.producer.credit = values.credit
  }

  setPerformerInfo(values) {
    this.performers = []
    for (let i = 0; i < values.length; i++) {
      this.performers.push(values[i])
    }
  }

  setRecordInfo(values) {
    this.recordTitle = values.recordTitle
    this.sample = values.sample
    this.recordLabel = values.recordLabel
    if (values.recordLabel == true) {
      this.labelName = values.labelName
    } else {
      this.labelName = ''
    }
  }

  setPactId(id) {
    this.pactId = id
  }

  resetPact() {
    this.type = ''
    this.users = []
    this.recordTitle = ''
    this.pactId = ''
    this.initBy = {
      user: '',
      status: 1,
      name: '',
    }
    this.collaborators = []
    this.performers = []
    this.producer = {
      name: '',
      user: '',
      advancePercent: '',
      publisherPercent: '',
      royaltyPercent: '',
      credit: '',
      artistName: '',
      companyName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      email: '',
    }
    this.sample = false
    this.recordLabel = false
    this.labelName = ''
    this.signed = false
  }
}

const store = new CreatePactStore()
export default store
