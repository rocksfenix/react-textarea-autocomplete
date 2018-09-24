# React Textarea Autocomplete
<hr/>
Simple React Textarea component for autocomplete hashtags, tags etc.

## Installation
```npm install react-textarea-autocomplete```

## [DEMO](https://gerardogallegos.github.io/react-textarea-autocomplete-page/)

## Usage
```javascript
import React, { Component } from 'react'
import TextareaAutocomplete from 'react-textarea-autocomplete'

class App extends Component {
  render () {
    const fruts = [
      'tacos',
      'blackberry',
      'watermelon',
      'kiwi',
      'chili',
      'lemon',
      'orange',
      'pineaple'
    ]

    return (
      <div>
        <TextareaAutocomplete
          list={fruts}
          char='#'
        />
      </div>
    )
  }
}

```
## PropTypes

Prop Name          | Type      | Default    | Description |
------------------ | --------- | ---------- | ----------- |
list               | Array     | [ ]        | List of items ans suggest |
minChar            | Number    | 2          | Min characters for trigger after the char # |
char               | String    | #          | Character of search, example # |
maxSuggest         | Number    | [ ]        | Max lenght of items in suggest |
mode               | String    | infinite   | Behavior in key navegations infinite || lock |
addChar            | Boolean   | true       | Adds the character in textarea when is selected |
limitToParent      | Boolean   | false      | Restrict ul list position in the parent's width |
showCharInList     | Boolean   | true       | Adds the character in the select list |
spellcheck         | Boolean   | false      | Spellcheck in textarea |
listClass          | String    | ""         | Custom class css in the ul list |
activeItemClass    | String    | ""         | Custom class css in the li item active |
inactiveItemClass  | String    | ""         | Custom class css in the li item inactive |
activeItemStyle    | Object    | { }        | Styles in active item |
inactiveItemStyle  | Object    | { }        | Styles in inactive item |
charStyle          | Object    | { }        | Char styles in the item |

-----

This component uses Standard JS

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)