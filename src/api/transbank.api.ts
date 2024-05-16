import axios from 'axios';
import { createTransactionType } from '@/types';

const createTransaction = `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions`;
const getTransactionsStatus = `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions`;

// eslint-disable-next-line import/prefer-default-export
export const TransbankAPI = {
  createTransaction: async (data: createTransactionType) => axios.post(createTransaction, data),
  getTransactionStatus: async (token: string) => axios.get(`${getTransactionsStatus}/${token}`),
};
