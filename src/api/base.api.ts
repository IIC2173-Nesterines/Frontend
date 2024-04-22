import axios from 'axios';

export const oauthAxiosInstance = axios.create();

// Función para obtener el token de acceso
const getToken = async () => {
  const options = {
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/oauth/token` || '',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || '',
      client_secret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET || '',
      audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE || '',
    }),
  };
  const response = await oauthAxiosInstance(options);
  return response.data.access_token;
};

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Interceptor para agregar el token de autorización a las solicitudes
axiosInstance.interceptors.request.use(async (config) => {
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${await getToken()}`;
  return config;
}, (error) => Promise.reject(error));
