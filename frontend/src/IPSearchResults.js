import React from 'react';

const IPSearchResults = (props) => {

  /**
   * Check if the result contains geolocation data
   * @param  {Object}  results
   * @return {boolean}
   */
  function hasLocationData(results) {
    return results.data 
      && results.data.location 
      && results.data.location.latitude
      && results.data.location.longitude; 
  }

  /**
   * Retrive the error message, depending on the response structure
   * @param  {Object} error
   * @return {string}
   */
  function getErrorMessage(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return error.response.data.error;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return 'No response received from server.'
    } else {
      // Something happened in setting up the request that triggered an Error
      // or we have a validation error
      return error.message;
    }
  }

  const { results, error } = props;

  return (
  <div>
    { error &&
      <p className="error-result">{ getErrorMessage(error) }</p>
    }
    { !error && results && hasLocationData(results) &&
      <div className="search-result">
        <p>Latitude: { results.data.location.latitude }</p>
        <p>Longitude: { results.data.location.longitude }</p>
      </div>
    }
    { !error && results && !hasLocationData(results) &&
      <div className="search-result">
        <p>No location information available for the provided IP</p>
      </div>
    }
  </div>
)};

export default IPSearchResults;