import React from 'react'
import renderer from 'react-test-renderer'
import Layout from '../components/layout'

const MOCK = {
  title: 'Rae the Doe',
  description: 'A webcomic about a gay disaster, a punk skunk, and lots and lots of puns. Created by Olive Rae Brinker. Updates Monday, Wednesday and Friday.'
}

describe('component - layout', () => {
  it('should render', () => {
    const component = renderer.create(<Layout />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('should render with props', () => {
    const component = renderer.create(<Layout {...MOCK}><b>#content</b></Layout>)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
