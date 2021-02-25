import axios from 'axios';
import Cookies from 'universal-cookie';
import { handleError, handleResponse } from './apiUtils';

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

export async function saveTask(name, description, date) {
  return axios
    .post(
      API_BASE_URL + '/add-task',
      { name: name, description: description, date: date },
      { withCredentials: true }
    )
    .then(handleResponse)
    .catch(handleError);
}
