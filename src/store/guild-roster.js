import RosterApi from "../api/roster";

const FETCHING_ROSTER = "FETCHING_ROSTER",
  FETCHING_ROSTER_SUCCESS = "FETCHING_ROSTER_SUCCESS",
  FETCHING_ROSTER_ERROR = "FETCHING_ROSTER_ERROR";

const state = {
  isLoading: false,
  error: null,
  entities: [],
  selectedEntity: null,
};

const getters = {
  isLoading(state) {
    return state.isLoading;
  },
  hasError(state) {
    return state.error !== null;
  },
  error(state) {
    return state.error;
  },
  hasRoster(state) {
    return state.entities.length > 0;
  },
  roster(state) {
    return state.entities;
  },
  member(state) {
    return state.selectedEntity;
  },
};

const mutations = {
  [FETCHING_ROSTER](state) {
    state.isLoading = true;
    state.error = null;
    state.entities = [];
  },
  [FETCHING_ROSTER_SUCCESS](state, entities) {
    state.isLoading = false;
    state.error = null;
    state.entities = entities;
  },
  [FETCHING_ROSTER_ERROR](state, error) {
    state.isLoading = false;
    state.error = error;
    state.entities = [];
  },
};

const actions = {
  async getAll({ commit }) {
    commit(FETCHING_ROSTER);
    try {
      let response = await RosterApi.getAll();
      commit(FETCHING_ROSTER_SUCCESS, response.data);
      return response.data;
    } catch (error) {
      commit(FETCHING_ROSTER_ERROR, error);
      return null;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
