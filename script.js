'use strict';

const apiKey = 'YjrY55rhhguzWdQ2T2A4eY5cPs2hrDyk4nePQQjE';
const baseUrl = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  console.log(params);
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function getParksList(searchTerm, state, maxResults) {
  const params = {
    q: searchTerm,
    stateCode: state,
    limit: maxResults
  };
  const queryString = formatQueryParams(params);
  const url = baseUrl + '?' + queryString;

  console.log(url);

  const options = {
    headers: new Headers({
      'X-Api-Key': apiKey,})
  };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => console.log(responseJson))
    .catch(err => {
      $('.js-error-message').text(`Something went wrong: ${err.message}`)
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const state = $('#js-state').val();
    const maxResults = $('#js-max-results').val();
    getParksList(searchTerm, state, maxResults);
  })
}

$(watchForm);