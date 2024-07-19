
import { apiClient, login } from '../../src/apiClient';
import { assertPressReleasesProperty,assertMyLeadsProperty } from '../../src/utils/assertions'
import dotenv from 'dotenv';
import axios from 'axios';
import util from 'util'

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
            assertPressReleasesProperty(response);
            const list= response.data.data
            const randomIndex = Math.floor(Math.random() * list.length);
            newsId = list[randomIndex].id;
        
    }, 20000);


    it('News add for my leads add using API', async () => {
       let pageName='NEWS'
        const newsPayload=
            [
                newsId
              ]

        try {
            const response = await apiClient.post('/api/v1/userService/myLeads/NEWS',newsPayload);
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            assertMyLeadsProperty(response, pageName);
            //console.log("response news Data",response.data && response.data.length ? response.data[0] : null)
         
        } catch (error) {
            if (axios.isAxiosError(error)) {
                
                console.log(util.inspect(error.response?.data, { depth: null, colors: true }));

              } else {
              
                console.error('Error message:', (error as Error).message);
              }
              throw error
        }
    }, 20000);


})