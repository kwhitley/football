import { observable, action, computed, reaction, toJS } from 'mobx'

const sortByDate = (a,b) =>
  a.date < b.date ? 1 : (a.date > b.date ? -1 : 0)

export class ImageItem {
  @observable name = 'line one more\n\another\n\line two three\yet some more'
  @observable story = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
  @observable viewing = false
  @observable isDirty = false

  @action set = (attr) => (value) => {
    this[attr] = value
    this.isDirty = true
  }

  @action save = () => {
    fetch(`/api/images/${this.id}`, {
      method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
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
