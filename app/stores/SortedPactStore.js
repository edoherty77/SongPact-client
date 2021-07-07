import { makeAutoObservable } from 'mobx'

class SortedPactStore {
  drafts = []
  action = []
  pending = []
  archive = []

  setDrafts() {}

  setAction(pacts) {
    // console.log('pactsstore', pacts)
    this.action.push(pacts)
    // console.log('action', this.action)
  }

  setPending(pacts) {
    this.pending.push(pacts)
  }

  setArchive() {}

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
