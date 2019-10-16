import Axios from 'axios';

let getHost = () => '';

beforeAll(async () => {
	const port = 4000;
	getHost = () => `http://localhost:${port}/test`;
});

describe('This is some array of tests', () => {
	it('should test something', async () => {
		const response = await Axios.get(getHost());
		expect(response.status).toEqual(200);
	});
});
