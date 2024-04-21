import React from 'react';
import { FlightType } from '@/types';

import {
  Typography,
  CardContent,
  CardActions,
  Button,
  Card,
} from '@mui/material';

export default function FlightCard({ flight }: { flight: FlightType }) {
  return (
    <Card className="w-64" variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          fecha:
          {' '}
          {new Date(flight.departureDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>
        <Typography variant="h5" component="div">
          {flight.departureAirportId}
          {' '}
          to
          {' '}
          {flight.arrivalAirportId}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Airline:
          {' '}
          {flight.airline}
        </Typography>
        <CardActions>
          <Button size="small" href={`/flights/${flight.id}`}> Ver Detalles</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
