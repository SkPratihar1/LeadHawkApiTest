import {login ,apiAdmin} from '../../src/apiClient';
import { generateNewsEditPayload,generateNewsPayload } from '../../src/utils/payloads';
import dotenv from 'dotenv';



dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    let newsId:any
   
    
    beforeAll(async () => {
                authToken = await login(process.env.ADMIN_EMAIL as string, process.env.ADMIN_PASSWORD as string);
                apiAdmin.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
                
     });


     it('Add Business News', async () => {
        
    const newsPayload = generateNewsPayload()
        try {
            const response = await apiAdmin.post('admin/dataentry/NEWS', newsPayload);
            expect(response.status).toBe(200);
            expect(response).toBeDefined();

            console.log("response",response.data)
         
        } catch (error) {
            throw error

        }
    }, 20000);

    it('Press release list', async () => {
       
        try {
            
            const response = await apiAdmin.get('/admin/dataentry/myEntries/news?page=0&count=25');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            console.log("response data",response.data.data[0])
            newsId=response.data.data[0].id
            
         
        } catch (error) {
            throw error
            
        }
    }, 20000);

    it('News edit', async () => {
   
    const newsEditPayload = generateNewsEditPayload(newsId)
       
        try {
            
            const response = await apiAdmin.put(`/admin/dataentry/NEWS/${newsId}`,newsEditPayload);
            console.log("response",response.data)
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            console.log(newsId)
            
         
        } catch (error) {
            throw error
            
        }
    }, 20000);

    it('News delete', async () => {
        
        
         try {
             
             const response = await apiAdmin.delete(`/admin/dataentry/NEWS/${newsId}`);
             console.log("response",response)
             expect(response.status).toBe(200);
             expect(response).toBeDefined();
             expect(response.data).toBe('Entry deleted successfully');
            
             
          
         } catch (error) {
            console.log(error)
             throw error
             
         }
     }, 20000);



   



})