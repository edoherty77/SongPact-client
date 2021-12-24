import { makeAutoObservable } from 'mobx'

class SortedPactStore {
  drafts = []
  action = []
  pending = []
  archive = []

  setDrafts(pact) {
    if(this.drafts.length === 0){
      this.drafts.push(pact)
    } else {
      const found = this.archive.some(el => el._id === pact._id)
      if(!found) this.drafts.push(pact)
    }
  }

  setAction(pact) {
    if(this.actionlength === 0){
      this.action.push(pact)
    } else {
      const found = this.action.some(el => el._id === pact._id)
      if(!found) this.action.push(pact)
    }
  }

  setPending(pact) {
    if(this.pending.length === 0){
      this.pending.push(pact)
    } else {
      const found = this.pending.some(el => el._id === pact._id)
      if(!found) this.pending.push(pact)
    }
  }

  setArchive(pact) {
    if(this.archive.length === 0){
      this.archive.push(pact)
    } else {
      const found = this.archive.some(el => el._id === pact._id)
      if(!found) this.archive.push(pact)
    }
  }

  resetPacts() {
    this.drafts = []
    this.action = []
    this.pending = []
    this.archive = []
  }

  constructor() {
    makeAutoObservable(this)
  }
}

const store = new SortedPactStore()
export default store
