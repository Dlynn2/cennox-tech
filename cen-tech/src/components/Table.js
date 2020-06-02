import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import {Table as RsTable} from 'reactstrap'
const Table = (props) => {
  const { headers, rows, tableName } = props;
  return (
    <div>
      <RsTable striped hover bordered>
      <TableHeader headers={headers}> </TableHeader>
      <TableBody headers={headers} rows={rows} tableName={tableName}></TableBody>
      </RsTable> 
    </div>
  );
}

export default Table;