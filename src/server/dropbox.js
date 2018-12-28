import { Dropbox } from 'dropbox'
import fetch from 'isomorphic-fetch'

const { DROPBOX_ACCESS_TOKEN } = process.env

export const list = () => {
  console.log('attempting to use dropbox api')
  var dbx = new Dropbox({ accessToken: DROPBOX_ACCESS_TOKEN, fetch })

  return dbx.filesListFolder({
      recursive: true,
      path: '',
    })
    .then((response) => {
      console.log(response)

      return response
    })
    .catch((error) => console.log(error))
}

export const download = (path) => {
  console.log('attempting to use dropbox api', { path })
  var dbx = new Dropbox({ accessToken: DROPBOX_ACCESS_TOKEN, fetch })

  return dbx.filesDownload({ path })
    .then((response) => {
      console.log(response)

      return response.fileBinary
    })
    .catch((error) => console.log(error))
}
