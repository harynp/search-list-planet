export default {
  async getList({ commit }) {
    try {
      const response = await this.$axios.$get('https://swapi.dev/api/planets/');
      console.log(response.results);
      commit('setList', response.results);
    } catch (err) {
      throw err;
    }
  }
}


