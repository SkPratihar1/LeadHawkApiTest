
import {  login ,apiAdmin} from '../../src/apiClient';
import { generateAddFundingPayload , generateEditFundingPayload } from '../../src/utils/payloads'
import dotenv from 'dotenv';


dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    let fundId:any
    beforeAll(async () => {
                authToken = await login(process.env.ADMIN_EMAIL as string, process.env.ADMIN_PASSWORD as string);
                apiAdmin.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
                
     });


     it('Create Funding', async () => {
        
        const fundingPayload=generateAddFundingPayload()
        try {
            const response = await apiAdmin.post('/admin/dataentry/FUNDING', fundingPayload);
            expect(response.status).toBe(200);
            expect(response).toBeDefined();

            console.log("response",response.data)
         
        } catch (error) {
            //console.log('Error:', error);
            throw error
        }
    }, 20000);

    it('Funding list', async () => {
       
        try {
            
            const response = await apiAdmin.get('/admin/dataentry/myEntries/funds?page=0&count=25');
            // console.log("response",response)
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            fundId=response.data.data[0].id
            
         
        } catch (error) {
            throw error
            
        }
    }, 20000);

    it('Funds edit', async () => {
   
       const fundEditPayload = generateEditFundingPayload(fundId)
       
        try {
            
            const response = await apiAdmin.put(`/admin/dataentry/FUNDING/${fundId}`,fundEditPayload);
            console.log("response",response.data)
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            
            
         
        } catch (error) {
            throw error
            
        }
    }, 20000);

    it('Fund delete', async () => {
        
        
         try {
             
             const response = await apiAdmin.delete(`/admin/dataentry/FUNDING/${fundId}`);
             expect(response.status).toBe(200);
             expect(response).toBeDefined();
             expect(response.data).toBe('Entry deleted successfully');
            
             
          
         } catch (error) {
            console.log(error)
             throw error
             
         }
     }, 20000);






})