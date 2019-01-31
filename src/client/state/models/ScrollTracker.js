import { observable, action, computed, reaction } from 'mobx'

export default class ScrollTracker {
  @observable x = 0
  @observable y = 0
  @observable isTracking = false

  @action save = () => {
    var doc = document.documentElement
    var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)

    this.y = top
    // console.log('saving y coordinate', top)
  }

  @action restore = (delay = 10) => {
    // console.log('restoring y coordinate', this.y)

    setTimeout(() => window.scrollTo(this.x, this.y), delay)
  }

  constructor() {
    reaction(
      () => this.isTracking,
      (tracking) => {
        if (tracking) {
          setTimeout(() => window.addEventListener('scroll', this.save), 10)
        } else {
          window.removeEventListener('scroll', this.save)
        }
      }
    )
  }
}
