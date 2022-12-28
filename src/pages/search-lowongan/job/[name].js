import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import Subheader from "../../../components/Organism/Subheader";
import JobHeader from "../../../components/Organism/Header/JobHeader";
import {
  isLargeScreen,
  isMediumScreen,
  isMobile,
} from "../../../utils/useMediaQuery";
import Header from "../../../components/Organism/Header";

export default function SearchLowonganJob() {
  const [scrollTop, setScrollTop] = useState(0);
  const LargeScreen = isLargeScreen();
  const MediumScreen = isMediumScreen();
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
        <div className={(LargeScreen || MediumScreen) && "body"}>
          {Mobile && <Header type="Search Lowongan" state="sticky" />}
          {!Mobile && <Subheader sticky lowongan />}
          <div className="detail">
            <Layout>
              <JobHeader
                size="small"
                title="Engineer Mobile Developer with React Native"
                company="PT. Qerja"
                location="Jakarta Selatan"
                salary="Rp 10.8 juta - Rp 16.6 juta/bulan"
                profileMatch={80}
              />
            </Layout>
          </div>
        </div>
      </>
    )
  );
}
