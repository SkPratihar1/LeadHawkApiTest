
// import { apiClient, login ,apiAdmin} from '../../src/apiClient';
// import dotenv from 'dotenv';
// import { faker } from '@faker-js/faker';

// dotenv.config();

// describe('API Tests', () => {
//     let authToken: string | null = null;
//     beforeAll(async () => {
//                 authToken = await login(process.env.ADMIN_EMAIL as string, process.env.ADMIN_PASSWORD as string);
//                 apiAdmin.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
                
//      });


//      it('Data entry operator list in Create Profile page', async () => {
        
//         try {
//             const response = await apiAdmin.get('/admin/profileCreation/getDEOs');
//             expect(response.status).toBe(200);
//             expect(response).toBeDefined();

//             console.log("response",response.data)
         
//         } catch (error) {
//             console.log('Error:', error);
//         }
//     }, 20000);

//     it('Data entry operator list in Create Profile page', async () => {
       
    
//         try {
//             const response = await apiAdmin.get('/admin/profileCreation/getDEOs');
//             expect(response.status).toBe(200);
//             expect(response).toBeDefined();

//             console.log("response",response.data);
//             let lastUser=response.data.length-1

//             console.log("response length",response.data[lastUser])
         
//         } catch (error) {
//             console.log('Error:', error);
//         }
//     }, 20000);



// })