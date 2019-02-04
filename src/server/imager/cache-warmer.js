import { getMilliseconds } from 'supergeneric/time'
import { randomItem } from 'supergeneric/collections'
import { getIndex } from './dropbox'
import { getBaseImage } from './get-base-image'
import { getImage } from './imager.js'
import { getCollections, syncCollection } from '../collections/collections'

// persist list of paths processed and pending to be processed
const pendingImages = new Set
const cachedImages = new Set
const IDLE_CACHE_DELAY = getMilliseconds('10 seconds')
const SYNC_INTERVAL = getMilliseconds('1 minute')

// global timer to debounce effects
let timer = undefined
let stallDate = new Date()

let globalUpdate

// delay updates whenever middleware is triggered from a route
export const cacheWhenIdle = (req, res, next) => {
  console.log('DELAY IDLE CACHING...', IDLE_CACHE_DELAY, 'ms')
  resetTimer(IDLE_CACHE_DELAY)
  next()
}

export const checkForUpdates = async () => {
  console.log('cache-warmer: checking for updates...')

  let collections = await getCollections({
    'source.service': 'dropbox',
    'source.apiKey': { $exists: true },
  })

  for (var collection of collections) {
    await syncCollection({ _id: collection._id }))
  }

  // get updated collections
  collections = await getCollections({
    'source.service': 'dropbox',
    'source.apiKey': { $exists: true },
  })

  for (var collection of collections) {
    for (var item of collection.items) {
      let path = `${collection.slug}/${item.id}`

      if (!pendingImages.has(path) && !cachedImages.has(path)) {
        console.log('image to be cached', { path })
        pendingImages.add(path)
      }
    }
  }

  if (pendingImages.size && !timer) {
    resetTimer()
  }
}

const resetTimer = (delay = 10) => {
  let timeDiff = (new Date() - stallDate)
  console.log('resetTimer, delay=', delay, 'timeDiff=', timeDiff)
  if (timeDiff > 0) {
    stallDate = new Date(new Date() - -delay) // shorthand to add delay to current Date
    timer && clearTimeout(timer)

    if (pendingImages.size) {
      timer = setTimeout(cacheAnImage, delay)
    } else {
      timer = undefined
    }
  } else {
    // resetTimer(delay)
  }
}

const cacheAnImage = async () => {
  if (pendingImages.size) {
    let path = randomItem(Array.from(pendingImages))

    await loadFragments(path)
    pendingImages.delete(path)
    cachedImages.add(path)

    console.log({
      service: 'cache-warmer',
      pending: pendingImages.size,
      cached: cachedImages.size,
    })

    // begin caching at full speed
    resetTimer()
  }
}

const loadFragments = async (path) => {
  try {
    await getImage(`/${path}::width=400,height=400,preview.jpg`)
    await getImage(`/${path}::width=400,height=400.jpg`)
    await getImage(`/${path}::width=1500,height=1500,fit=inside,preview.jpg`)
    await getImage(`/${path}::width=1500,height=1500,fit=inside.jpg`)

    return true
  } catch(err) {
    console.log('loadFragments:error', err)
    return false
  }
}

// set up constant update interval for app in background
setInterval(checkForUpdates, SYNC_INTERVAL)
