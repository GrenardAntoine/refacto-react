import { useSelector } from 'react-redux'
import { RootState } from '../../redux/types'

const DomainFilter = () => {
	const domains = useSelector<RootState, string[]>(({ domains }) => domains)

	const countries = [...new Set(domains.map(domain => domain.substring(0, 2)))] // TODO make utils functions
	const classifications = [...new Set(domains.map(domain =>  domain.substring(3, 5)))]
	const subClassifications = [...new Set(domains.map(domain => domain.substring(6)))]

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
