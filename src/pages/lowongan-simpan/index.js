import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Header from "../../components/Organism/Header";
import TabCenter from "../../components/Molecul/Tab/TabCenter";
import { Tab } from "@mui/material";
import {
  Close,
  FilterAlt,
  ReceiptLongOutlined,
  SwapVert,
} from "@mui/icons-material";
import { Colors, Elevation, Radius } from "../../themes";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Col, Row } from "react-grid-system";
import {
  Body1,
  Body2,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
} from "../../components/Atom/Typography";
import { useRouter } from "next/router";
import { styled } from "@mui/system";
import { ModalUnstyled } from "@mui/base";
import Footer from "../../components/Organism/Footer";

import FloatingButton from "../../components/Atom/Button/FloatingButton";
//
import SavedVacancy from "./SavedVacancy";
import SavedCompany from "./SavedCompany";

//
import useMediaQuery from "../../utils/useMediaQuery";

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(30, 30, 30, 0.502131);
  -webkit-tap-highlight-color: transparent;
`;

const Container = styled(ModalUnstyled)`
  position: fixed;
  z-index: 99;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${Elevation.modal};
`;

const Content = styled(Box)({
  zIndex: 100,
  backgroundColor: `white`,
  position: `relative`,
  width: 540,
  height: `39px`,
  overflow: `auto`,
  "&:focus": {
    outline: "none",
  },
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SavedVacancyCompany() {
  const [tab, setTab] = useState(0);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const [openAllJobsCompany, setOpenAllJobsCompany] = useState(false);
  const [stateCompanyName, setStateCompanyName] = useState("");

  const [valueSearch, setValueSearch] = useState("");
  const [riwayatPencarianLowongan, setRiwayatPencarianLowongan] = useState(
    null
  );
  const [riwayatPencarianCompany, setRiwayatPencarianCompany] = useState(null);
  // const [dataLowongan, setDataLowongan] = useState(["microsoft", "facebook"]);
  const [dataLowongan, setDataLowongan] = useState(null);
  const [dataCompany, setDataCompany] = useState(null);

  const history = useRouter();

  useEffect(() => {
    const queryParameters = new URLSearchParams(window?.location?.search);
    const tabParams = queryParameters.get("tab");

    if (tabParams == "perusahaan-disubscribe") {
      setTab(1);
    } else {
      setTab(0);
    }
  }, []);

  useEffect(() => {
    // localStorage.setItem("tabActive", tab);
    var newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;

    if (tab == 0) {
      history.push(newurl + "?tab=lowongan-disimpan");
      return;
    }
    if (tab == 1) {
      history.push(newurl + "?tab=perusahaan-disubscribe");
      return;
    }
  }, [tab]);

  useEffect(() => {
    var arrRiwayatLowongan = localStorage.getItem("riwayatPencarianLowongan");
    var arrRiwayatCompany = localStorage.getItem("riwayatPencarianCompany");
    if (arrRiwayatLowongan)
      setRiwayatPencarianLowongan(JSON.parse(arrRiwayatLowongan));
    if (arrRiwayatCompany)
      setRiwayatPencarianCompany(JSON.parse(arrRiwayatCompany));
  }, []);

  // 👇️ take parameter passed from Child component
  const handleOpenCompanyName = (companyName) => {
    setOpenAllJobsCompany(true);

    // 👇️ Capitalize company name
    if (companyName !== "") {
      const mySentence = companyName;
      const words = mySentence.split(" ");

      for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
      setStateCompanyName(words);
    }
    //========================
  };

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
    setValueSearch("");
  };

  const handleClickArrowBack = (val) => {
    setOpenAllJobsCompany(false);
  };

  const handleSearch = (e) => {
    setValueSearch(e);
  };

  const handleDataLowongan = (val) => {
    if (val) {
      let titleLowongan = val.map(function (element) {
        return `${element.title}`;
      });
      let companyLowongan = val.map(function (element) {
        return `${element.company}`;
      });

      const uniqueLowongan = [
        ...new Map(titleLowongan.map((item) => [item, item])).values(),
      ];
      const uniqueCompany = [
        ...new Map(companyLowongan.map((item) => [item, item])).values(),
      ];

      // const unique = uniqueLowongan.concat(uniqueCompany);
      const unique = { lowongan: uniqueLowongan, company: uniqueCompany };

      setDataLowongan(unique);
    }
  };

  const handleDataCompany = (val) => {
    if (val) {
      let companyName = val.map(function (element) {
        return `${element.company}`;
      });

      const uniqueCompany = [
        ...new Map(companyName.map((item) => [item, item])).values(),
      ];
      // const unique = uniqueLowongan.concat(uniqueCompany);
      const unique = { company: uniqueCompany };

      setDataCompany(unique);
    }
  };

  const handleSubmitSearch = (tabType, val) => {
    submitOrDeleteRiwayat("submit search", val, tabType);
  };

  const handleDeleteRiwayat = (tabType, val) => {
    submitOrDeleteRiwayat("delete", val, tabType);
  };

  const submitOrDeleteRiwayat = (method, val, tabType) => {
    var riwayatOnLocal = localStorage.getItem(
      tabType == "lowongan"
        ? "riwayatPencarianLowongan"
        : "riwayatPencarianCompany"
    );
    var arrRiwayatOnLocal = JSON.parse(riwayatOnLocal);

    if (val == "all") {
      if (tabType == "lowongan") {
        localStorage.removeItem("riwayatPencarianLowongan");
        setRiwayatPencarianLowongan(null);
        return;
      } else {
        localStorage.removeItem("riwayatPencarianCompany");
        setRiwayatPencarianCompany(null);
        return;
      }
    }

    if (method !== "delete" && !arrRiwayatOnLocal) {
      if (tabType == "lowongan") {
        localStorage.setItem("riwayatPencarianLowongan", JSON.stringify([val]));
        setRiwayatPencarianLowongan([val]);
        return;
      } else {
        localStorage.setItem("riwayatPencarianCompany", JSON.stringify([val]));
        setRiwayatPencarianCompany([val]);
        return;
      }
    }
    // filter/delete value if existing, and shift to first index
    var filteredArr = arrRiwayatOnLocal.filter((v) => {
      return v !== val;
    });

    const newArr = [val, ...filteredArr];

    //set to local storage
    if (tabType == "lowongan") {
      localStorage.setItem(
        "riwayatPencarianLowongan",
        JSON.stringify(method == "delete" ? filteredArr : newArr)
      );
      setRiwayatPencarianLowongan(method == "delete" ? filteredArr : newArr);
    } else {
      localStorage.setItem(
        "riwayatPencarianCompany",
        JSON.stringify(method == "delete" ? filteredArr : newArr)
      );
      setRiwayatPencarianCompany(method == "delete" ? filteredArr : newArr);
    }
  };

  return (
    <>
      {tab === 0 &&
        (valueSearch ? (
          <Header
            variant="action"
            title="Lowongan Disimpan"
            type="Search Lowongan"
            state="navigation"
            search="true"
            placeholder="Cari Pekerjaan"
            handleChange={handleSearch}
            onClickArrowBack={handleClickArrowBack}
            riwayatPencarian={riwayatPencarianLowongan}
            handleSubmitSearch={(val) => handleSubmitSearch("lowongan", val)}
            onDeleteRiwayat={(val) => handleDeleteRiwayat("lowongan", val)}
            searchResult={dataLowongan}
            page="lowongan-simpan"
          />
        ) : (
          <Header
            variant="notification"
            type="Lowongan Disimpan"
            state="navigation"
            placeholder="Cari Pekerjaan"
            handleChange={handleSearch}
            riwayatPencarian={riwayatPencarianLowongan}
            handleSubmitSearch={(val) => handleSubmitSearch("lowongan", val)}
            onDeleteRiwayat={(val) => handleDeleteRiwayat("lowongan", val)}
          />
        ))}

      {tab === 1 &&
        (openAllJobsCompany ? (
          <Header
            variant="action"
            title={stateCompanyName}
            type="Search Lowongan"
            state="navigation"
            onClickArrowBack={handleClickArrowBack}
          />
        ) : (
          <Header
            variant="action"
            title="Perusahaan Disubscribe"
            type="Search Lowongan"
            state="navigation"
            search="true"
            placeholder="Cari Perusahaan"
            onClickArrowBack={handleClickArrowBack}
            handleChange={handleSearch}
            riwayatPencarian={riwayatPencarianCompany}
            handleSubmitSearch={(val) => handleSubmitSearch("company", val)}
            onDeleteRiwayat={(val) => handleDeleteRiwayat("company", val)}
            searchResult={dataCompany}
            page="lowongan-simpan"
          />
        ))}

      <Layout>
        {/* <div style={{ paddingLeft: 24, paddingRight: 24 }}> */}
        {isMobile ? null : (
          <Heading2
            style={{
              color: Colors.neutral.greyish_brown,
              marginBottom: 32,
              padding: "0 16px",
            }}
          >
            {tab === 0 ? "Lowongan Disimpan" : "Perusahaan Disubscribe"}
          </Heading2>
        )}
        {!openAllJobsCompany && (
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiTabs-root": {
                minHeight: 39,
                height: 39,
              },
              "& .MuiTabs-scroller": {
                height: "100%",
              },
              "& .MuiTabs-flexContainer": {
                height: "100% !important",
              },
            }}
          >
            <TabCenter handleChange={handleChangeTab} value={tab}>
              <Tab
                {...a11yProps(0)}
                value={0}
                label="Lowongan Disimpan"
                style={{
                  display: "flex",
                  flex: 1,
                  maxWidth: "100%",
                  color:
                    tab == 0
                      ? Colors.primary.mid_blue
                      : Colors.neutral.brown_grey,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: isMobile ? "12px" : "14px",
                }}
              />
              <Tab
                {...a11yProps(1)}
                value={1}
                label="Perusahaan Disubscribe"
                style={{
                  display: "flex",
                  flex: 1,
                  maxWidth: "100%",
                  color:
                    tab == 1
                      ? Colors.primary.mid_blue
                      : Colors.neutral.brown_grey,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: isMobile ? "12px" : "14px",
                }}
              />
            </TabCenter>
          </Box>
        )}

        {/* ========================== */}
        <TabPanel value={tab} index={0}>
          <SavedVacancy
            valueSearch={valueSearch}
            handleData={handleDataLowongan}
          />
        </TabPanel>

        <TabPanel value={tab} index={1}>
          <SavedCompany
            handleOpenCompanyName={handleOpenCompanyName}
            openAllJobsCompany={openAllJobsCompany}
            valueSearch={valueSearch}
            handleData={handleDataCompany}
          />
        </TabPanel>
        {/* ========================== */}
        {/* </div> */}
      </Layout>
      {!isMobile && <Footer />}
      {isMobile && !openAllJobsCompany && (
        <FloatingButton
          size="small"
          onClick={() =>
            window.open(
              "https://api.whatsapp.com/send/?phone=6281314917268&text&type=phone_number&app_absent=0",
              "_blank"
            )
          }
        />
      )}
    </>
  );
}
