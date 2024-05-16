/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { TransbankAPI } from '@/api/transbank.api';
import { Typography, Box } from '@mui/material';
import NavBar from '@/components/NavBar';

export default function Transbank() {
  const router = useRouter();
  const [transactionStatus, setTransactionStatus] = useState('');
  const { token_ws } = router.query;

  const getTransactionStatus = async (token: string) => {
    const getTransactionStatusAPI = await TransbankAPI.getTransactionStatus(token);
    setTransactionStatus(getTransactionStatusAPI.data.status);
  };

  const getStatusColor = () => {
    switch (transactionStatus) {
      case 'AUTHORIZED':
        return 'text-green-500';
      case 'FAILED':
        return 'text-red-500';
      case 'REVERSED':
        return 'text-blue-500';
      default:
        return '';
    }
  };

  useEffect(() => {
    console.log(router.query);
    console.log('token:', token_ws);
    if (typeof token_ws === 'string') {
      getTransactionStatus(token_ws);
    }
  }, [token_ws]);

  return (
    <Box className="flex w-screen h-screen flex-col">
      <NavBar />
      <Box className="flex w-full h-full flex-row items-center gap-8 justify-center align-center">
        <Typography variant="h5">
          Your Transbank status was:
        </Typography>
        <Typography variant="h5" className={getStatusColor()}>
          {transactionStatus}
        </Typography>
      </Box>
    </Box>
  );
}
