import { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/types'

interface State {
	countries: string[],
	classifications: string[],
	subClassifications: string[]
}

const DomainFilter = () => {
	const domains = useSelector<RootState, string[]>(({ domains }) => domains)

	const [state] = useState<State>({
		countries: [...new Set(domains.map(domain => domain.substring(0, 2)))], // TODO make utils functions
		classifications: domains.map(domain =>  domain.substring(3, 5)),
		subClassifications: [...new Set(domains.map(domain => domain.substring(6)))],
	})

	return (<>
		<select name="countries" multiple>
			{state.countries.map(country => (
				<option value={country} key={country}>{country}</option>
			))}
		</select>
		<select name="classifications" multiple>
			{state.classifications.map(classification => (
				<option value={classification} key={classification}>{classification}</option>
			))}
		</select>
		<select name="subClassifications" multiple>
			{state.subClassifications.map(subClassification => (
				<option value={subClassification} key={subClassification}>{subClassification}</option>
			))}
		</select>
	</>)
}

export default DomainFilter
