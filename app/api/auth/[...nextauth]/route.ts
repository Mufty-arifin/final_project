import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  debug: true,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      id: "email",
      name: "email",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        try {
          const response = await fetch(
            "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );
          const data = await response.json();
          if (response.ok) {
            return data.data;
          } else {
            console.log('eror');
            return null;
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }: { token: any; session: any }) {
      const user = session.user;
      if (token && user) {
        user.id = token.id;
        user.name = token.name;
        user.email = token.email;
        user.role = token.role;
        user.image = token.image;
        user.phoneNumber = token.phoneNumber;
      }

      return session;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      return {
        id: user?.id || token?.id,
        name: user?.name || token?.name,
        email: user?.email || token?.email,
        image: user?.profilePictureUrl || token?.image,
        role: user?.role || token?.role,
        phoneNumber: user?.phoneNumber || token?.phoneNumber,
      };
    },
  },
});

export { handler as GET, handler as POST };
