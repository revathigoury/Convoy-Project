import { apiClient } from './client';

const PATHS = {
	offers: '/offers',
};

export const getTrucks = async (payload) => {
	const { sort, offset, order } = payload;
	const offsetText = offset ? `&offset=${offset}` : '';
	const orderText = order ? `&order=${order}` : '';
	const response = await apiClient.get(
		`${PATHS.offers}?sort=${sort}${offsetText}${orderText}`,
		payload
	);
	return response;
};
