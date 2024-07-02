import {  login ,apiAdmin} from '../../src/apiClient';
import { assertDraftDelete,assertDraftLive,assertPressReleasesProperty} from '../../src/utils/assertions'
import dotenv from 'dotenv';
import axios from 'axios';



dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    let newsId:any;
    let newsId2:any
    beforeAll(async () => {
                authToken = await login(process.env.ADMIN_EMAIL as string, process.env.ADMIN_PASSWORD as string);
                apiAdmin.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
                
     });


     it('Draft Buisness news list', async () => {
        
        
        try {
            const response = await apiAdmin.get('/admin/draft/news?page=0&count=25');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            assertPressReleasesProperty(response);
            let responseLength=response.data.length
            if(responseLength!=0){
                newsId=response.data.data[0].id;
                newsId2=response.data.data[1].id

            }else{

                console.log("Jobs Draft list is not found")
            }
         
        } catch (error) {
            throw error
        }
    }, 20000);
    it('Draft Delete',async()=>{

        try{
            const response =await apiAdmin.delete(`/admin/draft/news/${newsId2}`);
            assertDraftDelete(response,'Draft News deleted successfully')
            
        }catch(error){
            if (axios.isAxiosError(error)) {
                
                console.log(error.response?.data)

              } else {
              
                console.error('Error message:', (error as Error).message);
              }
              throw error

        }
    })

    it('Draft News to Live News', async () => {
        
        try {
            const response = await apiAdmin.post('/admin/draft/draftToLive/news?all=false',[newsId]);
            assertDraftLive(response)
            console.log("invalidDrafts:",response.data.invalidDrafts);
            console.log("validDrafts:",response.data.validDrafts);
            let validDrafts=response.data.validDrafts
            if(validDrafts!=0){
                console.log("Draft Jobs added to live")
            }else(
                console.log("Draft Jobs is not added to live")
            )
         
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