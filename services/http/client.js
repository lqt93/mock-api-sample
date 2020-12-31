import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const HEADERS = {
  'Content-Type': 'application/json',
};

const request = (options) => {
  const fetchInstance = axios.create({
    baseURL: BASE_URL,
    headers: HEADERS,
  });

  return fetchInstance({
    ...options,
  });
};

const get = (url) => request({
  method: 'GET',
  url,
});

export default {
  get,
};
