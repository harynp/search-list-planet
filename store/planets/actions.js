export default {
  async getList({ commit }, payload) {
    try {
      const response = await this.$axios.$get('https://swapi.dev/api/planets/', payload);
      commit('setList', response.results);
    } catch (err) {
      throw err;
    }
  },
  async getDetail({ commit }, id) {
    try {
      const response = await this.$axios.$get(`https://swapi.dev/api/planets/${id}`, {
          headers: {
            "Content-Type": "application/json",
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
  }
}


