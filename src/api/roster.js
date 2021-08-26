import axios from 'axios'

export default {
    getAll(ctx) {
        return axios.get(process.env.API_URL + process.env.API_ENDPOINT + "/roster", {
            params: { ctx: ctx }
        });
    },
    get(id) {
        return axios.get(api_url + user_role + "/customers/" + id);
    },
    create(params) {
        return axios.post(api_url + user_role + "/customers", params);
    },
    update(params) {
        return axios.post(api_url + user_role + "/customers/" + params.id, params.data);
    },
    delete(id) {
        return axios.delete(api_url + user_role + "/customers/" + id);
    }
}
