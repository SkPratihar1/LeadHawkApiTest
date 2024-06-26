import { apiClient, login } from '../../src/apiClient';
import { assertInvoiceProperty } from '../../src/utils/assertions'
import dotenv from 'dotenv';

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
                assertInvoiceProperty(response)
                //console.log("response invoice Data",response.data)

            }else{
                console.log("data not found")
                console.log("response invoice Data",response.data)

            }
            
            console.log("response invoice Data",response.data)
         
        } catch (error) {
            throw error
        }
    }, 20000);
})