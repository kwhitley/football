import { observable, action } from 'mobx'

export class AppState {
  @observable editMode = false

  @action toggleMode = (which) => this[`${which}Mode`] = !this[`${which}Mode`]
  @action toggleEdit = () => this.toggleMode('edit')
}

export default window.images = new AppState()
