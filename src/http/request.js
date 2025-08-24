// import store from '../redux/store';

const baseURL = `${process.env.REACT_APP_API_URL}`;
const genericErrorMessage = 'Something went wrong';
/**
 * Response object
 * @typedef {response} response
 */

/**
 * this function returns true or false with response from server
 * @param {response} response
 * @returns {boolean} Boolean
 */
export function isRequestSuccessful(response) {
  console.log(response)
  console.log(response?.success)
  return response?.success;
}

/**
 * Error object
 * @typedef {error} error
 */

/**
 *
 * @param {error} error
 */
function handleError(error) {
  return Promise.reject(error || genericErrorMessage);
}

/**
 * Handle responses from requests
 * @param {response} response - Response object to be resolved or rejected
 */
function handleResponse(response) {
  return Promise.resolve(response?.json());
}

/**
 * Stadard headers
 * @param {boolean} needsAuth - If authentication token is required for the request that the headers will be used
 * @param {object} customHeaders - If custom header key-values are required for the request, they can be added here. If not specified, default is {}
 */
const headers = (needsAuth, customHeaders = {}) =>
 
    new Headers({
      'Content-Type': 'application/json',
      ...(needsAuth && {Authorization: `Bearer ${"yte"}`}),
      ...customHeaders,
    });
  

/**
 * Standard request
 * @param {string} url - URL of endpoint
 * @param {string} method - HTTP method e.g GET, POST, PUT, DELETE
 * @param {object} data - Payload to be sent in request body
 * @param {object} customHeaders - If custom header key-values are required for the request, they can be added here
 * @param {boolean} needsAuth - If authentication token is required for the request
 */
const request = (url, method, data, customHeaders, needsAuth = true) =>
  new Request(url, {
    method: method || 'GET',
    headers: headers(needsAuth, customHeaders),
    ...(method && {body: JSON.stringify(data)}),
    // mode: 'cors',
    // cache: 'default',
  });

/**
 * Make requests to any endpoint
 * @param {string} url - URL of endpoint
 * @param {string} method - HTTP method e.g GET, POST, PUT, DELETE
 * @param {object} data - Payload to be sent in request body
 * @param {object} customHeaders - If custom header key-values are required for the request, they can be added here
 * @param {boolean} needsAuth - If authentication token is required for the request
 */
export function makeRequest(url, method, data, customHeaders, needsAuth) {
  return fetch(request(url, method, data, customHeaders, needsAuth))
    .then(handleResponse)
    .catch(handleError);
}

/**
 * Make requests to the Inboxx backend
 * @param {string} url - path on Inboxx backend
 * @param {string} method - HTTP method e.g GET, POST, PUT, DELETE
 * @param {object} data - Payload to be sent in request body
 * @param {object} customHeaders - If custom header key-values are required for the request, they can be added here
 * @param {boolean} needsAuth - If authentication token is required for the request
 */
export function makeAPIRequest(url, method, data, customHeaders, needsAuth) {
  return fetch(
    request(`${baseURL}${url}`, method, data, customHeaders, needsAuth),
  )
    .then(handleResponse)
    .catch(handleError);
}

/**
 * Make an authentication API request
 * @name AuthAPIRequest
 * @param {string} path - URL path e.g "/register"
 * @param {string} method - HTTP method e.g GET, POST, PUT, DELETE
 * @param {object} data - Payload to be sent in request body
 * @param {object} customHeaders - If custom header key-values are required for the request, they can be added here
 */
const makeAuthAPIRequest = (path, method, data, customHeaders) =>
  makeAPIRequest(`${path}`, method, data, customHeaders, true);

/**
 * Make a GET authentication API request
 * @name AuthGETAPIRequest
 * @param {string} path - URL path e.g "/register"
 * @param {object} data - Payload to be sent in request body
 * @param {object} customHeaders - If custom header key-values are required for the request, they can be added here
 */
export const makeAuthGETAPIRequest = (path, data = {}, customHeaders) =>
  makeAuthAPIRequest(`${path}`, '', data, customHeaders);

/**
 * Make a POST authentication API request
 * @name AuthPOSTAPIRequest
 * @param {string} path - URL path e.g "/register"
 * @param {object} data - Payload to be sent in request body
 * @param {object} customHeaders - If custom header key-values are required for the request, they can be added here
 */
export const makeAuthPOSTAPIRequest = (path, data = {}, customHeaders) =>
  makeAuthAPIRequest(`${path}`, 'POST', data, customHeaders);

/**
 * Make a PUT authentication API request
 * @name AuthPUTAPIRequest
 * @param {string} path - URL path e.g "/register"
 * @param {object} data - Payload to be sent in request body
 * @param {object} customHeaders - If custom header key-values are required for the request, they can be added here
 */
export const makeAuthPUTAPIRequest = (path, data = {}, customHeaders) =>
  makeAuthAPIRequest(`${path}`, 'PUT', data, customHeaders);

/**
 * Make a DELETE authentication API request
 * @name AuthDELETEAPIRequest
 * @param {string} path - URL path e.g "/register"
 * @param {object} data - Payload to be sent in request body
 * @param {object} customHeaders - If custom header key-values are required for the request, they can be added here
 */
export const makeAuthDELETEAPIRequest = (path, data = {}, customHeaders) =>
  makeAuthAPIRequest(`${path}`, 'DELETE', data, customHeaders);
