export const sortCountries = (countries) => {
    return countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
  };