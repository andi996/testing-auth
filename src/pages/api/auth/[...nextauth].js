import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import Cookies from "cookies";
import axios from "axios";

// export default NextAuth({
export const authOptions = (req, res) => {
  return {
    providers: [
      CredentialsProvider({
        id: "credentials",
        async authorize(credentials, req) {
          console.log("ISI CREDENTIALS", credentials);

          var user = JSON.parse(credentials?.data);

          if (user?.email) {
            // Any object returned will be saved in `user` property of the JWT
            return user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            throw new Error("credentials");
            // return null;
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

        if (account.provider == "credentials") {
          return true;
        }

        let payload = {};
        if (account.provider == "google") {
          payload.email = profile.email;
          payload.code = account.access_token;
          payload.device_id = "web";
        }
        if (account.provider == "facebook") {
          if (user.email == undefined) {
            throw new Error("account-has-no-email");
          }
          // payload.code = account.access_token;
          payload.device_id = "web";
        }

        try {
          let response = await axios.post(
            `https://karir-api.staging.qareer.com/v1/login/${account.provider}`,
            payload
          );
          console.log("ISI RESPONSE BE", response);
          let data = await response?.data?.data;
          let status = await response?.status;

          if (status === 200) {
            user.data = data;
            return true;
          }
          // else {
          //   throw new Error(`${status}`);
          //   // hasil, https://testing-auth-six.vercel.app/?error=Request%20failed%20with%20status%20code%20400#_=_
          // }
        } catch (error) {
          // if (error.response) {
          //   console.log(error.response.data);
          //   console.log(error.response.status);
          //   console.log(error.response.header);
          // } else if (error.request) {
          //   console.log(error.request);
          // } else {
          //   console.log("ISI ERROR", error.message);
          // }
          throw new Error(error?.response?.status);
        }
      },
      async jwt({ token, account, user }) {
        // Persist the OAuth access_token to the token right after signin
        if (account) {
          token.accessToken = account.access_token;
        }

        if (user) {
          token.data = { user };
        }

        return token;
      },
      async session({ session, token, user, account }) {
        // Send properties to the client, like an access_token from a provider.
        session.user = token?.data?.user;
        //
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
