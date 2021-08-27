/*
export function someAction (context) {
}
*/

// export async function getAll({ commit }) {
//     commit(FETCHING_CUSTOMERS);
//     try {
//         let response = await CustomerApi.getAll();
//         commit(FETCHING_CUSTOMERS_SUCCESS, response.data);
//         return response.data;
//     } catch (error) {
//         commit(FETCHING_CUSTOMERS_ERROR, error);
//         return null;
//     }
// }

// export async function get({ commit }, id) {
//     commit(FETCHING_CUSTOMER);
//     try {
//         let response = await CustomerApi.get(id);
//         commit(FETCHING_CUSTOMER_SUCCESS, response.data);
//         return response.data;
//     } catch (error) {
//         commit(FETCHING_CUSTOMER_ERROR, error);
//         return null;
//     }
// }

// export async function create({ commit }, params) {
//     commit(CREATING_CUSTOMER);
//     try {
//         let response = await CustomerApi.create(params);
//         commit(CREATING_CUSTOMER_SUCCESS, response.data);
//         return response.data;
//     } catch (error) {
//         commit(CREATING_CUSTOMER_ERROR, error);
//         return null;
//     }
// }

// export async function update({ commit }, params) {
//     commit(CREATING_CUSTOMER);
//     try {
//         let response = await CustomerApi.update(params);
//         commit(CREATING_CUSTOMER_SUCCESS, response.data);
//         return response.data;
//     } catch (error) {
//         commit(CREATING_CUSTOMER_ERROR, error);
//         return null;
//     }
// }

// export async function deletee({ commit }, id) {
//     commit(DELETING_CUSTOMER);
//     try {
//         let response = await CustomerApi.delete(id);
//         commit(DELETING_CUSTOMER_SUCCESS, response.data);
//         return response.data;
//     } catch (error) {
//         commit(DELETING_CUSTOMER_ERROR, error);
//         return null;
//     }
// }