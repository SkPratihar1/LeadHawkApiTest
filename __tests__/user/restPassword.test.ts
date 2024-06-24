import { apiClient, login } from '../../src/apiClient';
import { generateResetPasswordPayloads } from '../../src/utils/payloads';
import dotenv from 'dotenv';

dotenv.config();

describe('API Tests', () => {
    

     it('Reset Password Link sent', async () => {
        
        const resetEmailPayloads = generateResetPasswordPayloads()
        try {
            const response = await apiClient.post('/api/users/forgot-password',resetEmailPayloads);
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            const message= response.data.message
            expect(message).toBe("Reset link sent.")
            
         
        } catch (error) {
           
            throw error;
        }
    }, 20000);
})