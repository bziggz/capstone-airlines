import React, { Component } from 'react';

import DATA from '../data.js';

class Table extends Component {
  static defaultProps = {
    format(property, value) { value },
  }

  constructor(props) {
    super(props)
  }

  render () {
    const tableHeaders = this.props.columns.map((column) => {
      return <th key={column.name}>{column.name}</th>
    });

    const tableRows = this.props.rows.map((row) => {
      const rowData = this.props.columns.map((column) => {
        const value = row[column.property];
        return <td key={column.property + value}>
          {this.props.format(column.property, value)}
        </td>
      });

      return <tr key={Object.values(row).join('-')}>{rowData}</tr>
    });

    return (
      <div>
        <table className='table'>
          <thead>
            {tableHeaders}
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;