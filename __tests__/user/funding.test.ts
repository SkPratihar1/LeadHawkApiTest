
import { apiClient, login } from '../../src/apiClient';
import dotenv from 'dotenv';

dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    let fundId:string;
    beforeAll(async () => {
                authToken = await login(process.env.USER_EMAIL as string, process.env.USER_PASSWORD as string);
                // console.log('authToken',authToken)
     });



    it('Funding list using API', async () => {
       
        try {
            const response = await apiClient.get('/api/v1/landing/funds?page=0&count=25');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            const list= response.data.data
            const randomIndex = Math.floor(Math.random() * list.length);
            fundId = list[randomIndex].id;
            console.log("response funding Data",fundId)
         
        } catch (error) {
            console.log('Error:', error);
        }
    }, 20000);
    it('Fund add for myLead  using API', async () => {
        const fundPayload=
            [
                fundId
              ]

        try {
            const response = await apiClient.post('/api/v1/userService/myLeads/FUNDING',fundPayload);
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            console.log("response fund  Data",response.data)
         
        } catch (error) {
            throw error;
        }
    }, 20000);




})