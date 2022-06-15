import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const { response } = error;

  if (!response) {
    toast.error("Bad connection to server");
  } else if (response.status >= 403) {
    toast.error("An unexpected error occurred");
  };

  return Promise.reject(error);
});

function setDefaultCommonHeaders(header, value) {
  axios.defaults.headers.common[header] = value;
};

const service = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setDefaultCommonHeaders,
};

export default service;
