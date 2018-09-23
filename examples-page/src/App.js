import React, { Component } from 'react'
import Example from './components/Example'
import styled from 'styled-components'
import Install from './components/Install'
import examples from './examples'

const Container = styled.div`
  background-color: #4CAF50;
  width: 100%;
  padding-bottom: 200px;
`

const Header = styled.header`
  padding: 20px;
  color: white;
  text-align: center;
`
const Title = styled.h1`
  font-size: 30px;
  color: #FFF;
`
const Subtitle = styled.div`
  font-size: 20px;
  color: #FFF;
`

const Link = styled.a`
  display: inline-block;
  width: auto;
  padding: 0.625rem 1.25rem;
  text-decoration: none;
  border-radius: 0.1875rem;
  background: #5ec662;
  color: #f8f8f2;
  margin: 1.875rem 0;
`

class App extends Component {
  render () {
    return (
      <Container>
        <Header>
          <Title>React Textarea Autocomplete</Title>
          <Subtitle>Simple Textarea Autocomplete for tags, hashtags etc.</Subtitle>
          <Install />
          <Link href='/#'>Github</Link>
        </Header>

        {examples.map(example => (
          <Example
            code={example.code}
            description={example.description}
          />
        ))}

      </Container>
    )
  }
}

export default App
