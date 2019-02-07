import { useState, useEffect } from 'react'

export class Store {
  constructor(initialState) {
    this.state = initialState
    this.setters = []
  }

  setState = (value) => {
    this.state = value
    this.setters.forEach(setter => setter(this.state))
  }
}

class GlobalStore {
  set = (namespace, value) => {
    if (this.hasOwnProperty(namespace)) {
      this[namespace].setState(value)
    } else {
      this[namespace] = new Store(value)
    }
  }
}

export const globalStore = window.globalStore = new GlobalStore()

export function useStore(namespace, initialState) {
  let whichStore = undefined

  if (globalStore.hasOwnProperty(namespace)) {
    whichStore = globalStore[namespace]
  } else {
    whichStore = globalStore[namespace] = new Store(initialState)
  }

  const [ state, set ] = useState(whichStore.state)

  if (!whichStore.setters.includes(set)) {
    whichStore.setters.push(set)
  }

  useEffect(() => () => {
    whichStore.setters = whichStore.setters.filter(setter => setter !== set)
  }, [])

  return [ state, whichStore.setState ]
}
