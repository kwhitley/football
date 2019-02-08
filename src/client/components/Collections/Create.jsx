import React, { useEffect } from 'react'
import { navigate } from '@reach/router'
import Page from '../Page'
import Input from '../Controls/Input'
import Inspect from '../Controls/Inspect'
import Back from '../Back'
import { validators } from '../../utils'
import { useNewCollection, requireLogin } from '../../hooks'

export default function CreateCollection({ location }) {
  let isLoggedIn = requireLogin(location)
  let collection = useNewCollection()
  let {
    slug,
    setSlug,
    apiKey,
    setApiKey,
    isAvailable,
    isValid,
    createCollectionAction,
  } = collection

  if (!isLoggedIn) {
    return false
  }

  return (
    <Page className="form" visible={isLoggedIn}>
      <h1>Create a New Collection</h1>

      <Input
        placeholder="Collection Link (URL)"
        value={slug}
        validator={validators.collectionName(isAvailable)}
        onChange={setSlug}
        />

      <Input
        placeholder="Your API Key"
        value={apiKey}
        onChange={setApiKey}
        />

      <button
        disabled={!isValid}
        onClick={createCollectionAction}
      >
        Create Collection
      </button>
    </Page>
  )
}
