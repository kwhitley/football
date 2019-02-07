export const login = ({ email, password }) =>
  fetch('/user/login',
    {
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

export const logout = () =>
  fetch('/user/logout')
    .then(r => r.status === 200)
    .catch(err => console.warn(err))
