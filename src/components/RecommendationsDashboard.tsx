import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { RecommendationType } from '@/types';
import { useAuth0 } from '@auth0/auth0-react';
import FlightCard from './FlightCard';

export default function RecommendationsDashboard() {
  // eslint-disable-next-line no-unused-vars
  const [recommendations, setRecommendations] = useState<RecommendationType[]>([]);
  // eslint-disable-next-line no-unused-vars
  const [lastUpdated, setLastUpdated] = useState<string>('never');
  const router = useRouter();
  const { user } = useAuth0();

  const fetchRecommendations = async () => {
    try {
      // const recommendations = await FlightAPI.getRecommendations();
      // const lastUpdated = await FlightAPI.getLastUpdated();
      // setLastUpdated(lastUpdated.data);
      // setRecommendations(recommendations.data);
      console.log('recommendations fetched');
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  if (user) {
    return (
      <Box className="h-full w-full flex flex-col">
        <Box className="flex flex-col justify-center items-center mt-8">
          <Typography variant="h5">
            Last updated on:
            {' '}
            { lastUpdated }
          </Typography>
        </Box>
        <Box className="h-full w-full grid gap-8 flex-wrap p-8 grid-cols-3">
          {
            recommendations.map((recommendation) => (
              <Box key={recommendation.id}>
                <FlightCard flight={recommendation.flight} key={recommendation.flight.id} />
                <Box className="flex justify-center mt-2">
                  <Button variant="contained" onClick={() => router.push(`/flights?id=${recommendation.flight.id}`)}>Go To Flight</Button>
                </Box>
              </Box>
            ))
          }
        </Box>
      </Box>
    );
  }
}
