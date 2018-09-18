/* global describe, it */
import expect from 'expect'
import React from 'react'
import Textarea from './Textarea'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
// import renderer from 'react-test-renderer'

configure({ adapter: new Adapter() })

const list = [
  'blackberry',
  'watermelon',
  'kiwi',
  'chili',
  'lemon',
  'orange',
  'pineaple'
]

describe('Textarea', () => {
  it('textarea update the value', () => {
    const wrapper = mount(<Textarea list={list} char='#' />)
    wrapper.find('textarea').simulate('change', { target: { value: 'foo' } })
    expect(wrapper.find('textarea').props().value).toEqual('foo')
  })

  it('should show the list options panel', () => {
    const wrapper = mount(<Textarea list={list} char='#' />)
    wrapper.find('textarea').simulate('change', { target: { value: 'foo other #o' } })
    expect(wrapper.find('textarea').props().value).toEqual('foo other #o')
    expect(wrapper.find('ul').html()).toBeDefined()
  })
})
