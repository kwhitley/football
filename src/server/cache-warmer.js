import { getIndex } from './dropbox'

export const cacheWarmer = async () => {
  console.log('warming the cache...')
  await getIndex()
}
