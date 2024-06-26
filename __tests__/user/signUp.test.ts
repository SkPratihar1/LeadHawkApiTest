
import { apiClient} from '../../src/apiClient';
import { generateSignUpPayloads ,generateAccountActivePayloads,fakeData} from '../../src/utils/payloads';
import dotenv from 'dotenv';
import axios from 'axios';
import { assertSignUp,assertAccountActive} from '../../src/utils/assertions'
import  getVerificationCodeByEmail  from '../../src/utils/dbConection'


dotenv.config();

describe('API Tests', () => {
  let token:string
  let userEmail=fakeData.email

     it('Create User Account', async () => {
      
       const signUpPayload = generateSignUpPayloads(userEmail)
        try {
            const response = await apiClient.post('/api/users/createAccount?selectedPlan=', signUpPayload);
            assertSignUp(response)
           
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
      
      try {
          token =await getVerificationCodeByEmail(userEmail)
         console.log("token",token)

     } catch (error) {
         console.log('Token Error:', error);   
     }
      
      const accountVerificationPayloads = generateAccountActivePayloads(token)
      try {
          const response = await apiClient.post('/api/users/verify-user',accountVerificationPayloads);
          assertAccountActive(response); 
       
      } catch (error) {
         
          throw error;
      }
  }, 20000);




})