import { observable, action, toJS } from 'mobx'

const errorMessage = (statusCode) =>
  ({
    409: 'Looks like you already exist here.  Who knew?',
    401: 'The email address or password you provided were not found in our system.  Try again?',
  })[statusCode] || 'Oops! Something went wrong!'

export class UserState {
  @observable isLoggedIn = false
  @observable isValidating = false
  @observable error = undefined
  @observable statusCode = undefined
  @observable profile = undefined
  @observable credentials = {
    email: undefined,
    password: undefined,
  }

  @action login = async (history, signup = false) => {
    let { email, password, passwordConfirmation, apiKey } = this.credentials

    if (!email || !password) {
      return this.error = 'You probably need both an email address and password to get through this...'
    }

    if (signup && (password !== passwordConfirmation)) {
      return this.error = `Are you sure you typed your passwords correctly?  They don't match!`
    }

    this.isValidating = true
    this.error = undefined

    this.profile = await fetch(`/user/${signup ? 'signup' : 'login'}`, {
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

    if (this.profile) {
      console.log('successfully logged in as', toJS(this.profile))
      this.isLoggedIn = true
      history.push('/')
    } else {
      console.log('error status', this.statusCode)
      this.error = errorMessage(this.statusCode)
      console.log('failed login with credentials', this.credentials)
    }

    this.isValidating = false
  }

  @action logout = async () => {
    console.log('logging user out...')
    let logout = await fetch('/user/logout')
                        .then(() => {
                          console.log('user logged out')
                          this.isLoggedIn = false
                          this.profile = undefined
                        })
                        .catch(err => console.warn(err))
  }

  @action getProfile = async () =>
    await fetch('/user/profile')
            .then(r => r.json())
            .then(profile => {
              console.log('logged in as', profile)
              this.profile = profile
              this.isLoggedIn = true
            })
            .catch(err => console.log('user not logged in...'))

  constructor() {
    this.getProfile()
  }
}

export default window.images = new UserState()
