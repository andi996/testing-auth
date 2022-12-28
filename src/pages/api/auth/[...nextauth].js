import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { API2 } from "../../../api/service";
import { endpoints } from "../../../api/endpoint";
import Cookies from "cookies";

// export default NextAuth({
const nextAuthOptions = (req, res) => {
  return {
    providers: [
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
      async signIn({ user, account, profile, email, credentials }) {
        console.log(account.provider);

        //   if (account.provider !== "credentials") {
        if (account.provider == "google") {
          //get ip address
          const dataInfo = await axios
            .get("https://geolocation-db.com/json/")
            .then((res) => {
              return `web | ${res.data.IPv4}`;
            })
            .catch((err) => {
              console.log("error", err);
            });

          //hit api login with social
          const isSuccessLogin = await axios
            .post(
              `https://karir-api.staging.qareer.com/v1/login/${account.provider}`,
              {
                email: profile.email,
                code: account.access_token,
                device_id: dataInfo ? dataInfo : "web",
              }
            )
            .then((response) => {
              const today = new Date();
              const cookieExp30Day = new Date(
                new Date().setDate(today.getDate() + 30)
              );
              const cookies = new Cookies(req, res); // Create a cookies instance
              cookies.set("user", JSON.stringify(response?.data?.data), {
                expires: cookieExp30Day,
                httpOnly: false,
              });
              cookies.set("Authorization", response?.data?.data?.token, {
                expires: cookieExp30Day,
                httpOnly: false,
              });
              return true;
            })
            .catch((err) => {
              return false;
            });

          return isSuccessLogin;
        } else {
          return true;
        }
      },
    },
    pages: {
      signIn: "/login",
      error: "/login",
      // signOut: '/auth/signout',
      // error: '/auth/error', // Error code passed in query string as ?error=
      // verifyRequest: '/auth/verify-request', // (used for check email message)
      // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    // Enable debug messages in the console if you are having problems
    debug: process.env.NODE_ENV === "development",
  };
};

export default (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};
