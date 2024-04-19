export interface FlightType {
  id: number;
  from: string;
  to: string;
  date: string;
  airline: string;
}

export interface UserType {
  sessionId: string;
  email: string;
  username: string;
}
