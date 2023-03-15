const baseUrl = import.meta.env.VITE_BASE_URI;
let apiBaseUrl = import.meta.env.VITE_API_URI;

if (baseUrl) {
  apiBaseUrl = baseUrl + '/_/api';
}

export const API_BASE_URI = apiBaseUrl;
