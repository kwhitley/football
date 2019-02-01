import { Dropbox } from 'dropbox'
import fetch from 'isomorphic-fetch'

const toFileItem = (i) => ({
  id: i.rev,
  filename: i.name,
  folder: i.path_display.replace(/(.*\/).*/gi, '$1'),
  size: i.size,
  dateCreated: i.server_modified,
})

export const getIndex = (accessToken) => {
  console.log('dropbox:filesListFolder')
  var dbx = new Dropbox({ accessToken, fetch })

  return dbx
    .filesListFolder({
      recursive: true,
      path: '',
    })
    .then(r => r.entries)
    .then(entries => entries.filter(i => i['.tag'] === 'file'))
    .then(entries => entries.map(toFileItem))
    .catch(console.error)
}

export const download = (accessToken, path) => {
  console.log('dropbox:filesDownload', { path: `rev:${path}` })
  var dbx = new Dropbox({ accessToken, fetch })

  return dbx.filesDownload({ path: `rev:${path}` })
    .then((response) => {
      console.log(`${path} downloaded`)
      return response.fileBinary
    })
    .catch(console.error)
}
