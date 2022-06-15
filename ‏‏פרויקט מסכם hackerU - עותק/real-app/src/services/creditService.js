import http from "./httpService";
import config from "../config.json";

export function addCredit(card) {
  return http.post(`${config.apiUrl}/credit`, card);
};
export function pay() {
    return http.get(`${config.apiUrl}/credit`);
  };
  export function getMyCredit() {
    return http.get(`${config.apiUrl}/credit`);
  };
  export function deleteCredit(password) {
    return http.delete(`${config.apiUrl}/credit/${password}`);
  };
const creditService = {
  addCredit,
  pay,
  getMyCredit,
  deleteCredit
};

export default creditService;
