import axios from 'axios';
import Cookies from 'universal-cookie';
import { handleError, handleResponse } from './apiUtils';
import { useDispatch } from 'react-redux';

const cookies = new Cookies();
const API_BASE_URL = 'http://localhost:3001';

export function getTasks(date) {
  return axios
    .post(
      API_BASE_URL + '/date-tasks',
      { date: date == null ? new Date().toJSON() : date },
      { withCredentials: true }
    )
    .then(handleResponse)
    .catch(handleError);
}

export const login = async (username, password) => {
  let result = await axios
    .post(API_BASE_URL + '/login-user', {
      username: username,
      password: password
    })
    .then(handleResponse)
    .catch(handleError);
  if (result.isLogged) {
    cookies.set('jwt', result.token);
    console.log('Uspesno ste se ulogovali');
    return result;
  }
  alert(result.message);
};

export const register = async (email, username, password) => {
  return await axios
    .post(API_BASE_URL + '/register-user', {
      username: username,
      email: email,
      password: password
    })
    .then(handleResponse)
    .catch(handleError);
};
