const checkFetchResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const _request = (url, options = {}) => {
  const defaults = { credentials: 'same-origin' };
  const defaultedOptions = Object.assign({}, defaults, options);

  return fetch(url, defaultedOptions)
    .then(checkFetchResponse)
    .then(res => res.json());
};

export default _request;
