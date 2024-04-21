import React, { useState, useEffect } from 'react';

import {
  Card, CardContent, Typography, Button, Grid,
} from '@mui/material';
import { FlightAPI } from '@/api/flight.api';

export default function FlightInfo({ id } : { id: number }) {
  const [flight, setFlight] = useState({
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
              <strong>{flight.departureDate}</strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary">
              Arrival Date-Time:
              {' '}
              <strong>{flight.arrivalDate}</strong>
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
                {flight.carbonEmission}
                {' '}
                kg CO2
              </strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary">
              Price:
              {' '}
              <strong>
                {flight.price}
                {' '}
                {flight.currency}
              </strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary">
              Tickets Available:
              <strong>
                {flight.quantity}
              </strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" sx={{ backgroundColor: '#4CAF50', color: '#fff' }}>
              Book Flight
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
