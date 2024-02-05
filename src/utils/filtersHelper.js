export const getSearchedFilters = (genres, genders, tiers, filters, searchValue) => {
  let newFilters = [];
  genders = getSelectedValues(genders);
  genres = getSelectedValues(genres);
  tiers = getSelectedValues(tiers);

  filters.forEach((filter) => {
    const isMatchedGenre = (genders.length === 0 || genders.includes(filter.gender));
    const isMatchedGender = (genres.length === 0 || genres.includes(filter.genre));
    const isMatchedTier = (tiers.length === 0 || tiers.includes(filter.tier));

    const isMatchedSearch =
      !searchValue ||
      filter?.genre?.toLowerCase().includes(searchValue.toLowerCase()) ||
      filter?.gender?.toLowerCase().includes(searchValue.toLowerCase()) ||
      filter?.tier?.toLowerCase().includes(searchValue.toLowerCase());

    if (isMatchedGenre && isMatchedGender && isMatchedTier && isMatchedSearch) {
      newFilters.push(filter);
    }
  });

  if (newFilters.length === 0 && (genders.length > 0 || genres.length > 0 || tiers.length > 0)) {
    return false;
  }

  return newFilters;
};

export const getSelectedFilters = (filters) => {
  const selectedFilters = [];
  filters.forEach((filter) => {
    if (filter.selected) {
      selectedFilters.push(filter);
    }
  });
  return selectedFilters;
}

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
