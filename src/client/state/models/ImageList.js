import { observable, action, computed, reaction, toJS } from 'mobx'
import ImageItem from './ImageItem'

const sortByDate = (a,b) =>
  a.dateCreated < b.dateCreated ? 1 : (a.dateCreated > b.dateCreated ? -1 : 0)

export default class ImageList {
  @observable items = []
  @observable enabled = false

  @computed get length() {
    return this.items.length
  }

  map(...args) {
    return this.items.map(...args)
  }

  @computed get sorted() {
    return this.items.slice().sort(sortByDate)
  }

  @computed get viewingImage() {
    return this.items.find((i) => i.viewing)
  }

  getById = (id) => this.items.slice().find(i => i.id === id)

  @action toggle = () => this.enabled = !this.enabled

  @action viewImage = (id) => this.items.forEach(
    (image) => {
      image.viewing = image.image_id === id
    }
  )

  constructor(items = [], collectionSlug) {
    this.items = items.map(i => new ImageItem(i, collectionSlug))
  }
}
