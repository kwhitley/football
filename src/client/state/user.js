import { observable, action, toJS } from 'mobx'

export class UserState {
  @observable isLoggedIn = false
  @observable isValidating = false
  @observable error = undefined
  @observable profile = undefined
  @observable credentials = {
    email: undefined,
    password: undefined,
  }

  @action login = async (history) => {
    let { email, password } = this.credentials

    if (!email || !password) {
      return this.error = 'You probably need both an email address and password to get through this...'
    }

    this.isValidating = true
    this.error = undefined

    this.profile = await fetch(`/user/login`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(toJS(this.credentials)),
                  }).then(r => r.json())
                    .catch(err => console.warn(err))

    if (this.profile) {
      console.log('successfully logged in as', toJS(this.profile))
      this.isLoggedIn = true
      history.push('/')
    } else {
      this.error = 'The email address or password you provided were not found in our system.  Try again?'
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
