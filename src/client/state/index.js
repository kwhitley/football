import app from './app'
import images from './images'
import routing from './routing'
import ScrollTracker from './models/ScrollTracker'
import User from './models/User'
import Collection from './models/Collection'

let store = {
  app,
  images,
  routing,
  scroll: new ScrollTracker(),
  user: new User(),
  collection: new Collection(),
}

export default store
