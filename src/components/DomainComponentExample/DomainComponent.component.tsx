import { useDomains } from "../../DomainContext";
import { DomainsType } from "../../types";

const DomainComponent: React.FC = () => {
  const { domains } = useDomains();

  if (domains == null) return <></>;

  const renderSelect = (name: keyof DomainsType, options: string[]) => (
    <select name={name} multiple>
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
export default DomainComponent;
