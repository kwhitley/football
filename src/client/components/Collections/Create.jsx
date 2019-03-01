import React, { useEffect } from 'react'
import Page from 'Common/Page'
import Input from 'Common/Input'
import Inspect from 'Common/Inspect'
import Back from 'Common/Back'
import { validators } from 'utils'
import { useNewCollection, useLoginRequired } from 'hooks'

export default function CreateCollection({ location, navigate }) {
  let isLoggedIn = useLoginRequired(location)
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
    <Page className="form" visible={isLoggedIn} back navigate={navigate}>
      <h1>Create Collection</h1>

      <Input
        placeholder="Collection Link"
        label="Collection Link (must be lowercase or dashes)"
        value={slug}
        validator={validators.collectionName}
        isValid={isAvailable}
        onChange={setSlug}
        />

      <Input
        placeholder="A Valid Dropbox API Key"
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
