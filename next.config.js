const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  env: {
    REACT_APP_ENV: "development",
    GOOGLE_CLIENT_ID:
      "911301721345-nvun3jotvcjemlfkcdck2jhod5qgioa8.apps.googleusercontent.com",
    GOOGLE_CLIENT_SECRET: "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",
    LINKEDIN_CLIENT_ID: "86eknstbcg4jt5",
    LINKEDIN_CLIENT_SECRET: "YdL4JnY9OqOjmIvd",
    FACEBOOK_CLIENT_ID: "893226328667343",
    FACEBOOK_CLIENT_SECRET: "29d9c7b9da899dc8a29e70ad32965601",
    NEXTAUTH_URL: "https://testing-auth-six.vercel.app",
    // NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "lSrcavytjCoHGm5YeETGvaJYghQWXxgXAtAphIlAtiwD",
  },
});
