import { observable, box, computed, action, reaction, toJS } from 'mobx'
import Source from './Collection.Source'
import ImageList from './ImageList'

const errorMessage = (statusCode) =>
  ({
    409: 'Looks like you already exist here.  Who knew?',
    401: 'The email address or password you provided were not found in our system.  Try again?',
  })[statusCode] || 'Oops! Something went wrong!'

export default class Collection {
  @observable name = undefined
  @observable description = undefined
  @observable slug = undefined
  @observable owner = undefined
  @observable items = new ImageList()
  @observable source = new Source()
  @observable isAvailable = false
  @observable isPending = false
  @observable checkAvailability = true

  @action setSlug = (value) => {
    this.slug = value
                  .toLowerCase()
                  .replace(/[^\w\.\-_]/gi, '-')
                  .replace(/\-+/gi, '-')
  }

  @computed get saveable() {
    let { name, description, slug, source, items } = this

    return { name, description, slug, source, items }
  }

  @computed get json() {
    return toJS(this)
  }

  @action handeStatus(res) {
    this.error = res.code === 200 ? undefined : errorMessage(res.code)

    return res
  }

  @action async remove() {
    if (!this.slug) {
      return console.warn('a collection must have a name to be deleted')
    }

    this.isPending = true

    let response = await fetch(`/api/collections/${this.slug}`, {
                    method: 'DELETE',
                  })
                    .then(r => {
                      this.statusCode = r.status

                      return r.json()
                    })
                    .catch(() => {})

    this.isPending = false

    if (response) {
      console.log('collection deletion success', response)

      this.isLoggedIn = true
      // history.push('/')
    } else {
      this.error = errorMessage(this.statusCode)
    }
  }

  @action async save() {
    if (!this.slug || this.slug === '') {
      return console.warn('a collection must have a name before saving')
    }

    this.isPending = true

    let response = await fetch(`/api/collections${this._id ? ('/' + this.slug) : ''}`, {
                    method: this._id ? 'PATCH' : 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(toJS(this.saveable)),
                  })
                    .then(r => {
                      this.statusCode = r.status

                      return r.json()
                    })
                    .catch(() => {})

    this.isPending = false

    if (response) {
      console.log('collection creation success', response)

      this.isLoggedIn = true
      // history.push('/')
    } else {
      this.error = errorMessage(this.statusCode)
    }

    return this
  }

  async load(slug = this.slug) {
    if (!slug) {
      return console.warn('collection.load(slug) requires a slug or this.slug to be set')
    }

    this.checkAvailability = false
    this.isPending = true

    await fetch(`/api/collections/${slug}`)
                  .then(r => r.json())
                  .then(r => this.initialize(r))
                  .catch((err) => console.error(err))

    this.isPending = false
    this.checkAvailability = true

    return this
  }

  initialize(obj = {}) {
    console.log('creating new collection from', obj)

    window.collection = this

    let {
      _id,
      name,
      description,
      slug,
      source,
      dateCreated,
      dateModified,
      items,
    } = obj

    Object.assign(this, {
      _id,
      name,
      description,
      slug,
      dateCreated: new Date(dateCreated),
      dateModified: new Date(dateModified),
      source: new Source(source),
    })

    this.items = new ImageList(items, this.slug)

    reaction(
      () => this.slug,
      async (slug) => {
        if (this.checkAvailability && slug && slug.length > 2) {
          await fetch(`/api/collections/${this.slug}/available`)
                  .then(r => this.isAvailable = r.status === 200)
                  .catch(() => {})
        } else {
          this.isAvailable = false
        }

        console.log('collection', this.slug, 'available?', this.isAvailable)
      },
    )
  }

  constructor(obj) {
    this.initialize(obj)
  }
}
