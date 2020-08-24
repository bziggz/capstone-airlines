import React, { Component } from 'react';
import './App.css';

import DATA from './data.js';
// import Table from './components/Table';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>
            Welcome to the app!
          </p>
          <Table />
        </section>     
      </div>
    );
  }
}

class Table extends Component {
  routeRows = () => {
    return DATA.routes.map((route, idx) => {
      return (
        <tr key={idx}>
          <td>{route.airline}</td>
          <td>{route.src}</td>
          <td>{route.dest}</td>
        </tr>
      )
    });
  };

  state = {
    routes: this.routeRows(),
  };
  
  render() {
    return (
      <div>
        <table className='table'>
          <thead>
            <td>Airline</td>
            <td>Source</td>
            <td>Destination</td>
          </thead>
          <tbody>
            {this.state.routes}
          </tbody>
        </table>
      </div>
    );
  }
}
export default App;