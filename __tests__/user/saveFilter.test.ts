
import { log } from 'console';
import { apiClient, login } from '../../src/apiClient';
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
            console.log("position ",response.data)
            positionList=response.data
            console.log(positionList)
            const randomIndex = Math.floor(Math.random() * positionList.length);
            console.log(positionList[randomIndex]);
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
            console.log("industry ",response.data)
            industryList=response.data
            console.log(industryList)
            const randomIndex = Math.floor(Math.random() * industryList.length);
            console.log(industryList[randomIndex]);
            
         
        } catch (error) {
            throw error;
        }
    }, 20000);
    it('Retrieve filter Hire list using CompanyHQ API', async () => {
       
        try {
            const response = await apiClient.get('/api/v1/searchFilters/HIRES?fieldToSearch=companyHQ');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            console.log("companyHQ ",response.data)
            companyHQList=response.data
            console.log(companyHQList)
            // const randomIndex = Math.floor(Math.random() * industryList.length);
            // console.log(industryList[randomIndex]);
            
         
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
            console.log("Filter for position",response.data)
            
         
        } catch (error) {
            throw error;
        }
    }, 20000);


    it('Filter for industry', async () => {
        const searchHire={
            "industry":industryList
          }
       
        try {
            const response = await apiClient.post('/api/v1/userService/filter/NewExecutiveHires',searchHire);
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            console.log("Filter for industry ",response.data)
            
         
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
            console.log("Filter for companyHQ",response.data)
            
         
        } catch (error) {
            throw error;
        }
    }, 20000);
    it('Save Filter for companyHQ', async () => {
      
        const searchHireSave={
                "filterName": filterName,
                "visited": true,
                "innerFilters": [
                  {
                    "field": "companyHQ",
                    "values": companyHQList
                  }
                ]   
          }
       
        try {
            const response = await apiClient.post('/api/v1/userService/savedSearches/HIRES',searchHireSave);
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            console.log("save ",response.data)
            
         
        } catch (error) {
            if (axios.isAxiosError(error)) {
                
                // console.error('Error response:', error.response?.data);
                // console.error('Status:', error.response?.status);
                // console.error('message:', error.response?.data.message);
                // console.error('Headers:', error.response?.headers);
                const errorMessage = error.response?.data.message;
                expect(errorMessage).toBe('Limit reached for your subscription level');

              } else {
              
                console.error('Error message:', (error as Error).message);
              }
              throw error;
            }
        
    }, 20000);

    // it('CompanyHQ Filter stored with ID', async () => {
    //   console.log("filterName",filterName)
    //   console.log("authToken",authToken)

    //       const searchHireSave={
    //         "userId": "663da4bd4bb0d11da73dc3e6",
    //         "page": "NewExecutiveHires",
    //         //"token": `Bearer ${authToken}`,
    //         "filterName": filterName,
    //         "isVisited": true,
    //         "innerFilters": [
    //           {
    //             "field": "companyHQ",
    //             "value":companyHQList
    //           }
    //         ]
    //       }
       
    //     try {
    //         const response = await axios.post('https://leadhawk-filter.laravel-studio.io/filters1/filter',searchHireSave,
    //         {headers: {
    //             'Authorization': `Bearer ${authToken}`, 
    //             'Content-Type': 'application/json'
    //           }});
    //         expect(response.status).toBe(200);
    //         expect(response).toBeDefined();
    //         console.log("save 2",response)
            
         
    //     } catch (error) {
    //         console.log(error)
    //         //throw error;
    //     }
    // }, 20000);

    it('RetI', async () => {
       
        const payload = {
            userId: "663da4bd4bb0d11da73dc3e6",
            page: "NewExecutiveHires",
            filterName: filterName,
            isVisited: true,
            innerFilters: [
              {
                field: "companyHQ",
                value: [
                  "alaska",
                  "anthony and serrano associates",
                  "arizona",
                  "arkansas",
                  "bednarfield"
                ]
              }
            ]
          };
          
          const headers = {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${authToken}`
          }
          
          axios.post('https://leadhawk-filter.laravel-studio.io/filters1/filter', payload, { headers })
            .then(response => {
              console.log('Success:', response.data);
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
            });
    }, 20000);

    it('Retrieve get save filter using API', async () => {
       
        try {
            const response = await apiClient.get('/api/v1/userService/savedSearches/getSavedSearches');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            console.log("Save filter list ",response.data);
            const saveFilterList : ISaveFilter[] = response.data

            //let saveFilterList =response.data.length

            // expect(response.data[saveFilterList-1].filterName).toBe(filterName);

            // positionList=response.data
            // console.log(positionList)

            const randomIndex = Math.floor(Math.random() * saveFilterList.length);
            
            saveFilter = saveFilterList[randomIndex];
            console.log("saveFilter saveFilter",saveFilter)
            
           
        } catch (error) {
            throw error;
        }
    }, 20000);

    it('Delete save filter using API', async () => {
        const saveFilterDelete={
            "filterPage":"GeneralBusinessNews",
            "token":authToken,
            "filterName":'jk'
          }
          const header={
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${authToken}`

          }
       
        try {
            const response = await axios.delete('https://leadhawk-filter.laravel-studio.io/filters1/deleteFilter',{data:saveFilterDelete});
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            console.log("Save filter",response.data)
            // let saveFilterList =response.data.length

            // expect(response.data[saveFilterList-1].filterName).toBe(filterName);
            // positionList=response.data
            // console.log(positionList)
            // const randomIndex = Math.floor(Math.random() * positionList.length);
            // console.log(positionList[randomIndex]);
            // position=positionList[randomIndex]
           
        } catch (error) {
            throw error
        }
    }, 20000);

})