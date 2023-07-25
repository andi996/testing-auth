import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { API2 } from "../../../api/service";
import { endpoints } from "../../../api/endpoint";
import Cookies from "cookies";

const getIPAddress = async () => {
  try {
    const response = await axios.get("https://api.ipify.org/?format=json");
    if (response.status === 200) {
      return response.data.ip;
    }
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (provider, payload, req, res) => {
  const cookies = new Cookies(req, res);
  try {
    const response = await API2({
      method: "POST",
      url: `${endpoints.Login}/${provider}`,
      data: payload,
    });
    const data = response?.data?.data;
    const status = response?.status;

    if (status === 200 && data) {
      // Set cookie for is_new_user
      const today = new Date();
      const cookieExp1day = new Date(today.setDate(today.getDate() + 1));
      if (data.is_new_account) {
        cookies.set("is_new_user", JSON.stringify(data.is_new_account), {
          expires: cookieExp1day,
          httpOnly: false,
        });
      }
      return data;
    }
    return null;
  } catch (error) {
    if (error?.response?.data?.message?.[0]) {
      throw new Error(error.response.data.message[0]);
    } else {
      throw new Error(error?.response?.status);
    }
  }
};

const getProfile = async (token) => {
  const data = {
    with_profile: true,
    with_work_experience: true,
    with_education: true,
    with_preference: true,
    with_skill: true,
    with_language: true,
    with_organization_experience: true,
    with_certification: true,
    with_document: true,
    with_password: true,
    with_test: true,
  };

  const config = {
    method: "POST",
    url: `${endpoints.profile}`,
    headers: { Authorization: token },
    data: data,
  };

  try {
    const response = await API2(config);
    const status = response?.status;

    if (status === 200) {
      const data = response?.data?.data;
      let step = 0;
      let level = "";

      const {
        first_name,
        phone,
        country_id,
        province_id,
        regency_id,
        address,
        gender_id,
        birth,
      } = data?.user_profile;

      if (
        first_name &&
        phone &&
        country_id &&
        province_id &&
        regency_id &&
        address &&
        gender_id &&
        birth
      ) {
        step += 1;
      }

      if (data?.work_experience?.length > 0) {
        step += 1;
      }

      if (data?.education?.length > 0) {
        step += 1;
      }

      if (data?.skill?.length > 0) {
        step += 1;
      }

      if (data?.document.filter((x) => x.document_type === "cv")?.length > 0) {
        step += 1;
      }

      if (data?.language?.length > 0) {
        step += 1;
      }

      if (data?.certification?.length > 0) {
        step += 1;
      }

      if (data?.organization_experience?.length > 0) {
        step += 1;
      }

      level = step === 8 ? "profesional" : step >= 4 ? "medium" : "pemula";
      return level;
    } else {
      return null;
    }
  } catch (error) {
    if (error?.response?.data?.message[0]) {
      throw new Error(error?.response?.data?.message[0]);
    } else {
      throw new Error(error?.response?.status);
    }
  }
};

export const nextAuthOptions = (req, res) => {
  return {
    providers: [
      CredentialsProvider({
        id: "credentials",
        async authorize(credentials, req) {
          let user = JSON.parse(credentials?.datas);
          if (user) {
            // Any object returned will be saved in `user` property of the JWT
            return user;
          } else {
            // If you return null then an error will be displayed advising the user to check their details.
            // return null;
            throw new Error("credentials");
          }
        },
      }),
      // ...add more providers here
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorizationUrl:
          "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
      encryption: true,
      maxAge: 60 * 60 * 24 * 30, //1 month
    },
    session: {
      strategy: "jwt",
      maxAge: 60 * 60 * 24 * 30, //1 month
    },
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        if (account.provider === "credentials") {
          return Boolean(user); // return true if user exists, false otherwise
        }

        const cookies = new Cookies(req, res);
        const payload = {
          device_id: decodeURI(cookies.get("deviceName")) || "web", // use default empty string if cookie is not set
          ip: (await getIPAddress()) || "", // use default empty string if IP address is not found
        };

        if (account.provider === "google") {
          payload.email = profile.email;
          payload.code = account.access_token;
        } else if (account.provider === "facebook") {
          if (user.email === undefined) {
            throw new Error("account-has-no-email");
          }
          payload.code = account.access_token;
        }

        // call API to login social
        const dataLogin = await loginUser(account.provider, payload, req, res);
        if (!dataLogin) {
          return false;
        }

        // get profile
        const resProfileLevel = await getProfile(dataLogin.token);
        if (!resProfileLevel) {
          return false;
        }

        //set data login and user level to user.data
        user.data = { ...dataLogin, level: resProfileLevel };
        return true;
      },
      async jwt({ token, account, user, trigger, session }) {
        // Persist the OAuth access_token to the token right after signin
        if (account) {
          token.accessToken = account.access_token;
        }
        if (user) {
          token.data = { user };
        }

        if (trigger === "update") {
          if (session) {
            token.data.user.level = session.newLevel;
          }
        }
        return token;
      },
      async session({ session, token, level }) {
        // Set session properties for the client
        if (token?.data?.user?.account_source !== "KARIRCOM") {
          session.user = token?.data?.user;
          // if (resProfileLevel) session.user.level = resProfileLevel;
        } else {
          session.user = {
            name: token?.data?.user?.first_name,
            data: token?.data?.user,
            image: token?.data?.user?.image || "tidak ada image",
          };
        }

        session.accessToken = token.accessToken;
        session.user.email = token.email;

        return session;
      },
    },
    pages: {
      signIn: "/login",
      error: "/login",
      signOut: "/",
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
