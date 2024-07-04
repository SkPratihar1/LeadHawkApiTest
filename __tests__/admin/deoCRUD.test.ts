
import { login ,apiAdmin,apiClient} from '../../src/apiClient';
import { generateCreateProfilePayload , generateEditProfilePayload ,fakeData} from '../../src/utils/payloads';
import { assertDeoProfileCreateEditDelete,assertDeoProfileProperty} from '../../src/utils/assertions';
import { generateResetPasswordPayloads , generateSetNewPasswordPayloads } from '../../src/utils/payloads';
import { assertResetSetNewPassword } from '../../src/utils/assertions';
import  getVerificationCodeByEmail  from '../../src/utils/dbConection';
import dotenv from 'dotenv';
import axios from 'axios';
import Database from '../../src/utils/dbData'


dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    let lastCreatedDeoLength:number;
    let profileId:any;
    let dbInstance: Database;
    let tokenId:any
    
    
 
    beforeAll(async () => {
                authToken = await login(process.env.ADMIN_EMAIL as string, process.env.ADMIN_PASSWORD as string);
                apiAdmin.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
                dbInstance = Database.getInstance();
                await dbInstance.connect();
                
              
     });

     afterAll(async () => {
        await dbInstance.disconnect();
        
      });

     it('Create Profile', async () => {
       const createProfilePayload = generateCreateProfilePayload()

        try {
            const response = await apiAdmin.post('/admin/profileCreation/createProfile',createProfilePayload);
            assertDeoProfileCreateEditDelete(response,'Acccount created');
            
            const db = dbInstance.getDb();
            const collection = db.collection('Users');
            const resource = await collection.findOne({  email: fakeData.email.toLowerCase() });

            expect(resource).toMatchObject(createProfilePayload);

         
        } catch (error) {
            
            if (axios.isAxiosError(error)) {
                
                console.log(error.response?.data)

              } else {
              
                console.error('Error message:', (error as Error).message);
              }
              throw error
        }
    }, 20000);

    it('Set New Password ', async () => {
        try {
            
            const db = dbInstance.getDb();
            const collection = db.collection('Token');
            const resource = await collection.findOne({  email: fakeData.email.toLowerCase() });
            tokenId  =resource?._id
            

       } catch (error) {
           console.log('Token Error:', error);   
       }
        
        const setPasswordPayloads = generateSetNewPasswordPayloads(tokenId)
        try {
            const response = await apiClient.post('/api/users/reset-password',setPasswordPayloads);
            assertResetSetNewPassword(response,"Password Changed Succesfully");
            
        } catch (error) {
           
            throw error;
        }
    }, 20000);


    it('Verify Create DEO Profile ', async () => {
        
        try {
            const response = await apiAdmin.get('/admin/profileCreation/getDEOs');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            lastCreatedDeoLength = response.data.length-1
            profileId =response.data[lastCreatedDeoLength].id
            assertDeoProfileProperty(response)
           
        } catch (error) {
            
            throw error;
        }
    }, 20000);
    it('update DEO Profile ', async () => {
    
        const updateProfilePayloads= generateEditProfilePayload(profileId)
        try {
            const response = await apiAdmin.put('/admin/profileCreation/updateProfile',updateProfilePayloads);
           
            assertDeoProfileCreateEditDelete(response,'Acccount Updated');
         
        } catch (error) {
            throw error;
        }
    }, 20000);

    it('Delete DEO Profile ', async () => {
        const  deletePayload={
         
             "id": profileId,
         }
         
         try {
             const response = await apiAdmin.delete('/admin/profileCreation/deleteDEOProfile',{data:deletePayload});
           
             assertDeoProfileCreateEditDelete(response,"Acoount deleted")
             
          
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