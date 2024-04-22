import React, { useState, useEffect } from 'react';
import {
  Typography, Box,
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { FlightAPI } from '@/api/flight.api';
import { TicketType } from '@/types';
import TicketCard from './TicketCard';

export default function ProfileInfo() {
  const { user } = useAuth0();
  const [tickets, setTicket] = useState<TicketType[]>([]);
  const [isEffectExecuted, setIsEffectExecuted] = useState(false);

  
  useEffect(() => {
    if (user && !isEffectExecuted) {
      const fetchTicket = async () => {
        try {
          const ticketToFetch = await FlightAPI.getAllTickets(user?.sub || '');
          ticketToFetch.data.forEach(async (ticketToFetch : TicketType) => {
            const flight = await FlightAPI.getFlight(ticketToFetch.flightId);
            ticketToFetch.flight = flight.data;
          });
          return ticketToFetch.data;
        } catch (error) {
          console.error('Error fetching flight:', error);
        }
      };
      
      const fetchedTickets = fetchTicket();
      setTicket(fetchedTickets);
      setIsEffectExecuted(true);
    }
  }, [user]);

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
