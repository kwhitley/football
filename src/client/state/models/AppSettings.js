import { observable, computed, action, reaction } from 'mobx'

const STORAGE_KEY = 'dropbox-gallery:app-settings'

export default class AppSettings {
  @observable editMode = false

  @action toggleMode = (which) => this[`${which}Mode`] = !this[`${which}Mode`]
  @action toggleEdit = () => this.toggleMode('edit')

  @computed get saveable() {
    let { editMode } = this

    return {
      editMode
    }
  }

  @action logout() {
    return {
      editMode
    }
  }

  constructor() {
    const storedSettings = localStorage.getItem(STORAGE_KEY)

    if (storedSettings) {
      try {
        Object.assign(this, JSON.parse(storedSettings))
      } catch(err) {
        console.warn('error loading app settings', storedSettings, err)
      }

    }

    reaction(
      () => this.editMode,
      (editing) => setTimeout(() => document.body.scrollTo(0, 99999), 0),
    )

    reaction(
      () => this.saveable,
      (json) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(json))
        console.log('saved app settings', json)
      },
    )
  }
}
