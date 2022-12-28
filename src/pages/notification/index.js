import React, { useState, useEffect } from "react";
import Header from "../../components/Organism/Header";
import Footer from "../../components/Organism/Footer";
import Sidebar from "../../components/Molecul/Sidebar/index";
import Layout from "../../components/Layout/Layout";
import Divider from "../../components/Atom/Divider";
import { HelpOutline, SettingsOutlined } from "@mui/icons-material";
import { Body2, Heading2,Heading4,Heading6 } from "../../components/Atom/Typography";
import { Colors } from "../../themes";
import Semua from "./menu/Semua";
import JobAlert from "./menu/JobAlert";
import StatusLamaran from "./menu/StatusLamaran";
import SubscribePerusahaan from "./menu/SubscribePerusahaan";
import ResumeSearch from "./menu/ResumeSearch";
import useMediaQuery from "../../utils/useMediaQuery";
import TabLeft from "../../components/Molecul/Tab/TabLeft";
import { Tab, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DUMMY_DATA } from "../../utils/DummyData";
import FloatingButton from "../../components/Atom/Button/FloatingButton";


function Notification() {
  const [selectedSidebar, setSelectedSidebar] = useState("Semua");
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [tab, setTab] = useState(0);
  const [totalSemua, setTotalSemua] = useState();
  const [totalJobAlert, setJobAlert] = useState();
  const [totalStatusLamaran, setStatusLamaran] = useState();
  const [totalSubscribePerusahaan, setSubscribePerusahaan] = useState();
  const [totalResumeSearch, setResumeSearch] = useState();

  
  

  const AntTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ isMobile }) => ({
      textTransform: "none",
      color: Colors.neutral.brown_grey,
      "&.Mui-selected": {
        color: Colors.primary.mid_blue,
      },
      minWidth: 0,
      minHeight: 0,
      padding: isMobile ? "10px 8px" : "14px 16px",
      ":first-child": { paddingLeft: isMobile ? 16 : 24 },
      ":last-child": { paddingRight: isMobile ? 16 : 24 },
    })
  );

  useEffect(() => {
    setTotalSemua(DUMMY_DATA.DATA_NOTIFIKASI.filter((user) => {
      return user.isRead === false
     }).length);
    const resJobAlert = DUMMY_DATA.DATA_NOTIFIKASI.filter((user) => {
      return user.variant.includes('Job Alert') && user.isRead === false
     })
     const resStatusLamaran = DUMMY_DATA.DATA_NOTIFIKASI.filter((user) => {
      return user.variant.includes('Status Lamaran') && user.isRead === false
     })
     const resSubscribePerusahaan = DUMMY_DATA.DATA_NOTIFIKASI.filter((user) => {
      return user.variant.includes('Subscribe Perusahaan') && user.isRead === false
     })
     const resResumeSearch = DUMMY_DATA.DATA_NOTIFIKASI.filter((user) => {
      return user.variant.includes('Resume Search') && user.isRead === false
     })
    setJobAlert(resJobAlert.length);
    setStatusLamaran(resStatusLamaran.length);
    setSubscribePerusahaan(resSubscribePerusahaan.length);
    setResumeSearch(resResumeSearch.length);

  }, []);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <>
      <style jsx>
        {`
          .body {
            background: url("/images/Principle/Background/Light Blue Desktop.png")
            no-repeat top;
            background-size: 100%;
            overflow-x: ${isMobile && `scroll`};
            @media screen and (max-width: 641px) {
              background: #F4FAFF;
              min-height: 600px;
            }
          }
          .sidebar {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            position: sticky;
            top: 80px;
            z-index: 12;
            margin-bottom: 16px;
          }
        `}
      </style>
      <div className="body">
        <Header/>
        {isMobile ?         
        <Header
          variant="action"
          title="Notifikasi"
          state="sticky"
        /> : null}

        {isMobile ? 
        <div>
            <Box
            style={{
              backgroundColor: `white`,
              zIndex: 100,
            }}
          >
            <TabLeft
              indicatorSpanStyles={{ maxWidth: "80%" }}
              value={tab}
              onChange={handleChange}
              fullWidth
            >
              <AntTab
                isMobile={isMobile}
                value={0}
                label={
                    <Heading6>Semua {totalSemua > 0 ? `(${totalSemua})` : null}</Heading6>
                }
              />
              <AntTab
                isMobile={isMobile}
                value={1}
                label={
                    <Heading6>Job Alert {totalJobAlert > 0 ? `(${totalJobAlert})` : null}</Heading6>
                }
              />
              <AntTab
                isMobile={isMobile}
                value={2}
                label={
                    <Heading6>Status Lamaran {totalStatusLamaran > 0 ? `(${totalStatusLamaran})` : null}</Heading6>
                  }
              />
              <AntTab
                isMobile={isMobile}
                value={3}
                label={
                    <Heading6>Subscribe Perusahaan {totalSubscribePerusahaan > 0 ? `(${totalSubscribePerusahaan})` : null}</Heading6>
                }
              />
              {/* <AntTab
                isMobile={isMobile}
                value={4}
                label={
                    <Heading6>Tentang Perusahaan (5)</Heading6>
                }
              /> */}
              <AntTab
                isMobile={isMobile}
                value={4}
                label={
                    <Heading6>Resume Search {totalResumeSearch > 0 ?`(${totalResumeSearch})` : null }</Heading6>
                }
              />
            </TabLeft>
          </Box>
          <div style={{
              marginBottom: "48px"
            }}
          >
            {tab === 0 && (<Semua/>)}
            {tab === 1 && (<JobAlert/>)}
            {tab === 2 && (<StatusLamaran/>)}
            {tab === 3 && (<SubscribePerusahaan/>)}
            {tab === 4 && (<ResumeSearch/>)}
          </div>
          </div>
          :
          <Layout>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <div className="sidebar">
                <Heading2
                  color={Colors.neutral.greyish_brown}
                  marginBottom="16px"
                >
                  Notifikasi
                </Heading2>
                {/* --------------SIDEBAR---------------- */}
                <Sidebar>
                  <Sidebar.Content
                    isSelected={selectedSidebar === `Semua`}
                    onClick={() => setSelectedSidebar(`Semua`)}
                  >
                    Semua
                  </Sidebar.Content>
                  <Sidebar.Content
                    isSelected={selectedSidebar === `Job Alert`}
                    onClick={() => setSelectedSidebar(`Job Alert`)}
                  >
                    Job Alert
                  </Sidebar.Content>
                  <Sidebar.Content
                    isSelected={selectedSidebar === `Status Lamaran`}
                    onClick={() => setSelectedSidebar(`Status Lamaran`)}
                  >
                    Status Lamaran
                  </Sidebar.Content>
                  <Sidebar.Content
                    isSelected={selectedSidebar === `Subscribe Perusahaan`}
                    onClick={() => setSelectedSidebar(`Subscribe Perusahaan`)}
                  >
                    Subscribe Perusahaan
                  </Sidebar.Content>
                  <Sidebar.Content
                    isSelected={selectedSidebar === `Resume Search`}
                    onClick={() => setSelectedSidebar(`Resume Search`)}
                  >
                    Resume Search
                  </Sidebar.Content>
                  <Divider />
                  <Sidebar.Content>
                    <div className="d-flex">
                      <SettingsOutlined
                        style={{
                          height: 18,
                          width: 18,
                          marginRight: 8,
                          color: Colors.primary.mid_blue,
                        }}
                      />
                      Pengaturan Notifikasi
                    </div>
                  </Sidebar.Content>
                </Sidebar>
              </div>
              {/* --------------END SIDEBAR---------------- */}
              <div
                style={{
                  // display: "flex",
                  marginBottom: "24px",
                  marginTop: "44px",
                  width: "100%",
                }}
              >
                {selectedSidebar === "Semua" && (
                  <Semua
                  //   onClick={() => handleModalPopupFAQ("open")}
                  />
                )}
                {selectedSidebar === "Job Alert" && <JobAlert />}
                {selectedSidebar === "Status Lamaran" && <StatusLamaran />}
                {selectedSidebar === "Subscribe Perusahaan" && (
                  <SubscribePerusahaan />
                )}
                {selectedSidebar === "Resume Search" && <ResumeSearch />}
              </div>
            </div>
          </Layout>
        }
        {/* <Footer /> */}
        {
          <FloatingButton
            size={isMobile ? `small` : `medium`}
            onClick={() =>
              window.open(
                "https://api.whatsapp.com/send/?phone=6281314917268&text&type=phone_number&app_absent=0",
                "_blank"
              )
            }
          />
        }
      </div>
    </>
  );
}

export default Notification;