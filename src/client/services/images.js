import { observable, computed, reaction } from 'mobx'

console.log('image service loaded')

export class Image {
  @observable src = undefined
  @observable previewLoading = true

  constructor(path, parent) {
    this.el = {
      full: document.createElement('img'),
      preview: document.createElement('img'),
    }

    setTimeout(() => this.load(path,parent), 0)
  }

  load(path, parent) {
    let { preview, full } = this.el
    let previewPath = preview.src = path.replace(/^(.*)(\.jpg)$/, '$1,preview$2')

    // create load chain
    preview.onload = () => {
      // console.log('preview loaded')
      this.previewLoading = false
      this.src = previewPath
    }

    // console.log('previews loading', parent.previewsLoading)

    reaction(
      () => parent.previewsLoading,
      (pending, reaction) => {
        if (pending < 3) {
          // console.log(pending, 'pending previews, loading image')
          full.src = path
          full.onload = () => {
            // console.log('full image loaded')
            this.src = path
          }

          reaction.dispose()
        }
      }
    )
  }
}

export class ImageService {
  @observable images = {}

  getImage = (path) => {
    let image = this.images[path] || (this.images[path] = new Image(path, this))

    return image.src
  }

  @computed get previewsLoading() {
    return Object.values(this.images).filter(i => i.previewLoading).length
  }
}

export default new ImageService()
