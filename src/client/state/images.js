import { observable, action, computed } from 'mobx'

export class ImageItem {
  @observable name = ''

  constructor(meta) {
    Object.assign(this, meta)
  }
}

export class ImageList {
  @observable items = []
  @observable enabled = false

  constructor() {
    fetch('/api/list')
      .then(r => r.json())
      .then(r => r.entries)
      .then(r => r.forEach(this.add))
      .catch(err => console.warn(err))
  }

  @action toggle = () => this.enabled = !this.enabled

  @action add = (meta) => this.items.push(new ImageItem(meta))
}

export default window.images = new ImageList()
