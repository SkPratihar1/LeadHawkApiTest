import {  login ,apiAdmin} from '../../src/apiClient';
import dotenv from 'dotenv';
import axios from 'axios';


dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    let jobId:any;
    let jobId2:any
    beforeAll(async () => {
                authToken = await login(process.env.ADMIN_EMAIL as string, process.env.ADMIN_PASSWORD as string);
                apiAdmin.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
                
     });


     it('Draft Jobs list', async () => {
        
        
        try {
            const response = await apiAdmin.get('/admin/draft/jobs?page=0&count=25');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            console.log("response",response.data);
            let responseLength=response.data.length
            if(responseLength!=0){
                jobId=response.data.data[0].id;
                jobId2=response.data.data[1].id

            }else{

                console.log("Jobs Draft list is not found")
            }
         
        } catch (error) {
            throw error
        }
    }, 20000);
    it('Draft Delete',async()=>{

        try{
            const response =await apiAdmin.delete(`/admin/draft/jobs/${jobId2}`);
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            expect(response.data).toBe('Draft Jobs deleted successfully');
            console.log(response.data)
            

        }catch(error){
            throw error

        }



    })

    it('Draft Jobs to Live Jobs', async () => {
        
        try {
            const response = await apiAdmin.post('admin/draft/draftToLive/jobs?all=false',[jobId]);
            expect(response.status).toBe(201);
            expect(response).toBeDefined();
            console.log("response",response.data);
            console.log("invalidDrafts:",response.data.invalidDrafts);
            console.log("validDrafts:",response.data.validDrafts);
            let validDrafts=response.data.validDrafts
            if(validDrafts!=0){
                console.log("Draft Jobs added to live")
            }else(
                console.log("Draft Jobs is not added to live")
            )
         
        } catch (error) {
            throw error
        }
    }, 20000);
})