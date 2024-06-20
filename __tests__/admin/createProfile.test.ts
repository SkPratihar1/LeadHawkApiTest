
import { apiClient, login ,apiAdmin} from '../../src/apiClient';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';

dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    let firstName = faker.person.firstName() ;
    let lastName = faker.person.lastName() ;
    let email ="pratihar+"+faker.person.firstName()+"@itobuz.com"
    beforeAll(async () => {
                authToken = await login(process.env.ADMIN_EMAIL as string, process.env.ADMIN_PASSWORD as string);
                apiAdmin.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
                
     });


     it.skip('Create Profile', async () => {
        
       const profilePayload = {
            "firstName": firstName,
            "lastName": lastName,
            "phoneNumber": "9234567890",
            "email": email
        }
        try {
            const response = await apiAdmin.post('/admin/profileCreation/createProfile', profilePayload);
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            console.log("response",response.data)
         
        } catch (error) {
            throw error
        }
    }, 20000);




})