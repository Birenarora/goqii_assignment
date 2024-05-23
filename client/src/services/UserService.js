import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api/";

export const getUsers = () => {
    return axios.get(API_URL+"get-users");
}

export const createUser = (payload) => {
    return axios.post(API_URL+"create-user", payload);
}

export const updateUser = (payload) => {
    return axios.patch(API_URL+"update-user", payload);
}

export const deleteUser = (payload) => {
    return axios.patch(API_URL+"update-user", payload);
}