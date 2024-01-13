import conf from '../conf/conf.js'
import { Client,Account,ID } from 'appwrite'

//We write all functions in same class so that we dont have to write client and account again and again for each function

export class AuthService    //can name anything
{  
    client = new Client();          //create obj of client
    account;                        

    //Account should be only created when constructor is called
    constructor()                                                //This runs whenever we create a new obj of class or its instance
    {                              
        this.client                                             // this.client means current instance of client ( current obj ka client )
            .setEndpoint(conf.appwriteURL)                      //or destructure appwriteURL in constructor
            .setProject(conf.appwriteProjectID)

        this.account  = new Account(this.client);
    }

//We are using async-await coz we dont wanna go ahead without creating account, ( we can also use promise)*/
    async createAccount({email,password,name})  
    {
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name)    //our 1st field should be always ID acc to documentation so we use a method from appwrite to get unique 
            if (userAccount)    //exists
            {
                return this.login({email,password});    //call this login method to just login with email and password recieved
            } 
            else
            {
               return userAccount;  //return create account
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password})
    {
        try{
            return await this.account.createEmailSession(email,password);
            
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser()
    {
        try {
            return await this.account.get(); //get method just directly gets the account if it exists (its in documentation)
            
        } catch (error) {
            console.log("Appwrite Service :: getCurrentUser :: error",error);
        }

        return null;    //we use this instead of IF-ELSE
    }

    async logout()
    {
        try {
            return await this.account.deleteSessions('current');
        } catch (error) {
            console.log("Appwrite Service :: auth.js-->logout :: error",error);
        }
    }
}

const authService = new AuthService();  //we create its object and export the obj so we dont have to further create it
export default authService