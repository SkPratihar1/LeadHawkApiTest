
import { apiClient, login } from '../../src/apiClient';
import { assertJobProperty ,assertMyLeadsProperty} from '../../src/utils/assertions'
import dotenv from 'dotenv';
import axios from 'axios';
import util from 'util'

dotenv.config();

// function getCircularReplacer() {
//     const seen = new WeakSet();
//     return (key: string, value: any) => {
//         if (typeof value === "object" && value !== null) {
//             if (seen.has(value)) {
//                 return;
//             }
//             seen.add(value);
//         }
//         return value;
//     };
// }

describe.skip('API Tests', () => {
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
            console.log("Code Api ")
            const randomIndex = Math.floor(Math.random() * list.length);
            jobPostId = list[randomIndex].id;
            console.log("response jobsId Data",jobPostId)
            
         
        } catch (error) {
           
            if (axios.isAxiosError(error)) {
                
                console.log(util.inspect(error.response?.data, { depth: null, colors: true }));
                

              } else {
              
                console.error('Error message:', (error as Error).message);
              }
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
            console.log("Code Api 2")
            // console.log("response jobs Data",response)
         
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