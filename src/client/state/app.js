import { observable, action } from 'mobx'

export class AppState {
  @observable adminMode = false

  @action toggleMode = (which) => this[`${which}Mode`] = !this[`${which}Mode`]
  @action toggleAdmin = () => this.toggleMode('admin')
}

export default window.images = new AppState()
