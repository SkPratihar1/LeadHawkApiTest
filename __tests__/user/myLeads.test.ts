import { apiClient, login } from '../../src/apiClient';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    let fundId:string;
    let hireId:string;
    beforeAll(async () => {
                authToken = await login(process.env.USER_EMAIL as string, process.env.USER_PASSWORD as string);
                
     });



    it('Funding MyLead list', async () => {
       
        try {
            const response = await apiClient.get('/api/v1/userService/myLeads/funding');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            // const list= response.data.content
            // const randomIndex = Math.floor(Math.random() * list.length);
            // fundId = list[randomIndex].id;
            // console.log("response funding Data",fundId)
         
        } catch (error) {
            if (axios.isAxiosError(error)) {
                
                
                console.log(error.response?.data)
                const errorMessage = error.response?.data;
                expect(errorMessage).toBe('No leads found for this user');

              } else {
              
                console.error('Error message:', (error as Error).message);
              }
        }
    }, 20000);

    it('Hire MyLead list', async () => {
       
        try {
            const response = await apiClient.get('/api/v1/userService/myLeads/hires');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            console.log("hire myLead List",response.data)
            const list= response.data
            const randomIndex = Math.floor(Math.random() * list.length);
            hireId = list[randomIndex].id;
            console.log("response hire id",hireId)
         
        } catch (error) {
            if (axios.isAxiosError(error)) {
                
                // console.error('Error response:', error.response?.data);
                // console.error('Status:', error.response?.status);
                // console.error('message:', error.response?.data.message);
                // console.error('Headers:', error.response?.headers);
                console.log(error.response?.data)
                const errorMessage = error.response?.data;
                expect(errorMessage).toBe('No leads found for this user');

              } else {
              
                console.error('Error message:', (error as Error).message);
              }
        }
    }, 20000);

    
    it('Delete Hire', async () => {
        const deletePayload = [hireId]
            
        
    
        console.log("Delete Payload:", deletePayload);
    
        if (hireId) {
            try {
                const response = await apiClient.delete('/api/v1/userService/myLeads/hires', {
                    data: deletePayload
                });
                expect(response.status).toBe(200);
                expect(response).toBeDefined();
                console.log("Response:", response.data);
                expect(response.data).toBe('Deleted 1 MyLeads');
            } catch (error) {
                
                console.log(error)
            }
        } else {
            console.log("No delete: hireId is undefined or null");
        }
    }, 20000);
 



})