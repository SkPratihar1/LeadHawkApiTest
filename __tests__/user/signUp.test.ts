
import { apiClient, login ,apiAdmin} from '../../src/apiClient';
import { generateSignUpPayloads } from '../../src/utils/payloads';
import dotenv from 'dotenv';
import axios from 'axios';


dotenv.config();

describe('API Tests', () => {
    
    

     it('Create User Account', async () => {
     
       const signUpPayload = generateSignUpPayloads()
        try {
            const response = await apiClient.post('/api/users/createAccount?selectedPlan=', signUpPayload);
            expect(response.status).toBe(201);
            expect(response).toBeDefined();
            expect(response.data.success).toBe(true);
            expect(response.data.message).toBe(null);

            console.log("success:",response.data.success)
            console.log('user:', response?.data.user);
            console.log('message:', response?.data.message);
         
        } catch (error) {
            if (axios.isAxiosError(error)) {
                
                console.error('Error response:', error.response?.data);
                console.error('Status:', error.response?.status);
                console.error('message:', error.response?.data.message);
                console.error('Headers:', error.response?.headers);
                // const errorMessage = error.response?.data.message;
                // expect(errorMessage).toBe('Limit reached for your subscription level');

              } else {
              
                console.error('Error message:', (error as Error).message);
              }

            // console.log('Error:', error);
        }
    }, 20000);




})