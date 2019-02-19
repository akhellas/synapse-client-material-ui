import React from 'react'
import MuiTableHead from '@material-ui/core/TableHead'
import MuiTableRow from '@material-ui/core/TableRow'
import MuiTableCell from '@material-ui/core/TableCell'
import MuiCheckbox from '@material-ui/core/Checkbox'
import MuiTableSortLabel from '@material-ui/core/TableSortLabel'

const TableHeader = ({
  fields,
  options,
  total,
  selected,
  sortBy,
  sortDirection,
  onSelectAll,
  onSortChange
}) => {
  return (
    <MuiTableHead>
      <MuiTableRow>
        {options.selection === true && (
          <MuiTableCell padding="none">
            <MuiCheckbox
              indeterminate={selected > 0 && selected < total}
              checked={selected === total}
              onChange={onSelectAll}
            />
          </MuiTableCell>
        )}
        {fields.map((field, index) => (
          <MuiTableCell
            key={index}
            padding="dense"
            //align={field.type === 'number' ? 'right' : 'left'}
            sortDirection={sortBy ? sortDirection : false}
          >
            {options.sorting === false ? (
              field.caption
            ) : (
              <MuiTableSortLabel
                active={sortBy === field.name}
                direction={sortDirection || 'asc'}
                onClick={() => onSortChange(field.name)}
              >
                {field.caption}
              </MuiTableSortLabel>
            )}
          </MuiTableCell>
        ))}
      </MuiTableRow>
    </MuiTableHead>
  )
}

export default TableHeader
