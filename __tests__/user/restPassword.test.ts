import { apiClient, login } from '../../src/apiClient';
import { generateResetPasswordPayloads , generateSetNewPasswordPayloads } from '../../src/utils/payloads';
import  getVerificationCodeByEmail  from '../../src/utils/dbConection'
import dotenv from 'dotenv';

dotenv.config();

describe('API Tests', () => {
    let token:string
    

     it('Reset Password Link sent', async () => {
       
        
        const resetEmailPayloads = generateResetPasswordPayloads()
        try {
            const response = await apiClient.post('/api/users/forgot-password',resetEmailPayloads);
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            const message= response.data.message
            expect(message).toBe("Reset link sent.")
            
            //{"message":"Password Changed Succesfully"}
        } catch (error) {
           
            throw error;
        }
    }, 20000);


    it('Set New Password ', async () => {
        try {
            token =await getVerificationCodeByEmail(process.env.FreeUser_EMAIL as string)
           console.log("token",token)

       } catch (error) {
           console.log('Token Error:', error);   
       }
        
        const setPasswordPayloads = generateSetNewPasswordPayloads(token)
        try {
            const response = await apiClient.post('/api/users/reset-password',setPasswordPayloads);
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            const message= response.data.message
            console.log("message:",message)
            expect(message).toBe("Password Changed Succesfully")
            
         
        } catch (error) {
           
            throw error;
        }
    }, 20000);
})