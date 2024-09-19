import { useSelector } from 'react-redux'
import { RootState } from '../../redux/types'
import {
	getClassificationsFromDomains,
	getCountriesFromDomains,
	getSubClassificationsFromDomains,
} from './DomainFilter.utils'

const DomainFilter = () => {
	const domains = useSelector<RootState, string[]>(({ domains }) => domains)

	const countries = getCountriesFromDomains(domains)
	const classifications = getClassificationsFromDomains(domains)
	const subClassifications = getSubClassificationsFromDomains(domains)

	return (<>
		<select name="countries" multiple>
			{countries.map(country => (
				<option value={country} key={country}>{country}</option>
			))}
		</select>
		<select name="classifications" multiple>
			{classifications.map(classification => (
				<option value={classification} key={classification}>{classification}</option>
			))}
		</select>
		<select name="subClassifications" multiple>
			{subClassifications.map(subClassification => (
				<option value={subClassification} key={subClassification}>{subClassification}</option>
			))}
		</select>
	</>)
}

export default DomainFilter
