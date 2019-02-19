import React from 'react'
import { storiesOf } from '@storybook/react'

import withTheme from '../theme'
import _Table from '../components/Table'

const Table = props => withTheme(props)(_Table)

const stories = storiesOf('Table', module)

stories.add('empty', () => <Table />)

const simpleConfig = {
  fields: [{ name: 'lastName', type: 'text', caption: 'Last Name' }],
  data: [
    { _id: 1, lastName: 'last name 1' },
    { _id: 2, lastName: 'last name 2' }
  ]
}

stories.add('no selection', () => (
  <Table {...simpleConfig} options={{ selection: false }} />
))

stories.add('simple', () => <Table {...simpleConfig} />)

export default stories
