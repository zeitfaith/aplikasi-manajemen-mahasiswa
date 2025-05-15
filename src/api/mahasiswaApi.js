import axios from 'axios';

const API_URL = 'http://localhost:8000/api/mahasiswa';

export const getProfil = () => axios.get(API_URL);
export const updateProfil = (data) => axios.put(API_URL, data);
