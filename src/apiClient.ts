
import axios, { AxiosInstance } from 'axios';
import {handleApiError} from './utils/apiError'

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://leadhawk-user.laravel-studio.io',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiAdmin: AxiosInstance = axios.create({
    baseURL: 'https://leadhawk-admin.laravel-studio.io/api',
    timeout: 20000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
async function login(username: string, password: string): Promise<string | null> {
    const loginPayload = {
        username: username,
        password: password
    };
    try {
        const response = await apiClient.post('/api/users/login', loginPayload);
        const data = response.data;
        const token=data.token
        
        // console.log('data',data)
        if (data && data.token) {
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            return token;
        } else {
            throw new Error('Token not found in the response');
            
        }
        

    } catch (error) {
      // if (axios.isAxiosError(error)) {
                
                
      //   console.log(error.response?.data.message)
      //   const errorMessage = error.response?.data;
      //   return errorMessage.message
      //   //expect(errorMessage).toBe('No leads found for this user');

      // } else {
      
      //   console.error('Error message:', (error as Error).message);
      // }
      //   console.log('Login error:', error);
      handleApiError(error);
        return null;
    }
}

export { apiClient, login ,apiAdmin};