import {  login ,apiAdmin} from '../../src/apiClient';
import dotenv from 'dotenv';


dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    let hireId:any
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

            }else{
                console.log("Draft list is not found")
            }
           
         
        } catch (error) {
            //console.log('Error:', error);
            throw error
        }
    }, 20000);

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
                throw error
            }

        }else{
            console.log("Draft Hires List not found")
        }
        
    }, 20000);
})