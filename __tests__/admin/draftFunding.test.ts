import {  login ,apiAdmin} from '../../src/apiClient';
import { assertDraftDelete,assertDraftLive,assertFundingData} from '../../src/utils/assertions'
import dotenv from 'dotenv';
import axios from 'axios';
import util from 'util';

dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    let fundId:any;
    let fundId2:any
    beforeAll(async () => {
                authToken = await login(process.env.ADMIN_EMAIL as string, process.env.ADMIN_PASSWORD as string);
                apiAdmin.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
                
     });


     it('Draft Funding list', async () => {
        
        
        try {
            const response = await apiAdmin.get('/admin/draft/fundings?page=0&count=5');
            assertFundingData(response)
            console.log("response",response.data);
            let responseLength=response.data.length
            if(responseLength!=0){
                fundId=response.data.data[0].id;
                fundId2=response.data.data[1].id

            }else{

                console.log("Fund Draft list is not found")
            }
            
         
        } catch (error) {
            throw error
        }
    }, 20000);
    it('Draft Delete',async()=>{

        try{
            const response =await apiAdmin.delete(`/admin/draft/fundings/${fundId2}`);
            assertDraftDelete(response,"Draft Funding deleted successfully")
            

        }catch(error){
            if (axios.isAxiosError(error)) {
                // Use util.inspect to handle circular references
                console.log(util.inspect(error.response?.data, { depth: null, colors: true }));
              } else {
                console.error('Error message:', (error as Error).message);
              }
              throw error;
            }

    })

    it('Draft Funding to Live Funding', async () => {
        
        try {
            const response = await apiAdmin.post('/admin/draft/draftToLive/fundings?all=false',[fundId]);
            assertDraftLive(response)
            console.log("invalidDrafts:",response.data.invalidDrafts);
            console.log("validDrafts:",response.data.validDrafts);
            let validDrafts=response.data.validDrafts
            if(validDrafts!=0){
                console.log("Draft Fundings added to live")
            }else(
                console.log("0 funds published. 1 invalid funds not published")
            )
         
        } catch (error) {
            
            if (axios.isAxiosError(error)) {
                // Use util.inspect to handle circular references
                console.log(util.inspect(error.response?.data, { depth: null, colors: true }));
              } else {
                console.error('Error message:', (error as Error).message);
              }
              throw error;
            }
    }, 20000);
})