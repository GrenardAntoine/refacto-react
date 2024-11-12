import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { DomainsType } from "./types";
import { convertDomainsStringToDomainsType } from "./utils";

interface DomainContextType {
  domains: DomainsType | null;
  setDomains: React.Dispatch<React.SetStateAction<DomainsType | null>>;
}

export interface ChildrenNodeProviderProps {
  children: ReactNode;
}

const defaultContextValue: DomainContextType = {
  domains: {
    countries: [],
    classifications: [],
    subClassifications: [],
  },
  setDomains: () => undefined,
};

export const DomainContext =
  createContext<DomainContextType>(defaultContextValue);

export const useDomains = () => useContext(DomainContext);

export const DomainsProvider: React.FC<ChildrenNodeProviderProps> = ({
  children,
}) => {
  const [domains, setDomains] = useState<DomainsType | null>(null);

  useEffect(() => {
    const populateDomains = async () => {
      try {
        // Code to fetch domains
        const domains = [
          "US_OK-WOK",
          "FR_NK-WOL",
          "FR_OK-NPP",
          "EN_NK-NRP",
          "EN_BL-WOL",
        ];

        const parsedDomains = convertDomainsStringToDomainsType(domains);
        setDomains(parsedDomains);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    populateDomains();
  }, []);

  return (
    <DomainContext.Provider
      value={{
        domains,
        setDomains,
      }}
    >
      {children}
    </DomainContext.Provider>
  );
};
