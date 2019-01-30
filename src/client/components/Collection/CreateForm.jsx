import React from 'react'
import { observer, inject } from 'mobx-react'
import Input from '../Controls/Input'

export class CreateForm extends React.Component {
  submit = () => {
    let { user } = this.props
    console.log('this submit', this, user.json)

    user.createCollection()
  }

  render() {
    let { user, location, history, signup = false } = this.props
    const { newCollection } = user

    return (
      <div className="form full-page create-collection">
        <Input
          placeholder="Collection Name"
          value={newCollection.name}
          onChange={(value) => newCollection.name = value}
          disabled={newCollection.isValidating}
          />

        <Input
          placeholder="Collection URL (link)"
          value={newCollection.slug}
          onChange={newCollection.setSlug}
          disabled={newCollection.isValidating}
          invalid={!newCollection.isAvailable}
          valid={newCollection.isAvailable}
          />

        <pre>
          { JSON.stringify(user.newCollection, null, 2) }
        </pre>

        <div className="error">{ user.error }</div>

        <button
          onClick={this.submit}
          disabled={newCollection.isValidating}
          >
          Create
        </button>
      </div>
    )
  }
}

export default inject('user')(observer(CreateForm))
