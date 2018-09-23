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

const EditorBox = styled.div`
  width: 400px;
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
const Panel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.17);
  padding: 1.5em;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`

const Description = styled.p`
  color: #FFF;
`
export default ({ code, description }) => (
  <LiveProvider code={code} scope={scope}>
    <Panel>
      <EditorBox>
        <LiveEditor />
      </EditorBox>
      <LiveBox>
        <Description>{ description }</Description>
        <LiveError />
        <LivePreview />
      </LiveBox>
    </Panel>
  </LiveProvider>
)
