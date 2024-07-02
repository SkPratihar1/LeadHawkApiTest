import { login ,apiAdmin} from '../../src/apiClient';
import { generateEditHirePayload , generateAddHirePayload } from '../../src/utils/payloads';
import { assertHiresData} from '../../src/utils/assertions'
import { fakeData } from '../../src/utils/payloads';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    let hireId:any
  
    
    beforeAll(async () => {
                authToken = await login(process.env.ADMIN_EMAIL as string, process.env.ADMIN_PASSWORD as string);
                apiAdmin.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
                
     });


     it('Create Executive Hires', async () => {
  
        const addExecutiveHirePayloads = generateAddHirePayload()
        try {
            
            const response = await apiAdmin.post('/admin/dataentry/HIRES', addExecutiveHirePayloads);
            console.log('try firstName',fakeData.firstName)
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            expect(response.data).toHaveProperty('id');
            expect(response.data).toHaveProperty('dataEntryOperatorId');
            assertHiresData(response);
         
        } catch (error) {
            if (axios.isAxiosError(error)) {
                
                console.log(error.response?.data)

              } else {
              
                console.error('Error message:', (error as Error).message);
              }
              throw error
            
        }
    }, 20000);

    it('Executive Hires list', async () => {
       
        try {
            
            const response = await apiAdmin.get('/admin/dataentry/myEntries/hires?page=0&count=25');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            hireId=response.data.data[0].id
            
         
        } catch (error) {
            throw error
            
        }
    }, 20000);

    it('Executive Hires edit', async () => {

        const  executiveHireEditPayload = generateEditHirePayload(hireId)
   
        try {
            
            const response = await apiAdmin.put(`/admin/dataentry/HIRES/${hireId}`,executiveHireEditPayload);
            console.log("response",response.data)
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
           
            
         
        } catch (error) {
            throw error
            
        }
    }, 20000);

    it('Executive Hires delete', async () => {
        
        
         try {
             
             const response = await apiAdmin.delete(`/admin/dataentry/HIRES/${hireId}`);
             expect(response.status).toBe(200);
             expect(response).toBeDefined();
             expect(response.data).toBe('Entry deleted successfully');
            
             
          
         } catch (error) {
            console.log(error)
            if (axios.isAxiosError(error)) {
                
                console.log(error.response?.data)

              } else {
              
                console.error('Error message:', (error as Error).message);
              }
              throw error
             
         }
     }, 20000);



})