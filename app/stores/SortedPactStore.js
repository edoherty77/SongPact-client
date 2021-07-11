import { makeAutoObservable } from 'mobx'

class SortedPactStore {
  drafts = []
  action = []
  pending = []
  archive = []

  setDrafts(pacts) {
    this.drafts.push(pacts)
  }

  setAction(pacts) {
    this.action.push(pacts)
  }

  setPending(pacts) {
    this.pending.push(pacts)
  }

  setArchive(pacts) {
    this.archive.push(pacts)
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
