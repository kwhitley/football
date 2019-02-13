import { useState, useEffect } from 'react'
import {
  fetchJSON,
  fetchStatusIsOK,
  withValue,
  withSlugifiedValue,
  validators,
} from 'utils'
import { useStore } from './store'
import { updateItemAction } from './collection.actions'

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

export function useCollectionDetails(collectionId) {
  let [ collection, setCollection ] = useStore(`collection:${collectionId}`, undefined)
  let [ isLoading, setIsLoading ] = useState(false)
  let [ error, setError ] = useState(undefined)

  useEffect(() => {
    if (!collection) {
      setIsLoading(true)

      fetchJSON(`/api/collections/${collectionId}`)
        .then(r => {
          setIsLoading(false)
          setCollection(r)
        })
        .catch(err => {
          setIsLoading(false)
          setError(err)
        })
    }
  }, [collectionId])

  return { collection, isLoading, error }
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

  return {
    item,
    isLoading,
    updateItemAction: updateItemAction({ collectionId, itemId }),
  }
}

export function useNewCollection() {
  let [ slug, setSlug ] = useState('')
  let [ apiKey, setApiKey ] = useState('')
  let isAvailable = useCollectionSlugIsAvailable(slug)
  let isValid = isAvailable

  return {
    apiKey,
    setApiKey,
    slug,
    isValid,
    setSlug: withSlugifiedValue(setSlug),
    isAvailable: useCollectionSlugIsAvailable(slug),
  }
}
