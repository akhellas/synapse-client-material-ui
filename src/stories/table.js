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
    data.slice(page * pageSize, page * pageSize + pageSize)
  )

  const actions = {
    onPageChange: page => {
      console.log('onPageChange', page)
      setPage(page)
      setPageData(data.slice(page * pageSize, page * pageSize + pageSize))
    },
    onSortChange: field => {
      const direction =
        sortBy === field && sortDirection === 'asc' ? 'desc' : 'asc'
      setSortBy(field)
      setSortDirection(direction)
      console.log('onSortChange', field, direction)
    },
    onSelect: item => {
      const exists = selected.find(x => x._id === item._id)
      let newSelected = [...selected]
      if (exists) {
        newSelected.splice(selected.indexOf(exists), 1)
      } else {
        newSelected = [...selected, item]
      }
      setSelected(newSelected)
    }
  }

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
