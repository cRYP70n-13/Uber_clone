import { Resolvers } from '../../../types/resolvers'
import { EmailSingInMutationArgs, EmailSingUpResponse } from '../../../types/graph.d';
import User from '../../../entities/User';

const resolvers: Resolvers = {
    Mutation: {
        EmailSignUp: async (_, args: EmailSingInMutationArgs): Promise<EmailSingUpResponse> => {
            const { email } = args;
            try {
                const existingUser = await User.findOne({ email })
                if (existingUser) {
                    return {
                        ok: true,
                        error: null,
                        token: 'Comming Soon'
                    };
                } else {
                    // Create a new User if it doesn't exisits
                    User.create({ ...args }).save();
                    return {
                        ok: true,
                        error: null,
                        token: 'Comming Soon'
                    };
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                }
            }
        }
    }
};

export default resolvers;