import axios from 'axios';

export default {
    getAll(ctx) {
        return axios.get(process.env.API_URL + process.env.API_ENDPOINT + "/roster", {
            params: { ctx: ctx }
        });
    },
    get(id) {
        return axios.get(process.env.API_URL + process.env.API_ENDPOINT + "/roster" + id);
    },
    create(params) {
        return axios.post(process.env.API_URL + process.env.API_ENDPOINT + "/roster", params);
    },
    update(params) {
        return axios.post(process.env.API_URL + process.env.API_ENDPOINT + "/roster" + params.id, params.data);
    },
    delete(id) {
        return axios.delete(process.env.API_URL + process.env.API_ENDPOINT + "/roster" + id);
    }
};
