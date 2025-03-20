export const filterCountries = (countries, searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return countries.filter(country =>
      country.name.common.toLowerCase().includes(lowerCaseSearchTerm)
    );
  };