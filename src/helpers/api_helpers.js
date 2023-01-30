import axios from "axios";

const API_URL = "https://backend-psi-pearl.vercel.app";

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);

// default
axios.defaults.baseURL = API_URL;
// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

const token = JSON.parse(localStorage.getItem("authUser"))
  ? JSON.parse(localStorage.getItem("authUser")).token
  : null;
if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

export const setAuthorization = (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

export const registerUser = async (data) => {
  return await axios.post("/api/registration", data);
};

export const loginUser = async (data) => {
  return await axios.post("/api/login", data);
};

export const addBillings = async (data) => {
  return await axios.post("/api/add-billing", data);
};

export const getBillings = async (page, limit) => {
  return await axios.get(`/api/billing-list?page=${page}&limit=${limit}`);
};

export const getAllBillings = async () => {
  return await axios.get(`/api/all-billing-list`);
};

export const deleteBilling = async (id) => {
  return await axios.delete(`/api/delete-billing/${id}`);
};

export const updateBilling = async (id, data) => {
  return await axios.put(`/api/update-billing/${id}`, data);
};
