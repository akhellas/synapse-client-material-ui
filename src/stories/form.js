import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import faker from 'faker'

import withTheme from '../theme'
import _Form from '../components/Form'

const Form = props => withTheme(props)(_Form)

const buildFakePerson = () => {
  return {
    _id: faker.random.uuid(),
    avatar: faker.internet.avatar(),
    lastName: faker.name.lastName(),
    firstName: faker.name.firstName(),
    age: faker.random.number({ min: 20, max: 80 }),
    email: faker.internet.email()
  }
}

const fakeApi = searchString => {
  return fetch('http://5c6aa39ad98e3600141cab24.mockapi.io/api/v1/people')
    .then(res => res.json())
    .then(data => {
      return data
        .filter(x =>
          x.lastName.toLowerCase().includes(searchString.toLowerCase())
        )
        .map(x => Object.assign({}, x, { key: x._id }))
    })
    .catch(err => {
      console.log('err', err)
      return []
    })
}

const SimpleFormContainer = ({ isMulti = false }) => {
  const [fields, setFields] = useState([
    { name: '_id', type: 'id', caption: '_id' },
    { name: 'lastName', type: 'text', caption: 'Last Name' },
    { name: 'firstName', type: 'text', caption: 'First Name' },
    { name: 'age', type: 'number', caption: 'Age' },
    { name: 'email', type: 'text', caption: 'Email' },
    {
      name: 'boss',
      type: 'autocomplete',
      caption: 'Boss',
      options: {
        loadOptions: fakeApi,
        getOptionLabel: obj => `${obj.lastName} ${obj.firstName}`,
        getOptionValue: obj => obj._id,
        formatOptionLabel: obj => `${obj.lastName} ${obj.firstName}`,
        isMulti: isMulti
      }
    }
  ])

  const person = buildFakePerson()

  const [state, setState] = useState(person)

  const handleBlur = field => {
    console.log('onBlur', field.name)
  }

  const handleChange = (field, value) => {
    //setState(Object.assign({}, state, { [field.name]: value }))
  }

  const handleSubmit = state => {
    console.log(state)
  }

  return (
    <Form
      fields={fields}
      data={state}
      onBlur={handleBlur}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  )
}

const stories = storiesOf('Form', module)

stories.add('empty', () => <Form />)
stories.add('simple', () => <SimpleFormContainer />)
stories.add('multi', () => <SimpleFormContainer isMulti={true} />)
