
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
  "email": fakeData.email.toLowerCase()

})

export const generateEditProfilePayload =(id:string):CreateProfile =>({
   id,
   "firstName": fakeData.firstName,
   "lastName": fakeData.lastName,
   "phoneNumber": "9232473962",
   "email": fakeData.email.toLowerCase()


})

export interface userProfile {
  id?:string
  firstName:string,
  lastName: string,
  phoneNumber: string,
  email?: string,
}

export const generateUserProfileUpdatePayloads =(id:string):userProfile =>({
  "id": id,
  "firstName": fakeData.firstName,
  "lastName": fakeData.lastName,
  "phoneNumber": "8176579225",
  "email": "pratihar+dev@itobuz.com"
   
 


})

export interface signUp {
  "firstName": string,
  "lastName": string,
  "email": string,
  "password":string,
  "confirmPassword": string
}

export const generateSignUpPayloads =(Email:string):signUp =>({
  "firstName": fakeData.firstName,
  "lastName": fakeData.lastName,
  //"email": "pratihar+vau@itobuz.com",
  "email": Email,
  "password":"Itobuz#1234",
  "confirmPassword": "Itobuz#1234"

})
export interface verifyAccount{
  token:string
}

export const generateAccountActivePayloads=(token:string):verifyAccount =>({
  token:token
})

export interface saveFilter {
  "userId": string,
  "page": string,
  "token": string,
  "filterName": string,
  "isVisited": true,
      "innerFilters": [
        {
          "field": string,
          "value": string[]
        }
      ]
}

export const generateFilterStoredPayload =(authToken:any,filterName:string,companyHQList:string[]):saveFilter =>({
      "userId": process.env.userId as string,
      "page": "NewExecutiveHires",
      "token": authToken,
      "filterName": filterName,
      "isVisited": true,
      "innerFilters": [
        {
          "field": "companyHQ",
          "value": companyHQList
        }
      ]



})
export interface saveFilter1 {
  "filterName": string,
      "visited": true,
      "innerFilters": [
        {
          "field": "companyHQ",
          "values": string[]
        }
      ]   

}



export const generateFilterSavePayload =(filterName:string,companyHQList:string[]):saveFilter1 =>({
     "filterName": filterName,
      "visited": true,
      "innerFilters": [
        {
          "field": "companyHQ",
          "values": companyHQList
        }
      ]   

})

export interface restPassword{

        
    "email": string

}

export const generateResetPasswordPayloads= (Email:string):restPassword =>({
  "email":Email

})

export interface setNewPassword{

    "password": string,
    "confirmPassword": string,
    "token": string
 }

export const generateSetNewPasswordPayloads = (token:string):setNewPassword =>({
    "password":"Password#123" ,
    "confirmPassword":"Password#123",
    "token":token

})

export interface reActive{
    "username": string,
    "password": string,
    "email": string
}

export const generateReActivePayloads =():reActive =>({
      "username": process.env.activeDeActiveUser as string,
      "password": process.env.FreeUser_PASSWORD as string,
      "email": process.env.activeDeActiveUser as string
})