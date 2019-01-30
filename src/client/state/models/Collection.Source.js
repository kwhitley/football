import { observable } from 'mobx'

export default class Source {
  @observable service = 'dropbox'
  @observable apiKey = undefined

  constructor(obj) {
    Object.assign(this, obj)
  }
}
