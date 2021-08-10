import moment from 'moment';
import './truck-card.css';

const requiredSingleDateFormat = (date) =>
	moment(date).format('ddd M/D h:mm a');

export const getDateFormatted = (startDate, endDate) => {
	const startDateDay = moment(startDate).format('dddd');
	const endDateDay = moment(endDate).format('dddd');

	if (startDateDay === endDateDay) {
		return `${requiredSingleDateFormat(startDate)} - ${moment(endDate).format(
			'h:mm a'
		)}`;
	}

	return `${requiredSingleDateFormat(startDate)} - ${requiredSingleDateFormat(
		endDate
	)}`;
};

export const TruckCard = ({ truckDetails }) => {
	const { miles, origin, destination, offer } = truckDetails;

	return (
		<>
			<section className='card-container'>
				<section>
					<span className='banner'>Requested</span>
				</section>
				<section className='truck-details-container'>
					<section className='truck-from-to-container'>
						<section className='truck-from-container'>
							<p className='truck-origin'>{`${origin.city}, ${origin.state}`}</p>
							<p className='truck-origin-duration'>
								{getDateFormatted(origin.pickup.start, origin.pickup.end)}
							</p>
						</section>
						<section className='truck-to-container'>
							<p className='truck-destination'>{`${destination.city}, ${destination.state}`}</p>
							<p className='truck-destination-duration'>
								{getDateFormatted(
									destination.dropoff.start,
									destination.dropoff.end
								)}
							</p>
						</section>
					</section>
					<section className='truck-street-container'>
						<p className='truck-details-text'>{`53' Reefer`}</p>
					</section>
					<section className='truck-distance-container'>
						<p className='truck-details-text'>{`${miles} miles`}</p>
					</section>
					<section className='truck-price-container'>
						<p className='truck-details-price'>{`$${offer}`}</p>
					</section>
				</section>
			</section>
		</>
	);
};

export default TruckCard;
