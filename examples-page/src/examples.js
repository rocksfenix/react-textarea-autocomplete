export default [
  {
    description: 'Write some and add #s to show de suggest',
    code: `// You can add some words in the list
    <Textarea
      char='#'
      list={[
        'cool',
        'genial',
        'interesante',
        'super',
        'curso',
        'nice',
        'wacamole',
        'fresa'
      ]}
    />`
  },
  {
    description: 'You can change the trigger character, example @cool',
    code: `// You can add some words in the list
    <Textarea
      char='@'
      list={[
        'cool',
        'genial',
        'interesante',
        'super',
        'curso',
        'nice',
        'wacamole',
        'fresa'
      ]}
    />`
  },
  {
    description: 'You can change the styles',
    code: `// You can add some words in the list
    <Textarea
      char='#'
      styleItemActive={{ background: 'orange'}}
      styleItemInactive={{ background: '#2f2f2f'}}
      list={[
        'cool',
        'genial',
        'interesante',
        'super',
        'curso',
        'nice',
        'wacamole',
        'fresa'
      ]}
    />`
  }
]
