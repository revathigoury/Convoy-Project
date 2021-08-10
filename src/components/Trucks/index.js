import { useEffect, useState } from 'react';
import { getTrucks } from '../../services';
import { Select } from '../';
import TruckCard from '../TruckCard';
import './trucks.css';

const filterOptions = [
	'Most Recent',
	'Dropoff Date',
	'Price',
	'Origin',
	'Destination',
	'Miles',
];

const sortOption = (selectedValue) => {
	switch (selectedValue) {
		case 'Most Recent':
			return 'pickupDate';
		case 'Dropoff Date':
			return 'dropoffDate';
		case 'Price':
			return 'price';
		case 'Origin':
			return 'origin';
		case 'Destination':
			return 'destination';
		case 'Miles':
			return 'miles';
		default:
			return 'pickupDate';
	}
};

const orderOption = (selectedValue) => {
	switch (selectedValue) {
		case 'Ascending':
			return 'asc';
		case 'Descending':
			return 'desc';
		default:
			return 'desc';
	}
};

export const Trucks = () => {
	const [trucks, setTrucks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [pageOffset, setPageOffset] = useState(0);
	const [filterOption, setFilterOption] = useState('Most Recent');
	const [order, setOrder] = useState('desc');
	const [shouldShowMore, setShouldShowMore] = useState(true);

	const receiveTrucks = async (payload, isRequestMore = false) => {
		try {
			setIsLoading(true);
			const response = await getTrucks(payload);
			const { data } = response;
			if (data) {
				if (data.length < 20) {
					setShouldShowMore(false);
				} else if (!shouldShowMore) {
					setShouldShowMore(true);
				}
				setTrucks(isRequestMore ? [...trucks, ...data] : data);
			}
		} catch (e) {
			// Error message
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		receiveTrucks({
			sort: sortOption(filterOption),
			order: orderOption(order),
		});
		setPageOffset(0);
	}, [filterOption]);

	const handleShowMore = () => {
		receiveTrucks(
			{
				sort: sortOption(filterOption),
				offset: pageOffset + 1,
				order: orderOption(order),
			},
			true
		);
		setPageOffset((prev) => prev + 1);
	};

	const handleFilterChange = (value) => {
		setFilterOption(value);
	};

	const handleOrderChange = (value) => {
		setOrder(value);
		receiveTrucks({
			sort: sortOption(filterOption),
			order: orderOption(value),
		});
	};

	return (
		<section className='main'>
			<section className='trucks-filter-container'>
				<span className='filter-label'>Sort by:</span>
				<Select
					filterOption={filterOption}
					handleFilterChange={handleFilterChange}
					filterOptionsList={filterOptions}
				/>
				<span className='order-label'>Order by:</span>
				<Select
					filterOption={order}
					handleFilterChange={handleOrderChange}
					filterOptionsList={['Descending', 'Ascending']}
				/>
			</section>
			<section className='trucks-container'>
				{trucks.map((eachTruck, index) => (
					<TruckCard
						key={JSON.stringify({ ...eachTruck, index })}
						truckDetails={eachTruck}
					/>
				))}
				{isLoading ? (
					<section className='loader-container'>
						<p className='loader'>Loading...</p>
					</section>
				) : (
					<></>
				)}
			</section>
			{shouldShowMore && !isLoading ? (
				<section>
					<button className='show-more-button' onClick={handleShowMore}>
						Show More
					</button>
				</section>
			) : (
				<></>
			)}
		</section>
	);
};

export default Trucks;
