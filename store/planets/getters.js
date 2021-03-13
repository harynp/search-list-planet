export default {
  getListPlanets: state => state.list || [],
  getId: state => state.id,
  getDetail: state => state.detail,
  getPage: state => state.page
};
