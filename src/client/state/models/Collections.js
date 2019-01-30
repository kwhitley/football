import { observable, computed, action, reaction, toJS } from 'mobx'
import Collection from './Collection'

export default class Collections {
  @observable items = []
  @observable newCollection = new Collection()

  @observable viewingCollection = undefined
  @observable error = undefined

  @action viewCollection = (collection) => this.viewingCollection = collection

  getBySlug = (slug) => this.items.find(i => i.slug === slug)
  getById = (id) => this.items.find(i => i._id === id)

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
