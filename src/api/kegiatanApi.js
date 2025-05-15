import axios from 'axios';

const API_URL = 'http://localhost:8000/api/kegiatan';

export const getKegiatan = () => axios.get(API_URL);
export const addKegiatan = (data) => axios.post(API_URL, data);
export const updateKegiatan = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteKegiatan = (id) => axios.delete(`${API_URL}/${id}`);
