import React, { useState, useEffect } from 'react';

import {
  Box, Pagination,
} from '@mui/material';
import FlightCard from '@/components/FlightCard';
import { FlightAPI } from '@/api/flight.api';

export default function FlightsDashboard() {
  const [flights, setFlight] = useState([{
    id: 0,
    from: '',
    to: '',
    date: '',
    airline: '',
  }]);
  const [page, setPage] = useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const fetchFlights = async () => {
    try {
      const { data } = await FlightAPI.getFlights();
      console.log('hay esto', data);
      setFlight(data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, [page]);

  return (
    <Box className="h-full w-full flex flex-col">
      <Box className="h-full w-full grid gap-8 flex-wrap p-8 grid-cols-3">
        {
          flights.map((flight) => (
            <Box key={flight.id}>
              <FlightCard flight={flight} key={flight.id} />
            </Box>
          ))
        }
      </Box>
      <Box className="flex flex-col items-center mb-8">
        <Pagination count={10} page={page} onChange={handleChange} variant="outlined" />
      </Box>
    </Box>
  );
}
