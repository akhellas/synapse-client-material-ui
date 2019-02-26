import React from 'react'
import { makeStyles } from '@material-ui/styles'
import MuiFormControl from '@material-ui/core/FormControl'
import MuiInputLabel from '@material-ui/core/InputLabel'

import TextField from './TextField'
import NumberField from './NumberField'
import AutoCompleteField from './AutoCompleteField'

const useStyles = makeStyles(theme => ({
  field: {
    marginBottom: theme.spacing.unit
  }
}))

const FieldSelector = props => {
  switch (props.type) {
    case 'text':
      return <TextField {...props} />
    case 'number':
      return <NumberField {...props} />
    case 'autocomplete':
      return <AutoCompleteField {...props} />
    default:
      throw new Error('unknown Field type:' + field.type)
  }
}

const Field = props => {
  const classes = useStyles()
  return (
    <MuiFormControl className={props.classes.field} fullWidth>
      <FieldSelector {...props} />
    </MuiFormControl>
  )
}

export default Field
