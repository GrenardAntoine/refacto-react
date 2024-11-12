const parseDomainString = (domain: string) => {
  const [country, rest] = domain.split("_");
  const [classification, subClassification] = rest.split("-");
  return { country, classification, subClassification };
};

const getUniqueValues = (array: string[]): string[] => {
  return Array.from(new Set(array));
};

export const convertDomainsStringToDomainsType = (domains: string[]) => {
  const parsedDomains = domains.map(parseDomainString);

  const allCountries = parsedDomains.map((domain) => domain.country);
  const allClassifications = parsedDomains.map(
    (domain) => domain.classification,
  );
  const allSubClassifications = parsedDomains.map(
    (domain) => domain.subClassification,
  );

  return {
    countries: getUniqueValues(allCountries),
    classifications: getUniqueValues(allClassifications),
    subClassifications: getUniqueValues(allSubClassifications),
  };
};