import React from 'react'
import { observer, inject } from 'mobx-react'
import Page from '../Page'
import Input from '../Controls/Input'
import Back from '../Back'

export class CreateForm extends React.Component {
  submit = async () => {
    let { user } = this.props

    let created = await user.createCollection()
    history.push('/' + created.slug)
  }

  render() {
    let { user, location, navigate, signup = false } = this.props
    const { newCollection } = user

    return (
      <Page back navigate={navigate}>
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

          <div className="error">{ user.error }</div>

          <button
            onClick={this.submit}
            disabled={newCollection.isPending}
            >
            Create
          </button>
        </div>
      </Page>
    )
  }
}

export default inject('user')(observer(CreateForm))
