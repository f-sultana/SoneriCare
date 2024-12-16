import { API_PATH } from "./apiRoutes";
import axios from "./axios";

export const login = ({username,password}) => {
  return axios.post(`${API_PATH.LOGIN}?username=${username}&password=${password}`);
};

export const getItems = () => {
  return axios.get(API_PATH.GET_ITEMS);
};

export const getItemDetail = (id) => {
  return axios.get(`${API_PATH.GET_ITEMS}/${id}`);
};

export const createItem = (data) => {
  return axios.post(API_PATH.CREATE_ITEM, data);
};

export const lookupMenu = (key)=>{
  return axios.get(`${API_PATH.LOOKUP}/${key}`)
}

export const deleteItem = (id)=>{
  return axios.delete(`${API_PATH.DELETE_ITEM}/${id}`)
}