import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import MuiTable from '@material-ui/core/Table'
import MuiTableBody from '@material-ui/core/TableBody'

import defaultStrings from './table/strings.json'

import TableHeader from './table/TableHeader'
import TableFooter from './table/TableFooter'
import TableFabs from './table/TableFabs'
import TableRow from './table/TableRow'
import NoData from './table/NoData'

const useStyles = makeStyles(theme => ({
  root: {},
  fabContainer: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column'
  },
  fab: {
    margin: theme.spacing.unit
  }
}))

const defaultOptions = {
  selection: true,
  filtering: true,
  sorting: true,
  paging: true
}

const defaultActions = {
  onSelect: item => console.log('onSelect', item),
  onClick: item => console.log('onRowClick', item),
  onPageChange: page => console.log('onPageChange', page),
  onPageSizeChange: pageSize => console.log('onPageSizeChange', pageSize),
  onAdd: () => console.log('onAdd'),
  onSelectAll: () => console.log('onSelectAll'),
  onSortChange: (sortBy, sortDirection) =>
    console.log('onSortChange', sortBy, sortDirection)
}

const Table = ({
  fields = [],
  data = [],
  total = data.length,
  page = 1,
  pageSize = 10,
  options = defaultOptions,
  actions = defaultActions,
  strings = defaultStrings
}) => {
  const classes = useStyles()
  const [selected, setSelected] = useState([])
  const [sortBy, setSortBy] = useState('')
  const [sortDirection, setSortDirection] = useState('asc')

  const handleSortChange = (prevSortBy, sortDirection, newSortBy) => {
    const direction =
      prevSortBy === newSortBy && sortDirection === 'asc' ? 'desc' : 'asc'

    setSortBy(newSortBy)
    setSortDirection(direction)
    if (actions.onSortChange) {
      actions.onSortChange(prevSortBy, direction, newSortBy)
    }
  }

  return (
    <div>
      <MuiTable>
        <TableHeader
          fields={fields}
          options={options}
          total={total}
          sortBy={sortBy}
          sortDirection={sortDirection}
          selected={selected}
          onSelectAll={actions.onSelectAll}
          onSortChange={handleSortChange}
        />
        <MuiTableBody>
          {data.length > 0 ? (
            data.map(item => (
              <TableRow
                key={item._id || item.id}
                item={item}
                fields={fields}
                selection={options.selection}
                onSelect={actions.onSelect}
                onClick={actions.onClick}
              />
            ))
          ) : (
            <NoData
              classes={classes}
              colSpan={fields.length + (options.selection === false ? 0 : 1)}
              text={strings.TABLE_BODY.NO_DATA}
            />
          )}
        </MuiTableBody>
        <TableFooter
          total={total}
          paging={options.paging}
          page={page}
          pageSize={pageSize}
          onPageChange={actions.onPageChange}
          onPageSizeChange={actions.onPageSizeChange}
          strings={strings}
        />
      </MuiTable>
      {actions.onAdd && <TableFabs classes={classes} onAdd={actions.onAdd} />}
    </div>
  )
}

export default Table
