import { Component } from 'react';

class IPSearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  /**
   * Handle the form submit
   * @desc Validates the input and calls the handleSearch 
   *   function passed in as a prop
   * @param  {Object} event
   * @return {void}
   */
  handleSubmit(event) {
    if (this.validateInput(this.state.value)) {
      this.props.handleSearch(this.state.value);
      this.setState({ value: '' });
    }
    else {
      this.props.setError({
        message: 'Please enter a valid IPv4 with format xxx.xxx.xxx.xxx where each part is a number between 0-255',
      });
    }
    event.preventDefault();
  }

  /**
   * Confirm that the input is a valid ip address
   * @param  {string} value
   * @return {boolean}
   */
  validateInput(value) {
    let parts = value.split('.');

    if (parts.length !== 4) {
      return false;
    }

    // each number within the ip address must be a number
    // between 0 and 255 (inclusive)
    for (let i=0; i < parts.length; i++) {
      value = Number(parts[i]);

      if (isNaN(value) || value < 0 || value > 255) {
        return false;
      }
    }

    return true;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Please enter an IPv4 address:
          <input type="text" className="ip-search-form" value={ this.state.value } onChange={ this.handleChange } />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default IPSearchForm;