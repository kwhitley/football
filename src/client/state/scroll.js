import { observable, action, computed } from 'mobx'

export class Scroller {
  @observable x
  @observable y

  @action save = (x, y) => {
    this.x = x
    this.y = y

    // console.log('saving coordinates', x, y)
  }

  @action restore = () => {
    window.scrollTo(this.x, this.y)
    // console.log('restoring coordinates', this.x, this.y)
  }
}

export default window.scroll = new Scroller()
