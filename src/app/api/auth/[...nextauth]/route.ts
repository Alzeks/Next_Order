import NextAuth from "next-auth/next";
import { authConfig} from '../config'

const handler = NextAuth(authConfig);

export { handler as POST, handler as GET}