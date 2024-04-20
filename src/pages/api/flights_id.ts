// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Airport, Flight, CarbonEmissions, Data } from './classes';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const {identifier} = req.query;
  const flightIdentifier = typeof identifier === 'string' ? parseInt(identifier, 10) : identifier;

  const data: Data[] = JSON.parse(fs.readFileSync(path.resolve('./flights.json'), 'utf-8'));
  const dataEntry = data.find((entry) => entry.identifier === flightIdentifier);

  if (!dataEntry) {
    // Si no se encuentra la entrada de datos, devolver un error 404
    res.status(404).json({ message: 'Flight data not found' });
    return;
  }

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
          <p>Departure Airport: ${dataEntry.flights[0].departure_airport.name}</p>
          <p>Arrival Airport: ${dataEntry.flights[0].arrival_airport.name}</p>
          <p>Duration: ${dataEntry.flights[0].duration} minutes</p>
          <p>Airplane: ${dataEntry.flights[0].airplane}</p>
          <p>Airline: ${dataEntry.flights[0].airline}</p>
          <img src="${dataEntry.airlineLogo}" alt="Airline Logo" width="100">
        </div>
        <div class="flight-info">
          <h2>Carbon Emissions</h2>
          <p>This Flight: ${dataEntry.carbon_emissions.this_flight ?? 'Unknown'} kg CO2</p>
        </div>
        <div class="flight-info">
          <h2>Price</h2>
          <p>${dataEntry.price} ${dataEntry.currency}</p>
        </div>
        <div class="flight-info">
          <h2>Tickets Available</h2>
          <p>${dataEntry.tickets_available}</p>
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

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
