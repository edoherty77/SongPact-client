import { makeAutoObservable } from 'mobx'

class CreatePactStore {
  type = 'Producer'
  pactId = ''
  sample = false
  recordLabel = false
  labelName = ''
  collaborators = []
  recordTitle = ''
  initBy = ''
  performers = []
  producer = {
    firstName: '',
    lastName: '',
    userId: '',
    artistName: '',
    advancePercent: '',
    publisherPercent: '',
    royaltyPercent: '',
    credit: '',
  }

  setCollabInfo(values, foundUser) {
    console.log('fuck', values)
    //Set initBy value with foundUser
    this.initBy = foundUser.artistName
    // console.log(this.collaborators, this.initBy)

    //Find everyone involved in agreement and push in to collaborator array
    const collabsArr = values.collabs
    for (let i = 0; i < collabsArr.length; i++) {
      this.collaborators.push(collabsArr[i])
    }
  }

  setProducer(values) {
    //Find the one producer and add to object
    let foundProducer = this.collaborators.find(
      (x) => x.userId === values.producer,
    )
    this.producer.userId = foundProducer.userId
    this.producer.artistName = foundProducer.artistName
    this.producer.firstName = foundProducer.firstName
    this.producer.lastName = foundProducer.lastName

    //The rest must be performers. find and push into array
    let foundPerformers = this.collaborators.filter(function (x) {
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
    this.recordTitle = ''
    this.pactId = ''
    this.initBy = ''
    this.collaborators = []
    this.performers = []
    this.producer = {
      userId: '',
      artistName: '',
      advancePercent: '',
      publisherPercent: '',
      royaltyPercent: '',
      credit: '',
    }
  }
}

const store = new CreatePactStore()
export default store
