import React, { Component } from 'react';
import './App.css';

import DATA from './data.js';
import Table from './components/Table';

class App extends Component {
  formatValue = (property, value) => {
    if (property === 'airline') return DATA.getAirlineById(value).name;

    return DATA.getAirportByCode(value).name;
  };

  render() {
    const columns = [
      { name: 'Airline', property: 'airline' },
      { name: 'Source Airport', property: 'src' },
      { name: 'Destination Airport', property: 'dest' },
    ];

    const routeRows = DATA.routes;
  
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>
            Welcome to the app!
          </p>
          <Table
            className='routes-table'
            columns={columns}
            rows={routeRows}
            format={this.formatValue}
          />
        </section>     
      </div>
    );
  }
}

export default App;