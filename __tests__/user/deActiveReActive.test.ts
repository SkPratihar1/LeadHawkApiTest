import { apiClient, login } from '../../src/apiClient';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    let fundId:string;
    let hireId:string;
    beforeAll(async () => {
                authToken = await login(process.env.FreeUser_EMAIL as string, process.env.FreeUser_PASSWORD as string);
                
                
     });


    it('DeActivate Account', async () => {
       if(authToken!='User not active'){
        try {
            const response = await apiClient.delete('/api/v1/profile/');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            console.log("deactive",response.data)
            expect(response.data).toBe('Deleted Succesfully')
           
         
        } catch (error) {
            if (axios.isAxiosError(error)) {
                
                
                console.log(error.response?.data)
                const errorMessage = error.response?.data;
                //expect(errorMessage).toBe('No leads found for this user');

              } else {
              
                console.error('Error message:', (error as Error).message);
              }
              throw error
        }
    }else{
        console.log("User not active")

    }
    }, 20000);

    
    it('ReActive account', async () => {
        const reActivePayload = {
            "username": process.env.FreeUser_EMAIL,
            "password": process.env.FreeUser_PASSWORD,
            "email": process.env.FreeUser_EMAIL
          }
    
      
            try {
                const response = await apiClient.post('/api/users/reactivate-user', reActivePayload);
                expect(response.status).toBe(200);
                expect(response).toBeDefined();
                console.log("Response:", response.data);
                expect(response.data).toBe('User reactivated successfully');
            } catch (error) {
                
                throw error
            }
    }, 20000);
 



})