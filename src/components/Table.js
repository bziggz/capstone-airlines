import React, { Component } from 'react';

class Table extends Component {
  static defaultProps = {
    format: (property, value) => value,
    perPage: 25,
  }

  constructor(props) {
    super(props)

    this.state = {
      page: 0,
    }
  }

  nextPage = (e) => {
    e.preventDefault();
    this.setState({ page: this.state.page + 1 });
  };

  previousPage = (e) => {
    e.preventDefault();
    this.setState({ page: this.state.page - 1 });
  };

  render () {
    const tableHeaders = this.props.columns.map((column) => {
      return <th key={column.name}>{column.name}</th>
    });

    const pageStart = this.state.page * this.props.perPage;

    const pageEnd = pageStart + 25 > this.props.rows.length ? 
                      this.props.rows.length : pageStart + 25;

    const tableRows = this.props.rows.slice(pageStart, pageEnd).map((row) => {
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
        <div id='pagination'>
          <p>
            Showing {pageStart + 1} - {pageEnd} of {this.props.rows.length} routes.
          </p>
          <p>
            <button
              key='previous'
              disabled={this.state.page === 0} 
              onClick={this.previousPage}
            >
              Previous Page
            </button>
          </p>
          <p>
            <button
              key='next'
              disabled={pageEnd >= this.props.rows.length} 
              onClick={this.nextPage}
            >
              Next Page
            </button>
          </p>
        </div>
      </div>
    );
  }
}

export default Table;