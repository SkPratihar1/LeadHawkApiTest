
import { fakeData } from '../utils/payloads'
import { AxiosResponse } from 'axios';


export function assertReActivationDeactivationResponse(response: AxiosResponse,message:string) {
  expect(response.status).toBe(200);
  expect(response).toBeDefined();
  console.log("Response Message:",response.data)
  expect(response.data).toBe(message);
}


export function assertFundingData(response: AxiosResponse){

  expect(response.status).toBe(200);
  expect(response).toBeDefined();
  expect(response.data.data[0]).toHaveProperty('id');
  expect(response.data.data[0]).toHaveProperty('fundingRaised');
  expect(response.data.data[0]).toHaveProperty('companyName');
  expect(response.data.data[0]).toHaveProperty('companyHQ');
  expect(response.data.data[0]).toHaveProperty('industry');
  expect(response.data.data[0]).toHaveProperty('companyEmployeeCount');
  expect(response.data.data[0]).toHaveProperty('companyLinkedIn');
  //expect(response.data.data[0]).toHaveProperty('dataEntryOperatorId');
  expect(response.data.data[0]).toHaveProperty('createdDate');
  expect(response.data.data[0]).toHaveProperty('lastModifiedDate');
  expect(response.data.data[0]).toHaveProperty('companyWebsite');
  
}
export function assertHiresProperty(response: AxiosResponse){

  // expect(response.status).toBe(200);
  // expect(response).toBeDefined();
  expect(response.data.data[0]).toHaveProperty('id');
  expect(response.data.data[0]).toHaveProperty('firstName');
  expect(response.data.data[0]).toHaveProperty('lastName');
  expect(response.data.data[0]).toHaveProperty('position');
  expect(response.data.data[0]).toHaveProperty('companyName');
  expect(response.data.data[0]).toHaveProperty('companyHQ');
  expect(response.data.data[0]).toHaveProperty('industry');
  expect(response.data.data[0]).toHaveProperty('companyEmployeeCount');
  expect(response.data.data[0]).toHaveProperty('companyLinkedIn');
  expect(response.data.data[0]).toHaveProperty('dataEntryOperatorId');
  expect(response.data.data[0]).toHaveProperty('createdDate');
  expect(response.data.data[0]).toHaveProperty('lastModifiedDate');
  expect(response.data.data[0]).toHaveProperty('companyWebsite');
  
}
export function assertJobProperty(response: AxiosResponse){

  // expect(response.status).toBe(200);
  // expect(response).toBeDefined();
  expect(response.data.data[0]).toHaveProperty('id');
  expect(response.data.data[0]).toHaveProperty('jobTitle');
  expect(response.data.data[0]).toHaveProperty('jobLink');
  expect(response.data.data[0]).toHaveProperty('companyName');
  expect(response.data.data[0]).toHaveProperty('companyHQ');
  expect(response.data.data[0]).toHaveProperty('industry');
  expect(response.data.data[0]).toHaveProperty('companyEmployeeCount');
  expect(response.data.data[0]).toHaveProperty('companyLinkedIn');
  expect(response.data.data[0]).toHaveProperty('dataEntryOperatorId');
  expect(response.data.data[0]).toHaveProperty('createdDate');
  expect(response.data.data[0]).toHaveProperty('lastModifiedDate');
  expect(response.data.data[0]).toHaveProperty('companyWebsite');
  
}
export function assertPressReleasesProperty(response: AxiosResponse){

  // expect(response.status).toBe(200);
  // expect(response).toBeDefined();
  expect(response.data.data[0]).toHaveProperty('id');
  expect(response.data.data[0]).toHaveProperty('trigger');
  expect(response.data.data[0]).toHaveProperty('triggerArticle');
  expect(response.data.data[0]).toHaveProperty('categories');
  expect(response.data.data[0]).toHaveProperty('companyName');
  expect(response.data.data[0]).toHaveProperty('companyHQ');
  expect(response.data.data[0]).toHaveProperty('industry');
  expect(response.data.data[0]).toHaveProperty('companyEmployeeCount');
  expect(response.data.data[0]).toHaveProperty('companyLinkedIn');
  //expect(response.data.data[0]).toHaveProperty('dataEntryOperatorId');
  expect(response.data.data[0]).toHaveProperty('createdDate');
  expect(response.data.data[0]).toHaveProperty('lastModifiedDate');
  expect(response.data.data[0]).toHaveProperty('companyWebsite');
  
}

export function assertMyLeadsProperty(response: AxiosResponse,pageName:string){

  expect(response).toBeDefined();
  expect(response.data).toBeDefined();
  expect(Array.isArray(response.data)).toBe(true);
  expect(response.data.length).toBeGreaterThan(0);

  const firstElement = response.data[0];
  expect(firstElement).toBeDefined();
  expect(firstElement).toHaveProperty('id');
  expect(firstElement).toHaveProperty('userId');
  expect(firstElement).toHaveProperty('rowId');
  expect(firstElement).toHaveProperty('pageName');
  expect(firstElement.pageName).toBe(pageName);

  // Optionally, you can check if `id`, `userId`, and `rowId` are objects
  expect(typeof firstElement.id).toBe('object');
  expect(typeof firstElement.userId).toBe('object');
  expect(typeof firstElement.rowId).toBe('object');

}

export function assertInvoiceProperty(response: AxiosResponse){
  expect(response.data[0].status).toBe('paid');
  expect(response.data[0].amountDue).toBe(1);
  expect(response.data[0].amountPaid).toBe(1);
  expect(response.data[0]).toHaveProperty('id');
  expect(response.data[0]).toHaveProperty('pdf');
  expect(response.data[0]).toHaveProperty('viewInvoice');
  expect(response.data[0]).toHaveProperty('periodStart');
  expect(response.data[0]).toHaveProperty('periodEnd');
  expect(response.data[0]).toHaveProperty('paymentDate');
  expect(response.data[0]).toHaveProperty('invoiceNumber');
  expect(response.data[0]).toHaveProperty('paymentDate');
}
export function assertDeleteMyLeads(response: AxiosResponse){
  expect(response.status).toBe(200);
  expect(response).toBeDefined();
  console.log("Response:", response.data);
  expect(response.data).toBe('Deleted 1 MyLeads');
}

export function assertResetSetNewPassword(response: AxiosResponse,ResetSetMessage:string){
  expect(response.status).toBe(200);
  expect(response).toBeDefined();
  expect(response.data).toBeDefined();
  const message= response.data.message;
  console.log("message:",message)
  expect(message).toBe(ResetSetMessage)
}
export function assertUserProfileUpdate(response: AxiosResponse){
  expect(response.status).toBe(200);
  expect(response).toBeDefined();
  expect(response.data).toBeDefined();
  expect(response.data.email).toBe(process.env.USER_EMAIL as string);
  expect(response.data.phoneNumber).toBe('8176579225');
  expect(response.data.firstName).toBe(fakeData.firstName);



  expect(response).toBeDefined();
  expect(response.data).toBeDefined();

  const data = response.data;

  expect(data).toHaveProperty('id');
  expect(data.id).toHaveProperty('timestamp');
  expect(typeof data.id.timestamp).toBe('number');
  expect(data.id).toHaveProperty('date');
  expect(typeof data.id.date).toBe('string');

  expect(data).toHaveProperty('firstName');
  expect(typeof data.firstName).toBe('string');
  expect(data.firstName).toBe(fakeData.firstName);

  expect(data).toHaveProperty('lastName');
  expect(typeof data.lastName).toBe('string');
  expect(data.lastName).toBe(fakeData.lastName);

  expect(data).toHaveProperty('phoneNumber');
  expect(typeof data.phoneNumber).toBe('string');
  expect(data.phoneNumber).toBe('8176579225');

  expect(data).toHaveProperty('stripeId');
  expect(typeof data.stripeId).toBe('string');
  // expect(data.stripeId).toBe('cus_Q51OqQSKta1pro');

  expect(data).toHaveProperty('role');
  expect(typeof data.role).toBe('string');
  expect(data.role).toBe('USER');

  expect(data).toHaveProperty('verified');
  expect(typeof data.verified).toBe('boolean');
  expect(data.verified).toBe(true);

  expect(data).toHaveProperty('active');
  expect(typeof data.active).toBe('boolean');
  expect(data.active).toBe(true);

  expect(data).toHaveProperty('subscription');
  expect(typeof data.subscription).toBe('string');
  expect(data.subscription).toBe('Tier1');

  expect(data).toHaveProperty('oneDayRemainTrialMailSent');
  expect(typeof data.oneDayRemainTrialMailSent).toBe('boolean');
  expect(data.oneDayRemainTrialMailSent).toBe(true);

  expect(data).toHaveProperty('trialExpiredMailSent');
  expect(typeof data.trialExpiredMailSent).toBe('boolean');
  expect(data.trialExpiredMailSent).toBe(true);

  expect(data).toHaveProperty('username');
  expect(typeof data.username).toBe('string');
  expect(data.username).toBe(process.env.USER_EMAIL as string);

  expect(data).toHaveProperty('authorities');
  expect(Array.isArray(data.authorities)).toBe(true);
  expect(data).toHaveProperty('subscriptionID');
  expect(typeof data.subscriptionID).toBe('string');
  

  expect(data).toHaveProperty('email');
  expect(typeof data.email).toBe('string');
  expect(data.email).toBe(process.env.USER_EMAIL as string);
}

export function assertSignUp(response: AxiosResponse){
  expect(response.status).toBe(201);
  expect(response).toBeDefined();
  expect(response.data.success).toBe(true);
  expect(response.data.message).toBe(null);
  

}
export function assertAccountActive(response: AxiosResponse){
  expect(response.status).toBe(200);
  expect(response).toBeDefined(); 
  expect(response.data.message).toBe('User verified successfully and can now login')
  

}

export function assertDeoProfileCreateEditDelete(response: AxiosResponse,message:string){
  expect(response.status).toBe(200);
  expect(response).toBeDefined();
  expect(response.data).toBeDefined(); 
  expect(response.data).toBe(message)
  

}
export function assertDeoProfileProperty(response: AxiosResponse){
  // expect(response.status).toBe(200);
  // expect(response).toBeDefined();
  // expect(response.data).toBeDefined(); 
  // expect(response.data.message).toBe('Acccount created')
  let lastCreatedDeoLength = response.data.length-1

  expect(response.data[lastCreatedDeoLength].firstName).toBe(fakeData.firstName);
  expect(response.data[lastCreatedDeoLength].lastName).toBe(fakeData.lastName);
  expect(response.data[lastCreatedDeoLength].phoneNumber).toBe("9482473962");
  expect(response.data[lastCreatedDeoLength].email).toBe(fakeData.email);
  expect(response.data[lastCreatedDeoLength].role).toBe('DATA_ENTRY_OPERATOR');
  expect(response.data[lastCreatedDeoLength].subscription).toBe('Tier2');

  expect(response.data[lastCreatedDeoLength]).toHaveProperty('id');
  expect(response.data[lastCreatedDeoLength]).toHaveProperty('firstName');
  expect(response.data[lastCreatedDeoLength]).toHaveProperty('lastName');
  expect(response.data[lastCreatedDeoLength]).toHaveProperty('phoneNumber');
  expect(response.data[lastCreatedDeoLength]).toHaveProperty('stripeId');
  expect(response.data[lastCreatedDeoLength]).toHaveProperty('email');
  expect(response.data[lastCreatedDeoLength]).toHaveProperty('role');
  expect(response.data[lastCreatedDeoLength]).toHaveProperty('verified');
  expect(response.data[lastCreatedDeoLength]).toHaveProperty('active');
  expect(response.data[lastCreatedDeoLength]).toHaveProperty('subscription');
  expect(response.data[lastCreatedDeoLength]).toHaveProperty('enabled');
  expect(response.data[lastCreatedDeoLength]).toHaveProperty('accountNonExpired');
  expect(response.data[lastCreatedDeoLength]).toHaveProperty('credentialsNonExpired');
  expect(response.data[lastCreatedDeoLength]).toHaveProperty('accountNonLocked');

  

}



export function assertDashboardAnalysis(response: AxiosResponse){
  expect(response.status).toBe(200);
  expect(response).toBeDefined();
  expect(response.data).toBeDefined();
  expect(response.data[0]).toHaveProperty('name');
  expect(response.data[0]).toHaveProperty('sub');
  expect(response.data[0]).toHaveProperty('count');

}

export function assertDraftDelete(response: AxiosResponse,message:string){
  expect(response.status).toBe(200);
  expect(response).toBeDefined();
  expect(response.data).toBe(message);
}
export function assertDraftJobProperty(response: AxiosResponse){
  expect(response.status).toBe(200);
  expect(response).toBeDefined();
  expect(response.data).toBeDefined();
  expect(response.data.data[0]).toHaveProperty('id');
  expect(response.data.data[0]).toHaveProperty('jobTitle');
  expect(response.data.data[0]).toHaveProperty('jobLink');
  expect(response.data.data[0]).toHaveProperty('companyName');
  expect(response.data.data[0]).toHaveProperty('companyHQ');
  expect(response.data.data[0]).toHaveProperty('industry');
  expect(response.data.data[0]).toHaveProperty('companyEmployeeCount');
  expect(response.data.data[0]).toHaveProperty('companyLinkedIn');
  expect(response.data.data[0]).toHaveProperty('companyWebsite');
  expect(response.data.data[0]).toHaveProperty('sourceLink');
  expect(response.data.data[0]).toHaveProperty('confidenceRatio');
  expect(response.data.data[0]).toHaveProperty('transferred');
  expect(response.data.data[0]).toHaveProperty('deleted');
  expect(response.data.data[0]).toHaveProperty('industry');
  expect(response.data.data[0]).toHaveProperty('createdDate');
  expect(response.data.data[0]).toHaveProperty('lastModifiedDate');
    

}

export function assertDraftLive(response: AxiosResponse){
  expect(response.status).toBe(201);
  expect(response).toBeDefined();
  expect(response.data).toHaveProperty('invalidDrafts');
  expect(response.data).toHaveProperty('validDraftIds');
  expect(response.data).toHaveProperty('validDrafts');
  expect(response.data).toHaveProperty('invalidDraftIds');

}

export function assertHiresData(response: AxiosResponse){
  expect(response.data.firstName).toBe(fakeData.firstName);
  expect(response.data.lastName).toBe(fakeData.lastName);
  expect(response.data.position).toBe(fakeData.position);
  expect(response.data.companyName).toBe(fakeData.companyName);
  expect(response.data.companyHQ).toBe(fakeData.companyHQ);
  expect(response.data.industry).toBe(fakeData.industry);
  expect(response.data.companyWebsite).toBe(fakeData.companyWebsite);
  expect(response.data.companyEmployeeCount).toBe(70);
  expect(response.data.companyLinkedIn).toBe("https://in.linkedin.com/company/itobuz-technologies-pvt-ltd");

}

export function assertJobData(response: AxiosResponse){
   expect(response.data.jobTitle).toBe(fakeData.jobTitle);
   expect(response.data.jobLink).toBe(fakeData.linkedinUrl);
  expect(response.data.companyName).toBe(fakeData.companyName);
  expect(response.data.companyHQ).toBe(fakeData.companyHQ);
  expect(response.data.industry).toBe(fakeData.industry);
  expect(response.data.companyWebsite).toBe(fakeData.companyWebsite);
  expect(response.data.companyEmployeeCount).toBe(48);
  expect(response.data.companyLinkedIn).toBe("https://in.linkedin.com/company/itobuz-technologies-pvt-ltd");

};
export function assertPressReleasesData(response: AxiosResponse){
  expect(response.data.categories).toBe(fakeData.position);
  expect(response.data.triggerArticle).toBe(fakeData.companyWebsite);
  expect(response.data.trigger).toBe(fakeData.linkedinUrl);
  expect(response.data.companyName).toBe(fakeData.companyName);
  expect(response.data.companyHQ).toBe(fakeData.companyHQ);
  expect(response.data.industry).toBe(fakeData.industry);
  expect(response.data.companyWebsite).toBe(fakeData.companyWebsite);
  expect(response.data.companyEmployeeCount).toBe(90);
  expect(response.data.companyLinkedIn).toBe("https://in.linkedin.com/company/mrftyres");

}


export function assertLiveDataDelete(response: AxiosResponse,message:string){
  expect(response.status).toBe(200);
  expect(response).toBeDefined();
  expect(response.data).toBe(message);

}