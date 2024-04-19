// eslint-disable-next-line import/no-named-as-default
import { UserType } from '@/types';
import { axiosInstance } from './base.api';

const userCreate = '/users';
const userCheck = '/users/check/:userId';

// eslint-disable-next-line import/prefer-default-export
export const UserAPI = {
  login: (data: UserType) => axiosInstance.post(userCreate, data),
  checkUser: (userId: string) => axiosInstance.get(userCheck.replace(':userId', userId)),
};
