import React, { useEffect } from 'react'
import Page from 'common/Page'
import Back from 'common/Back'

export default function MissingPage({
  location,
  navigate,
  message = "Ooops, that page was not found!",
}) {
  return (
    <Page className="form missing-page">
      <h1>{ message }</h1>
    </Page>
  )
}
