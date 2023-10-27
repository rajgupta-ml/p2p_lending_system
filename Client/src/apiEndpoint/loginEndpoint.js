import axios from "axios";
import commonApiEndpoint from "./CommonEndPoint";


async function loginEndpoint({email, password}) {
     const API_ENDPOINT = `${commonApiEndpoint}login`;
  const response = await axios.post(API_ENDPOINT, {
    email, password
  }, { headers: { 'Content-Type': 'application/json' } });
  return response
}

export default loginEndpoint
