import httpService from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const TOKEN_KEY = "token";

httpService.setDefaultCommonHeaders("x-auth-token", getJwt());

export function getMe(){
  return httpService.get(`${config.apiUrl}/users/me`)
}
export function getAllUsers(){
  return httpService.get(`${config.apiUrl}/users/getAllUsers`)
}
export function findUsers() {
    return httpService.get(`${config.apiUrl}/users/usersList`);
};
export function endOrder(id) {
  return httpService.put(`${config.apiUrl}/users/endOrder`,{id:id});
};
export function updateUser(body) {
  return httpService.put(`${config.apiUrl}/users`,body);
};
export function changeAccess(body) {
  return httpService.put(`${config.apiUrl}/users/changeAccess`,body);
};
export function changeStatusOrder(body) {
  return httpService.put(`${config.apiUrl}/users/changeStatusOrder`,body);
};
export function createUser(user) {
  return httpService.post(`${config.apiUrl}/users`, user);
};


export function logout() {
  localStorage.removeItem(TOKEN_KEY);
};

export function getJwt() {
  return localStorage.getItem(TOKEN_KEY);
};

export function getUser() {
  try {
    const token = getJwt();
    return jwtDecode(token);
  } catch {
    return null;
  };
};


export async function login(email, password) {
  const { data } = await httpService.post(`${config.apiUrl}/auth`, {
    email,
    password,
  });
  localStorage.setItem(TOKEN_KEY, data.token);
};

const service = {
  findUsers,
  getMe,
  getAllUsers,
  endOrder,
  createUser,
  changeAccess,
  changeStatusOrder,
  updateUser,
  login,
  getJwt,
  logout,
  getUser,
};

export default service;
