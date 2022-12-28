import { Grid, Container } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import SubheaderCompany from "../Organism/Subheader/SubheaderCompany";
import Subheader from "../Organism/Subheader";
import Background from "./Background";
import DesktopGrid from "./Grid/Desktop";
import styles from "./Layout.module.css";
import { isMobile } from "../../utils/useMediaQuery";

const Layout = ({ children, company, lowongan, home }) => {
  let defaultTitle = process.env.APP_NAME || "Karir.com";
  const Mobile = isMobile();

  return (
    <>
      {home && !Mobile && (
        <Subheader
          title={` Pekerjaan Apa yang Kamu Cari? `}
          lowongan={lowongan}
        />
      )}
      <DesktopGrid
        style={{
          paddingTop:
            Mobile && !lowongan
              ? 56
              : home
              ? 64
              : (company || lowongan) && Mobile
              ? 132
              : company || lowongan
              ? 180
              : 80,
        }}
      >
        {children}
      </DesktopGrid>
    </>
    // <div>
    //   <Head>
    //     <title>
    //       {title !== "" ? `${title} | ${defaultTitle}` : `${defaultTitle}`}
    //     </title>
    //     <meta name="description" content={description} />
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>

    //   <Background color={background} size={backgroundSize}>
    //     <header className={styles.header}></header>

    //     <main className={styles.main}>
    //       <Container fixed>
    //         <Grid container spacing={1}>
    //           <Grid item xs={3} sm={3}>
    //             <Link href="/ui-kit">
    //               <a>
    //                 <img alt=""
    //                   src="/images/Principle/Logo/Karir/Normal/svgx.svg"
    //                   height="100px"
    //                   width="200px"
    //                   alt="Karir.com"
    //                 />
    //               </a>
    //             </Link>

    //             <h1>{pageTitle(showBackBtn, title)}</h1>

    //             <hr />
    //           </Grid>
    //           <Grid item xs={9} sm={9}></Grid>
    //         </Grid>
    //         {children}
    //       </Container>
    //     </main>
    //   </Background>

    //   <footer className={styles.footer}>
    //     <a href="#" target="_blank" rel="noopener noreferrer">
    //       Powered by{" "}
    //       <span className={styles.logo}>
    //         <img alt=""
    //           src="/images/Principle/Logo/Karir/Normal/svgx.svg"
    //           alt="Vercel Logo"
    //           width={72}
    //           height={16}
    //         />
    //       </span>
    //     </a>
    //   </footer>
    // </div>
  );
};

export default Layout;
