import { apiClient, login } from '../../src/apiClient';
import { assertHiresProperty,assertMyLeadsProperty } from '../../src/utils/assertions'
import dotenv from 'dotenv';

dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    let hireId:string;
    beforeAll(async () => {
                authToken = await login(process.env.USER_EMAIL as string, process.env.USER_PASSWORD as string);
     });


     it('Retrieve User Hire list using API', async () => {
       
        try {
            const response = await apiClient.get('/api/v1/landing/hires?page=0&count=25');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            assertHiresProperty(response)

            //console.log("hire response ",response.data.data[0])
            const list= response.data.data
            const randomIndex = Math.floor(Math.random() * list.length);
            hireId = list[randomIndex].id;
         
        } catch (error) {
            throw error;
        }
    }, 20000);

    it('Hire add for myLead using API', async () => {
        let pageName='HIRES'
        const hirePayload=
            [
                hireId
              ]

        try {
            const response = await apiClient.post('/api/v1/userService/myLeads/HIRES',hirePayload);
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            assertMyLeadsProperty(response, pageName);
            console.log("response Hire Data",response.data)
         
        } catch (error) {
            throw error;
        }
    }, 20000);




})