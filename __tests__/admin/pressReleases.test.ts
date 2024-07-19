import {login ,apiAdmin} from '../../src/apiClient';
import { generateNewsEditPayload,generateNewsPayload } from '../../src/utils/payloads';
import { assertPressReleasesProperty,assertLiveDataDelete,assertPressReleasesData} from '../../src/utils/assertions'
import dotenv from 'dotenv';
import axios from 'axios';
import util from 'util';



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

            assertPressReleasesData(response)
           
         
        } catch (error) {
            throw error

        }
    }, 20000);

    it('Press release list', async () => {
       
        try {
            
            const response = await apiAdmin.get('/admin/dataentry/myEntries/news?page=0&count=25');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            assertPressReleasesProperty(response);
            newsId=response.data.data[0].id
            
         
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Use util.inspect to handle circular references
                console.log(util.inspect(error.response?.data, { depth: null, colors: true }));
              } else {
                console.error('Error message:', (error as Error).message);
              }
              throw error;
            }
    }, 20000);

    it('News edit', async () => {
   
    const newsEditPayload = generateNewsEditPayload(newsId)
       
        try {
            
            const response = await apiAdmin.put(`/admin/dataentry/NEWS/${newsId}`,newsEditPayload);
            console.log("response",response.data)
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            
            
         
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Use util.inspect to handle circular references
                console.log(util.inspect(error.response?.data, { depth: null, colors: true }));
              } else {
                console.error('Error message:', (error as Error).message);
              }
              throw error;
            }
    }, 20000);

    it('News delete', async () => {
        
        
         try {
             
             const response = await apiAdmin.delete(`/admin/dataentry/NEWS/${newsId}`);
            
             assertLiveDataDelete(response,'Entry deleted successfully');  
             
          
         } catch (error) {
            
            if (axios.isAxiosError(error)) {
                // Use util.inspect to handle circular references
                console.log(util.inspect(error.response?.data, { depth: null, colors: true }));
              } else {
                console.error('Error message:', (error as Error).message);
              }
              throw error;
            }
     }, 20000);


})