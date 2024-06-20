import { login ,apiAdmin} from '../../src/apiClient';
import dotenv from 'dotenv';


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

            console.log("response",response.data)
         
        } catch (error) {
            throw error
            
        }
    }, 20000);

    it('Fetch NewHiresCount', async () => {
       
    
        try {
            const response = await apiAdmin.get('/admin/analysis/NewHiresCount');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            expect(response.data[0]).toHaveProperty('name');
            expect(response.data[0]).toHaveProperty('sub');
            expect(response.data[0]).toHaveProperty('count');
           

            console.log("response",response.data)
         
        } catch (error) {
            throw error;
        }
    }, 20000);
    it('Fetch Bussiness Count', async () => {
       
    
        try {
            const response = await apiAdmin.get('/admin/analysis/BussinessCount');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            expect(response.data[0]).toHaveProperty('name');
            expect(response.data[0]).toHaveProperty('sub');
            expect(response.data[0]).toHaveProperty('count');

            console.log("response",response.data)
         
        } catch (error) {
            throw error;
        }
    }, 20000);

    it('Fetch Funding Count', async () => {
       
    
        try {
            const response = await apiAdmin.get('/admin/analysis/FundingCount');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            expect(response.data[0]).toHaveProperty('name');
            expect(response.data[0]).toHaveProperty('sub');
            expect(response.data[0]).toHaveProperty('count');

            console.log("response",response.data)
         
        } catch (error) {
            throw error;
        }
    }, 20000);
    it('Fetch JobPost Count', async () => {
       
    
        try {
            const response = await apiAdmin.get('/admin/analysis/JobPostCount');
            expect(response.status).toBe(200);
            expect(response).toBeDefined();
            expect(response.data[0]).toHaveProperty('name');
            expect(response.data[0]).toHaveProperty('sub');
            expect(response.data[0]).toHaveProperty('count');

            console.log("response  jobPosting ",response.data[0])
         
        } catch (error) {
            throw error;
        }
    }, 20000);

})