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
          {formatDate(ticket.departureDate)}
        </Typography>
        <Typography variant="h5" component="div">
          {ticket.departureAirportId}
          {' '}
          to
          {' '}
          {ticket.arrivalAirportId}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Airline:
          {' '}
          {ticket.airline}
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
