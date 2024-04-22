import React, { useState, useEffect } from 'react';

import {
  Card, CardContent, Typography, Button, Grid,
} from '@mui/material';
import { FlightAPI } from '@/api/flight.api';
import formatDate from '@/utils';
import { FlightType } from '@/types';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function FlightInfo({ id } : { id: number }) {
  const { user } = useUser();
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
    <Card sx={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 2,
    }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" component="div">
              {flight.departureAirportId}
              {' '}
              to
              {' '}
              {flight.arrivalAirportId}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary">
              Departure Date-Time:
              {' '}
              <strong>{formatDate(flight.departureDate)}</strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary">
              Arrival Date-Time:
              {' '}
              <strong>{formatDate(flight.arrivalDate)}</strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary">
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
            <Typography variant="body1" color="text.secondary">
              Airline:
              {' '}
              <strong>{flight.airline}</strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary">
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
            <Typography variant="body1" color="text.secondary">
              Airplane:
              {' '}
              <strong>
                {flight.airplane}
              </strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary">
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
            <Typography variant="body1" color="text.secondary">
              Tickets Available:
              {' '}
              <strong>
                {flight.quantity}
              </strong>
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '20px' }}>
            <Typography variant="body1" color="text.secondary">
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
              onClick={() => {
                if (flight.quantity >= ticketCount) {
                  FlightAPI.bookFlight({
                    session_id: user?.sub || '', quantity: ticketCount, flight_id: parseInt(id, 10), datetime: new Date().toDateString(),
                  });
                }
              }}
            >
              Book Flight
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
