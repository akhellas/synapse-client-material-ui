import React from 'react'
import MuiInput from '@material-ui/core/Input'
import MuiInputLabel from '@material-ui/core/InputLabel'

const TextField = props => {
  return (
    <>
      <MuiInputLabel htmlFor={props.name}>{props.label}</MuiInputLabel>
      <MuiInput {...props} />
    </>
  )
}

export default TextField
