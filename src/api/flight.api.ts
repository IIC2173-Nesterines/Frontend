import { RequestType } from '@/types';
import { axiosInstance } from './base.api';

const viewFlights = '/flights';
const viewTickets = '/tickets';
const viewRequests = '/requests';

// eslint-disable-next-line import/prefer-default-export
export const FlightAPI = {
  getFlights: (amount:number, page:number) => axiosInstance.get(`${viewFlights}?amount=${amount}&page=${page}`),
  getAllFlights: () => axiosInstance.get(viewFlights),
  getFlight: (id:number) => axiosInstance.get(`${viewFlights}/${id}`),
  getAllTickets: (sessionId: string) => axiosInstance.get(`/${viewTickets}/${sessionId}`),
  bookFlight: (data: RequestType) => {
    console.log(data);
    axiosInstance.post(viewRequests, data);
  },
};
