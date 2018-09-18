# React Textarea Autocomplete
<hr/>
Simple React Textarea component for autocomplete hashtags, tags etc.

## Installation
``npm install react-textarea-autocomplete``

## Usage
```javascript
import React, { Component } from 'react'
import TextareaAutocomplete from 'react-textarea-autocomplete'

class App extends Component {
  render () {
    const fruts = [
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

This component uses Standard JS

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)