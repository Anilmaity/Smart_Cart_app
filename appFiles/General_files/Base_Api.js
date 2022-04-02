import axios from 'axios';

const baseAPI = axios.create({
  baseURL: 'https://smartcartbackend.herokuapp.com/',

  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
});

export {baseAPI};
