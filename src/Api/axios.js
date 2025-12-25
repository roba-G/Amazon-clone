import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/clone-b6144/us-central1/api",
  baseURL: "https://amazon-api-deploy-iu50.onrender.com",
});


export {axiosInstance}