import React from 'react'
import renderer from 'react-test-renderer'
import Index from '../pages/index'

describe('page - index', () => {
  it('should render', () => {
    const component = renderer.create(<Index />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
