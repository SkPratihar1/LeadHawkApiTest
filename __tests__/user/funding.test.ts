
import { apiClient, login } from '../../src/apiClient';
import { assertFundingData ,assertMyLeadsProperty} from '../../src/utils/assertions'
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    let fundId:string;
    beforeAll(async () => {
                authToken = await login(process.env.USER_EMAIL as string, process.env.USER_PASSWORD as string);
     });



    it('Funding list using API', async () => {
       
        try {
            const response = await apiClient.get('/api/v1/landing/funds?page=0&count=25');
            assertFundingData(response)
            const list= response.data.data
            console.log("fund",response.data.data[0])
            const randomIndex = Math.floor(Math.random() * list.length);
            fundId = list[randomIndex].id;
            console.log("response funding Data",fundId)
         
        } catch (error) {
            console.log('Error:', error);
        }
    }, 20000);
    it('Fund add for myLead  using API', async () => {
        let pageName='FUNDING'
        const fundPayload=
            [
                fundId
              ]

        try {
            const response = await apiClient.post('/api/v1/userService/myLeads/FUNDING',fundPayload);
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            assertMyLeadsProperty(response,pageName)
            console.log("response fund  Data",response.data)
         
        } catch (error) {
            throw error;
        }
    }, 20000);




})