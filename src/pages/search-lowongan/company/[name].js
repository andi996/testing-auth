import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import Subheader from "../../../components/Organism/Subheader";
import HeaderCompany from "../../../components/Organism/Header/HeaderCompany";
import {
  isLargeScreen,
  isMediumScreen,
  isMobile,
} from "../../../utils/useMediaQuery";
import Header from "../../../components/Organism/Header";

export default function SearchLowonganCompany() {
  const [scrollTop, setScrollTop] = useState(0);
  const MediumScreen = isMediumScreen();
  const LargeScreen = isLargeScreen();
  const Mobile = isMobile();

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrollTop]);

  return (
    typeof window !== "undefined" && (
      <>
        <style jsx>{`
          .body {
            background: url("/images/Principle/Background/Light Blue Desktop.png")
              no-repeat top;
            background-size: 100%;
          }
          .detail {
            margin-top: -8px;
          }
        `}</style>
        <div className={(MediumScreen || LargeScreen) && "body"}>
          {Mobile && <Header type="Search Lowongan" state="sticky" />}
          {!Mobile && <Subheader sticky lowongan />}
          <div className="detail">
            <Layout>
              <HeaderCompany
                title="PT. Qerja Manfaat Bangsa"
                location="Jakarta Selatan"
                website="www.karir.com"
                image="/images/Principle/Background/Cover.png"
                btnText="Subscribe"
              />
            </Layout>
          </div>
        </div>
      </>
    )
  );
}
