export default {
  exchangesByKey(state) {
    const map = {};

    state.exchangesList.forEach((ex) => {
      map[ex.key] = ex;

      if (ex.key === 'cex') {
        map['cex.io'] = ex;
      }
    });

    return map;
  },
};
