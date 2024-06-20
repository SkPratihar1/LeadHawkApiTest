import {  login ,apiAdmin} from '../../src/apiClient';
import { generateAddFundingPayload , generateEditFundingPayload } from '../../src/utils/payloads'
import dotenv from 'dotenv';


dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    let fundId:any
    beforeAll(async () => {
                authToken = await login(process.env.ADMIN_EMAIL as string, process.env.ADMIN_PASSWORD as string);
                apiAdmin.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
                
     });


     it('Draft Funding list', async () => {
        
        
        try {
            const response = await apiAdmin.get('/admin/draft/fundings?page=0&count=5');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            console.log("response",response.data);
            fundId=response.data.data[0].id
         
        } catch (error) {
            //console.log('Error:', error);
            throw error
        }
    }, 20000);

    it('Draft Funding to Live Funding', async () => {
        
        try {
            const response = await apiAdmin.post('/admin/draft/draftToLive/fundings?all=false',[fundId]);
            expect(response.status).toBe(201);
            expect(response).toBeDefined();
            console.log("response",response.data);
            expect(response.data).toBe('Draft Fundings added to live')
         
        } catch (error) {
            //console.log('Error:', error);
            throw error
        }
    }, 20000);
})