import { makeAutoObservable, action } from 'mobx'

class ErrorStore {
  apiError = ''
  showError = false

  constructor() {
    makeAutoObservable(this)
  }

  setError = action((message: string) => {
    this.apiError = message
    this.showError = true
  })

  clearError = action(() => {
    this.apiError = ''
    this.showError = false
  })
}

export const errorStore = new ErrorStore()
