import axios from 'axios';

/**
 * Create a configured Axios instance for a Yassalam-architecture PHP API.
 *
 * @param {object} options
 * @param {string} [options.baseURL]    - API base URL. Falls back to VITE_API_URL env var.
 * @param {object} [options.headers]    - Extra default headers merged over Content-Type json.
 * @param {function} [options.onRequest]  - Request interceptor: (config) => config
 * @param {function} [options.onResponse] - Response interceptor: (response) => response
 * @param {function} [options.onError]    - Error interceptor: (error) => Promise
 */
export const createApiClient = ({ baseURL, headers = {}, onRequest, onResponse, onError } = {}) => {
	const client = axios.create({
		baseURL: baseURL || import.meta.env.VITE_API_URL || '',
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
	});

	// Interceptor slots — pass-through by default, consumer fills them in
	client.interceptors.request.use(
		(config) => (onRequest ? onRequest(config) : config),
		(error) => Promise.reject(error),
	);
	client.interceptors.response.use(
		(response) => (onResponse ? onResponse(response) : response),
		(error) => (onError ? onError(error) : Promise.reject(error)),
	);

	return client;
};

export default createApiClient;
