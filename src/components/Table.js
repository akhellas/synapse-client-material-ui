import React, { useReducer, useState } from 'react'
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
  onSelect: (selected, item, setSelected) => {
    const idx = selected.indexOf(item)
    let newSelected = [...selected]
    if (idx !== -1) {
      newSelected.splice(idx, 1)
    } else {
      newSelected = [...selected, item]
    }
    setSelected(newSelected)
  },
  onSelectAll: (data, selected, setSelected) => {
    const newSelected = selected.length > 0 ? [] : [...data]
    setSelected(newSelected)
  },

  onClick: item => console.log('onRowClick', item),
  onPageChange: page => console.log('onPageChange', page),
  onPageSizeChange: pageSize => console.log('onPageSizeChange', pageSize),
  onAdd: () => console.log('onAdd'),

  onSortChange: (sortBy, sortDirection) =>
    console.log('onSortChange', sortBy, sortDirection)
}

const Table = ({
  fields = [],
  data = [],
  selected = [],
  total,
  page,
  pageSize,
  sortBy,
  sortDirection,
  options,
  actions,
  strings = defaultStrings
}) => {
  const classes = useStyles()
  const [_selected, setSelected] = useState(selected)

  const _actions = Object.assign({}, defaultActions, actions)
  const _options = Object.assign({}, defaultOptions, options)

  console.log('onRender', page, pageSize)
  return (
    <div>
      <MuiTable>
        <TableHeader
          fields={fields}
          options={_options}
          total={data.length}
          selected={_selected.length}
          sortBy={sortBy}
          sortDirection={sortDirection}
          onSelectAll={() => _actions.onSelectAll(data, _selected, setSelected)}
          onSortChange={_actions.onSortChange}
        />
        <MuiTableBody>
          {data.length > 0 ? (
            data.map(item => (
              <TableRow
                key={item._id || item.id}
                item={item}
                fields={fields}
                selected={_selected.indexOf(item) !== -1}
                selection={_options.selection}
                onSelect={() => _actions.onSelect(_selected, item, setSelected)}
                onClick={_actions.onClick}
              />
            ))
          ) : (
            <NoData
              classes={classes}
              colSpan={fields.length + (_options.selection === false ? 0 : 1)}
              text={strings.TABLE_BODY.NO_DATA}
            />
          )}
        </MuiTableBody>
        <TableFooter
          total={total}
          paging={_options.paging}
          page={page}
          pageSize={pageSize}
          onPageChange={_actions.onPageChange}
          onPageSizeChange={_actions.onPageSizeChange}
          strings={strings}
        />
      </MuiTable>
      {_actions.onAdd && <TableFabs classes={classes} onAdd={_actions.onAdd} />}
    </div>
  )
}

export default Table
