export default {
  exchangesByKey(state) {
    const map = {};

    state.exchangesList.forEach((ex) => {
      map[ex.key] = ex;
    });

    return map;
  },
};
