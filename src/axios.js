import axios from "axios";

const instance = axios.create({
  baseURL : "https://api.openweathermap.org/data/2.5"
})
axios.defaults.headers.common['Authorization'] = "a60fc722ff878a98f10dc57fc7badffb";
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // add a 'status' property to the response, which is called 'cod' here
  return {status: response["cod"], ...response};
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});
export default instance ;

//baseUrl