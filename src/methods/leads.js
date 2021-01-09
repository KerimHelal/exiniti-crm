import axios from 'axios';

export const getAllLeads = () => {
    return axios
      .get('http://localhost:8080/leads/getAll')
      .then((response) => {
        return response.data.users;
      });
};

export const insertLead = (name, phone, email) => {
    return axios.post('http://localhost:8080/leads/insert', { name, phone, email })
    .then(response => {
      return response.data.message;
    });
}

export const deleteLead = id => {
    return axios
      .post('http://localhost:8080/leads/delete', id)
      .then((response) => {
        return response.message;
      });
};

export const updateLead = user => {
  return axios
    .post('http://localhost:8080/leads/update', user)
    .then((response) => {
      return response.message;
    });
};


  
