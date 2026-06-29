import conf from '../conf/conf.js'

import { Client, Account, ID} from "appwrite";

export class AuthService {

    client = new Client()
    account;

    Constructor() {
        this.client.setEndpoint(conf.appwriteurl).setProject(conf.appwriteprojectid)
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}) {

        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                // call another method 
                return this.login({email, password});
        }
        else{
            return userAccount;
        }
}
catch (error) {
    throw error;
}
    }

    async login({email, password}) {
        try {
            const session = await this.account.createEmailSession(email, password)
            return session;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get()
            return user;
        } catch (error) {
            console.log("appwrite service error", error)
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions('current')
        } catch (error) {
            console.log("appwrite service error :: logout error ", error)
        }
    }
}

const authService = new AuthService();


export default AuthService