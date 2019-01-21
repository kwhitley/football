import { observable, action, computed, reaction, toJS } from 'mobx'

const sortByDate = (a,b) =>
  a.date < b.date ? 1 : (a.date > b.date ? -1 : 0)

export class ImageItem {
  @observable name = ''
  @observable story = ''
  @observable viewing = false
  @observable isDirty = false

  @action set = (attr) => (value) => {
    this[attr] = value
    this.isDirty = true
  }

  @action save = () => {
    fetch(`/api/images/${this.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.saveable),
    })
      .then(r => r.json())
      .catch(err => console.warn(err))

    this.isDirty = false
  }

  @computed get saveable() {
    return {
      name: this.name,
      story: this.story,
      dateModified: new Date(),
    }
  }

  constructor(meta) {
    Object.assign(this, meta)
    this.date = new Date(this.date)
  }
}

export class ImageList {
  @observable items = []
  @observable enabled = false

  constructor() {
    fetch('/api/images')
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
