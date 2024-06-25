
import { apiClient} from '../../src/apiClient';
import { generateSignUpPayloads ,generateAccountActivePayloads,fakeData} from '../../src/utils/payloads';
import dotenv from 'dotenv';
import axios from 'axios';
import  getVerificationCodeByEmail  from '../../src/utils/dbConection'


dotenv.config();

describe('API Tests', () => {
  let token:string
  let userEmail=fakeData.email

     it('Create User Account', async () => {
       console.log('userEmail',userEmail)
       const signUpPayload = generateSignUpPayloads(userEmail)
        try {
            const response = await apiClient.post('/api/users/createAccount?selectedPlan=', signUpPayload);
            expect(response.status).toBe(201);
            expect(response).toBeDefined();
            expect(response.data.success).toBe(true);
            expect(response.data.message).toBe(null);

            // console.log("success:",response.data.success)
            // console.log('user:', response?.data.user);
            // console.log('message:', response?.data.message);
         
        } catch (error) {
            if (axios.isAxiosError(error)) {
                
                // console.error('Error response:', error.response?.data);
                // console.error('Status:', error.response?.data.status);
                // console.error('message:', error.response?.data.message);
                const errorMessage = error.response?.data.message;
                expect(errorMessage).toBe('Email already in use');

              } else {
              
                console.error('Error message:', (error as Error).message);
              }
              throw error

           
        }
    }, 20000);

    it('Verify new user account', async () => {
      console.log('userEmail 2',userEmail)
      try {
          token =await getVerificationCodeByEmail(userEmail)
         console.log("token",token)

     } catch (error) {
         console.log('Token Error:', error);   
     }
      
      const accountVerificationPayloads = generateAccountActivePayloads(token)
      try {
          const response = await apiClient.post('/api/users/verify-user',accountVerificationPayloads);
          expect(response.status).toBe(200);
          expect(response).toBeDefined();  
       
      } catch (error) {
         
          throw error;
      }
  }, 20000);




})