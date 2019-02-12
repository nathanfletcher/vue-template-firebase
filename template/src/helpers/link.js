import axios from 'axios';

export const link = axios.create({
      baseURL: `${API_URL}`,
    })
