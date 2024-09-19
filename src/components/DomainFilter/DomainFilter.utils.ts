export const getCountriesFromDomains = (domains: string[]) => [...new Set(domains.map(domain => domain.substring(0, 2)))]

export const getClassificationsFromDomains = (domains: string[]) => [...new Set(domains.map(domain =>  domain.substring(3, 5)))]

export const getSubClassificationsFromDomains = (domains: string[]) => [...new Set(domains.map(domain => domain.substring(6)))]
