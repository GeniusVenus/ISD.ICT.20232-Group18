import axios from "axios";
const BASE_URL = "http://localhost:8080/api";
const client = axios.create();

client.defaults.baseURL = BASE_URL;

client.defaults.headers.common = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
client.defaults.timeout = 5000;

client.defaults.withCredentials = true;

export default client;
