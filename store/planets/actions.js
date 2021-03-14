export default {
  async getList({ commit }, payload) {
    try {
      const response = await this.$axios.$get('https://swapi.dev/api/planets/', payload);
      commit('setList', response.results);
    } catch (err) {
      throw err;
    }
  },
  /* KENA CORS */
  async getDetail({ commit }, payload) {
    try {
      const response = await this.$axios.$get(`https://swapi.dev/api/planets/${payload}`, {
        headers: {
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
      commit('setDetail', response);
      return response;
    } catch (err) {
      throw err;
    }
  },
  async searchByName({ commit }, keyword) {
    try {
      const response = await this.$axios.$get(`https://swapi.dev/api/planets/`, {
        params: {
          search: keyword
        }
      })
      commit('setList', response.results);
    } catch (err){
      console.log(err)
    }
  }
}


