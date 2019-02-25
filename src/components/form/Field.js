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

const Field = ({
  name,
  label,
  type,
  value,
  errors,
  onBlur,
  onChange,
  options = {}
}) => {
  const classes = useStyles()
  return (
    <MuiFormControl className={classes.field} fullWidth>
      {type !== 'autocomplete' && (
        <MuiInputLabel htmlFor={name}>{label}</MuiInputLabel>
      )}
      <FieldSelector
        id={name}
        className={classes.field}
        label={label}
        name={name}
        type={type}
        value={value}
        errors={errors}
        options={options}
        onBlur={onBlur}
        onChange={onChange}
      />
    </MuiFormControl>
  )
}

export default Field
