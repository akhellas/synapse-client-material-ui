import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/styles'
import MuiPaper from '@material-ui/core/Paper'

import Field from './form/Field'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    width: '600px',
    maxWidth: '100%',
    padding: theme.spacing.unit * 3
  },
  fabContainer: {
    position: 'absolute',
    top: 64 + theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column'
  },
  fab: {
    margin: theme.spacing.unit
  }
}))

const shouldDisplay = field => {
  return !field.name.startsWith('_') && field.visible !== false
}

const Form = ({
  data,
  fields = [],
  errors = {},
  onBlur,
  onChange,
  onSubmit
}) => {
  const classes = useStyles()
  const [state, setState] = useState(data)

  const handleSubmit = evt => {
    console.log(refs.map(r => r.ref))
    evt.preventDefault()
  }

  const refs = []
  const displayable = fields.filter(field => shouldDisplay(field))
  // displayable.forEach(field => {})

  displayable.forEach(field => {
    const ref = useRef(null)

    const FormField = (
      <Field
        key={field.name}
        ref={ref}
        classes={classes}
        name={field.name}
        type={field.type}
        label={field.caption}
        defaultValue={data[field.name]}
        options={field.options}
      />
    )
    refs.push(FormField)
  })

  return (
    <div className={classes.root}>
      <MuiPaper className={classes.paper}>
        <form onSubmit={handleSubmit}>
          {refs}
          <input type="submit" value="Submit" />
        </form>
      </MuiPaper>
    </div>
  )
}

export default Form
