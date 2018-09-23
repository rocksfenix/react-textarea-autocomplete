import React from 'react'
import Textarea from 'react-textarea-autocomplete'
import styled from 'styled-components'
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live'

const scope = { Textarea }

const code = `
// You can add some words in the list
<Textarea
  char='#'
  styleItemActive={{ background: 'orange' }}
  styleItemInactive={{ background: 'black' }}

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

const EditorBox = styled.div`
  width: 300px;
  margin: 0 3em;


  @media (max-width: 900px) {
    width: 100%;
  }
`

const LiveBox = styled.div`
  width: 300px;

  @media (max-width: 900px) {
    width: 100%;
  }
`
const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.17);

  @media (max-width: 900px) {
    flex-direction: column;
  }
`

const Description = styled.p`
  color: #FFF;
`
export default () => (
  <LiveProvider code={code} scope={scope}>
    <Row>
      <EditorBox>
        <LiveEditor />
      </EditorBox>
      <LiveBox>
        <Description>Write some and add #s to show de suggest</Description>
        <LiveError />
        <LivePreview />
      </LiveBox>
    </Row>
  </LiveProvider>
)
