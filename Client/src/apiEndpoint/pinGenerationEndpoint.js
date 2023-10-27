import axios from "axios";
import commonApiEndpoint from "./CommonEndPoint";


const pinGenerationEndpoint = async ({email, pin}) => {
  const API_ENDPOINT = `${commonApiEndpoint}/register/pin-generation`;
  const response = await axios.post(API_ENDPOINT, {
    email, pin
  }, { headers: { 'Content-Type': 'application/json' } });
  return response
}

export default pinGenerationEndpoint
