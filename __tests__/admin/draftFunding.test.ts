import {  login ,apiAdmin} from '../../src/apiClient';
import dotenv from 'dotenv';


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
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
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
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            expect(response.data).toBe('Draft Funding deleted successfully');
            console.log(response.data)
            

        }catch(error){
            throw error

        }



    })

    it('Draft Funding to Live Funding', async () => {
        
        try {
            const response = await apiAdmin.post('/admin/draft/draftToLive/fundings?all=false',[fundId]);
            expect(response.status).toBe(201);
            expect(response).toBeDefined();
            console.log("response",response.data);
            console.log("invalidDrafts:",response.data.invalidDrafts);
            console.log("validDrafts:",response.data.validDrafts);
            let validDrafts=response.data.validDrafts
            if(validDrafts!=0){
                console.log("Draft Fundings added to live")
            }else(
                console.log("0 funds published. 1 invalid funds not published")
            )
         
        } catch (error) {
            
            throw error
        }
    }, 20000);
})