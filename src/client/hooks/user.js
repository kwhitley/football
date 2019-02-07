import { useState, useRef, useEffect } from 'react'
import { fetchJSON, fetchStatusIsOK } from '../utils'

export function save(id) {
  return (json) => fetchStatusIsOK(`/api/fake-collections/${id}`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(json),
                    })
}

export function useUser() {
  let [ user, setUser ] = useState({
    email: '',
    password: '',
    isValidating: false,
  })

  const updateFromInput = ({ name, value }) => setUser({ ...user, [name]: value })

  return { user, setUser: updateFromInput }
}
