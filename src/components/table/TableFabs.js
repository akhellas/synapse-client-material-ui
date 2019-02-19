import React from 'react'
import { makeStyles } from '@material-ui/styles'
import MuiFab from '@material-ui/core/Fab'
import MuiTooltip from '@material-ui/core/Tooltip'

import AddIcon from '@material-ui/icons/Add'

const TableFabs = ({ classes, onAdd }) => {
  return (
    <div className={classes.fabContainer}>
      <MuiTooltip title="Προσθήκη" placement="left">
        <div>
          <MuiFab color="primary" className={classes.fab} onClick={onAdd}>
            <AddIcon />
          </MuiFab>
        </div>
      </MuiTooltip>
    </div>
  )
}

export default TableFabs
