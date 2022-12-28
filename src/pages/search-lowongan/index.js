import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import TabCenter from "../../components/Molecul/Tab/TabCenter";
import { Checkbox, Tab } from "@mui/material";
import {
  Close,
  FilterAlt,
  ReceiptLongOutlined,
  SwapVert,
} from "@mui/icons-material";
import { Colors, Elevation, Radius } from "../../themes";
import PropTypes from "prop-types";
import { Col, Hidden, Row } from "react-grid-system";
import {
  Body1,
  Body2,
  Body3,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "../../components/Atom/Typography";
import JobCard from "../../components/Organism/Card/JobCard";
import JobHeader from "../../components/Organism/Header/JobHeader";
import ActionChipDropdown from "../../components/Organism/Menu/Exposed Dropdown Menu/ActionChipDropdown";
import CompanyCard from "../../components/Organism/Card/CompanyCard";
import HeaderCompany from "../../components/Organism/Header/HeaderCompany";
import { useRouter } from "next/dist/client/router";
import ActionChip from "../../components/Atom/Selection Control/Chips/ActionChip";
import Divider from "../../components/Atom/Divider";
import CheckboxButton from "../../components/Atom/Selection Control/Checkbox";
import InputSearchField from "../../components/Atom/Input Field/SearchField";
import RectangleButton from "../../components/Atom/Button/RectangleButton";
import Pagination from "../../components/Atom/Pagination";
import Subheader from "../../components/Organism/Subheader";
import {
  isLargeScreen,
  isMediumScreen,
  isMobile,
  isSmallScreen,
  isTablet,
} from "../../utils/useMediaQuery";
import Header from "../../components/Organism/Header";
import BottomSheet from "../../components/Organism/Bottom Sheet";
import clsx from "clsx";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import FloatingButton from "../../components/Atom/Button/FloatingButton";

const BackdropUnstyled = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  );
});

BackdropUnstyled.displayName = "BackdropUnstyled";

BackdropUnstyled.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const Backdrop = styled(BackdropUnstyled)`
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
  height: `100%`,
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

export default function SearchLowongan() {
  const Mobile = isMobile();
  const Tablet = isTablet();
  const SmallScreen = isSmallScreen();
  const MediumScreen = isMediumScreen();
  const LargeScreen = isLargeScreen();
  const router = useRouter();
  const [tab, setTab] = useState(0);
  const [Dashboard, setDashboard] = useState(false);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  const [isEmpty, setIsEmpty] = useState(false);
  const [showJobs, setShowJobs] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [InputValue, setInputValue] = useState(``);
  const [SelectJobs, setSelectJobs] = useState([]);
  const [ChekedJobs, setChekedJobs] = useState([true]);

  const optionListUrutkan = [
    "Terbaru",
    "Prioritas",
    "Paling Relevan",
    "Gaji Tertinggi",
  ];
  const optionListJenjangKarir = [
    "Internship",
    "Entry level",
    "Assciate",
    "Mid-Senior",
    "Manager",
    "Senior Manager",
    "Director",
    "Executive",
  ];
  const optionJobFunction = [
    "Kreatif",
    "Marketing",
    "Product",
    "Sales",
    "Tech",
  ];

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
          .tab-left {
            background: #ffffff;
            box-shadow: ${Elevation.card};
            border-radius: ${Radius.medium};
            max-width: 610px;
            width: 100%;
            height: 72px;
            padding: 16px;
          }
          .v-flex {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
            min-width: 145px;
          }
          .advance-filter {
            position: sticky;
            z-index: 12;
            width: 100;
            right: 0;
            background: white;
          }
          .top {
            top: 0;
          }
          .bottom {
            bottom: 0;
          }
          .filter-tab {
            display: flex;
            padding: ${Mobile ? "4px 12px" : "12px 16px"};
            gap: 12px;
            background: white;
            position: fixed;
            overflow-x: auto;
            width: 100%;
            max-width: 1204px;
            top: ${Mobile ? "84px" : "118px"};
            z-index: 12;
            box-shadow: ${Elevation.navigationMenu};
            ::-webkit-scrollbar {
              display: none;
            }
          }
        `}</style>
        <div className={(MediumScreen || LargeScreen || Mobile) && "body"}>
          {Mobile && <Header type="Search Lowongan" />}
          {!Mobile && <Subheader sticky lowongan />}
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              top: Mobile ? `48px` : `65px`,
              background: `white`,
              position: `fixed`,
              width: "100%",
              zIndex: 12,
            }}
          >
            <TabCenter
              handleChange={handleChange}
              value={tab}
              costumStyle={{ height: Mobile ? "36px" : "52px" }}
            >
              <Tab
                icon={
                  !Mobile && (
                    <ReceiptLongOutlined
                      style={{
                        color:
                          tab == 0
                            ? Colors.primary.mid_blue
                            : Colors.neutral.brown_grey,
                        height: 24,
                        width: 24,
                      }}
                    />
                  )
                }
                {...a11yProps(0)}
                iconPosition="start"
                value={0}
                label={Mobile ? <Heading6>Lowongan</Heading6> : "Lowongan"}
                style={{
                  display: "flex",
                  flex: 1,
                  maxWidth: "100%",
                  color:
                    tab == 0
                      ? Colors.primary.mid_blue
                      : Colors.neutral.brown_grey,
                  textTransform: "none",
                  minHeight: Mobile ? 36 : 52,
                  alignItems: Mobile ? "flex-start" : "center",
                }}
              />
              <Tab
                {...a11yProps(1)}
                icon={
                  !Mobile && (
                    <img
                      alt=""
                      src={
                        tab == 1
                          ? "/images/Principle/Logo/Perusahaan-active.png"
                          : "/images/Principle/Logo/Perusahaan-inactive.png"
                      }
                      style={{
                        height: 24,
                        width: 24,
                      }}
                    />
                  )
                }
                iconPosition="start"
                value={1}
                label={Mobile ? <Heading6>Perusahaan</Heading6> : "Perusahaan"}
                style={{
                  display: "flex",
                  flex: 1,
                  maxWidth: "100%",
                  color:
                    tab == 1
                      ? Colors.primary.mid_blue
                      : Colors.neutral.brown_grey,
                  textTransform: "none",
                  minHeight: Mobile ? 36 : 52,
                  alignItems: Mobile ? "flex-start" : "center",
                }}
              />
            </TabCenter>
          </Box>

          <TabPanel value={tab} index={0}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="filter-tab">
                <ActionChip
                  icon={<FilterAlt />}
                  chevron="true"
                  onClick={() => setDashboard(true)}
                >
                  Semua Filter
                </ActionChip>
                <ActionChipDropdown
                  chevron="true"
                  search
                  optionList={optionJobFunction}
                >
                  Fungsi Pekerjaan
                </ActionChipDropdown>
                <ActionChipDropdown
                  chevron="true"
                  optionList={optionListJenjangKarir}
                >
                  Jenjang Karir
                </ActionChipDropdown>
                <ActionChipDropdown range chevron="true">
                  Range Gaji
                </ActionChipDropdown>
                {Mobile && (
                  <ActionChipDropdown
                    icon={
                      <img
                        alt=""
                        src={"/images/Principle/Logo/Sorting.png"}
                        style={{
                          height: 16,
                          width: 16,
                          marginRight: 4,
                        }}
                      />
                    }
                    chevron="true"
                    optionList={optionListUrutkan}
                  >
                    Urutkan
                  </ActionChipDropdown>
                )}
              </div>
            </div>
            <Layout lowongan>
              {isEmpty ? (
                <Row style={{ flexDirection: `column` }}>
                  <img
                    alt=""
                    src=""
                    width={120}
                    height={120}
                    style={{
                      margin: `auto`,
                      display: `block`,
                      padding: 8,
                      marginBottom: 8,
                    }}
                  />
                  <Heading4
                    color={Colors.neutral.greyish_brown}
                    margin={`4px`}
                    align={`center`}
                  >
                    Lowongan & Perusahaan tidak ditemukan
                  </Heading4>
                  <Body2
                    color={Colors.neutral.brown_grey}
                    margin={`4px`}
                    align={`center`}
                  >
                    Cari Lowongan Lainya di Karir.com atau coba rekomendasi
                    lowongan dibawah
                  </Body2>
                  <div
                    className="d-flex"
                    style={{ justifyContent: `center`, marginBottom: 16 }}
                  >
                    <ActionChip size="small">Front End</ActionChip>
                    <ActionChip size="small">Back End</ActionChip>
                    <ActionChip size="small">Design</ActionChip>
                    <ActionChip size="small">UI/UX</ActionChip>
                    <ActionChip size="small">Sales</ActionChip>
                  </div>
                  <Divider variant={`text`} label={`atau`} width={500} />
                  <RectangleButton
                    costumStyle={{ margin: `16px auto`, display: `block` }}
                  >
                    {" "}
                    Kembali ke halaman utama
                  </RectangleButton>
                </Row>
              ) : (
                <Row
                  style={{
                    marginRight: 0,
                    marginLeft: MediumScreen || LargeScreen ? -12 : 0,
                  }}
                >
                  <Col
                    style={{
                      paddingLeft: 8,
                      paddingRight: MediumScreen || LargeScreen ? 2 : 8,
                      overflowY: "auto",
                      overflowX: `hidden`,
                      maxHeight:
                        (MediumScreen || LargeScreen) &&
                        window.innerHeight - 189,
                      display: `flex`,
                      flexDirection: `column`,
                      alignItems: `center`,
                      gap: 8,
                      paddingBottom: 24,
                    }}
                  >
                    {Mobile ? (
                      <div className="d-flex-fullwidth" style={{ gap: 32 }}>
                        <Heading5 color={Colors.neutral.greyish_brown}>
                          Rekomendasi Lowongan Anda
                        </Heading5>
                        <Body3 color={Colors.neutral.brown_light_grey}>
                          1.000+ lowongan tampil
                        </Body3>
                      </div>
                    ) : (
                      <div className="tab-left">
                        <div className="d-flex-fullwidth">
                          <div className="v-flex">
                            <Heading5
                              color={Colors.neutral.greyish_brown}
                              style={{
                                height: 20,
                                overflow: `hidden`,
                                textOverflow: `ellipsis`,
                                whiteSpace: `nowrap`,
                                width: `100%`,
                              }}
                            >
                              Lowongan di Mirosoft Office
                            </Heading5>
                            <Body2 color={Colors.secondary.clear_blue}>
                              14 lowongan tampil
                            </Body2>
                          </div>
                          <ActionChipDropdown
                            icon={
                              <img
                                alt=""
                                src={"/images/Principle/Logo/Sorting.png"}
                                style={{
                                  height: 16,
                                  width: 16,
                                  marginRight: 4,
                                }}
                              />
                            }
                            chevron="true"
                            optionList={optionListUrutkan}
                          >
                            Urutkan
                          </ActionChipDropdown>
                        </div>
                      </div>
                    )}
                    <JobCard
                      title="UI/UX Designer"
                      company="PT. Qerja Manfaat Bangsa"
                      salary="Rp 9,5 juta - 15,6 juta/bulan"
                      description="Jakarta Selatan • Fulltime • Remote "
                      profileMatch={59}
                      timestamp="5 jam lalu"
                      variant="horizontal"
                      fullWidth
                      onClick={() =>
                        (Mobile || Tablet || LargeScreen) &&
                        router.push("search-lowongan/job/a")
                      }
                      margin="0"
                    />
                    <JobCard
                      title="UI/UX Designer"
                      company="PT. Qerja Manfaat Bangsa"
                      salary="Rp 9,5 juta - 15,6 juta/bulan"
                      description="Jakarta Selatan • Fulltime • Remote "
                      profileMatch={59}
                      timestamp="5 jam lalu"
                      variant="horizontal"
                      fullWidth
                      margin="0"
                    />
                    <JobCard
                      title="UI/UX Designer"
                      company="PT. Qerja Manfaat Bangsa"
                      salary="Rp 9,5 juta - 15,6 juta/bulan"
                      description="Jakarta Selatan • Fulltime • Remote "
                      profileMatch={59}
                      timestamp="5 jam lalu"
                      variant="horizontal"
                      fullWidth
                      margin="0"
                    />
                    <JobCard
                      title="UI/UX Designer"
                      company="PT. Qerja Manfaat Bangsa"
                      salary="Rp 9,5 juta - 15,6 juta/bulan"
                      description="Jakarta Selatan • Fulltime • Remote "
                      profileMatch={59}
                      timestamp="5 jam lalu"
                      variant="horizontal"
                      fullWidth
                      margin="0"
                    />
                    <JobCard
                      title="UI/UX Designer"
                      company="PT. Qerja Manfaat Bangsa"
                      salary="Rp 9,5 juta - 15,6 juta/bulan"
                      description="Jakarta Selatan • Fulltime • Remote "
                      profileMatch={59}
                      timestamp="5 jam lalu"
                      variant="horizontal"
                      fullWidth
                      margin="0"
                    />
                    <JobCard
                      title="UI/UX Designer"
                      company="PT. Qerja Manfaat Bangsa"
                      salary="Rp 9,5 juta - 15,6 juta/bulan"
                      description="Jakarta Selatan • Fulltime • Remote "
                      profileMatch={59}
                      timestamp="5 jam lalu"
                      variant="horizontal"
                      fullWidth
                      margin="0"
                    />
                    <JobCard
                      title="UI/UX Designer"
                      company="PT. Qerja Manfaat Bangsa"
                      salary="Rp 9,5 juta - 15,6 juta/bulan"
                      description="Jakarta Selatan • Fulltime • Remote "
                      profileMatch={59}
                      timestamp="5 jam lalu"
                      variant="horizontal"
                      fullWidth
                      margin="0"
                    />
                    <Pagination shadow />
                  </Col>
                  {!Mobile && !Tablet && !SmallScreen && (
                    <Col
                      id="job-header-wrapper"
                      lg={8}
                      style={{
                        borderLeft: `1px solid ${Colors.neutral.light_grey}`,
                        background: `white`,
                        boxShadow: Elevation.card,
                        overflowY: "auto",
                        overflowX: `hidden`,
                        maxHeight: window.innerHeight - 189,
                      }}
                    >
                      <JobHeader
                        size="small"
                        title="Engineer Mobile Developer with React Native"
                        company="PT. Qerja"
                        location="Jakarta Selatan"
                        salary="Rp 10.8 juta - Rp 16.6 juta/bulan"
                        profileMatch={80}
                      />
                    </Col>
                  )}
                </Row>
              )}
            </Layout>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="filter-tab">
                <ActionChipDropdown
                  chevron="true"
                  search
                  optionList={optionJobFunction}
                >
                  Industri
                </ActionChipDropdown>
                <ActionChipDropdown
                  chevron="true"
                  optionList={[
                    "<50 Karyawan",
                    "50-100 Karyawan",
                    "100-500 Karyawan",
                    "500-1000 Karyawan",
                  ]}
                >
                  Jumlah karyawan
                </ActionChipDropdown>
                {Mobile && (
                  <ActionChipDropdown
                    icon={
                      <img
                        alt=""
                        src={"/images/Principle/Logo/Sorting.png"}
                        style={{
                          height: 16,
                          width: 16,
                          marginRight: 4,
                        }}
                      />
                    }
                    chevron="true"
                    optionList={optionListUrutkan}
                  >
                    Urutkan
                  </ActionChipDropdown>
                )}
              </div>
            </div>
            <Layout lowongan>
              <Row
                style={{
                  marginRight: 0,
                  marginLeft: MediumScreen || LargeScreen ? -12 : 0,
                }}
              >
                <Col
                  style={{
                    overflowY: "auto",
                    overflowX: `hidden`,
                    maxHeight:
                      (MediumScreen || LargeScreen) && window.innerHeight - 189,
                    display: `flex`,
                    flexDirection: `column`,
                    alignItems: `center`,
                    gap: 8,
                    paddingLeft: 8,
                    paddingRight: MediumScreen || LargeScreen ? 2 : 8,
                    paddingBottom: 24,
                  }}
                >
                  {!Mobile && (
                    <div className="tab-left">
                      <div className="d-flex-fullwidth">
                        <div className="v-flex">
                          <Heading5
                            color={Colors.neutral.greyish_brown}
                            style={{
                              height: 20,
                              overflow: `hidden`,
                              textOverflow: `ellipsis`,
                              whiteSpace: `nowrap`,
                              width: `100%`,
                            }}
                          >
                            Lowongan di Mirosoft Office
                          </Heading5>
                          <Body2 color={Colors.secondary.clear_blue}>
                            14 lowongan tampil
                          </Body2>
                        </div>
                        <ActionChipDropdown
                          icon={<SwapVert />}
                          chevron="true"
                          optionList={optionListUrutkan}
                        >
                          Urutkan
                        </ActionChipDropdown>
                      </div>
                    </div>
                  )}
                  <CompanyCard
                    fullWidth
                    title="PT. Qerja Manfaat Bang.."
                    category="Internet & Technology "
                    location="Jakarta Selatan"
                    description="Established in April 2014, Qerja is the first online community portal in Indonesia which provides.."
                    count={12}
                    subscriber={30}
                    onClick={() =>
                      (Mobile || Tablet || SmallScreen) &&
                      router.push("search-lowongan/company/a")
                    }
                  />
                  <CompanyCard
                    fullWidth
                    title="PT. Qerja Manfaat Bang.."
                    category="Internet & Technology "
                    location="Jakarta Selatan"
                    description="Established in April 2014, Qerja is the first online community portal in Indonesia which provides.."
                    count={12}
                    subscriber={30}
                    onClick={() =>
                      (Mobile || Tablet || SmallScreen) &&
                      router.push("search-lowongan/company/a")
                    }
                  />{" "}
                  <CompanyCard
                    fullWidth
                    title="PT. Qerja Manfaat Bang.."
                    category="Internet & Technology "
                    location="Jakarta Selatan"
                    description="Established in April 2014, Qerja is the first online community portal in Indonesia which provides.."
                    count={12}
                    subscriber={30}
                    onClick={() =>
                      (Mobile || Tablet || SmallScreen) &&
                      router.push("search-lowongan/company/a")
                    }
                  />{" "}
                  <CompanyCard
                    fullWidth
                    title="PT. Qerja Manfaat Bang.."
                    category="Internet & Technology "
                    location="Jakarta Selatan"
                    description="Established in April 2014, Qerja is the first online community portal in Indonesia which provides.."
                    count={12}
                    subscriber={30}
                    onClick={() =>
                      (Mobile || Tablet || SmallScreen) &&
                      router.push("search-lowongan/company/a")
                    }
                  />{" "}
                  <CompanyCard
                    fullWidth
                    title="PT. Qerja Manfaat Bang.."
                    category="Internet & Technology "
                    location="Jakarta Selatan"
                    description="Established in April 2014, Qerja is the first online community portal in Indonesia which provides.."
                    count={12}
                    subscriber={30}
                    onClick={() =>
                      (Mobile || Tablet || SmallScreen) &&
                      router.push("search-lowongan/company/a")
                    }
                  />{" "}
                  <CompanyCard
                    fullWidth
                    title="PT. Qerja Manfaat Bang.."
                    category="Internet & Technology "
                    location="Jakarta Selatan"
                    description="Established in April 2014, Qerja is the first online community portal in Indonesia which provides.."
                    count={12}
                    subscriber={30}
                    onClick={() =>
                      (Mobile || Tablet || SmallScreen) &&
                      router.push("search-lowongan/company/a")
                    }
                  />{" "}
                  <CompanyCard
                    fullWidth
                    title="PT. Qerja Manfaat Bang.."
                    category="Internet & Technology "
                    location="Jakarta Selatan"
                    description="Established in April 2014, Qerja is the first online community portal in Indonesia which provides.."
                    count={12}
                    subscriber={30}
                    onClick={() =>
                      (Mobile || Tablet || SmallScreen) &&
                      router.push("search-lowongan/company/a")
                    }
                  />
                </Col>
                {!Mobile && !Tablet && !SmallScreen && (
                  <Col
                    id="company-header-wrapper"
                    md={12}
                    lg={8}
                    style={{
                      background: `white`,
                      overflowY: "auto",
                      overflowX: `hidden`,
                      boxShadow: Elevation.card,
                      borderLeft: `1px solid ${Colors.neutral.light_grey}`,
                      maxHeight:
                        (MediumScreen || LargeScreen) &&
                        window.innerHeight - 189,
                    }}
                  >
                    <HeaderCompany
                      title="PT. Qerja Manfaat Bangsa"
                      location="Jakarta Selatan"
                      website="www.karir.com"
                      image="/images/Principle/Background/Cover.png"
                      btnText="Subscribe"
                    />
                  </Col>
                )}
              </Row>
            </Layout>
          </TabPanel>
        </div>
        {!Mobile ? (
          <Container
            open={Dashboard}
            onClose={() => setDashboard(false)}
            // BackdropComponent={Backdrop}
            slots={{ backdrop: Backdrop }}
          >
            <Content>
              <div className="advance-filter top">
                <div className="d-flex-fullwidth" style={{ padding: 16 }}>
                  <Heading2 colors={Colors.neutral.greyish_brown}>
                    Semua Filter
                  </Heading2>
                  <div onClick={() => setDashboard(false)}>
                    <Close
                      style={{
                        width: 32,
                        height: 32,
                        color: Colors.neutral.brown_grey,
                        cursor: `pointer`,
                      }}
                    />
                  </div>
                </div>
                <Divider width={492} />
              </div>
              <div style={{ padding: 16 }}>
                <Heading3 colors={Colors.neutral.greyish_brown}>
                  Tingkat Pendidikan
                </Heading3>
                <CheckboxButton
                  options={[
                    { label: "title 1", value: "title 1" },
                    { label: "title 2", value: "title 2" },
                    { label: "title 3", value: "title 3" },
                    { label: "title 4", value: "title 4" },
                    { label: "title 5", value: "title 5" },
                  ]}
                  variant="left"
                  col
                />
              </div>
              <div style={{ padding: 16 }}>
                <Heading3
                  colors={Colors.neutral.greyish_brown}
                  marginBottom={`16px`}
                >
                  Industri
                </Heading3>
                <InputSearchField
                  variant={`search industry`}
                  label={`Cari Industri`}
                  options={optionJobFunction}
                  inputValue={InputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onChangeOptions={(e, option) => {
                    if (e.target.checked) {
                      let newValue = [...SelectJobs];
                      let newValue2 = [...ChekedJobs];
                      newValue.push({ label: option, value: option });
                      newValue2.push(true);
                      setSelectJobs(newValue);
                      setChekedJobs(newValue2);
                    } else {
                      let newValue = [...SelectJobs];
                      let newValue2 = [...ChekedJobs];
                      SelectJobs.map((el, idx) => {
                        console.log(el.value);
                        console.log(option);
                        if (el.value === option) {
                          newValue.splice(idx, 1);
                          newValue2.splice(idx, 1);
                        }
                      });
                      setSelectJobs(newValue);
                      setChekedJobs(newValue2);
                    }
                  }}
                />
                <CheckboxButton
                  options={SelectJobs}
                  variant="left"
                  col
                  defaultValue={ChekedJobs}
                />
              </div>
              <div style={{ padding: 16 }}>
                <Heading3 colors={Colors.neutral.greyish_brown}>
                  Company Anda Subscribe
                </Heading3>
                <CheckboxButton
                  options={[
                    { label: "title 1", value: "title 1" },
                    { label: "title 2", value: "title 2" },
                    { label: "title 3", value: "title 3" },
                    { label: "title 4", value: "title 4" },
                    { label: "title 5", value: "title 5" },
                  ]}
                  variant="left"
                  col
                />
              </div>
              <div style={{ padding: 16 }}>
                <Heading3 colors={Colors.neutral.greyish_brown}>
                  Remote/On Site
                </Heading3>
                <CheckboxButton
                  options={[
                    { label: "On-Site", value: "On-Site" },
                    { label: "Remote", value: "Remote" },
                  ]}
                  variant="left"
                />
              </div>
              <div className="advance-filter bottom">
                <Divider width={492} />
                <div className="d-flex-fullwidth" style={{ padding: 16 }}>
                  <RectangleButton variant="ghost" state="error" fullWidth>
                    Reset
                  </RectangleButton>
                  <RectangleButton fullWidth>Terapkan</RectangleButton>
                </div>
              </div>
            </Content>
          </Container>
        ) : (
          <BottomSheet
            onClose={() => setDashboard(false)}
            visible={Dashboard}
            title="Semua Filter"
            variant="modal"
            cancelBtnTitle="Reset"
            submitBtnTitle="Terapkan"
          >
            <div style={{ paddingBottom: 32, paddingTop: 16 }}>
              <Heading4 colors={Colors.neutral.greyish_brown}>
                Tingkat Pendidikan
              </Heading4>
              <CheckboxButton
                options={[
                  { label: "title 1", value: "title 1" },
                  { label: "title 2", value: "title 2" },
                  { label: "title 3", value: "title 3" },
                  { label: "title 4", value: "title 4" },
                  { label: "title 5", value: "title 5" },
                ]}
                variant="left"
                col
              />
            </div>
            <div style={{ paddingBottom: 32 }}>
              <Heading4
                colors={Colors.neutral.greyish_brown}
                marginBottom={`16px`}
              >
                Industri
              </Heading4>
              <div
                onClick={() => {
                  setDashboard(false);
                  setShowJobs(true);
                }}
              >
                <InputSearchField
                  inputValue={InputValue}
                  label={`Cari Industri`}
                />
              </div>
              <CheckboxButton
                options={SelectJobs}
                variant="left"
                col
                defaultValue={ChekedJobs}
              />
            </div>
            <div style={{ paddingBottom: 32 }}>
              <Heading4 colors={Colors.neutral.greyish_brown}>
                Company Anda Subscribe
              </Heading4>
              <CheckboxButton
                options={[
                  { label: "title 1", value: "title 1" },
                  { label: "title 2", value: "title 2" },
                  { label: "title 3", value: "title 3" },
                  { label: "title 4", value: "title 4" },
                  { label: "title 5", value: "title 5" },
                ]}
                variant="left"
                col
              />
            </div>
            <div style={{ paddingBottom: 32 }}>
              <Heading4 colors={Colors.neutral.greyish_brown}>
                Remote/On Site
              </Heading4>
              <CheckboxButton
                options={[
                  { label: "On-Site", value: "On-Site" },
                  { label: "Remote", value: "Remote" },
                ]}
                variant="left"
              />
            </div>
          </BottomSheet>
        )}
        <BottomSheet
          visible={showJobs}
          onClose={() => {
            setDashboard(true);
            setShowJobs(false);
          }}
          search={
            <InputSearchField
              fullWidth
              // variant={`search function`}
              inputValue={InputValue}
              onChange={(e) => setInputValue(e.target.value)}
              // handleChangeSingle={handleChangeSingle}
            />
          }
        >
          {optionJobFunction.map((option, index) => {
            if (option.includes(InputValue))
              return (
                <Box key={index} className="d-flex" gap="32px" py="16px">
                  <Checkbox
                    onChange={(e) => {
                      if (e.target.checked) {
                        let newValue = [...SelectJobs];
                        let newValue2 = [...ChekedJobs];
                        newValue.push({ label: option, value: option });
                        newValue2.push(true);
                        setSelectJobs(newValue);
                        setChekedJobs(newValue2);
                      } else {
                        let newValue = [...SelectJobs];
                        let newValue2 = [...ChekedJobs];
                        SelectJobs.map((el, idx) => {
                          console.log(el.value);
                          console.log(option);
                          if (el.value === option) {
                            newValue.splice(idx, 1);
                            newValue2.splice(idx, 1);
                          }
                        });
                        setSelectJobs(newValue);
                        setChekedJobs(newValue2);
                      }
                    }}
                    sx={{ padding: 0 }}
                    value={option}
                  />
                  <Body1>{option}</Body1>
                </Box>
              );
          })}
        </BottomSheet>
        <FloatingButton
          size={Mobile ? `small` : `medium`}
          onClick={() =>
            window.open(
              "https://api.whatsapp.com/send/?phone=6281314917268&text&type=phone_number&app_absent=0",
              "_blank"
            )
          }
        />
      </>
    )
  );
}
