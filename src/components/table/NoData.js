import React from 'react'
import MuiTypography from '@material-ui/core/Typography'

const NoData = ({ classes, colSpan, text }) => {
  return (
    <tr>
      <td colSpan={colSpan}>
        <div className={classes.noData}>
          <MuiTypography variant="h6" align="center">
            {text}
          </MuiTypography>
        </div>
      </td>
    </tr>
  )
}

export default NoData
