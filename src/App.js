import React, { Component } from 'react';
import './App.css';

import DATA from './data.js';

import Table from './components/Table';
import Select from './components/Select';

class App extends Component {
  defaultState = {
    airline: 'all',
    airport: 'all',
  }
  constructor (props) {
    super(props)

    this.state = this.defaultState;
  }

  formatValue = (property, value) => {
    if (property === 'airline') return DATA.getAirlineById(value).name;

    return DATA.getAirportByCode(value).name;
  };

  airlineSelected = (value) => {
    if (value !== 'all') value = parseInt(value, 10);

    this.setState({ airline: value });
  }

  airportSelected = (value) => this.setState({ airport: value });

  clearFilters = () => this.setState(this.defaultState);

  airlineServesRoute = (route) => [route.airline, 'all'].includes(this.state.airline);

  airportOnRoute = (route) => [route.src, route.dest, 'all'].includes(this.state.airport);

  render() {
    const columns = [
      { name: 'Airline', property: 'airline' },
      { name: 'Source Airport', property: 'src' },
      { name: 'Destination Airport', property: 'dest' },
    ];

    const filteredRoutes = DATA.routes.filter(route => {
      return this.airportOnRoute(route) && this.airlineServesRoute(route);
    });

    const filteredRoutesByAirline = DATA.routes.filter(this.airlineServesRoute);

    const filteredRoutesByAirport = DATA.routes.filter(this.airportOnRoute);

    const availableAirlines = DATA.airlines.filter(airline => {
      return filteredRoutesByAirport.some(route => route.airline === airline.id);
    });

    const availableAirports = DATA.airports.filter(airport => {
      return filteredRoutesByAirline.some(route => {
        return [route.src, route.dest].includes(airport.code)
      });
    });
  
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>
            Welcome to the app!
          </p>
          <p>
            Showing routes on 
            <Select 
              options={availableAirlines}
              valueKey='id'
              titleKey='name'
              allTitle='All Airlines'
              value={this.state.airline}
              onSelect={this.airlineSelected}
            />
            flying in to or out of 
            <Select 
              options={availableAirports}
              valueKey='code'
              titleKey='name'
              allTitle='All Airports'
              value={this.state.airport}
              onSelect={this.airportSelected}
            />
          </p>
          <Table
            className='routes-table'
            columns={columns}
            rows={filteredRoutes}
            format={this.formatValue}
          />
        </section>     
      </div>
    );
  }
}

export default App;