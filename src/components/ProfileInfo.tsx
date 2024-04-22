import React, { useState, useEffect } from 'react';
import {
  Typography, Box,
} from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0/client';
import { FlightAPI } from '@/api/flight.api';
import { TicketType } from '@/types';
import TicketCard from './TicketCard';

export default function ProfileInfo() {
  const { user } = useUser();
  const [tickets, setTicket] = useState<TicketType[]>([]);

  const fetchTicket = async () => {
    try {
      const { data } = await FlightAPI.getAllTickets(user?.sub || '');
      setTicket(data);
    } catch (error) {
      console.error('Error fetching flight:', error);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, []);

  if (user) {
    return (
      <Box className="h-full w-full flex flex-col mt-16">
        <Box className="flex items-center gap-4 flex-col">
          <Typography variant="h4" component="div" sx={{ marginLeft: 2 }} className="text-black">
            {user?.nickname || ''}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Email:
            {' '}
            <strong>{user?.email}</strong>
          </Typography>
        </Box>
        <Box className="h-full w-full grid gap-8 flex-wrap p-8 grid-cols-3">
          {
            tickets.map((ticket) => (
              <Box key={ticket.id}>
                <TicketCard ticket={ticket} key={ticket.id} />
              </Box>
            ))
          }
        </Box>
      </Box>
    );
  }
}