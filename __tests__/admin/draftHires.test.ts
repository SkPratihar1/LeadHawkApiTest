import {  login ,apiAdmin} from '../../src/apiClient';
import { assertDraftDelete} from '../../src/utils/assertions'
import dotenv from 'dotenv';
import axios from 'axios';
import util from 'util';


dotenv.config();

describe.skip('API Tests', () => {
    let authToken: string | null = null;
    let hireId:any
    let hireId2:any
    let dataLength:any
    beforeAll(async () => {
                authToken = await login(process.env.ADMIN_EMAIL as string, process.env.ADMIN_PASSWORD as string);
                apiAdmin.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
                
     });


     it('Draft Hires list', async () => {
        
        
        try {
            const response = await apiAdmin.get('/admin/draft/hires?page=0&count=5');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            
            console.log("response",response.data);
            expect(response.data).toHaveProperty('data');
            expect(response.data).toHaveProperty('totalElements');
            expect(response.data).toHaveProperty('totalPages')
            
            dataLength=response.data.data.length
            console.log('dataLength',dataLength)
            if(dataLength!=0){
                 hireId=response.data.data[0].id
                 hireId2=response.data.data[1].id

            }else{
                console.log("Draft list is not found")
            }
           
         
        } catch (error) {
            //console.log('Error:', error);
            if (axios.isAxiosError(error)) {
                // Use util.inspect to handle circular references
                console.log(util.inspect(error.response?.data, { depth: null, colors: true }));
              } else {
                console.error('Error message:', (error as Error).message);
              }
              throw error;
            }
    }, 20000);

    // it.skip('Draft Delete',async()=>{

    //     try{
    //         const response =await apiAdmin.delete(`/admin/draft/hires/${hireId2}`);
    //         assertDraftDelete(response)
            

    //     }catch(error){
    //         if (axios.isAxiosError(error)) {
                
            //     console.log(error.response?.data)

            //   } else {
              
            //     console.error('Error message:', (error as Error).message);
            //   }
            //   throw error

    //     }

    // })



    it('Draft Hires to Live Hires', async () => {
        if(dataLength!=0){
            try {
                const response = await apiAdmin.post('/admin/draft/draftToLive/hires?all=false',[hireId]);
                expect(response.status).toBe(201);
                expect(response).toBeDefined();
                console.log("response",response.data);
                console.log("invalidDrafts:",response.data.invalidDrafts);
                console.log("validDrafts:",response.data.validDrafts);
                let validDrafts=response.data.validDrafts
                if(validDrafts!=0){
                    console.log("Draft Hires added to live")
                }else(
                    console.log("Draft Hires is not added to live")
                )
             
            } catch (error) {
                //console.log('Error:', error);
                if (axios.isAxiosError(error)) {
                    // Use util.inspect to handle circular references
                    console.log(util.inspect(error.response?.data, { depth: null, colors: true }));
                  } else {
                    console.error('Error message:', (error as Error).message);
                  }
                  throw error;
                }

        }else{
            console.log("Draft Hires List not found");
            
        }
        
    }, 20000);
})