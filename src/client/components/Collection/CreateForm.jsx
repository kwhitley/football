import React from 'react'
import { observer, inject } from 'mobx-react'
import Input from '../Controls/Input'

export class CreateForm extends React.Component {
  submit = async () => {
    let { user, history } = this.props
    console.log('this submit', this, user.json)

    let created = await user.createCollection()
    history.push('/' + created.slug)
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
          disabled={newCollection.isPending}
          />

        <Input
          placeholder="Collection URL (link)"
          value={newCollection.slug}
          onChange={newCollection.setSlug}
          disabled={newCollection.isPending}
          invalid={!newCollection.isAvailable}
          valid={newCollection.isAvailable}
          />

        <Input
          placeholder="API Key (Dropbox)"
          value={newCollection.source.apiKey}
          onChange={(value) => newCollection.source.apiKey = value}
          disabled={newCollection.isPending}
          invalid={!newCollection.isAvailable}
          valid={newCollection.isAvailable}
          />

        <pre>
        { JSON.stringify(newCollection.json, null, 2) }
        </pre>

        <div className="error">{ user.error }</div>

        <button
          onClick={this.submit}
          disabled={newCollection.isPending}
          >
          Create
        </button>
      </div>
    )
  }
}

export default inject('user')(observer(CreateForm))
