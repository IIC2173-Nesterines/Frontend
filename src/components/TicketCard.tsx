import React from 'react';
import { TicketType } from '@/types';

import {
  Typography,
  CardContent,
  Card,
} from '@mui/material';
import formatDate from '@/utils';

export default function TicketCard({ ticket }: { ticket: TicketType }) {
  return (
    <Card className="w-64" variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          fecha:
          {' '}
          {formatDate(ticket.flight.departureDate)}
        </Typography>
        <Typography variant="h5" component="div">
          {ticket.flight.departureAirportId}
          {' '}
          to
          {' '}
          {ticket.flight.arrivalAirportId}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Airline:
          {' '}
          {ticket.flight.airline}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Cantidad Comprada:
          {' '}
          {ticket.quantity}
        </Typography>
      </CardContent>
    </Card>
  );
}
