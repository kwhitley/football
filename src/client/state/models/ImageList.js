import { observable, action, computed, reaction, toJS } from 'mobx'
import ImageItem from './ImageItem'

const sortByDate = (a,b) =>
  a.date < b.date ? 1 : (a.date > b.date ? -1 : 0)

export default class ImageList {
  @observable items = []
  @observable enabled = false

  constructor() {
    fetch('/api/images')
      .then(r => r.json())
      .then(items => items.filter(e => e.type === 'file'))
      .then(items => this.items = items.map(i => new ImageItem(i)))
      .catch(err => console.warn(err))
  }

  @computed get itemsSorted() {
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
}
