import { makeAutoObservable } from 'mobx'

class CreatePactStore {
  type = 'Producer'
  pactId = ''
  sample = false
  recordLabel = false
  labelName = ''
  collaborators = []
  users = []
  recordTitle = ''
  initBy = {
    userId: '',
    status: 1,
    firstName: '',
    lastName: '',
  }
  performers = []
  producer = {
    firstName: '',
    lastName: '',
    _id: '',
    advancePercent: '',
    publisherPercent: '',
    royaltyPercent: '',
    credit: '',
  }

  setCollabInfo(values, foundUser) {
    //Set initBy value with foundUser
    this.initBy.userId = foundUser._id
    this.initBy.firstName = foundUser.firstName
    this.initBy.lastName = foundUser.lastName
    this.users.push(foundUser)
    // console.log(this.collaborators, this.initBy)

    //Find everyone else involved in agreement and push in to collaborator array
    const collabsArr = values.collabs
    collabsArr.map((collab) => {
      let obj = {}
      obj['status'] = 1
      obj['user'] = collab._id
      obj['firstName'] = collab.firstName
      obj['lastName'] = collab.lastName
      this.collaborators.push(obj)
      this.users.push(collab)
    })
  }

  setProducer(values) {
    //Find the one producer and add to object
    let foundProducer = this.users.find((x) => x._id === values.producer)
    this.producer._id = foundProducer._id
    this.producer.artistName = foundProducer.artistName
    this.producer.firstName = foundProducer.firstName
    this.producer.lastName = foundProducer.lastName

    //The rest must be performers. find and push into array
    let foundPerformers = this.users.filter(function (x) {
      return x !== foundProducer
    })

    for (let i = 0; i < foundPerformers.length; i++) {
      this.performers.push(foundPerformers[i])
    }
    console.log('FOUNDPERFOM', this.performers)
  }

  setProducerInfo(values) {
    this.producer.advancePercent = parseInt(values.advancePercent)
    this.producer.royaltyPercent = parseInt(values.royaltyPercent)
    this.producer.publisherPercent = parseInt(values.publisherPercent)
    this.producer.credit = values.credit

    console.log('producer', this.producer)
    // console.log('performers', this.performers)
  }

  setPerformerInfo(values) {
    this.performers = []
    // console.log('old', this.performers)

    for (let i = 0; i < values.length; i++) {
      this.performers.push(values[i])
    }
    console.log('performers', this.performers)
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
    this.users = []
    this.recordTitle = ''
    this.pactId = ''
    this.initBy = {
      userId: '',
      status: 1,
      firstName: '',
      lastName: '',
    }
    this.collaborators = []
    this.performers = []
    this.producer = {
      _id: '',
      advancePercent: '',
      publisherPercent: '',
      royaltyPercent: '',
      credit: '',
      firstName: '',
      lastName: '',
    }
  }
}

const store = new CreatePactStore()
export default store
