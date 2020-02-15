import _request from './request';

// TODO(benjibrandt): make http://localhost:8000 enviro variable based, not hardcoded

//-------------------------------------------------------------
// POST Methods
//-------------------------------------------------------------

export const login = (data) => {
  return _request('http://localhost:8000/accounts/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const logout = () => {
  return _request('http://localhost:8000/accounts/logout/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    },
  });
};

export const signup = (data) => {
  return _request('http://localhost:8000/accounts/signup/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

//-------------------------------------------------------------
// GET Methods
//-------------------------------------------------------------

export const currentUser = () => {
  return _request('http://localhost:8000/accounts/users/current/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  });
};

export const allUsers = () => {
  return _request('http://localhost:8000/accounts/users/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  });
};

export const activeUsers = () => {
  return _request('http://localhost:8000/accounts/users/active/', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  });
};
