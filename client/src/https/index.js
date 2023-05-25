import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:8000',    
    withCredentials : true, // send coookies or save cookie use this [true] and cors package m bhi credential true kre server.js file m
    headers : {
        'Content-type' : 'application/json',
        Accept : "application/json",
    },
});

class Axios{

    async home() {
         return api.get('/');
    }
    async sendOTP(data) {
         return api.post('/auth/sendOTP', data);
    }
    async verifyOTP(data) {
         return api.post('/auth/verifyOTP', data);
    }
    async fetchAllAstrologer() {
         return api.get('/fetchAllAstrologer');
    }
    async addChat(data) {
         return api.post('/addChat', data);
    }
    async fetchAllChats(data) {
         return api.post('/fetchAllChats', data);
    }

}

class AstroAxiosAPI{
    async home() {
        return api.get('/astrologer/home');
   }
    async sendOTP(data) {
        return api.post('/auth/astrologer/sendOTP', data);
   }
    async verifyOTP(data) {
        return api.post('/auth/astrologer/verifyOTP', data);
   }
    async callToUser(data) {
        return api.post('/astrologer/callToUser', data);
   }
    async saveCallData(data) {
        return api.post('/astrologer/saveCallData', data);
   }
    async addCallRequest(data) {
        return api.post('/astrologer/addCallRequest', data);
   }
    async deleteCallRequest(data) {
        return api.post('/astrologer/deleteCallRequest', data);
   }
    async getCallRequests(astroId) {
        return api.post('/astrologer/getCallRequests', astroId);
   }
    async fetchAllChatUser(astroId) {
        return api.post('/astrologer/fetchAllChatUser', astroId);
   }
    async fetchAllChats(data) {
        return api.post('/astrologer/fetchAllChats', data);
   }
    async addChat(data) {
        return api.post('/astrologer/addChat', data);
   }
}

export default new Axios();
const AstroAxios = new AstroAxiosAPI();

export { AstroAxios };