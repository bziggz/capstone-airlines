import React, { Component } from 'react';

class Select extends Component {
  static defaultProps = {
    options: [],
    title: 'Please Select',
    valueKey: '',
    titleKey: '',
    value: 'all',
    onSelect: (value) => null,
  }

  handleChange = (e) => {
    e.preventDefault();
    this.props.onSelect(e.target.value);
  }

  render () {
    const options = this.props.options.map((option) => {
      const value = option[this.props.valueKey];
      return <option key={value} value={value}>
        {option[this.props.titleKey]}
      </option>
    });
    options.unshift(<option key='all' value='all'>All</option>);

    return (
      <select value={this.props.value} onChange={this.handleChange}>
        {options}
      </select>
    );
  }
}

export default Select;