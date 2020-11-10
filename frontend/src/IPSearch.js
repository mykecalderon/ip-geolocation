import { Component } from 'react';
import Axios from 'axios';

import IPSearchForm from './IPSearchForm';
import IPSearchResults from './IPSearchResults';
import LoadingSpinner from './LoadingSpinner';

class IPSearch extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.setError = this.setError.bind(this);

    this.state = {
      results: '',
      isLoading: false,
      error: '',
    };
  }

  /**
   * Make an API request to the server to search for 
   * geolocation data for the given IPv4 address
   * @param  {string} ip
   * @return {void}
   */
  handleSearch(ip) {
    this.setState({ isLoading: true, error: '' }, () => {

      const config = {
        baseURL: process.env.REACT_APP_BASE_URL,
      };

      const axios = Axios.create(config);

      axios.post('/ip/search', {
        ip: ip,
      })
      .then(response => this.setState({
          isLoading: false,
          results: response.data,
          error: '',
      }))
      .catch(error => this.setState({
          'results': '',
          isLoading: false,
          error: error,
      }));
    });
  }

  /**
   * Set any error messages manually without making
   * an HTTP call to the API. i.e. client-side validation errors
   * @param {Object} error
   * @return {void}
   */
  setError(error) {
    this.setState({ error: error });
  }

  render() {
    const { results, isLoading, error } = this.state;

    return (
      <div>
        <IPSearchForm handleSearch={ this.handleSearch } setError={ this.setError } />

        { isLoading ? <LoadingSpinner /> : <IPSearchResults results={ results } error={ error } /> }
      </div>
    );
  }
}

export default IPSearch;