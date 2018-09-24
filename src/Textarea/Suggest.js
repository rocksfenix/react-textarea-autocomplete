import React, { Component } from 'react'
import { number, bool, array, string } from 'prop-types'

const styles = {
  panel: {
    position: 'absolute',
    minWidth: '150px',
    minHeight: '34px',
    background: '#FFF',
    boxShadow: '1px 3px 28px rgba(0,0,0,0.4)',
    animation: '200ms ease-out',
    willChange: 'transform, opacity',
    borderRadius: '5px',
    margin: 0,
    padding: 0
  },

  item: {
    background: '#FFF',
    color: '#222',
    listStyle: 'none',
    padding: '.5em .5em'
  },

  itemActive: {
    background: '#3f51b5',
    color: '#FFF',
    listStyle: 'none',
    padding: '.5em .5em'
  },

  char: {
    marginRight: '.2em'
  }
}

class Suggest extends Component {
  static propTypes = {
    // Top & Left number, cordenates of the caret
    top: number,
    left: number,

    // Index active for navegate in options
    activeIndex: number,

    // Array of suggest
    suggests: array,

    // Is open when is matched with the pattern
    isOpen: bool,

    // Character trigger, example #
    char: string,

    // Show character prev in the list if is passed true
    showCharInList: bool
  }

  state = {
    left: 0
  }

  panel = React.createRef()

  componentDidUpdate () {
    if (this.props.isOpen) {
      // Restrict ul list position in the parent's width
      const { current } = this.panel
      const width = parseFloat(current.clientWidth)
      const parentWidth = this.props.parent.offsetWidth
      let left = this.props.left - (width / 2)
      if (this.props.limitToParent) {
        // It's fixed left position
        if (left < 0) left = 0
        if (left + width > parentWidth) left = parentWidth - width
      }
      if (left !== this.state.left) {
        this.setState({ left })
      }
    }
  }

  render () {
    const {
      suggests,
      // left,
      activeIndex,
      char,
      showCharInList,
      isOpen,
      listClass,
      inactiveItemStyle,
      activeItemStyle,
      activeItemClass,
      inactiveItemClass,
      charStyle
    } = this.props

    const suggestStyles = {
      left: this.state.left,
      top: `-${suggests.length * 36}px`,
      transform: isOpen ? 'scale(1)' : 'scale(0.9)',
      opacity: isOpen ? '1' : '0',
      transition: 'opacity 200ms ease-out, transform 200ms ease-out',
      zIndex: isOpen ? '1000' : '-1'
    }

    const endListStyles = {
      ...styles.panel,
      ...suggestStyles,
      ...listClass
    }

    const itemStyleInactive = {
      ...styles.item,
      ...inactiveItemStyle
    }

    const itemStyleActive = {
      ...styles.itemActive,
      ...activeItemStyle
    }

    const charStyles = {
      ...styles.char,
      ...charStyle
    }

    return (
      <ul
        style={endListStyles}
        className={listClass}
        ref={this.panel}
      >
        {suggests.map((suggest, index) => (
          <li
            key={suggest}
            style={index === activeIndex ? itemStyleActive : itemStyleInactive}
            className={index === activeIndex ? activeItemClass : inactiveItemClass}
          >
            {
              showCharInList
                ? <span style={charStyles}>{char}</span>
                : ''
            }
            { suggest }
          </li>
        ))}
      </ul>
    )
  }
}

export default Suggest
