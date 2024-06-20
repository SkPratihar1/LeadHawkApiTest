
import { apiClient, login } from '../../src/apiClient';
import dotenv from 'dotenv';

dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;

    it('should retrieve User get data', async () => {
        authToken = await login(process.env.USER_EMAIL as string, process.env.USER_PASSWORD as string);
        console.log('authToken', authToken);

        if (!authToken) {
            throw new Error('Authentication token not received');
        }

        // apiClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

        try {
            const response = await apiClient.post('/api/users/getdata',{token:authToken});
            expect(response.status).toBe(200);
            // expect(response.data).toBeDefined();
            console.log('response', response.data);
        } catch (error) {
            console.log('Error:', error);
        }
    }, 20000);
});