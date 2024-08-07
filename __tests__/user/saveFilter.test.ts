
import { apiClient, login } from '../../src/apiClient';
import { generateFilterStoredPayload ,generateFilterSavePayload} from '../../src/utils/payloads'
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import axios from 'axios';

dotenv.config();

interface ISaveFilter {
    id: number;
    page: string;                
    filterName: string;
    innerFilters: any;
    filters: any;
    visited: boolean;
}

describe('API Tests', () => {
    let authToken: string | null = null;
    let industry:string
    let position:string
    let industryList: string[]
    let positionList: string[]
    let companyHQList:string[]
    let saveFilterId:number
    let filterName =faker.location.city()
    let saveFilter:ISaveFilter
   

    beforeAll(async () => {
                authToken = await login(process.env.USER_EMAIL as string, process.env.USER_PASSWORD as string);
                
     });


     it('Retrieve User Hire list using API', async () => {
       
        try {
            const response = await apiClient.get('/api/v1/searchFilters/HIRES?fieldToSearch=position');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            positionList=response.data
            const randomIndex = Math.floor(Math.random() * positionList.length);
            position=positionList[randomIndex]
           
        } catch (error) {
            throw error;
        }
    }, 20000);

    it('Retrieve filter Hire list using industry API', async () => {
       
        try {
            const response = await apiClient.get('/api/v1/searchFilters/HIRES?fieldToSearch=industry');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            industryList=response.data
           
            
         
        } catch (error) {
            throw error;
        }
    }, 20000);
    it('Retrieve filter Hire list using CompanyHQ API', async () => {
       
        try {
            const response = await apiClient.get('/api/v1/searchFilters/HIRES?fieldToSearch=companyHQ');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            companyHQList=response.data
          
            
         
        } catch (error) {
            throw error;
        }
    }, 20000);


    it('Filter for position', async () => {
        const searchHire={
            "position": positionList,
            "industry":industryList
          }
       
        try {
            const response = await apiClient.post('/api/v1/userService/filter/NewExecutiveHires',searchHire);
            expect(response.status).toBe(200);
            expect(response).toBeDefined();            
         
        } catch (error) {
            throw error;
        }
    }, 20000);


    it('Filter NewExecutiveHires using industry', async () => {
        const searchHire={
            "industry":industryList
          }
       
        try {
            const response = await apiClient.post('/api/v1/userService/filter/NewExecutiveHires',searchHire);
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            expect(response.data).toBeDefined();
            expect(Array.isArray(response.data)).toBe(true);
            console.log("response news Data",response.data && response.data.length ? response.data[0] : null);  
         
        } catch (error) {
            throw error;
        }
    }, 20000);
    it('Filter for companyHQ', async () => {
        const searchHire={
            "companyHQ": companyHQList,
            
          }
       
        try {
            const response = await apiClient.post('/api/v1/userService/filter/NewExecutiveHires',searchHire);
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            
            
         
        } catch (error) {
            throw error;
        }
    }, 20000);
    it('Save Filter for companyHQ', async () => {
     
        const saveHire=generateFilterSavePayload(filterName,companyHQList)
       
        try {
            const response = await apiClient.post('/api/v1/userService/savedSearches/HIRES',saveHire);
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            
            
         
        } catch (error) {
            if (axios.isAxiosError(error)) {
                
                // console.error('Error response:', error.response?.data);
                // console.error('Status:', error.response?.status);
                // console.error('message:', error.response?.data.message);
                // console.error('Headers:', error.response?.headers);
                const errorMessage = error.response?.data.message;
                expect(errorMessage).toBe('Limit reached for your subscription level');
                console.log(errorMessage)

              } else {
              
                console.error('Error message:', (error as Error).message);
              }
              throw error;
            }
        
    }, 20000);


    it('Filter stored with ID', async () => {
       
          const filterStoredPayload = generateFilterStoredPayload(authToken,filterName,companyHQList)
          const headers = {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${authToken}`
          }
          axios.post('https://leadhawk-filter.laravel-studio.io/filters1/filter', filterStoredPayload,{headers})
            .then(response => {
              //console.log('Success:', response.data);
            })
            .catch(error => {
              if (error.response) {
                // Server responded with a status other than 2xx
                console.log('Error response data:', error.response.data);
                console.log('Error response status:', error.response.status);
                console.log('Error response headers:', error.response.headers);
              } else if (error.request) {
                // No response received
                console.log('Error request data:', error.request);
              } else {
                // Error setting up the request
                console.log('Error message:', error.message);
              }
              throw error
            });
    }, 20000);

    it('Retrieve get save filter using API', async () => {
       
        try {
            const response = await apiClient.get('/api/v1/userService/savedSearches/getSavedSearches');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            const saveFilterList : ISaveFilter[] = response.data
           const lastCreatedIndex=(saveFilterList.length)-1
            saveFilter = saveFilterList[lastCreatedIndex];
            saveFilterId=saveFilter.id
            
           
        } catch (error) {
            throw error;
        }
    }, 20000);
    it('Delete save filter', async () => {
     
       try {
           const response = await apiClient.delete(`/api/v1/userService/savedSearches/HIRES/${saveFilterId}`);
           expect(response.status).toBe(200);
           expect(response).toBeDefined();
            expect(response.data).toBe('Filter Deleted Successfully');
            
           
        
       } catch (error) {
        if (axios.isAxiosError(error)) {
                
            console.log(error.response?.data)

          } else {
          
            console.error('Error message:', (error as Error).message);
          }
          throw error;
       }
   }, 20000);

    it('Delete save filter using API', async () => {
        const saveFilterDelete={
            "filterPage":"NewExecutiveHires",
            "token":authToken,
            "filterName":filterName
          }
          const headers={
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${authToken}`

          }
       
        try {
            
            const response = await axios({
              method: 'delete',
              url: 'https://leadhawk-filter.laravel-studio.io/filters1/deleteFilter',
              headers: headers,
              data: saveFilterDelete
            });
      
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            expect(response.data).toBe('Filter deleted successfully');
            
           
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