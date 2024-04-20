// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Airport, Flight, CarbonEmissions, Data, Profile } from './classes';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Profile>,
) {
  const {id} = req.query;
  const profileId = typeof id === 'string' ? parseInt(id, 10) : id;

  const data: Profile[] = JSON.parse(fs.readFileSync(path.resolve('./profiles.json'), 'utf-8'));
  const dataEntry = data.find((entry) => entry.id === profileId);

  if (!dataEntry) {
      // Si no se encuentra la entrada de datos, devolver un error 404
      res.status(404).json({ message: 'Profile does not exists' });
      return;
  }

  const html = `
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Perfil</title>
        <button onclick="window.location.href = '/';">Volver a la página principal</button>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          h1 {
            color: #333;
          }
          .profile-info {
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 20px;
            margin-bottom: 20px;
            max-width: 400px;
            text-align: center;
            margin: 0 auto;
          }
          .flight-box {
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            margin-bottom: 10px;
            background-color: #f9f9f9;
            max-width: 400px;
            text-align: center;
            margin: 0 auto;
          }
        </style>
      </head>
      <body>
        <h1>Perfil</h1>
        <div class="profile-info">
          <h2>${dataEntry.username}</h2>
          <img src="${dataEntry.profile_pic}" alt="Profile Pic" width="100">
          <p>E-mail: ${dataEntry.email}</p>
        </div>

        <h2 style="text-align: center;">Vuelos Comprados</h2>
        <div id="flight-info"></div>
        
        <script>
          const flightInfoContainer = document.getElementById('flight-info');
          const dataEntry = ${JSON.stringify(dataEntry)};

          function redirectToFlight(flightId) {
            window.location.href = '/api/flights_id?identifier=' + flightId;
          }

          dataEntry.purchases.forEach((purchase, index) => {
            const flight = purchase.flights[0];
            const flightBox = document.createElement('div');
            flightBox.classList.add('flight-box');

            const flightDate = new Date(flight.departure_airport.time).toLocaleDateString('es-ES');
            const flightAirline = flight.airline;
            const flightDepartureAirport = flight.departure_airport.name;
            const flightId = purchase.identifier;

            flightBox.innerHTML = '<p>Fecha: ' + flightDate + '</p>' +
                      '<p>Aeropuerto: ' + flightDepartureAirport + '</p>' +
                      '<p>Aerolínea: ' + flightAirline + '</p>' +
                      '<button onclick="redirectToFlight(' + flightId + ')">Ver Detalles</button>';

            flightInfoContainer.appendChild(flightBox);
            });

        </script>
      </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}