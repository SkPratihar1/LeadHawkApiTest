import { apiClient, login } from '../../src/apiClient';
import { assertInvoiceProperty } from '../../src/utils/assertions'
import dotenv from 'dotenv';
import axios from 'axios';
import util from 'util'

dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    
    beforeAll(async () => {
                authToken = await login(process.env.USER_EMAIL as string, process.env.USER_PASSWORD as string);
               
     });

    it('Get Invoice using API', async () => {
       
        try {
            const response = await apiClient.get('/api/v1/getInvoices');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            const responseLength=response.data.length
            
            if(responseLength!=0){
                assertInvoiceProperty(response);

            }else{
                console.log("data not found")
                // console.log("response invoice Data",response.data)

            }
            
            // console.log("response invoice Data",response.data)
         
        } catch (error) {
            if (axios.isAxiosError(error)) {
                
                //console.log(error.response?.data)
                console.log(util.inspect(error.response?.data, { depth: null, colors: true }));

              } else {
              
                console.error('Error message:', (error as Error).message);
              }
              throw error
        }
    }, 20000);
})