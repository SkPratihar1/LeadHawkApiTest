
import { apiClient, login } from '../../src/apiClient';
import { assertJobProperty ,assertMyLeadsProperty} from '../../src/utils/assertions'
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    let jobPostId:string;
    beforeAll(async () => {
                authToken = await login(process.env.USER_EMAIL as string, process.env.USER_PASSWORD as string);
                
     });



    it('JobPosting list using API', async () => {
       
        try {
            const response = await apiClient.get('/api/v1/landing/jobs?page=0&count=25');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            assertJobProperty(response)
            const list= response.data.data
            // console.log(response.data)
            const randomIndex = Math.floor(Math.random() * list.length);
            jobPostId = list[randomIndex].id;
            console.log("response jobsId Data",jobPostId)
         
        } catch (error) {
            throw error
            
        }
    }, 20000);
    it('Jobs add for myLead using API', async () => {
        let pageName='JOBS'
        const jobPayload=
            [
                jobPostId
              ]

        try {
            const response = await apiClient.post('api/v1/userService/myLeads/JOBS',jobPayload);
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            assertMyLeadsProperty(response,pageName)
            console.log("response jobs Data",response)
         
        } catch (error) {
           
            if (axios.isAxiosError(error)) {
                
                console.log(error.response?.data)

              } else {
              
                console.error('Error message:', (error as Error).message);
              }
              throw error
        }
    }, 20000);

})