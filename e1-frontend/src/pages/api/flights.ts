// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Airport = {
  name: string;
  id: string;
  time: string;
};

type Flight = {
  departure_airport: Airport;
  arrival_airport: Airport;
  duration: number;
  airplane: string;
  airline: string;
  airline_logo: string;
};

type CarbonEmissions = {
  this_flight: number | null;
};

type Data = {
  flights: Flight[];
  carbon_emissions: CarbonEmissions;
  price: number;
  currency: 'CLP';
  airlineLogo: string;
  tickets_available: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const data: Data = {
    flights: [
      {
        departure_airport: {
          name: "Santiago Airport",
          id: "SCL",
          time: "2024-04-13 10:00"
        },
        arrival_airport: {
          name: "New York Airport",
          id: "JFK",
          time: "2024-04-13 18:00"
        },
        duration: 480,
        airplane: "Boeing 747",
        airline: "Example Airlines",
        airline_logo: "example.png",
      }
    ],
    carbon_emissions: { this_flight: 100 },
    price: 500000,
    currency: "CLP",
    airlineLogo: "example_airline_logo.png",
    tickets_available: 90
  };

  const html = `
    <html>
      <head>
        <title>Flight Information</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          h1 {
            color: #333;
          }
          .flight-info {
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 20px;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <h1>Flight Information</h1>
        <div class="flight-info">
          <h2>Flight Details</h2>
          <p>Departure Airport: ${data.flights[0].departure_airport.name}</p>
          <p>Arrival Airport: ${data.flights[0].arrival_airport.name}</p>
          <p>Duration: ${data.flights[0].duration} minutes</p>
          <p>Airplane: ${data.flights[0].airplane}</p>
          <p>Airline: ${data.flights[0].airline}</p>
          <img src="${data.airlineLogo}" alt="Airline Logo" width="100">
        </div>
        <div class="flight-info">
          <h2>Carbon Emissions</h2>
          <p>This Flight: ${data.carbon_emissions.this_flight ?? 'Unknown'} kg CO2</p>
        </div>
        <div class="flight-info">
          <h2>Price</h2>
          <p>${data.price} ${data.currency}</p>
        </div>
        <div class="flight-info">
          <h2>Tickets Available</h2>
          <p>${data.tickets_available}</p>
        </div>
        <button class="buy-button" onclick="buyTicket()">Buy Ticket</button>
        <script>
          function buyTicket() {
            alert('This button does not do anything yet!');
          }
        </script>
      </body>
    </html>
  `;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);

}
