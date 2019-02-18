import React from 'react'
import MuiTableFooter from '@material-ui/core/TableFooter'
import MuiTableRow from '@material-ui/core/TableRow'
import MuiTablePagination from '@material-ui/core/TablePagination'

const TableFooter = ({
  total,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  paging,
  strings
}) => {
  if (!paging) {
    return <MuiTableFooter />
  }
  return (
    <MuiTableFooter>
      <MuiTableRow>
        <MuiTablePagination
          count={total}
          rowsPerPage={pageSize}
          page={page - 1}
          labelRowsPerPage={strings.TABLE_FOOTER.ROWS_PER_PAGE}
          labelDisplayedRows={({ from, to, count }) => {
            // eslint-disable-next-line
            return eval('`' + strings.TABLE_FOOTER.DISPLAYED_ROWS + '`')
          }}
          onChangePage={(evt, p) => onPageChange(p)}
          onChangeRowsPerPage={evt => onPageSizeChange(evt.target.value)}
        />
      </MuiTableRow>
    </MuiTableFooter>
  )
}

export default TableFooter
