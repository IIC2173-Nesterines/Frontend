export type Airport = {
    name: string;
    id: string;
    time: string;
};
  
export type Flight = {
    departure_airport: Airport;
    arrival_airport: Airport;
    duration: number;
    airplane: string;
    airline: string;
    airline_logo: string;
};
  
export type CarbonEmissions = {
    this_flight: number | null;
};
  
export type Data = {
    flights: Flight[];
    carbon_emissions: CarbonEmissions;
    price: number;
    currency: 'CLP';
    airlineLogo: string;
    tickets_available: number;
    identifier: number;
};

export type Profile = {
    id: number;
    username: string;
    email: string;
    profile_pic: string;
    purchases: Data[];
};