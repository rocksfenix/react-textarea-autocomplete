import React from 'react'
import Textarea from 'react-textarea-autocomplete'

function App () {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Textarea Autocomplete</h1>
        <div style={{ width: 300, margin: '0 auto' }}>
          <Textarea
            list={[
              'blackberry',
              'watermelon',
              'kiwi',
              'chili',
              'lemon',
              'orange',
              'pineaple'
            ]}
            char='#'
          />
        </div>
      </header>
    </div>
  )
}

export default App
