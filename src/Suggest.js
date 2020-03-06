import React, { useState, useEffect, useRef } from 'react'
import { number, bool, array, string } from 'prop-types'

const propTypes = {
  // Top & Left number, cordenates of the caret
  top: number,
  left: number,

  // Index active for navegate in options
  activeIndex: number,

  // Array of suggest
  list: array,

  // Is open when is matched with the pattern
  isOpen: bool,

  // Character trigger, example #
  char: string,

  // Show character prev in the list if is passed true
  showCharInList: bool
}

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

const Suggest = (props) => {
  const [left, setLeft] = useState(0)
  const panelRef = useRef()

  useEffect(() => {
    // Restrict ul list position in the parent's width
    const { current } = panelRef
    const width = parseFloat(current.clientWidth)

    const parentWidth = props.textareaEl.current.offsetWidth
    let nextLeft = props.left - (width / 2)
    if (props.limitToParent) {
      // It's fixed left position
      if (nextLeft < 0) nextLeft = 0
      if (nextLeft + width > parentWidth) nextLeft = parentWidth - width
    }
    if (nextLeft !== left) {
      setLeft(nextLeft)
    }
  }, [props.isOpen])

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
  } = props

  const suggestStyles = {
    left,
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
      ref={panelRef}
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
          {suggest}
        </li>
      ))}
    </ul>
  )
}

Suggest.propTypes = propTypes

export default Suggest
