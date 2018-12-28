import React from 'react'
import Toggler from './Toggler'
import { observer, inject } from 'mobx-react'

const Person = ({ name, images }) =>
  <p className="person">
    Hi, { name }, welcome to React!  Currently you
    <Toggler value={images.enabled} clickHandler={images.toggle} />
    selected.  There are { images.items.length } images.
  </p>

export default inject('images')(observer(Person))
