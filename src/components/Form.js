import React, { useState } from 'react'
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

  return (
    <div className={classes.root}>
      <MuiPaper className={classes.paper}>
        {fields
          .filter(field => shouldDisplay(field))
          .map(field => (
            <Field
              key={field.name}
              classes={classes}
              name={field.name}
              type={field.type}
              label={field.caption}
              value={data[field.name]}
              options={field.options}
              onBlur={() => onBlur(field)}
              onChange={(evt, value) =>
                onChange(
                  field,
                  value || (evt && evt.target ? evt.target.value : null)
                )
              }
            />
          ))}
      </MuiPaper>
    </div>
  )
}

export default Form
