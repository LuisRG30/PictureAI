export const getSearchedFilters = (genres, genders, tiers, filters) => {
  let newFilters = [];
  genders = getSelectedValues(genders);
  genres = getSelectedValues(genres);
  tiers = getSelectedValues(tiers);
  console.log("Filters", genres, genders, tiers);
  filters.forEach((filter) => {
    if (
      (genders.length === 0 || genders.includes(filter.gender)) &&
      (genres.length === 0 || genres.includes(filter.genre)) &&
      (tiers.length === 0 || tiers.includes(filter.tier))
    ) {
      newFilters.push(filter);
    }
  });
  if(newFilters.length === 0 && (genders.length > 0 || genres.length > 0 || tiers.length > 0)){
    return false;
  }
  //   newFilters = newFilters.length > 0 ? newFilters : filters;
  //   newFilters.forEach((filter) => {
  //     genders.forEach((gen) => {
  //       if (gen.selected && filter.gender === gen.value) {
  //         if (!newFilters.some((existingFilter) => existingFilter === filter)) {
  //           newFilters.push(filter);
  //         }
  //       }
  //     });
  //   });
  //   newFilters = newFilters.length > 0 ? newFilters : filters;
  //   newFilters.forEach((filter) => {
  //     tiers.forEach((tie) => {
  //       if (tie.selected && filter.genre === tie.value) {
  //         if (!newFilters.some((existingFilter) => existingFilter === filter)) {
  //           newFilters.push(filter);
  //         }
  //       }
  //     });
  //   });
  return newFilters;
};

export const getSelectedValues = (arr) => {
  const valuesArr = [];
  arr &&
    arr.forEach((item) => {
      if (item.selected) {
        valuesArr.push(item.value);
      }
    });
  return valuesArr;
};
