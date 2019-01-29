import { observable, computed, action, reaction, toJS } from 'mobx'

const errorMessage = (statusCode) =>
  ({
    409: 'Looks like you already exist here.  Who knew?',
    401: 'The email address or password you provided were not found in our system.  Try again?',
  })[statusCode] || 'Oops! Something went wrong!'

export class Source {
  @observable service = 'dropbox'
  @observable apiKey = undefined
}

export class Collection {
  @observable name = 'New Collection'
  @observable owner = undefined
  @observable images = []
  @observable source = new Source()
  @observable isAvailable = true

  @computed get slug() {
    return this.name
            .toLowerCase()
            .replace(/[^\w]/gi, '')
  }

  @computed get saveable() {
    return {
      name: this.name,
      slug: this.slug,
      source: this.source,
    }
  }

  constructor({ name, owner, images, source }) {
    this.name = name ? name : this.name
    this.owner = owner ? owner : this.owner
    this.images = images ? images: this.images
    this.source = source ? new Source(source): this.source

    reaction(
      () => this.slug,
      async (slug) => {
        await fetch(`/api/collections/check-availability/${this.slug}`)
                .then(r => this.isAvailable = r.status === 200)
                .catch(() => {})
      },
    )
  }
}

export class Collections {
  @observable items = []
  @observable newCollection = new Collection({})

  @observable viewingCollection = undefined
  @observable error = undefined

  @action viewCollection = (collection) => this.viewingCollection = collection

  @action create = async (history) => {
    let { name } = this.newCollection

    if (!name) {
      return this.error = 'A name is usually helpful. Actually, it\'s required!'
    }

    this.error = undefined

    let response = await fetch('/api/collections', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(toJS(this.newCollection.saveable)),
                  })
                    .then(r => {
                      this.statusCode = r.status

                      return r.json()
                    })
                    .catch(() => {})

    if (response) {
      console.log('collection creation success', response)
      this.isLoggedIn = true
      history.push('/')
    } else {
      this.error = errorMessage(this.statusCode)
    }

    this.isValidating = false
  }
}

export default window.collections = new Collections()
