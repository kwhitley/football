import { observable, action, computed } from 'mobx'

const sortByDate = (a,b) =>
  a.date < b.date ? 1 : (a.date > b.date ? -1 : 0)

export class ImageItem {
  @observable name = ''
  @observable story = ''
  @observable viewing = false

  @action set = (attr) => (value) => this[attr] = value

  constructor(meta) {
    Object.assign(this, meta)
    this.date = new Date(this.date)
  }
}

export class ImageList {
  @observable items = []
  @observable enabled = false

  constructor() {
    fetch('/api/list')
      .then(r => r.json())
      .then(items => items.filter(e => e.type === 'file'))
      .then(items => items.forEach(this.add))
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

  @action add = (meta) => this.items.push(new ImageItem(meta))
}

export default window.images = new ImageList()
