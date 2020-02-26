'use strict';

const apiKey = 'YjrY55rhhguzWdQ2T2A4eY5cPs2hrDyk4nePQQjE';
const baseUrl = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  console.log(params);
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayResults(responseJson) {
  $('.results-list, .js-error-message').empty();

  for (let i = 0; i < responseJson.total; i++) {
    $('.results-list').append(
     `<li>
        <h3>${responseJson.data[i].fullName}</h3>
        <p>${responseJson.data[i].description}</p>
        <address>
          ${responseJson.data[i].addresses[1].line1}<br>
          ${responseJson.data[i].addresses[1].city}, ${responseJson.data[i].addresses[1].stateCode}<br>
          ${responseJson.data[i].addresses[1].postalCode}
        </address>
        <a href="${responseJson.data[i].url}"}>${responseJson.data[i].url}</a>
      </li>`
    );
  }

}

function getParksList(searchTerm, state, maxResults) {
  const params = {
    q: searchTerm,
    stateCode: state,
    limit: maxResults,
    fields: 'addresses',
    api_key: apiKey
  };
  const queryString = formatQueryParams(params);
  const url = baseUrl + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => {
      console.log(responseJson);
      displayResults(responseJson);
    })
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