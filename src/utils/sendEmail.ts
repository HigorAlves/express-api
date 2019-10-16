import sgMail from '@sendgrid/mail';
import createConfirmationEmailLink from '@/utils/createConfirmationLink';
import Redis from '@/database/redis';

class Email {
	private API_KEY: string;

	public constructor () {
		this.API_KEY = process.env.SENDGRID_API_KEY as string;
	}

	public async verificationEmail (userId: string, email: string, hostUrl: string) {
		const url = await createConfirmationEmailLink(userId, hostUrl, Redis);
		sgMail.setApiKey(this.API_KEY);

		const msg = {
			to: email,
			from: 'test@example.com',
			templateId: 'd-ce12188201ea41cb8ad7ba20600d4cba',
			dynamic_template_data: {
				url
			}
		};
		sgMail.send(msg);
	}

	public lockAccount (email: string) {
		sgMail.setApiKey(this.API_KEY);

		const msg = {
			to: email,
			from: 'contato@studiomvp.io',
			templatedId: ''
		};

		sgMail.send(msg);
	}
}

export default new Email();
