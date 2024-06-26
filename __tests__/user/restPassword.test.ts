import { apiClient, login } from '../../src/apiClient';
import { generateResetPasswordPayloads , generateSetNewPasswordPayloads } from '../../src/utils/payloads';
import  getVerificationCodeByEmail  from '../../src/utils/dbConection';
import { assertResetSetNewPassword } from '../../src/utils/assertions'
import dotenv from 'dotenv';

dotenv.config();

describe('API Tests', () => {
    let token:string
    

     it('Reset Password Link sent', async () => {
       
        
        const resetEmailPayloads = generateResetPasswordPayloads(process.env.setNewPasswordUser as string)
        try {
            const response = await apiClient.post('/api/users/forgot-password',resetEmailPayloads);
            assertResetSetNewPassword(response,"Reset link sent.");
            // expect(response.status).toBe(200);
            // expect(response).toBeDefined();
            // const message= response.data.message
            // expect(message).toBe("Reset link sent.")
            
        } catch (error) {
           
            throw error;
        }
    }, 20000);


    it('Set New Password ', async () => {
        try {
            token =await getVerificationCodeByEmail(process.env.setNewPasswordUser as string)
            console.log("token",token)

       } catch (error) {
           console.log('Token Error:', error);   
       }
        
        const setPasswordPayloads = generateSetNewPasswordPayloads(token)
        try {
            const response = await apiClient.post('/api/users/reset-password',setPasswordPayloads);
            assertResetSetNewPassword(response,"Password Changed Succesfully");
            
        } catch (error) {
           
            throw error;
        }
    }, 20000);
})