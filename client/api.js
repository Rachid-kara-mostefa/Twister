import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

const Api = axios.create({
  baseURL: `${baseURL}`,
});

export default Api;