import { observable, action, reaction } from 'mobx'

export class AppState {
  @observable editMode = false

  @action toggleMode = (which) => this[`${which}Mode`] = !this[`${which}Mode`]
  @action toggleEdit = () => this.toggleMode('edit')

  constructor() {
    reaction(
      () => this.editMode,
      (editing) => setTimeout(() => document.body.scrollTo(0, 99999), 0),
    )
  }
}

export default window.images = new AppState()
