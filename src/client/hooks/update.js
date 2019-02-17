import { useState, useEffect } from 'react'
import { patch } from 'utils'

const onlyChanges = (item1, item2) => {
  let changes = Object.keys(item2).reduce((final, key) => {
    let originalValue = item1[key]
    let newValue = item2[key]
    if (originalValue !== newValue) {
      final[key] = newValue
    }

    return final
  }, {})

  return Object.keys(changes).length > 0 ? changes : undefined
}

export const useUpdate = ({ item, path }) => {
  let [ update, setUpdate ] = useState(item)
  let [ isDirty, setIsDirty ] = useState(false)
  let updateAction = () => {
    let changes = onlyChanges(item, update)

    patch(path, changes)
      .then(success => {
        if (success) {
          console.log('patched item successfully', path, changes)
          setIsDirty(false)
        } else {
          console.warn('error updating', path, changes)
        }
      })
  }

  let revertAction = () => {
    setUpdate(item)
    setIsDirty(false)
  }

  useEffect(() => {
    if (update !== item) {
      // let changes = onlyChanges(item, update)
      setIsDirty(true)
    }
  }, [update])

  return {
    update,
    setUpdate,
    isDirty,
    updateAction,
    revertAction,
  }
}
