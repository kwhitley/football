import React, { useEffect } from 'react'
import Page from '../Page'
import Input from '../Controls/Input'
import Inspect from '../Controls/Inspect'
import Back from '../Back'

import { useNewCollection, useStore, requireLogin } from '../../hooks'

export default function CreateForm({ location }) {
  // console.log('CreateForm:location', location)
  requireLogin(location)

  let collection = useNewCollection()
  let {
    slug,
    setSlug,
    apiKey,
    setApiKey,
    isAvailable,
  } = collection

  return (
    <Page>
      <h1>New Collection</h1>
      <Inspect item={collection} somethingelse />

      <button onClick={() => navigate('/login')}>Navigate</button>

      <Input
        placeholder="Collection Link (URL)"
        value={slug}
        onChange={setSlug}
        />

      <Input
        placeholder="Your API Key"
        value={apiKey}
        onChange={setApiKey}
        />

      <h1>isAvailable</h1>
      { isAvailable ? 'available' : 'name taken' }
    </Page>
  )
}
