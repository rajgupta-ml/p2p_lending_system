import axios from "axios";
import commonApiEndpoint from "./CommonEndPoint";


const pinVerficationEndpoint = async ({email, pin}) => {
  const API_ENDPOINT = `${commonApiEndpoint}/pin-authentication`;
  const response = await axios.post(API_ENDPOINT, {
    email, pin
  }, { headers: { 'Content-Type': 'application/json' } });
  return response
}

export default pinVerficationEndpoint
