import { observable, action, computed } from 'mobx'

const sortByDate = (a,b) =>
  a.date < b.date ? 1 : (a.date > b.date ? -1 : 0)

export default class ImageItem {
  @observable name = ''
  @observable story = ''
  @observable viewing = false
  @observable isDirty = false

  @action set = (attr) => (value) => {
    this[attr] = value
    this.isDirty = true
  }

  @action save = () => {
    fetch(`/api/collections/${this.collectionSlug}/items/${this.id}`, {
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
    }
  }

  constructor(meta, collectionSlug) {
    Object.assign(this, meta)
    this.date = new Date(this.date)
    this.collectionSlug = collectionSlug
  }
}
