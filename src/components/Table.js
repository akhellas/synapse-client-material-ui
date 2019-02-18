import React from 'react'
import { makeStyles } from '@material-ui/styles'
import MuiTable from '@material-ui/core/Table'
import MuiTableBody from '@material-ui/core/TableBody'

import defaultStrings from './table/strings.json'

import NoData from './table/NoData'
import TableRow from './table/TableRow'
import TableFooter from './table/TableFooter'

const useStyles = makeStyles(theme => ({
  root: {}
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
  onPageSizeChange: pageSize => console.log('onPageSizeChange', pageSize)
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
  return (
    <div>
      <MuiTable>
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
    </div>
  )
}

export default Table
