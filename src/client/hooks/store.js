import { useState, useEffect } from 'react'

export class Store {
  constructor(initialState) {
    console.log('creating store with initialState', initialState)
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
      console.log('globalStore.set > creating new Store', value, this)
    }
  }
}

export const globalStore = window.globalStore = new GlobalStore()

export function useStore(namespace, initialState) {
  let store = undefined

  console.log('useStore:namespace', namespace, globalStore)

  if (globalStore.hasOwnProperty(namespace)) {
    store = globalStore[namespace]
  } else {
    store = globalStore[namespace] = new Store(initialState)
  }

  const [ state, set ] = useState(store.state)

  if (!store.setters.includes(set)) {
    store.setters.push(set)
  }

  useEffect(() => () => {
    store.setters = store.setters.filter(setter => setter !== set)
  }, [])

  return [ state, store.setState ]
}
