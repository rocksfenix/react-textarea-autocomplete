import React, { Component } from 'react'
import types from 'prop-types'
import getCaretCoordinates from 'textarea-caret'
import Suggest from './Suggest'

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

class TextareaComponent extends Component {
  static propTypes = {
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

  static defaultProps = {
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

  state = {
    top: 0,
    left: 0,
    match: null,
    suggests: [],
    isOpen: false,
    activeIndex: 0,
    value: ''
  }

  textarea = React.createRef()

  componentDidMount () {
    this.createRegExp()

    if (!this.props.ssr) {
      window.addEventListener('keydown', this.keyDown)
    }
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.keyDown)
  }

  keyDown = (e) => {
    if (this.state.isOpen) {
      const code = e.keyCode || e.which

      // Down
      if (code === 40) this.down()
      // Up
      if (code === 38) this.up()
      // Enter
      if (code === 13) this.onSelect()
    }
  }

  up = () => {
    if (this.props.mode === 'lock') {
      const { activeIndex } = this.state
      if (activeIndex - 1 >= 0) {
        this.setState({ activeIndex: activeIndex - 1 })
      }
    }

    if (this.props.mode === 'infinite') {
      const { suggests, activeIndex } = this.state
      if (activeIndex - 1 >= 0) {
        this.setState({ activeIndex: activeIndex - 1 })
      } else {
        this.setState({ activeIndex: suggests.length - 1 })
      }
    }
  }

  down = () => {
    const { mode } = this.props
    const { suggests, activeIndex } = this.state

    if (mode === 'lock') {
      if (activeIndex + 1 < suggests.length) {
        this.setState({ activeIndex: activeIndex + 1 })
      }
    }

    if (mode === 'infinite') {
      if (activeIndex + 1 < suggests.length) {
        this.setState({ activeIndex: activeIndex + 1 })
      } else {
        this.setState({ activeIndex: 0 })
      }
    }
  }

  onChange = (event) => {
    const textarea = event.target
    const { selectionEnd, value } = textarea
    const pos = getCaretCoordinates(this.textarea.current, selectionEnd)
    this.setState({ ...pos, value })
    let match = this.pattern.exec(value.slice(0, selectionEnd))

    // console.log('MATHC', match, value)

    if (match && match[0] && match[0].length >= this.props.minChar) {
      this.setState({ match: match[0], selectionEnd })
      this.getSuggest(match[0])
    } else {
      this.setState({ match: null })
    }
  }

  onSelect = () => {
    const { suggests, activeIndex, selectionEnd, match, value } = this.state
    const { addChar, char } = this.props
    const select = addChar
      ? char + suggests[activeIndex]
      : suggests[activeIndex]

    // It's replace value text
    const pre = value.substring(0, selectionEnd - match.length) + select
    const next = value.substring(selectionEnd)
    const newValue = pre + next
    this.setState({ activeIndex: 0, isOpen: false, value: newValue })
    this.textarea.current.selectionEnd = pre.length
  }

  onKeyDown = (e) => {
    if (this.state.isOpen) {
      if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 13) {
        e.preventDefault()
      }
    }

    if (e.keyCode === 27) {
      this.setState({ isOpen: false })
    }
  }

  getSuggest = (match) => {
    const { list, char, maxSuggest } = this.props
    const tok = match.replace(char, '')
    let suggests = list.filter(sug => sug.indexOf(tok) !== -1)
    // Limit
    if (suggests.length > maxSuggest) {
      suggests = suggests.slice(0, maxSuggest)
    }

    if (suggests.length) {
      this.setState({ suggests, isOpen: true })
    } else {
      this.setState({ isOpen: false })
    }
  }

  createRegExp = () => {
    const character = this.props.char
    // Only match with the last coincidence
    this.pattern = new RegExp(`([${character}])(?:(?!\\1)[^\\s])*$`)
  }

  render () {
    const { top, left, value, match, suggests, isOpen, activeIndex } = this.state
    const { char, showCharInList, spellcheck } = this.props
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
          parent={this.textarea.current}
          {...this.props}
        />
        <textarea
          ref={this.textarea}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          value={value}
          style={styles.textarea}
          spellCheck={spellcheck}
        />
      </div>
    )
  }
}

export default TextareaComponent
