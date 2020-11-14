import { Resolvers } from '../../../types/resolvers'
import { EmailSignUpMutationArgs, EmailSingUpResponse } from '../../../types/graph.d';
import User from '../../../entities/User';
import createJWT from '../../../utils/createJWT';

const resolvers: Resolvers = {
    Mutation: {
        EmailSignUp: async (_, args: EmailSignUpMutationArgs): Promise<EmailSingUpResponse> => {
            const { email } = args;
            try {
                const existingUser = await User.findOne({ email })
                if (existingUser) {
                    const token = createJWT(existingUser.id);
                    return {
                        ok: true,
                        error: null,
                        token
                    };
                } else {
                    // Create a new User if it doesn't exisits
                    const createdUser = await User.create({ ...args }).save();
                    const token = createJWT(createdUser.id);
                    return {
                        ok: true,
                        error: null,
                        token
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