
import { apiClient, login } from '../../src/apiClient';
import { assertFundingData ,assertMyLeadsProperty} from '../../src/utils/assertions'
import dotenv from 'dotenv';
import axios from 'axios';
import util from 'util'
import {handleApiError} from '../../src/utils/apiError'


dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    let fundId:string;
    beforeAll(async () => {
                authToken = await login(process.env.USER_EMAIL as string, process.env.USER_PASSWORD as string);
     });



    it('Funding list using API', async () => {
       
        try {
            // const response:any = await apiClient.get('/api/v1/landing/funds?page=0&count=25');
            // assertFundingData(response);
            // const list= response.data.data
            // const randomIndex = Math.floor(Math.random() * list.length);
            // fundId = list[randomIndex].id;
            // console.log("Code Api  fund")
            // //console.log(response.data)
            const response = await apiClient.get('/api/v1/landing/funds?page=0&count=25');
            //console.log(util.inspect(response, { depth: 1, colors: true })); // Log the response with limited depth

            // Check response structure before asserting properties
            if (response && response.data && response.data.data) {
                assertFundingData(response);
                const list = response.data.data;
                const randomIndex = Math.floor(Math.random() * list.length);
                fundId = list[randomIndex].id;
                console.log("Code API fund");
            } else {
                throw new Error('Unexpected response structure');
            }
            
         
        } catch (error) {
            // if (axios.isAxiosError(error)) {
            //    console.error(error.toJSON())
            //    //console.log(util.inspect(error.response?.data, { depth: null, colors: true }));

            //   } else {
              
            //     console.error('Error message:', (error as Error).message);
                
            handleApiError(error);
            //   }
              throw error
        }
    }, 20000);
    it('Fund add for myLead  using API', async () => {
        let pageName='FUNDING'
        const fundPayload=
            [
                fundId
              ]

        try {
            const response:any = await apiClient.post('/api/v1/userService/myLeads/FUNDING',fundPayload);
            console.log(util.inspect(response, { depth: 1, colors: true }));
            if(response && response.data && response.data.data) {
                expect(response.status).toBe(200);
                expect(response).toBeDefined();
                //console.log(response)
                assertMyLeadsProperty(response,pageName);
                console.log("Code Api 2 fund");
                // jest.setTimeout(30000)
            }else{
                throw new Error('Unexpected response structure 2');

            }
           
         
        } catch (error) {
            // if (axios.isAxiosError(error)) {
            //     console.error(error.toJSON())
                
            //     //console.log(util.inspect(error.response?.data, { depth: null, colors: true }));

            //   } else {
              
            //     console.error('Error message:', (error as Error).message);
            //   }
            jest.setTimeout(30000)
            console.log("error fund2 ")
              handleApiError(error);
              throw error
        }
    }, 20000);


})