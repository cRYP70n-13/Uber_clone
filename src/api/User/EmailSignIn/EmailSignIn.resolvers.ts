import { Resolvers } from '../../../types/resolvers';
import { EmailSingInMutationArgs, EmailSignInResponse } from '../../../types/graph.d';
import User from '../../../entities/User';

const resolvers: Resolvers = {
	Mutation: {
		EmailSignIn: async (
			_,
			args: EmailSingInMutationArgs
		): Promise<EmailSignInResponse> => {
			const { email, password } = args;
			try {
				const user = await User.findOne({ email });
				if (!user) {
					return {
						ok: false,
						error: 'No User found with that email',
						token: null
					};
				}
				const checkPassword = user.comparePassword(password);
				if (checkPassword) {
					return {
						ok: true,
						error: null,
						token: 'Comming Soon'
					};
				} else {
					return {
						ok: false,
						error: 'Wrong password',
						token: null
					}
				}
			} catch (error) {
				return {
					ok: false,
					error: error.message,
					token: null
				};
			}
		}
	}
}

export default resolvers;