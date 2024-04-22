import { RequestType } from '@/types';
import { axiosInstance } from './base.api';

const viewFlights = `${process.env.NEXT_PUBLIC_API_BASE_URL}/flights`;
const viewTickets = `${process.env.NEXT_PUBLIC_API_BASE_URL}/tickets/user`;
const viewRequests = `${process.env.NEXT_PUBLIC_API_BASE_URL}/requests`;

// eslint-disable-next-line import/prefer-default-export
export const FlightAPI = {
  getFlights: (amount:number, page:number) => axiosInstance.get(`${viewFlights}?amount=${amount}&page=${page}`),
  getAllFlights: () => axiosInstance.get(viewFlights),
  getFlight: (id:number) => {
    console.log(`${viewFlights}/${id}`);
    return axiosInstance.get(`${viewFlights}/${id}`);
  },
  getAllTickets: (sessionId: string) => axiosInstance.get(`${viewTickets}/${sessionId}`),
  bookFlight: (data: RequestType) => {
    console.log(data);
    axiosInstance.post(viewRequests, data);
  },
};
