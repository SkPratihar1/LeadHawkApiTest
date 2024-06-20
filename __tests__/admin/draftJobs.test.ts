import {  login ,apiAdmin} from '../../src/apiClient';
import dotenv from 'dotenv';


dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    let jobId:any
    beforeAll(async () => {
                authToken = await login(process.env.ADMIN_EMAIL as string, process.env.ADMIN_PASSWORD as string);
                apiAdmin.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
                
     });


     it('Draft Jobs list', async () => {
        
        
        try {
            const response = await apiAdmin.get('/admin/draft/jobs?page=0&count=25');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            console.log("response",response.data);
            jobId=response.data.data[0].id
         
        } catch (error) {
            //console.log('Error:', error);
            throw error
        }
    }, 20000);

    it('Draft Jobs to Live Jobs', async () => {
        
        try {
            const response = await apiAdmin.post('admin/draft/draftToLive/jobs?all=false',[jobId]);
            expect(response.status).toBe(201);
            expect(response).toBeDefined();
            console.log("response",response.data);
            expect(response.data).toBe('Draft Jobs added to live')
         
        } catch (error) {
            //console.log('Error:', error);
            throw error
        }
    }, 20000);
})