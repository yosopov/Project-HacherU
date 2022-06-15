import http from "./httpService";
import config from "../config.json";

export function createCard(card) {
  return http.post(`${config.apiUrl}/cards`, card);
};
export function AddProduct(body) {
  return http.post(`${config.apiUrl}/cards/AddProduct`, body);
};

export function getCards() {
  return http.get(`${config.apiUrl}/cards/`);
};
export function getCardsWithName(cards,cardsCategory) {
  return http.get(`${config.apiUrl}/cards/cardsName${cards}?cardsCategory=${cardsCategory}`);
};
export function getCardsCategory(cardsCategory) {
  return http.get(`${config.apiUrl}/cards/navigation${cardsCategory}`,);
};

export function getMyCards() {
  return http.get(`${config.apiUrl}/cards/myCards`);
};

export function getMyorders(){
  return http.get(`${config.apiUrl}/cards/myOrders`);
};

export function putCards() {
  return http.put(`${config.apiUrl}/cards/openAnOreder`);
};

export function AddCard(card) {
  return http.put(`${config.apiUrl}/cards/add`, card);
};

export function editCard( _id, card ) {
  return http.put(`${config.apiUrl}/cards/${_id}`, card);
};

export function deleteProduct( _id ) {
  return http.delete(`${config.apiUrl}/cards/removeCard/${_id}`);
};


const cardService = {
  createCard,
  getCards,
  getCardsWithName,
  getCardsCategory,
  getMyCards,
  getMyorders,
  putCards,
  AddProduct,
  AddCard,
  editCard,
  deleteProduct,
};

export default cardService;
