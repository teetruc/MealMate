// Import only what is needed from Axios
import Axios from 'axios';

const state = {
  searchParam: '',
  searchResults: [],
  bookmarks: JSON.parse(window.localStorage.getItem('bookmarks')) || [],
};

const getters = {
  getSearchResults: (state) => state.searchResults,
  getSearchParam: (state) => state.searchParam,
  getBookmarks: (state) => state.bookmarks,
};

const actions = {
  async fetchSearchResult({ commit }, searchItem) {
    // Use Axios directly
    const res = await Axios.get(
      `https://api.edamam.com/search?q=${searchItem}&app_id=${"8b0cc6ee"}&app_key=${"27461be573cdd8e5e82f48a4d8bf1df1"}&from=0&to=20`
    );
    const results = res.data.hits;
    commit('updateSearchResults', results);
  },
  async fetchSearchItem({ commit }, item) {
    commit('updateSearchItem', item);
  },
};

const mutations = {
  updateSearchResults: (state, results) => {
    state.searchResults = results;
  },
  updateSearchItem: (state, item) => {
    state.searchParam = item;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
