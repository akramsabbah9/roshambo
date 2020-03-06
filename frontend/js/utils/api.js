import _request from './request';

//-------------------------------------------------------------
// POST Methods
//-------------------------------------------------------------

export const login = (data) => {
  return _request(`${process.env.API_URL}/accounts/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const logout = () => {
  return _request(`${process.env.API_URL}/accounts/logout/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    },
  });
};

export const signup = (data) => {
  return _request(`${process.env.API_URL}/accounts/signup/`, {
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
  return _request(`${process.env.API_URL}/accounts/users/current/`, {
    headers: {
      'Content-Type': 'application/json',
       Authorization: `Token ${localStorage.getItem('token')}`
    }
  });
};

export const allUsers = () => {
  return _request(`${process.env.API_URL}/accounts/users/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  });
};

export const activeUsers = () => {
  return _request(`${process.env.API_URL}/accounts/users/active/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  });
};

export const getActiveSkin = () => {
  return _request(`${process.env.API_URL}/accounts/skins/active/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  });
};

export const getAvailableSkins = () => {
  return _request(`${process.env.API_URL}/accounts/skins/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  });
};

export const getPurchasedSkins = () => {
  return _request(`${process.env.API_URL}/accounts/skins/purchased/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  });
};

export const getStats = () => {
  return _request(`${process.env.API_URL}/accounts/stats/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  });
};

//-------------------------------------------------------------
// PUT Methods
//-------------------------------------------------------------

export const editUser = (data) => {
  return _request(`${process.env.API_URL}/accounts/users/edit/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });
};

export const editStats = (data) => {
  return _request(`${process.env.API_URL}/accounts/stats/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });
};

export const editActiveSkin = (data) => {
  return _request(`${process.env.API_URL}/accounts/skins/active/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });
};

export const editPurchasedSkins = (data) => {
  return _request(`${process.env.API_URL}/accounts/skins/purchased/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });
};

export const editUserWallet = (data) => {
  return _request(`${process.env.API_URL}/accounts/wallet/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });
};
