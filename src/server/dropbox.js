import { Dropbox } from 'dropbox'
import fetch from 'isomorphic-fetch'

const { DROPBOX_ACCESS_TOKEN } = process.env

const toFileItem = (i) => ({
  id: i.rev,
  type: i['.tag'],
  filename: i.name,
  folder: i.path_display.replace(/(.*\/).*/gi, '$1'),
  size: i.size,
  date: i.server_modified,
})

export const list = () => {
  console.log('attempting to use dropbox api')
  var dbx = new Dropbox({ accessToken: DROPBOX_ACCESS_TOKEN, fetch })

  return dbx
    .filesListFolder({
      recursive: true,
      path: '',
    })
    .then((r) => r.entries.map(toFileItem))
    .catch(console.error)
}

export const download = (path) => {
  console.log('attempting to use dropbox api', { path: `rev:${path}` })
  var dbx = new Dropbox({ accessToken: DROPBOX_ACCESS_TOKEN, fetch })

  return dbx.filesDownload({ path: `rev:${path}` })
    .then((response) => response.fileBinary)
    .catch(console.error)
}
