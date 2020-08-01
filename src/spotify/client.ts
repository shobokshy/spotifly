import axios from 'axios';

const client = axios.create({
	baseURL: 'https://api.spotify.com/v1/',
});

export default client;
