import { login ,apiAdmin} from '../../src/apiClient';
import { generateEditHirePayload , generateAddHirePayload } from '../../src/utils/payloads'
import { fakeData } from '../../src/utils/payloads';
import dotenv from 'dotenv';

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
            expect(response.data.firstName).toBe(fakeData.firstName);
            expect(response.data.lastName).toBe(fakeData.lastName);
            expect(response.data.position).toBe(fakeData.position);
            expect(response.data.companyName).toBe(fakeData.companyName);
            expect(response.data.companyHQ).toBe(fakeData.companyHQ);
            expect(response.data.industry).toBe(fakeData.industry);
            expect(response.data.companyWebsite).toBe(fakeData.companyWebsite);
            expect(response.data.companyEmployeeCount).toBe(70);
            expect(response.data.companyLinkedIn).toBe("https://in.linkedin.com/company/itobuz-technologies-pvt-ltd");

            
         
        } catch (error) {
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
            console.log(hireId)
            
         
        } catch (error) {
            throw error
            
        }
    }, 20000);

    it('Executive Hires delete', async () => {
        
        
         try {
             
             const response = await apiAdmin.delete(`/admin/dataentry/HIRES/${hireId}`);
             console.log("response",response.data)
             expect(response.status).toBe(200);
             expect(response).toBeDefined();
             expect(response.data).toBe('Entry deleted successfully');
            
             
          
         } catch (error) {
            console.log(error)
             throw error
             
         }
     }, 20000);



})