import React, { useState } from "react";
import { DomainsType } from "../../types";

interface Props {
  domains?: DomainsType;
}
const DomainFilter: React.FC<Props> = ({
  domains = { countries: [], classifications: [], subClassifications: [] },
}) => {
  const [selections, setSelections] = useState<DomainsType>({
    countries: [],
    classifications: [],
    subClassifications: [],
  });

  const handleSelect =
    (type: keyof DomainsType) =>
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValues = Array.from(event.target.selectedOptions).map(
        (option) => option.value,
      );

      let newSelections = selections

      if (selections[type].includes(selectedValues[0])) {
        newSelections = {
          ...selections,
          [type]: selections[type].filter(value => value !== selectedValues[0]),
        }; 
      } else {
        newSelections = {
          ...selections,
          [type]: Array.from(new Set(selections[type].concat(selectedValues))),
        };
      }
      
      setSelections(newSelections);
      console.table(newSelections)
    };

  const renderSelect = (name: keyof DomainsType, options: string[]) => (
    <select
      name={name}
      multiple
      value={selections[name]}
      onChange={handleSelect(name)}
    >
      {options.map((value) => (
        <option value={value} key={value}>
          {value}
        </option>
      ))}
    </select>
  );

  return (
    <>
      {renderSelect("countries", domains.countries)}
      {renderSelect("classifications", domains.classifications)}
      {renderSelect("subClassifications", domains.subClassifications)}
    </>
  );
};

export default DomainFilter;
