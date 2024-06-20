
import { apiClient, login } from '../../src/apiClient';
import dotenv from 'dotenv';

dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    let newsId:string;
    beforeAll(async () => {
                authToken = await login(process.env.USER_EMAIL as string, process.env.USER_PASSWORD as string);
                
     });



    it('Press Releases list using API', async () => {
       
      
            const response = await apiClient.get('/api/v1/landing/news?page=0&count=25');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            console.log("press reales list",response.data)
            const list= response.data.data
            const randomIndex = Math.floor(Math.random() * list.length);
            newsId = list[randomIndex].id;
            console.log("response funding Data",newsId)
        
    }, 20000);


    it('News add for my leads add using API', async () => {
        const newsPayload=
            [
                newsId
              ]

        try {
            const response = await apiClient.post('/api/v1/userService/myLeads/NEWS',newsPayload);
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            // const list= response.data.content
            // const randomIndex = Math.floor(Math.random() * list.length);
            // hireId = list[randomIndex].id;
            console.log("response Hire Data",response.data)
         
        } catch (error) {
            throw error;
        }
    }, 20000);


})