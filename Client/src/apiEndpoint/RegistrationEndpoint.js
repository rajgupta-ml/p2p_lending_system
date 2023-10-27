import axios from 'axios';
import commonApiEndpoint from './CommonEndPoint.jsx'

const registrationEndpoint = async ({
  fullName, email, password
}) => {
  const API_ENDPOINT = `${commonApiEndpoint}register`;
  const response = await axios.post(API_ENDPOINT, {
    fullName, email, password
  }, { headers: { 'Content-Type': 'application/json' } });
  return response
};

export default registrationEndpoint;
