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
  createdAt: string,
  userId: number;
  updatedAt: string,
  quantity: number;
  id: number,
  flightId: number;
  flight: FlightType;
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

export interface RecommendationType {
  id: number;
  flight: FlightType;
}
