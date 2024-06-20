import { login ,apiAdmin} from '../../src/apiClient';
import {generateEditJobsPayload ,generateJobsPayload} from '../../src/utils/payloads'
import dotenv from 'dotenv';


dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    let jobId:any;
    
    beforeAll(async () => {
                authToken = await login(process.env.ADMIN_EMAIL as string, process.env.ADMIN_PASSWORD as string);
                apiAdmin.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
                
     });


     it('Add Jobs', async () => {
       
         const jobsAddPayload = generateJobsPayload()

        try {
            const response = await apiAdmin.post('/admin/dataentry/JOBS', jobsAddPayload);
            expect(response.status).toBe(200);
            expect(response).toBeDefined();

            console.log("response",response.data)
         
        } catch (error) {
            
            throw error;
        }
    }, 20000);

    it('Job list', async () => {
       
        try {
            
            const response = await apiAdmin.get('/admin/dataentry/myEntries/jobs?page=0&count=25');
            // console.log("response",response)
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            jobId=response.data.data[0].id
            
         
        } catch (error) {
            throw error
            
        }
    }, 20000);

    it('Jobs edit', async () => {
    
        const jobsEditPayload = generateEditJobsPayload(jobId)
        
        try {
            
            const response = await apiAdmin.put(`/admin/dataentry/JOBS/${jobId}`,jobsEditPayload);
            console.log("response",response.data)
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            console.log(jobId)
            
         
        } catch (error) {
            throw error
            
        }
    }, 20000);

    it('Press Release Job delete', async () => {
        
        
         try {
             
             const response = await apiAdmin.delete(`/admin/dataentry/JOBS/${jobId}`);
             console.log("response",response.data)
             expect(response.status).toBe(200);
             expect(response).toBeDefined();
             expect(response.data).toBe('Entry deleted successfully');
            
             
          
         } catch (error) {
            //console.log(error)
             throw error
             
         }
     }, 20000);




})