import { observable, action, computed } from 'mobx'

export class Scroller {
  @observable x
  @observable y

  @action save = (x, y) => {
    console.log('saving x y coordinates', x, y)
    this.x = x
    this.y = y
  }

  @action restore = () => {
    console.log('restoring x y coordinates', this.x, this.y)
    window.scrollTo(this.x, this.y)
  }
}

export default window.scroll = new Scroller()
