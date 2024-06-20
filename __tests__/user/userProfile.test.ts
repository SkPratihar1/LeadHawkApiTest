
import { apiClient, login } from '../../src/apiClient';
import { fakeData, generateUserProfileUpdatePayloads} from '../../src/utils/payloads';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';

dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    let userId:string
    let firstName = faker.person.firstName() ;
    let lastName = faker.person.lastName() ;
    //let email ="pratihar+"+faker.person.firstName()+"@itobuz.com"
    beforeAll(async () => {
                authToken = await login(process.env.USER_EMAIL as string, process.env.USER_PASSWORD as string);
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
                
     });


     it('Retrieve user profile using API', async () => {
        
        try {
            const response = await apiClient.get('/api/v1/profile/');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            userId=response.data.id
            console.log('userId',userId)

            console.log("response",response.data)
         
        } catch (error) {
            throw error
        }
    }, 20000);

    it('User profile Update using API', async () => {
        
        const userProfile=generateUserProfileUpdatePayloads(userId)
       
        try {
            const response = await apiClient.patch('/api/v1/profile/',userProfile);
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            expect(response.data.email).toBe('pratihar+dev@itobuz.com');
            expect(response.data.phoneNumber).toBe('8176579225');
            expect(response.data.firstName).toBe(fakeData.firstName);

            console.log("response@",response.data)
         
        } catch (error) {
            //console.log(error)
            throw error
        }
    }, 20000);




})