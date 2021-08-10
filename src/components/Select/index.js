import './select.css';

export const Select = ({
	filterOption,
	handleFilterChange,
	filterOptionsList,
}) => {
	const handleChange = (e) => {
		handleFilterChange(e.target.value);
	};

	return (
		<>
			<select value={filterOption} onChange={handleChange} className='select'>
				{filterOptionsList.map((eachOption) => (
					<option key={eachOption}>{eachOption}</option>
				))}
			</select>
		</>
	);
};

export default Select;
