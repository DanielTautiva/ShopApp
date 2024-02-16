import { compare } from 'bcryptjs';

import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import connectDB from '../../../utils/db';
import UserModel from '../../../models/User';

export default NextAuth({
    providers : [
        CredentialsProvider({
            name : "Credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials): Promise<any> {

                try {

                    await connectDB();

                    const { email, password } : any = credentials;

                    // busca un usuario con el email dado
                    const user = await UserModel.findOne({ email: email });

                    if (!user) {
                        throw new Error('No user found with this email, please sign up.');
                    }

                    // compara la contraseña proporcionada con la almacenada en la base de datos
                    const checkPassword = await compare(password, user.password);

                    if (!checkPassword) {
                        throw new Error('Username or password does not match');
                    }


                    return Promise.resolve(user);

                } catch (error) {
                    throw new Error(`Authentication failed: ${error.message}`);
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            session.user = token as any;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/auth/login",
    },
})