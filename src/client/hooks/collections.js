import { useState, useEffect } from 'react'
import {
  fetchJSON,
  fetchStatusIsOK,
  withValue,
  withSlugifiedValue,
} from '../utils'

export function useCollections() {
  let [ collections, setCollections ] = useState([])
  let [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    fetchJSON('/api/collections')
      .then(r => {
        setCollections(r)
        setIsLoading(false)
      })
  }, [])

  return {
    collections,
    isLoading,
  }
}

export function useCollectionSlugIsAvailable(slug) {
  let [ isAvailable, setIsAvailable ] = useState(false)

  useEffect(() => {
    if (slug.length < 5) {
      return setIsAvailable(false)
    }

    fetchStatusIsOK(`/api/collections/${slug}/available`)
      .then(setIsAvailable)
  }, [slug])

  return isAvailable
}

export function useCollectionDetails(slug) {
  let [ collection, setCollection ] = useState(undefined)
  let [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    setIsLoading(true)

    fetchJSON(`/api/collections/${slug}`)
      .then(r => {
        setIsLoading(false)
        setCollection(r)
      })
  }, [slug])

  return { collection, isLoading }
}

export function useItemDetails({ collectionId, itemId }) {
  let [ item, setItem ] = useState(undefined)
  let [ isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    if (!collectionId || !itemId) {
      return console.warn('attempting to useItemDetails without collectionId or itemId')
    }

    setIsLoading(true)

    fetchJSON(`/api/collections/${collectionId}/items/${itemId}`)
      .then(r => {
        setItem(r)
        setIsLoading(false)
      })
  }, [collectionId, itemId])

  return { item, isLoading }
}

export function useNewCollection() {
  let [ slug, setSlug ] = useState('')
  let [ apiKey, setApiKey ] = useState('')

  return {
    apiKey,
    setApiKey,
    slug,
    setSlug: withSlugifiedValue(setSlug),
    isAvailable: useCollectionSlugIsAvailable(slug),
  }
}
