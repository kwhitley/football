import images from './images'
import routing from './routing'
import AppSettings from './models/AppSettings'
import Collection from './models/Collection'
import ScrollTracker from './models/ScrollTracker'
import User from './models/User'

let store = {
  app: new AppSettings(),
  images,
  routing,
  scroll: new ScrollTracker(),
  user: new User(),
  collection: new Collection(),
}

export default store
