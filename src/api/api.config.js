import axios from 'axios';

const contentType = 'application/json';

const initAPI = () => {
  let baseUrl = process.env.REACT_APP_API_BASE_URL;
  if (!!window.config) {
    baseUrl = window.config.API_BASE_URL;
  }

  axios.defaults.baseURL = baseUrl;
  axios.defaults.headers.get['Accept'] = contentType;
  axios.defaults.headers.get['Content-Type'] = contentType;
  axios.defaults.headers.post['Accept'] = contentType;
  axios.defaults.headers.post['Content-Type'] = contentType;
  axios.defaults.headers.put['Accept'] = contentType;
  axios.defaults.headers.put['Content-Type'] = contentType;
  axios.defaults.headers.delete['Accept'] = contentType;
  axios.defaults.headers.delete['Content-Type'] = contentType;

}

export default initAPI;