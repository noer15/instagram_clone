import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId:
        "539961321683-9p0v8vjh757fvf4f7jel6q4l7q48egre.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token, user }) {
      session.user.username = session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();
      session.user.uid = token.sub;
      return session;
    },
  },
  secret: "sjhjhwerh3y86234j",
});
