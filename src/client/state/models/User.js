import { observable, computed, action, reaction, toJS } from 'mobx'
import Collection from './Collection'

const errorMessage = (statusCode) =>
  ({
    409: 'Looks like you already exist here.  Who knew?',
    401: 'The email address or password you provided were not found in our system.  Try again?',
  })[statusCode] || 'Oops! Something went wrong!'

export default class User {
  @observable isLoggedIn = false
  @observable isValidating = false
  @observable error = undefined
  @observable statusCode = undefined
  @observable profile = undefined
  @observable collections = []
  @observable credentials = {
    email: undefined,
    password: undefined,
  }
  @observable newCollection = new Collection()

  @action login = async (history, signup = false) => {
    let { email, password, passwordConfirmation, apiKey } = this.credentials
    let { isAvailable, source, slug } = this.newCollection

    if (!email || !password) {
      return this.error = 'You probably need both an email address and password to get through this...'
    }

    if (signup && (password !== passwordConfirmation)) {
      return this.error = `Are you sure you typed your passwords correctly?  They don't match!`
    }

    if (signup && (!slug || slug === '')) {
      return this.error = `You'll need a collection name to get started here.  That's what the site is all about!`
    }

    if (signup && !isAvailable) {
      return this.error = `That collection name has already been taken.  Try something different!`
    }

    if (signup && !source.apiKey) {
      return this.error = `You'll need to tell us where to get those images from.  Add an API key!`
    }

    this.isValidating = true
    this.error = undefined

    let profile = await fetch(`/user/${signup ? 'signup' : 'login'}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(toJS(this.credentials)),
                  })
                    .then(r => {
                      this.statusCode = r.status

                      return r.json()
                    })
                    .catch(() => {})

    if (profile) {
      this.initialize(profile)

      if (signup && this.newCollection.isAvailable) {
        this.createCollection()
      }
      // console.log('user', this.profile.email, 'logged in')
      history.push('/')
    } else {
      this.error = errorMessage(this.statusCode)
    }

    this.isValidating = false
  }

  @computed get json() {
    return {
      profile: toJS(this.profile),
      collections: toJS(this.collections),
    }
  }

  @action save = async () => {

  }

  @action initialize = async (profile = {}) => {
    console.log('initialize', profile)
    this.collections = profile.collections.map(c => new Collection(c))
    delete profile.collections
    this.profile = profile
    this.isLoggedIn = true
  }

  @action logout = async () => {
    console.log('logging user out...')
    let logoutSuccess = await fetch('/user/logout')
                        .then(r => r.status === 200)
                        .catch(err => console.warn(err))

    console.log('logoutSuccess', logoutSuccess)
    if (logoutSuccess) {
      console.log('inside logoutSuccess', this)
      this.isLoggedIn = false
      this.profile = undefined
      this.collections = []
    }
  }

  @action createCollection = async (slug) => {
    if (slug) {
      this.newCollection = new Collection()
      this.newCollection.slug = slug
    }

    let savedCollection = await this.newCollection.save()

    if (savedCollection) {
      this.collections.push(savedCollection)
      this.newCollection = new Collection()
    }

    return savedCollection
  }

  @action getProfile = async () => {
    return await fetch('/user/profile')
                  .then(r => r.json())
                  .then(profile => this.initialize(profile))
                  .catch(err => console.log('user not logged in...'))
  }

  constructor() {
    this.getProfile()

    reaction(
      () => this.isLoggedIn,
      (loggedIn) => console.log('logged in?', loggedIn)
    )
  }
}
