import React from 'react'
import Toggler from './Toggler'

/*
  This is a "stateful" ES6 React component.  It is an ES6 class, including constructor (if necessary),
  state definition, internal methods, etc.  If any advanced logic or component lifecycle stages are needed,
  create a component using this structure.

  Notice that this component renders a child component, <Toggler />, and passes in values and functions that
  are defined/tracked in *this* component.  This method allows children to be "dumb" components that are easy to
  render, understand, and write.
*/
class Person extends React.PureComponent {
  // predefining some state for the component
  state = {
    isSelected: false
  }

  // an example internal function that sets the local state to true
  toggleSelected = () => this.setState({ isSelected: !this.state.isSelected })

  // every react class must have a render method, which should return a single wrapping element
  render() {
    let { name } = this.props
    let { isSelected } = this.state

    // inside this, we embed an example of a stateless component, that simply takes props from upstream (here)
    return (
      <p className="person">
        Hi, { name }, welcome to React!  Currently you
        <Toggler value={isSelected} clickHandler={this.toggleSelected} />
        selected.
      </p>
    )
  }
}

export default Person
