import React, { useRef } from 'react'
import AsyncSelect from 'react-select/lib/Async'
import classNames from 'classnames'
import { makeStyles, useTheme } from '@material-ui/styles'
import { emphasize } from '@material-ui/core/styles/colorManipulator'
import MuiTextField from '@material-ui/core/TextField'
import MuiPaper from '@material-ui/core/Paper'
import MuiChip from '@material-ui/core/Chip'
import MuiTypography from '@material-ui/core/Typography'
import MuiMenuItem from '@material-ui/core/MenuItem'
import { useLogger } from 'react-use'

import CancelIcon from '@material-ui/icons/Cancel'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  input: {
    display: 'flex',
    padding: 0
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden'
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16
  },
  loadingMessage: {
    padding: theme.spacing.unit * 2
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing.unit * 2
  }
}))

const defaultOptions = {
  cacheOptions: true,
  defaultOptions: [],
  isMulti: false,
  isClearable: true,
  getOptionLabel: obj => obj.name || obj
  //getOptionValue: obj => obj
}

const inputComponent = ({ inputRef, ...props }) => {
  return <div ref={inputRef} {...props} />
}

const Control = props => {
  return (
    <MuiTextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  )
}

const Menu = props => {
  return (
    <MuiPaper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </MuiPaper>
  )
}

const MultiValue = props => {
  return (
    <MuiChip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  )
}

const NoOptionsMessage = props => {
  return (
    <MuiTypography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </MuiTypography>
  )
}

const Option = props => {
  return (
    <MuiMenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MuiMenuItem>
  )
}

const Placeholder = props => {
  return (
    <MuiTypography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </MuiTypography>
  )
}

const SingleValue = props => {
  return (
    <MuiTypography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </MuiTypography>
  )
}

const ValueContainer = props => {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  )
}
const LoadingMessage = props => {
  return (
    <MuiTypography
      color="textSecondary"
      className={props.selectProps.classes.loadingMessage}
      {...props.innerProps}
    >
      {props.children}
    </MuiTypography>
  )
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
  LoadingMessage
}

const AutoCompleteField = props => {
  useLogger('AutoCompleteField', props)
  const ref = useRef(null)
  const classes = useStyles()
  const theme = useTheme()
  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit'
      }
    })
  }

  const options = Object.assign({}, defaultOptions, props.options)

  const handleChange = (actionValue, actionOptions) => {
    let value
    //console.log({ ...actionOptions })
    switch (actionOptions.action) {
      case 'select-option':
        value = actionValue
        break
      case 'deselect-option':
        break
      case 'remove-value':
        break
      case 'pop-value':
        break
      case 'set-value':
        break
      case 'clear':
        value = options.isMulti ? [] : null
        break
      case 'create-option':
        break
      default:
        console.log(actionOptions)
        throw new Error(
          'unknown autocomplete action type' + actionOptions.action
        )
    }

    setTimeout(() => {
      const { state } = ref.current.select
      console.log(state)
    }, 1)
    //props.onChange(props.field, value)
  }
  console.log(ref)
  if (options.isMulti) {
    return (
      <AsyncSelect
        {...options}
        ref={ref}
        classes={classes}
        styles={selectStyles}
        components={components}
        onChange={handleChange}
        placeholder=""
        textFieldProps={{
          label: props.label,
          InputLabelProps: {
            shrink: true
          }
        }}
      />
    )
  }

  return (
    <AsyncSelect
      {...options}
      classes={classes}
      styles={selectStyles}
      components={components}
      placeholder={props.label}
      onChange={handleChange}
    />
  )
}

export default AutoCompleteField
