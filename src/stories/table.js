import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import faker from 'faker'

import withTheme from '../theme'
import _Table from '../components/Table'

const Table = props => withTheme(props)(_Table)

const stories = storiesOf('Table', module)

stories.add('empty', () => <Table />)

const buildFakePerson = () => {
  return {
    _id: faker.random.uuid(),
    avatar: faker.internet.avatar(),
    lastName: faker.name.lastName(),
    firstName: faker.name.firstName(),
    email: faker.internet.email()
  }
}

const people = []
for (let i = 0; i < 100; i++) {
  people.push(buildFakePerson())
}

const SimpleTableContainer = () => {
  const [fields, setFields] = useState([
    { name: 'lastName', type: 'text', caption: 'Last Name' },
    { name: 'firstName', type: 'text', caption: 'First Name' },
    { name: 'email', type: 'text', caption: 'Email' }
  ])
  const [data, setData] = useState(people)
  const [selected, setSelected] = useState([])
  const [sortBy, setSortBy] = useState('')
  const [sortDirection, setSortDirection] = useState('asc')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [pageData, setPageData] = useState(
    data.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize)
  )

  const actions = {
    onPageChange: _page => {
      const newPage = _page + 1
      console.log('onPageChange', _page)
      setPage(newPage)
      setPageData(
        data.slice(
          (newPage - 1) * pageSize,
          (newPage - 1) * pageSize + pageSize
        )
      )
    },
    onSortChange: field => {
      const direction =
        sortBy === field && sortDirection === 'asc' ? 'desc' : 'asc'
      setSortBy(field)
      setSortDirection(direction)
      console.log('onSortChange', field, direction)
    }
  }
  console.log('parent onRender', page, pageSize)
  console.log(data.indexOf(pageData[0]))

  return (
    <Table
      fields={fields}
      data={pageData}
      total={data.length}
      sortBy={sortBy}
      sortDirection={sortDirection}
      page={page}
      pageSize={pageSize}
      actions={actions}
    />
  )
}

stories.add('simple', () => <SimpleTableContainer />)

export default stories
