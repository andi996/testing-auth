import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import Cookies from "cookies";

// export default NextAuth({
export const authOptions = (req, res) => {
  return {
    providers: [
      CredentialsProvider({
        id: "credentials",
        async authorize(credentials, req) {
          console.log("ISI CREDENTIALS", credentials);
          console.log("ISI req", req);

          var tes;
          if (credentials?.data) {
            tes = JSON.parse(credentials?.data);
          }

          console.log(tes);

          const user = {
            id: parseInt(credentials?.id),
            name: credentials?.name,
            age: credentials?.age,
          };

          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            return null;
          }
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorizationUrl:
          "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
      }),
      LinkedInProvider({
        clientId: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
      encryption: true,
      maxAge: 60 * 60 * 24 * 30,
    },
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        console.log("ISI USER ", user);
        console.log("ISI ACCOUNT ", account);
        console.log("ISI PROFILE ", profile);

        const cookies = new Cookies(req, res); // Create a cookies instance

        cookies.set("fbUser", JSON.stringify(user), {
          httpOnly: false,
        });

        // if (user.email == "" || user.email == undefined || user.email == null) {
        //   return false;
        // } else {
        //   return true;
        // }

        try {
          let res = await axios.post(
            `https://karir-api.staging.qareer.com/v1/login/${account.provider}`,
            payload
          );
          console.log("ISI RESPONSE BE", res);
          if (!res.ok) {
            throw new Error("Bad response", {
              cause: { res },
            });
          }
        } catch (err) {
          throw err;
        }

        if (user) {
          if (user.email == undefined) {
            throw new Error("Silahkan gunakan metode login yang lain");
          }
          return true;
        }
        return false;
      },
      async jwt({ token, account, user }) {
        // Persist the OAuth access_token to the token right after signin
        if (account) {
          token.accessToken = account.access_token;
        }

        return token;
      },
      async session({ session, token, user, account }) {
        // Send properties to the client, like an access_token from a provider.

        session.accessToken = token.accessToken;
        session.user.email = token.email;
        return session;
      },
    },
    pages: {
      signIn: "/login",
      error: "/",
      // signOut: '/auth/signout',
      // error: '/auth/error', // Error code passed in query string as ?error=
      // verifyRequest: '/auth/verify-request', // (used for check email message)
      // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    // Enable debug messages in the console if you are having problems
    // debug: process.env.NODE_ENV === "development",
  };
};

export default (req, res) => {
  return NextAuth(req, res, authOptions(req, res));
};
