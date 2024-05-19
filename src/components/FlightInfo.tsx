import React, { useState, useEffect } from 'react';

import {
  Card, CardContent, Typography, Button, Grid,
} from '@mui/material';
import { FlightAPI } from '@/api/flight.api';
import formatDate, { getCoordinatesFromLocation, getMyIP } from '@/utils';
import { FlightType } from '@/types';
import { useAuth0 } from '@auth0/auth0-react';

export default function FlightInfo({ id } : { id: number }) {
  const { user } = useAuth0();
  const [flight, setFlight] = useState<FlightType>({
    airline: '',
    airlineLogo: '',
    airplane: '',
    arrivalAirportId: '',
    arrivalDate: '',
    carbonEmission: '',
    createdAt: '',
    currency: '',
    departureAirportId: '',
    departureDate: '',
    duration: 0,
    id: 0,
    price: 0,
    quantity: 0,
    updatedAt: '',
  });

  const [ticketCount, setTicketCount] = useState(1);

  const generateRecommendations = async () => {
    try {
      const upcomingFlights = await FlightAPI.getUpcomingFlights({
        purchaseDate: new Date().toISOString(),
        destinationAirportId: flight.arrivalAirportId,
      });
      const flightsCoordinates = upcomingFlights.data.map((upcomingFlight: FlightType) => (
        getCoordinatesFromLocation(upcomingFlight.departureAirportId)
      ));
      const getUserIp = await getMyIP();
      await FlightAPI.generateRecommendations({
        flights: flightsCoordinates,
        ip_coord: getUserIp,
      }, user?.sub || '');
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const bookFlight = async () => {
    try {
      const booked = await FlightAPI.bookFlight({
        session_id: user?.sub || '',
        flight_id: id,
        quantity: ticketCount,
        datetime: new Date().toDateString(),
      });
      if (booked.status === 201) {
        generateRecommendations();
        alert('Flight booked successfully!');
      }
    } catch (error) {
      console.error('Error booking flight:', error);
    }
  };

  const fetchFlight = async () => {
    try {
      const { data } = await FlightAPI.getFlight(id);
      setFlight(data);
    } catch (error) {
      console.error('Error fetching flight:', error);
    }
  };

  useEffect(() => {
    fetchFlight();
  }, []);

  return (
    <Card className="w-1/2 h-auto flex flex-col">
      <CardContent className="mx-8">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5" component="div">
              {flight.departureAirportId}
              {' '}
              to
              {' '}
              {flight.arrivalAirportId}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Departure Date-Time:
              {' '}
              <strong>{formatDate(flight.departureDate)}</strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Arrival Date-Time:
              {' '}
              <strong>{formatDate(flight.arrivalDate)}</strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Duration:
              {' '}
              <strong>
                {flight.duration}
                {' '}
                Minutes
              </strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Airline:
              {' '}
              <strong>{flight.airline}</strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Carbon Emission:
              {' '}
              <strong>
                {flight.carbonEmission.toLocaleString()}
                {' '}
                kg CO2
              </strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Airplane:
              {' '}
              <strong>
                {flight.airplane}
              </strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Price:
              {' '}
              <strong>
                {flight.price.toLocaleString('es-ES')}
                {' '}
                {flight.currency}
              </strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              Tickets Available:
              {' '}
              <strong>
                {flight.quantity}
              </strong>
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '10px' }} className="mt-4">
            <Typography variant="body2" color="text.secondary">
              Select the number of Tickets to buy:
            </Typography>
            <select
              value={ticketCount}
              onChange={(e) => setTicketCount(Number(e.target.value))}
              style={{ margin: '10px 0', padding: '10px 20px', border: '1px solid gray' }}
            >
              {[1, 2, 3, 4].map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#4CAF50', color: '#fff' }}
              onClick={bookFlight}
            >
              Book Flight
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
