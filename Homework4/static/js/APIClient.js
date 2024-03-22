const API_BASE = './api';

function checkResponse(res) {
    if(!res.ok) {
      throw new Error("There was an error in fetch");
    }
    return res;
  }
  
  function handleError(error) {
    console.log("ERROR", error);
    throw error;
  }
  const getUsers = () => {
    return fetch(API_BASE+'/users')
      .then(checkResponse)
      .then(res => {
        return res.json();
      })
      .then(users => {
        return Object.values(users);
      })
      .catch(handleError);
  };
  
  const getUserById = (id) => {
    return fetch(API_BASE+'/users/'+id)
      .then(checkResponse)
      .then(res => {
        return res.json();
      })
      .then(user => {
        return user;
      })
      .catch(handleError);
  };

  const getHowls = (id) => {
    return fetch(API_BASE+'/howls/'+id)
      .then(checkResponse)
      .then(res => {
        return res.json();
      })
      .then(howls => {
        return howls;
      })
      .catch(handleError);
  };

  const getFollows = (id) => {
    return fetch(API_BASE+'/follows/'+id)
      .then(checkResponse)
      .then(res => {
        return res.json();
      })
      .then(follows => {
        return follows;
      })
      .catch(handleError);
  };

  const createHowl = (id, text) => {
    const data = {
      userId : id,
      text : text
    };

    fetch(API_BASE+'/howls/'+id, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(checkResponse)
    .then(res => {
      return res.json();
    })
    .catch(handleError);
  };

  const checkUser = (username) => {
    const data = {
      username: username
    };
    fetch(API_BASE+'/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(checkResponse)
    .then(res => {
      return res.json();
    })
    .catch(handleError);
  };

  const follow = (id) => {
    fetch(API_BASE+'/follow/'+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(checkResponse)
    .then(res => {
      return res.json();
    })
    .catch(handleError);
  };

  const unfollow = (id) => {
    fetch(API_BASE+'/unfollow/'+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(checkResponse)
    .then(res => {
      return res.json();
    })
    .catch(handleError);
  };

  const logout = () => {
    fetch(API_BASE+'/logout')
    .then(checkResponse)
    .then(res => {
      return res.json();
    })
    .catch(handleError);
  }
  
  export default {
    getUserById,
    getUsers,
    getFollows,
    getHowls,
    createHowl,
    checkUser,
    logout,
    follow,
    unfollow
  };