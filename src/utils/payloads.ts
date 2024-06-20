
import { faker } from '@faker-js/faker';

export const fakeData = {
  companyName : faker.company.name(),
  companyWebsite : faker.internet.url(),
  companyHQ :faker.location.city(),
  firstName : faker.person.firstName(),
  lastName : faker.person.lastName(),
  linkedinUrl:faker.internet.url(),
  industry  :faker.vehicle.model(),
  position:faker.person.jobTitle(),
  jobTitle:faker.person.jobTitle(),
  email :"pratihar+"+faker.person.firstName()+"@itobuz.com"
}



export interface newsPayload {
    "id"?:number
    "trigger": string,
    "triggerArticle": string,
    "categories": string,
    "companyName": string,
    "companyHQ": string,
    "industry": string,
    "companyEmployeeCount": number,
    "companyLinkedIn": string,
    "companyWebsite": string;
  }

  export const generateNewsPayload = ():newsPayload => ({
    "categories": fakeData.position,
    "triggerArticle": fakeData.companyWebsite,
    "trigger": fakeData.linkedinUrl,
    "companyWebsite": fakeData.companyWebsite,
    "companyLinkedIn": "https://in.linkedin.com/company/mrftyres",
    "companyEmployeeCount": 90,
    "industry": fakeData.industry,
    "companyHQ": fakeData.companyHQ,
    "companyName":fakeData.companyName


  })
  
  export const generateNewsEditPayload = (id: number): newsPayload => ({
    id,
    "trigger": "New Partnership",
    "triggerArticle": "https://www.businesswire.com/news/home/20231102855481/en/Stem-and-SB-Energy-Announce-Technology-and-Commercial-Alliance-to-Advance-AI-Enabled-Energy-Management-of-Utility-Scale-Renewables",
    "categories": "dummy",
    "companyName": "Stem Inc",
    "companyHQ": "California",
    "industry": "Energy",
    "companyEmployeeCount": 700,
    "companyLinkedIn": "https://www.linkedin.com/company/stem-inc/",
    "companyWebsite": "https://www.stem.com/"
  });


  export interface jobsPayload {
    id?: string,
    companyEmployeeCount:number,
    companyHQ:string,
    companyLinkedIn:string,
    companyName:string,
    companyWebsite:string,
    industry:string,
    jobLink:string,
    jobTitle:string

}
export const generateJobsPayload = ():jobsPayload =>({
        companyEmployeeCount:48,
        companyHQ:fakeData.companyHQ,
        companyLinkedIn:"https://in.linkedin.com/company/itobuz-technologies-pvt-ltd",
        companyName:fakeData.companyName,
        companyWebsite:fakeData.companyWebsite,
        industry:fakeData.industry,
        jobLink:fakeData.linkedinUrl,
        jobTitle:fakeData.jobTitle

})
export const generateEditJobsPayload = (id:string):jobsPayload =>({
  id,
  companyEmployeeCount:48,
  companyHQ:fakeData.companyHQ,
  companyLinkedIn:"https://www.linkedin.com/company/tesla-motors",
  companyName:fakeData.companyName,
  companyWebsite:fakeData.companyWebsite,
  industry:fakeData.industry,
  jobLink:fakeData.linkedinUrl,
  jobTitle:fakeData.jobTitle

})

export interface hires {
       id?:string
       "position": string,
        "companyWebsite": string
        "companyLinkedIn": string,
        "companyEmployeeCount": number,
        "industry": string,
        "companyHQ": string,
        "companyName": string,
        "lastName": string,
        "firstName": string
}

export const generateAddHirePayload =():hires =>({
  "position": fakeData.position,
  "companyWebsite": fakeData.companyWebsite,
  "companyLinkedIn": "https://in.linkedin.com/company/itobuz-technologies-pvt-ltd",
  "companyEmployeeCount": 70,
  "industry": fakeData.industry,
  "companyHQ": fakeData.companyHQ,
  "companyName": fakeData.companyName,
  "lastName": fakeData.lastName,
  "firstName": fakeData.firstName


})


export const generateEditHirePayload =(id:string):hires =>({
  id,
  "position": fakeData.position,
  "companyWebsite": fakeData.companyWebsite,
  "companyLinkedIn": "https://www.linkedin.com/company/tesla-motors",
  "companyEmployeeCount": 80,
  "industry": fakeData.industry,
  "companyHQ": fakeData.companyHQ,
  "companyName": fakeData.companyName,
  "lastName": fakeData.lastName,
  "firstName": fakeData.firstName


})
export interface funding {
  id?:string
  "fundingRaised": number,
  "companyWebsite": string,
  "companyLinkedIn": string,
  "companyEmployeeCount": number,
  "industry": string,
  "companyHQ": string,
  "companyName":string
}

export const generateAddFundingPayload =():funding =>({
    
    "fundingRaised": 82,
    "companyWebsite": fakeData.companyWebsite,
    "companyLinkedIn": "https://in.linkedin.com/company/itobuz-technologies-pvt-ltd",
    "companyEmployeeCount": 56,
    "industry": fakeData.industry,
    "companyHQ": fakeData.companyHQ,
    "companyName": fakeData.companyName

})
export const generateEditFundingPayload =(id:string):funding =>({
   id, 
  "fundingRaised": 900,
  "companyWebsite": fakeData.companyWebsite,
  "companyLinkedIn": "https://in.linkedin.com/company/mrftyres",
  "companyEmployeeCount": 500,
  "industry": fakeData.industry,
  "companyHQ": fakeData.companyHQ,
  "companyName": fakeData.companyName

})

export interface CreateProfile {
  id?:string
  firstName:string,
  lastName: string,
  phoneNumber: string,
  email: string
}

export const generateCreateProfilePayload =():CreateProfile =>({
  "firstName": fakeData.firstName,
  "lastName": fakeData.lastName,
  "phoneNumber": "9482473962",
  "email": fakeData.email

})

export const generateEditProfilePayload =(id:string):CreateProfile =>({
   id,
   "firstName": fakeData.firstName,
   "lastName": fakeData.lastName,
   "phoneNumber": "9232473962",
   "email": fakeData.email


})

export interface userProfile {
  id?:string
  firstName:string,
  lastName: string,
  phoneNumber: string,
  email?: string,
  // stripeId:string
  // role: string
  // verified: boolean,
  // active: boolean,
  // subscription: string,
  // oneDayRemainTrialMailSent: boolean,
  // trialExpiredMailSent: boolean,
  // username: string,
  // authorities:any[],
  // subscriptionID:string
}

export const generateUserProfileUpdatePayloads =(id:string):userProfile =>({
  "id": id,
  "firstName": fakeData.firstName,
  "lastName": fakeData.lastName,
  "phoneNumber": "8176579225",
  // "stripeId": "cus_Q51OqQSKta1pro",
  // "role": "USER",
  // "verified": true,
  // "active": true,
  // "subscription": "Tier1",
  // "oneDayRemainTrialMailSent": true,
  // "trialExpiredMailSent": true,
  // "username": "pratihar+dev@itobuz.com",
  // "authorities": [
  //   {
  //     "authority": "USER"
  //   }
  // ],
  // "subscriptionID": "sub_1PGIwtCyLXRBk0KoURZ3PiPp",
  "email": "pratihar+dev@itobuz.com"
   
 


})

export interface signUp {
  "firstName": string,
  "lastName": string,
  "email": string,
  "password":string,
  "confirmPassword": string
}

export const generateSignUpPayloads =():signUp =>({
  "firstName": fakeData.firstName,
  "lastName": fakeData.lastName,
  "email": fakeData.email,
  "password":"Itobuz#1234",
  "confirmPassword": "Itobuz#1234"



})