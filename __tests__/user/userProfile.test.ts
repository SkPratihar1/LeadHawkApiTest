
import { apiClient, login } from '../../src/apiClient';
import { generateUserProfileUpdatePayloads} from '../../src/utils/payloads';
import { assertUserProfileUpdate } from '../../src/utils/assertions'
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    let userId:string
    
    beforeAll(async () => {
                authToken = await login(process.env.USER_EMAIL as string, process.env.USER_PASSWORD as string);
                
     });


     it('Retrieve user profile using API', async () => {
        
        try {
            const response = await apiClient.get('/api/v1/profile/');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            userId=response.data.id
           
         
        } catch (error) {
            throw error
        }
    }, 20000);

    it('User profile Update using API', async () => {
        
        const userProfile=generateUserProfileUpdatePayloads(userId)
       
        try {
            const response = await apiClient.patch('/api/v1/profile/',userProfile);
            assertUserProfileUpdate(response);
            
         
        } catch (error) {
            
            if (axios.isAxiosError(error)) {
                
                console.log(error.response?.data)

              } else {
              
                console.error('Error message:', (error as Error).message);
              }
              throw error
        }
    }, 20000);




})