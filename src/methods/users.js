import axios from 'axios';

export const getAllUsers = () => {
    return axios
      .get('http://localhost:8080/users/getAll')
      .then((response) => {
        return response.data.users;
      });
};

export const deleteUser = id => {
    return axios
      .post('http://localhost:8080/users/delete', id)
      .then((response) => {
        return response.message;
      });
};

export const updateUser = user => {
  return axios
    .post('http://localhost:8080/users/update', user)
    .then((response) => {
      return response.message;
    });
};


  
