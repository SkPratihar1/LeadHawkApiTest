import { apiClient, login } from '../../src/apiClient';
import { generateReActivePayloads } from '../../src/utils/payloads';
import { assertReActivationDeactivationResponse } from '../../src/utils/assertions'
import dotenv from 'dotenv';
import axios from 'axios';
import util from 'util'

dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    beforeAll(async () => {
                authToken = await login(process.env.activeDeActiveUser as string, process.env.FreeUser_PASSWORD as string);
                         
                
     });


    it('DeActivate Account', async () => {

       if(authToken!='User not active'){
        try {
            const response = await apiClient.delete('/api/v1/profile/');
            assertReActivationDeactivationResponse(response,'Deactivated Succesfully')
         
        } catch (error) {
            if (axios.isAxiosError(error)) {
                
                console.log(util.inspect(error.response?.data, { depth: null, colors: true }));

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
        const reActivePayload = generateReActivePayloads()
    
      
            try {
                const response = await apiClient.post('/api/users/reactivate-user', reActivePayload);
                assertReActivationDeactivationResponse(response,'User reactivated successfully')

            } catch (error) {
                
                if (axios.isAxiosError(error)) {
                
                    console.log(util.inspect(error.response?.data, { depth: null, colors: true }));
    
                  } else {
                  
                    console.error('Error message:', (error as Error).message);
                  }
                  throw error
            }
    }, 20000);
 



})