import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Translator } from "react-auto-translate";

import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      return jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const THEME = createTheme({
    typography: {
      fontFamily: "MuseoSans",
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
    },
  });

  return (
    //original before trying make google login
    // <ThemeProvider theme={THEME}>
    //   <Provider store={store}>
    //     <Component {...pageProps} />
    //   </Provider>
    // </ThemeProvider>
    <ThemeProvider theme={THEME}>
      <Provider store={store}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
