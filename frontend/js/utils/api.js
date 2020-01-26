import _request from './request';

export const login = (data) => {
  return _request('http://localhost:8000/token-auth/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const signup = (data) => {
  return _request('http://localhost:8000/accounts/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const currentUser = () => {
  return _request('http://localhost:8000/accounts/current_user/', {
    headers: {
      Authorization: `JWT ${localStorage.getItem('token')}`
    }
  });
};
