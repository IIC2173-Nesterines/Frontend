export interface FlightType {
  airline: string,
  airlineLogo: string,
  airplane: string,
  arrivalAirportId: string,
  arrivalDate: string,
  carbonEmission: string,
  createdAt: string,
  currency: string,
  departureAirportId: string,
  departureDate: string,
  duration: number,
  id: number,
  price: number,
  quantity: number,
  updatedAt: string,
}

export interface TicketType {
  airline: string,
  airlineLogo: string,
  airplane: string,
  arrivalAirportId: string,
  arrivalDate: string,
  carbonEmission: string,
  createdAt: string,
  currency: string,
  departureAirportId: string,
  departureDate: string,
  duration: number,
  id: number,
  price: number,
  quantity: number,
  updatedAt: string,
}

export interface RequestType {
  session_id: string;
  quantity: number;
  flight_id: number;
  datetime: string;
}

export interface UserType {
  sessionId: string;
  email: string;
  username: string;
}
