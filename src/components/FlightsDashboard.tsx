import React, { useState, useEffect } from 'react';

import {
  Box, Pagination,
} from '@mui/material';
import FlightCard from '@/components/FlightCard';

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
    // TODO: Call API to fetch flights
    const data = [
      {
        id: 1,
        from: 'New York',
        to: 'London',
        date: '01 Jan 2023',
        airline: 'British Airways',
      },
      {
        id: 2,
        from: 'London',
        to: 'Paris',
        date: '05 Jan 2023',
        airline: 'EasyJet',
      },
      {
        id: 3,
        from: 'New York',
        to: 'London',
        date: '01 Jan 2023',
        airline: 'British Airways',
      },
      {
        id: 4,
        from: 'London',
        to: 'Paris',
        date: '05 Jan 2023',
        airline: 'EasyJet',
      },
      {
        id: 5,
        from: 'New York',
        to: 'London',
        date: '01 Jan 2023',
        airline: 'British Airways',
      },
      {
        id: 6,
        from: 'London',
        to: 'Paris',
        date: '05 Jan 2023',
        airline: 'EasyJet',
      },
    ];
    setFlight(data);
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
