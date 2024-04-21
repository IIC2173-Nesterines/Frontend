import { axiosInstance } from './base.api';

const viewFlights = '/flights';

// eslint-disable-next-line import/prefer-default-export
export const FlightAPI = {
  getFlights: (amount:number, page:number) => axiosInstance.get(`${viewFlights}?amount=${amount}&page=${page}`),
  getAllFlights: () => axiosInstance.get(viewFlights),
  getFlight: (id:number) => axiosInstance.get(`${viewFlights}/${id}`),
};
