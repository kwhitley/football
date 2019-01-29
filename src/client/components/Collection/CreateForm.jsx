import React from 'react'
import { observer, inject } from 'mobx-react'
import Input from '../Controls/Input'

export const CreateForm = ({ collections, location, history, signup = false }) => {
  const { newCollection } = collections

  return (
    <div className="form full-page create-collection">
      <Input
        value={newCollection.name}
        onChange={(value) => newCollection.name = value}
        disabled={newCollection.isValidating}
        />

      <div className="error">{ user.error }</div>

      <button
        onClick={() => user.create(history)}
        disabled={newCollection.isValidating}
        >
        Create
      </button>
    </div>
  )
}

export default inject('collections')(observer(CreateForm))
