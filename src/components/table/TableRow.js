import React from 'react'
import MuiTableRow from '@material-ui/core/TableRow'
import MuiTableCell from '@material-ui/core/TableCell'
import MuiCheckbox from '@material-ui/core/Checkbox'

import { dataToRow } from './utils'

const TableRow = ({ item, fields, selected, selection, onSelect, onClick }) => {
  const values = dataToRow(fields, item)
  return (
    <MuiTableRow hover>
      {selection && (
        <MuiTableCell padding="checkbox">
          <MuiCheckbox checked={selected} onChange={evt => onSelect(item)} />
        </MuiTableCell>
      )}
      {values.map((value, idx) => (
        <MuiTableCell key={idx} onClick={evt => onClick(item)}>
          {value}
        </MuiTableCell>
      ))}
    </MuiTableRow>
  )
}

export default TableRow
