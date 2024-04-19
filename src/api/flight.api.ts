import { axiosInstance } from './base.api';

const viewFlights = '/flights';

// eslint-disable-next-line import/prefer-default-export
export const FlightAPI = {
  getFlights: () => axiosInstance.get(viewFlights),
};
