
import { useQuery } from '@tanstack/react-query';
import api from './api';


const login = async () => {
    const { data } = await api.get('/login');
    return data;
};

export const useLogin = () => {
    return useQuery({
        queryKey: ['login'],
        queryFn: login,
        staleTime: 1000 * 60 * 5,
    });
};
