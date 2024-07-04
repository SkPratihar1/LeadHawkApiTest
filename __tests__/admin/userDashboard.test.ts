import { login ,apiAdmin} from '../../src/apiClient';
import { assertDashboardAnalysis} from '../../src/utils/assertions'
import dotenv from 'dotenv';
import axios from 'axios';


dotenv.config();

describe('API Tests', () => {
    let authToken: string | null = null;
    beforeAll(async () => {
                authToken = await login(process.env.ADMIN_EMAIL as string, process.env.ADMIN_PASSWORD as string);
                apiAdmin.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
                
     });


     it('UserSubscriptionCount', async () => {
        
        try {
            const response = await apiAdmin.get('/admin/analysis/UserSubscriptionCount');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            interface Subscription {
                subscription: string;
                count: number;
            }
            
            const responses: Subscription[] = response.data;
            const validSubscriptions = ['FREE', 'Tier1'];
        
            responses.forEach(item => {
                expect(validSubscriptions).toContain(item.subscription);
        });

            
         
        } catch (error) {
            throw error
            
        }
    }, 20000);

    it('Fetch NewHiresCount', async () => {
       
    
        try {
            const response = await apiAdmin.get('/admin/analysis/NewHiresCount');
            assertDashboardAnalysis(response);
         
        } catch (error) {
            if (axios.isAxiosError(error)) {
                
                console.log(error.response?.data)

              } else {
              
                console.error('Error message:', (error as Error).message);
              }
              throw error;
        }
    }, 20000);
    it('Fetch Bussiness Count', async () => {
       
    
        try {
            const response = await apiAdmin.get('/admin/analysis/BussinessCount');
            assertDashboardAnalysis(response);
         
        } catch (error) {
            throw error;
        }
    }, 20000);

    it('Fetch Funding Count', async () => {
       
    
        try {
            const response = await apiAdmin.get('/admin/analysis/FundingCount');
            assertDashboardAnalysis(response);
         
        } catch (error) {
            if (axios.isAxiosError(error)) {
                
                console.log(error.response?.data)

              } else {
              
                console.error('Error message:', (error as Error).message);
              }
              throw error;
        }
    }, 20000);
    it('Fetch JobPost Count', async () => {
       
    
        try {
            const response = await apiAdmin.get('/admin/analysis/JobPostCount');
            assertDashboardAnalysis(response)
           
         
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