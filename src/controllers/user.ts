import { Response, Request } from 'express';
import { User } from '@/database/model/User';
import CPFValidator from '@/utils/cpf_validator';
import logger from '@/services/logger';

export class UserController {
	public async create (req: Request, res: Response): Promise<Response> {
		const {
			firstName,
			lastName,
			email,
			cpf,
			password,
			phoneCountry,
			phoneNumber,
			birthdateDay,
			birthdateMonth,
			birthdateYear,
			addressStreet,
			addressNumber,
			addressComplement,
			addressCity,
			addressDistrict,
			addressState,
			addressCountry,
			addressZipcode
		} = req.body;

		if (cpf && !CPFValidator(cpf)) {
			return res.status(400).json({ message: 'Was not possible add this user', error: { code: 1, message: 'CPF is not valid' } });
		}

		const user = new User();
		user.firstName = firstName;
		user.lastName = lastName;
		user.email = email;
		user.password = password;
		user.cpf = cpf;
		user.phoneCountry = phoneCountry;
		user.phoneNumber = phoneNumber;
		user.birthdateDay = birthdateDay;
		user.birthdateMonth = birthdateMonth;
		user.birthdateYear = birthdateYear;
		user.addressStreet = addressStreet;
		user.addressNumber = addressNumber;
		user.addressComplement = addressComplement;
		user.addressCity = addressCity;
		user.addressDistrict = addressDistrict;
		user.addressState = addressState;
		user.addressCountry = addressCountry;
		user.addressZipcode = addressZipcode;

		try {
			await user.save();
			logger.info({ date: new Date(), message: `User succcessfully registered ID: ${user.id}` });
			return res.status(400).json({ message: 'User successfully registered', error: false });
		} catch (err) {
			logger.error({ date: new Date(), message: `Cannot register user with email: ${email}`, error: err });
			User.delete(user.id);
			return res.status(400).json({ message: 'Was not possible add this user', error: { code: err.code, message: err.message } });
		}
	}

	public async update (req: Request, res: Response) {}

	public async read (req: Request, res: Response): Promise<Response> {
		const { id } = req.params;

		try {
			const user = await User.findOne(id);
			logger.info({ date: new Date(), message: `Successfully get user details with id: ${id}` });
			return res.status(200).json(user);
		} catch (err) {
			logger.error({
				date: new Date(),
				message: `There was a problem on get account data from ${id}`,
				error: { code: err.code, message: err.message }
			});
			return res.status(500).json({ message: 'There was a problem', error: { code: err.code, message: err.message } });
		}
	}

	public async delete (req: Request, res: Response): Promise<Response> {
		const { id } = req.body;

		try {
			User.delete(id);
			logger.info({ date: new Date(), message: `Successfully deleted user with id: ${id}` });
			return res.status(204).json({ message: 'Account successfully deleted', error: false });
		} catch (err) {
			logger.error({
				date: new Date(),
				message: `There was a problem on delete the user with ID: ${id}`,
				error: { code: err.code, message: err.message }
			});
			return res.status(500).json({ message: 'There was a problem', error: { code: err.code, message: err.message } });
		}
	}
}

export default new UserController();
