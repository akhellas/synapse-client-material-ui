import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'
import orange from '@material-ui/core/colors/orange'

export const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: blue,
    secondary: orange,
    error: red
  },
  spacing: {
    unit: 8
  }
})

const withTheme = props => Component => {
  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div>
          <Component {...props} />
        </div>
      </ThemeProvider>
    </div>
  )
}

export default withTheme
