import { useState, useEffect } from 'react'

const GLOBALSTORAGE_PREFIX = 'globalstore:'

export class Store {
  constructor({ value, namespace, persist }) {
    this.state = value

    if (persist) {
      try {
        this.state = JSON.parse(localStorage.getItem(GLOBALSTORAGE_PREFIX + namespace))
        console.log(GLOBALSTORAGE_PREFIX + namespace, 'found in localStorage, setting to', this.state)
      } catch(err) {
        console.warn(GLOBALSTORAGE_PREFIX + namespace, 'not found in localStorage, setting to', this.state)
      }
    }
    this.namespace = namespace
    this.persist = persist
    this.setters = []
  }

  setState = (value) => {
    this.state = value
    if (this.persist) {
      console.log('should persist value', value, 'to namespace', GLOBALSTORAGE_PREFIX + namespace)
      localStorage.setItem(GLOBALSTORAGE_PREFIX + namespace, JSON.stringify(value))
    }
    this.setters.forEach(setter => setter(this.state))
  }
}

class GlobalStore {
  set = (namespace, value, options = {}) => {
    let { persist } = options
    if (this.hasOwnProperty(namespace)) {
      this[namespace].setState(value)
    } else {
      this[namespace] = new Store({ value, persist, namespace })
    }
  }

  persist = (...args) => this.set(...args, { persist: true })
}

export const globalStore = window.globalStore = new GlobalStore()

export function useStore(namespace, value, options = {}) {
  let whichStore = undefined
  let { persist } = options

  if (globalStore.hasOwnProperty(namespace)) {
    whichStore = globalStore[namespace]
  } else {
    whichStore = globalStore[namespace] = new Store({ value, persist, namespace })
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
