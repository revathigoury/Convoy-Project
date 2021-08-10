import axios from 'axios';

const baseURL = 'https://convoy-mock-api.herokuapp.com';

export const apiClient = axios.create({
	baseURL,
});
