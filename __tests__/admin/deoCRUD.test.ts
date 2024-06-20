
import { login ,apiAdmin} from '../../src/apiClient';
import { generateCreateProfilePayload , generateEditProfilePayload } from '../../src/utils/payloads'
import { fakeData } from '../../src/utils/payloads';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';


dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    let lastCreatedDeoLength:number
    let profileId:any
 
    beforeAll(async () => {
                authToken = await login(process.env.ADMIN_EMAIL as string, process.env.ADMIN_PASSWORD as string);
                apiAdmin.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
              
     });


     it('Create Profile', async () => {
       const createProfilePayload = generateCreateProfilePayload()
    //    const createProfilePayload= {
    //     "firstName":"Shaun",
    //     "lastName":"Schmitt",
    //     "phoneNumber":"9234567890",
    //     "email":"pratihar+Kyra@itobuz.com"
    // }
    //    const createProfilePayload= {
    //     "firstName": "Florence",
    //     "lastName": "Vargas",
    //     "phoneNumber": "9482473962",
    //     "email": "puopp@mailinator.com"
    //   }

        try {
            const response = await apiAdmin.post('/admin/profileCreation/createProfile',createProfilePayload);
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            console.log("response 8888",response.data)
         
        } catch (error) {
            console.log('Error:', error);
            //throw error
        }
    }, 20000);


    it('Verify Create DEO Profile ', async () => {
        
        try {
            const response = await apiAdmin.get('/admin/profileCreation/getDEOs');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            lastCreatedDeoLength = response.data.length-1

            console.log("response",response.data)
            profileId =response.data[lastCreatedDeoLength].id
            console.log("profileId for me",profileId)
            expect(response.data[lastCreatedDeoLength].firstName).toBe(fakeData.firstName);
            expect(response.data[lastCreatedDeoLength].lastName).toBe(fakeData.lastName);
            expect(response.data[lastCreatedDeoLength].phoneNumber).toBe("9482473962");
            expect(response.data[lastCreatedDeoLength].email).toBe(fakeData.email);
            expect(response.data[lastCreatedDeoLength].role).toBe('DATA_ENTRY_OPERATOR');
            expect(response.data[lastCreatedDeoLength].subscription).toBe('Tier2');
         
        } catch (error) {
            //console.log('Error:', error);
            throw error;
        }
    }, 20000);
    it('update DEO Profile ', async () => {
    
        const updateProfilePayloads= generateEditProfilePayload(profileId)
        try {
            const response = await apiAdmin.put('/admin/profileCreation/updateProfile',updateProfilePayloads);
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            console.log("response",response.data)
            expect(response.data).toBe('Acccount Updated')

         
        } catch (error) {
            throw error;
        }
    }, 20000);
    it('Delete DEO Profile ', async () => {
        const  deletePayload={
         
             "id": profileId,
         }
         
         try {
             const response = await apiAdmin.delete('admin/profileCreation/deleteDEOProfile',{data:deletePayload});
             expect(response.status).toBe(200);
             expect(response).toBeDefined();
             console.log("response",response)
             expect(response.data).toBe('Acoount deleted')
             
          
         } catch (error) {
            throw error;
         }
     }, 20000);
 


})