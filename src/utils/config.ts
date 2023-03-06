/*
 * Route configuration:
 * If BASE_URL is defined (via ENV var or via HTML-embed) the API_BASE_URI and SIMULATOR_BASE_URI are created by appending
 * If it is not defined (dev environment), it will read the ENV vars: REACT_APP_API_URI and REACT_APP_SIMLATOR_URI
 */
const baseUrl = process.env.REACT_APP_BASE_URI;
let apiBaseUrl = process.env.REACT_APP_API_URI;

if (baseUrl) {
  apiBaseUrl = baseUrl + "/_/api";
}

export const API_BASE_URI = apiBaseUrl;
