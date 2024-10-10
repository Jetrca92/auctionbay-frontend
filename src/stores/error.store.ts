import { makeAutoObservable } from 'mobx'

class ErrorStore {
  apiError = ''
  showError = false

  constructor() {
    makeAutoObservable(this)
  }

  setError(message: string) {
    this.apiError = message
    this.showError = true
  }

  clearError() {
    this.apiError = ''
    this.showError = false
  }
}

export const errorStore = new ErrorStore()
