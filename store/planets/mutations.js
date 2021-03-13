export default {
  setId(state, id) {
    state.id = id;
  },
  setDetail(state, data) {
    state.detail = data;
  },
  setList(state, value) {
    if (state.page === 1) {
      state.list = value;
    } else {
      state.list = [...state.list, ...value];
    }
  },
  setPage(state, value) {
    state.page = value
  }
};
