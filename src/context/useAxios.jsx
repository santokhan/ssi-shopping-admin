import { useContext } from 'react';
import { AxiosContext } from './axios-context';

const useAxios = () => {
  return useContext(AxiosContext);
};

export default useAxios;
