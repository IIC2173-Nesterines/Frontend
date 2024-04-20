import React from 'react';

import {
  Card, CardContent, Typography, Button, Grid,
} from '@mui/material';

export default function FlightInfo() {
  const exampleFlight = {
    departure_airport_name: 'Dubai Airport',
    arrival_airport_name: 'New York Airport',
    departure_time: '2023-01-01 10:00',
    arrival_time: '2023-01-01 15:00',
    airline: 'American Airlines',
    airline_logo: 'airline_logo.png',
    price: 1000000,
    currency: 'CLP',
    carbon_emission: 1000,
  };

  return (
    <Card sx={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 2,
    }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" component="div">
              {exampleFlight.departure_airport_name}
              {' '}
              to
              {' '}
              {exampleFlight.arrival_airport_name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary">
              Departure Date-Time:
              {' '}
              <strong>{exampleFlight.departure_time}</strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary">
              Arrival Date-Time:
              {' '}
              <strong>{exampleFlight.arrival_time}</strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary">
              Airline:
              {' '}
              <strong>{exampleFlight.airline}</strong>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary">
              Carbon Emission:
              {' '}
              <strong>
                {exampleFlight.carbon_emission}
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
                {exampleFlight.price}
                {' '}
                {exampleFlight.currency}
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
