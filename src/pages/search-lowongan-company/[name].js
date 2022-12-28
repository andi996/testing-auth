import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import Footer from "../../components/Organism/Footer";
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
  Heading5,
} from "../../components/Atom/Typography";
import JobCard from "../../components/Organism/Card/JobCard";
import JobHeader from "../../components/Organism/Header/JobHeader";
import ActionChipDropdown from "../../components/Organism/Menu/Exposed Dropdown Menu/ActionChipDropdown";
import CompanyCard from "../../components/Organism/Card/CompanyCard";
import HeaderCompany from "../../components/Organism/Header/HeaderCompany";
import { useRouter } from "next/dist/client/router";
import { styled } from "@mui/system";
import { ModalUnstyled } from "@mui/base";
import ActionChip from "../../components/Atom/Selection Control/Chips/ActionChip";
import Divider from "../../components/Atom/Divider";
import CheckboxButton from "../../components/Atom/Selection Control/Checkbox";
import InputSearchField from "../../components/Atom/Input Field/SearchField";
import RectangleButton from "../../components/Atom/Button/RectangleButton";

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

export default function SearchLowonganCompany() {
  const [tab, setTab] = useState(0);
  const [Dashboard, setDashboard] = useState(false);
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  const optionListUrutkan = ["Paling Baru", "Paling Lama"];
  const optionListFungsiPekerjaan = ["Paling Baru", "Paling Lama"];
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

  const router = useRouter();
  const { name } = router.query;

  return (
    <>
      <style jsx>{`
        .tab-left {
          background: #ffffff;
          box-shadow: ${Elevation.card};
          border-radius: ${Radius.medium};
          width: 384px;
          height: 72px;
          // display:flex;
          padding: 16px;
          margin-bottom: 8px;
        }
        .v-flex {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
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
      `}</style>
      <Header />
      <Layout company={name}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabCenter handleChange={handleChange} value={tab}>
            <Tab
              icon={
                <ReceiptLongOutlined
                  style={{
                    color: Colors.neutral.brown_grey,
                    height: 24,
                    width: 24,
                  }}
                />
              }
              {...a11yProps(0)}
              iconPosition="start"
              value={0}
              label="Lowongan"
              style={{
                display: "flex",
                flex: 1,
                maxWidth: "100%",
                color: Colors.primary.mid_blue,
                textTransform: "none",
              }}
            />
            <Tab
              {...a11yProps(1)}
              icon={
                <img
                  alt=""
                  src="/images/Principle/Logo/Perusahaan.png"
                  style={{
                    color: Colors.neutral.brown_grey,
                    height: 24,
                    width: 24,
                  }}
                />
              }
              iconPosition="start"
              value={1}
              label="Perusahaan"
              style={{
                display: "flex",
                flex: 1,
                maxWidth: "100%",
                color: Colors.primary.mid_blue,
                textTransform: "none",
              }}
            />
          </TabCenter>
        </Box>
        <TabPanel value={tab} index={0}>
          <Row style={{ marginTop: "16px", marginBottom: "16px" }}>
            <ActionChip
              icon={<FilterAlt />}
              chevron="true"
              onClick={() => setDashboard(true)}
            >
              Semua Filter
            </ActionChip>
            <ActionChipDropdown
              chevron="true"
              optionList={optionListFungsiPekerjaan}
            >
              Fungsi Pekerjaan
            </ActionChipDropdown>
            <ActionChipDropdown
              chevron="true"
              optionList={optionListJenjangKarir}
            >
              Jenjang Karir
            </ActionChipDropdown>
            <ActionChipDropdown
              chevron="true"
              // optionList={optionListRangeGaji}
            >
              Range Gaji
            </ActionChipDropdown>
          </Row>
          <Row>
            <Col lg={4} style={{ overflow: "auto", maxHeight: "980px" }}>
              <div className="tab-left">
                <div className="d-flex-fullwidth">
                  <div className="v-flex">
                    <Heading5 color={Colors.neutral.greyish_brown}>
                      Lowongan di Mirosoft
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
              <JobCard
                title="UI/UX Designer"
                company="PT. Qerja Manfaat Bangsa"
                salary="Rp 9,5 juta - 15,6 juta/bulan"
                description="Jakarta Selatan • Fulltime • Remote "
                profileMatch={59}
                timestamp="5 jam lalu"
                variant="horizontal"
              />
              <JobCard
                title="UI/UX Designer"
                company="PT. Qerja Manfaat Bangsa"
                salary="Rp 9,5 juta - 15,6 juta/bulan"
                description="Jakarta Selatan • Fulltime • Remote "
                profileMatch={59}
                timestamp="5 jam lalu"
                variant="horizontal"
              />
              <JobCard
                title="UI/UX Designer"
                company="PT. Qerja Manfaat Bangsa"
                salary="Rp 9,5 juta - 15,6 juta/bulan"
                description="Jakarta Selatan • Fulltime • Remote "
                profileMatch={59}
                timestamp="5 jam lalu"
                variant="horizontal"
              />
              <JobCard
                title="UI/UX Designer"
                company="PT. Qerja Manfaat Bangsa"
                salary="Rp 9,5 juta - 15,6 juta/bulan"
                description="Jakarta Selatan • Fulltime • Remote "
                profileMatch={59}
                timestamp="5 jam lalu"
                variant="horizontal"
              />
              <JobCard
                title="UI/UX Designer"
                company="PT. Qerja Manfaat Bangsa"
                salary="Rp 9,5 juta - 15,6 juta/bulan"
                description="Jakarta Selatan • Fulltime • Remote "
                profileMatch={59}
                timestamp="5 jam lalu"
                variant="horizontal"
              />
              <JobCard
                title="UI/UX Designer"
                company="PT. Qerja Manfaat Bangsa"
                salary="Rp 9,5 juta - 15,6 juta/bulan"
                description="Jakarta Selatan • Fulltime • Remote "
                profileMatch={59}
                timestamp="5 jam lalu"
                variant="horizontal"
              />
            </Col>
            <Col lg={8}>
              <JobHeader
                // size="large"
                title="Engineer Mobile Developer with React Native"
                company="PT. Qerja"
                location="Jakarta Selatan"
                salary="Rp 10.8 juta - Rp 16.6 juta/bulan"
                profileMatch={80}
              />
            </Col>
          </Row>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Row style={{ marginTop: "16px", marginBottom: "16px" }}>
            <ActionChipDropdown
              chevron="true"
              // optionList={optionListUrutkan}
            >
              Industri
            </ActionChipDropdown>
            <ActionChipDropdown
              chevron="true"
              // optionList={optionListUrutkan}
            >
              Jumlah karyawan
            </ActionChipDropdown>
          </Row>
          <Row>
            <Col lg={4} style={{ overflow: "auto", maxHeight: "980px" }}>
              <div className="tab-left">
                <div className="d-flex-fullwidth">
                  <div className="v-flex">
                    <Heading5 color={Colors.neutral.greyish_brown}>
                      Lowongan di Mirosoft
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
              <CompanyCard
                title="PT. Qerja Manfaat Bang.."
                category="Internet & Technology "
                location="Jakarta Selatan"
                description="Established in April 2014, Qerja is the first online community portal in Indonesia which provides.."
                count={12}
                subscriber={30}
              />
            </Col>
            <Col lg={8}>
              <HeaderCompany
                title="PT. Qerja Manfaat Bangsa"
                location="Jakarta Selatan"
                website="www.karir.com"
                image="/images/Principle/Background/Cover.png"
                btnText="Subscribe"
              />
            </Col>
          </Row>
        </TabPanel>
      </Layout>
      <Footer />
      {Dashboard && (
        <Container
          open={Dashboard}
          onClose={() => setDashboard(false)}
          BackdropComponent={Backdrop}
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
              <Divider />
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
              <InputSearchField label={`Cari Industri`} />
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
              <Divider />
              <div className="d-flex-fullwidth" style={{ padding: 16 }}>
                <RectangleButton variant="ghost" state="error" fullWidth>
                  Reset
                </RectangleButton>
                <RectangleButton fullWidth>Terapkan</RectangleButton>
              </div>
            </div>
          </Content>
        </Container>
      )}
    </>
  );
}
