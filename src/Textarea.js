import React, { useState, useEffect, useRef } from 'react'
import types from 'prop-types'
import getCaretCoordinates from 'textarea-caret'
import Suggest from './Suggest'

const propTypes = {
  // List of items ans suggest
  list: types.array,

  // Min characters for search
  minChar: types.number,

  // Character of search, example #
  char: types.string,

  // Max lenght of items in suggest
  maxSuggest: types.number,

  // Make valid for Server Side Rendering
  ssr: types.bool,

  // Behavior in key navegations infinite || lock
  mode: types.string,

  // Adds the character when is selected
  addChar: types.bool,

  // Restrict ul list position in the parent's width
  limitToParent: types.bool,

  // Adds the character in the select list
  showCharInList: types.bool,

  // Accept spaces after, example #seveal words
  acceptSpaces: types.bool,

  // spellcheck
  spellcheck: types.bool,

  // Class css in the ul list
  listClass: types.object,

  // Pass a className in the li item
  // active or inactive
  activeItemClass: types.object,

  inactiveItemClass: types.object,

  // Styles in inactive item
  inactiveItemStyle: types.object,

  // Styles in active item
  activeItemStyle: types.object,

  // Character styles
  charStyle: types.object
}

const defaultProps = {
  list: [],
  minChar: 2,
  char: '#',
  maxSuggest: 5,
  ssr: false,
  mode: 'infinite',
  addChar: true,
  showCharInList: true,
  acceptSpaces: false,
  spellcheck: false,
  limitToParent: false
}

const styles = {
  panel: {
    position: 'relative',
    outline: 'none',
    width: '100%',
    minHeight: '50px'
  },

  textarea: {
    width: '100%',
    minHeight: '50px',
    height: '80px',
    fontSize: '20px'
  }
}

const createRegExp = (character) => {
  // Only match with the last coincidence
  return new RegExp(`([${character}])(?:(?!\\1)[^\\s])*$`)
}

const TextareaComponent = (props) => {
  const [state, setStateBase] = useState({
    top: 0,
    left: 0,
    match: null,
    suggests: [],
    isOpen: false,
    activeIndex: 0,
    value: ''
  })

  const setState = (data) => {
    setStateBase(prevState => ({
      ...prevState,
      ...data
    }))
  }

  useEffect(() => {
    if (!props.ssr) {
      window.addEventListener('keydown', keyDown)
    }

    return () => {
      window.removeEventListener('keydown', keyDown)
    }
  }, [state])

  const pattern = createRegExp(props.char)
  // const [pattern, setPattern] = useState(createRegExp(props.char))

  const textareaRef = useRef()

  const keyDown = (e) => {
    if (state.isOpen) {
      const code = e.keyCode || e.which

      // Down
      if (code === 40) down()
      // Up
      if (code === 38) up()
      // Enter
      if (code === 13) onSelect()
    }
  }

  const up = () => {
    if (props.mode === 'lock') {
      const { activeIndex } = state
      if (activeIndex - 1 >= 0) {
        setState({ activeIndex: activeIndex - 1 })
      }
    }

    if (props.mode === 'infinite') {
      const { suggests, activeIndex } = state
      if (activeIndex - 1 >= 0) {
        setState({ activeIndex: activeIndex - 1 })
      } else {
        setState({ activeIndex: suggests.length - 1 })
      }
    }
  }

  const down = () => {
    const { mode } = props
    const { suggests, activeIndex } = state

    if (mode === 'lock') {
      if (activeIndex + 1 < suggests.length) {
        setState({ activeIndex: activeIndex + 1 })
      }
    }

    if (mode === 'infinite') {
      if (activeIndex + 1 < suggests.length) {
        setState({ activeIndex: activeIndex + 1 })
      } else {
        setState({ activeIndex: 0 })
      }
    }
  }

  const onChange = (event) => {
    const textarea = event.target
    // debugger
    const { selectionEnd, value } = textarea
    const pos = getCaretCoordinates(textarea, selectionEnd)
    setState({ ...pos, value })
    const match = pattern.exec(value.slice(0, selectionEnd))
    // console.log('MATHC', match, value)

    if (match && match[0] && match[0].length >= props.minChar) {
      setState({ match: match[0], selectionEnd })
      // debugger
      getSuggest(match[0])
    } else {
      setState({ match: null })
    }
  }

  const onSelect = () => {
    const { suggests, activeIndex, selectionEnd, match, value } = state
    const { addChar, char } = props
    const select = addChar
      ? char + suggests[activeIndex]
      : suggests[activeIndex]

    // It's replace value text
    const pre = value.substring(0, selectionEnd - match.length) + select
    const next = value.substring(selectionEnd)
    const newValue = pre + next
    setState({ activeIndex: 0, isOpen: false, value: newValue })
    textareaRef.current.selectionEnd = pre.length
  }

  const onKeyDown = (e) => {
    if (state.isOpen) {
      if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 13) {
        e.preventDefault()
      }
    }

    if (e.keyCode === 27) {
      setState({ isOpen: false })
    }
  }

  const getSuggest = (match) => {
    // debugger
    const { list, char, maxSuggest } = props
    const tok = match.replace(char, '')
    let suggests = list.filter(sug => sug.indexOf(tok) !== -1)
    // Limit
    if (suggests.length > maxSuggest) {
      suggests = suggests.slice(0, maxSuggest)
    }

    if (suggests.length) {
      setState({ suggests, isOpen: true })
    } else {
      setState({ isOpen: false })
    }
  }

  const { top, left, value, match, suggests, isOpen, activeIndex } = state
  const { char, showCharInList, spellcheck } = props

  console.log(`
  match: ${match}
  isOpen: ${isOpen}
  `)

  return (
    <div style={styles.panel}>
      <Suggest
        left={left}
        top={top}
        suggests={suggests}
        isOpen={match && isOpen}
        activeIndex={activeIndex}
        char={char}
        showCharInList={showCharInList}
        textareaEl={textareaRef}
        {...props}
      />
      <textarea
        ref={textareaRef}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
        style={styles.textarea}
        spellCheck={spellcheck}
      />
    </div>
  )
}

TextareaComponent.propTypes = propTypes
TextareaComponent.defaultProps = defaultProps

export default TextareaComponent
