import { useState } from 'react'
import { fetchStatusIsOK } from 'utils'

export function updateItemAction({ itemId, collectionId, setItem }) {
  return ({ update, onSuccess }) => {
    fetchStatusIsOK(`/api/collections/${collectionId}/items/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
    })
    .then(success => {
      if (success && onSuccess) {
        onSuccess(update)
      }
    })
  }
}
