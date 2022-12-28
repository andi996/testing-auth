import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Carousel from "../../components/Molecul/Carousel";
import Header from "../../components/Organism/Header";
import FeaturesCircleButton from "../../components/Atom/Button/CircleButton/Features";
import { Colors } from "../../themes";
import DesktopGrid from "../../components/Layout/Grid/Desktop";
import JobCard from "../../components/Organism/Card/JobCard";
import {
  Body1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
} from "../../components/Atom/Typography";
import RectangleButton from "../../components/Atom/Button/RectangleButton";
import Footer from "../../components/Organism/Footer";
import { Col, Row } from "react-grid-system";
import Link from "../../components/Atom/Link";
import Column from "../../components/Layout/Grid/Column";
import BlogCard from "../../components/Organism/Card/BlogCard";
import { ArrowBack, HelpOutline } from "@mui/icons-material";
import InputSelectField from "../../components/Atom/Input Field/SelectField";
import InputPrefixRp from "../../components/Atom/Input Field/Prefix/PrefixRp";
import ChevronCircleButton from "../../components/Atom/Button/CircleButton/Chevron";
import JobCardCarousel from "../../components/Molecul/CardCarousel/JobCardCarousel";
import BlogCardCarousel from "../../components/Molecul/CardCarousel/BlogCardCarousel";
import JobFunctionCard from "../../components/Organism/Card/JobFunctionCard";
import IndustriCard from "../../components/Organism/Card/IndustriCard";
import {
  isLargeScreen,
  isMediumScreen,
  isMobile,
  isSmallScreen,
  isTablet,
} from "../../utils/useMediaQuery";
import ModalContainer from "../../components/Atom/Modal";

const image = [
  "/images/Principle/Background/Cover.png",
  "/images/Principle/Background/Dark Blue Desktop.png",
  "/images/Principle/Background/Light Blue Desktop.png",
];

const jobCards = [
  {
    title: "UI/UX Designer",
    company: "PT. Qerja Manfaat Bangsa",
    salary: "Rp 9,5 juta - 15,6 juta/bulan",
    description: "Jakarta Selatan • Fulltime • Remote ",
    profileMatch: 59,
    timestamp: "5 jam lalu",
  },
  {
    title: "UI/UX Designer",
    company: "PT. Qerja Manfaat Bangsa",
    salary: "Rp 9,5 juta - 15,6 juta/bulan",
    description: "Jakarta Selatan • Fulltime • Remote ",
    profileMatch: 59,
    timestamp: "5 jam lalu",
  },
  {
    title: "UI/UX Designer",
    company: "PT. Qerja Manfaat Bangsa",
    salary: "Rp 9,5 juta - 15,6 juta/bulan",
    description: "Jakarta Selatan • Fulltime • Remote ",
    profileMatch: 59,
    timestamp: "5 jam lalu",
  },
  {
    title: "UI/UX Designer",
    company: "PT. Qerja Manfaat Bangsa",
    salary: "Rp 9,5 juta - 15,6 juta/bulan",
    description: "Jakarta Selatan • Fulltime • Remote ",
    profileMatch: 59,
    timestamp: "5 jam lalu",
  },
  {
    title: "UI Designer",
    company: "PT. Code.id",
    salary: "Rp 9,5 juta - 15,6 juta/bulan",
    description: "Jakarta Barat • Fulltime • Remote ",
    profileMatch: 69,
    timestamp: "6 jam lalu",
  },
  {
    title: "UX Designer",
    company: "PT. Code.id",
    salary: "Rp 9,5 juta - 15,6 juta/bulan",
    description: "Jakarta Barat • Fulltime • Remote ",
    profileMatch: 49,
    timestamp: "5 jam lalu",
  },
];

const blogCards = [
  {
    image: "/images/Principle/Background/Cover.png",
    title:
      "Jenis Software Digital Yang Wajib Dimiliki Pekerja Milenial Saat ini",
    category: "Tips Karir",
    date: "20 Des 21",
  },
  {
    image: "/images/Principle/Background/Cover.png",
    title:
      "Jenis Perangkat Digital Yang Wajib Dimiliki Pekerja Milenial Saat ini",
    category: "Tips Karir",
    date: "21 Des 21",
  },
  {
    image: "/images/Principle/Background/Cover.png",
    title: "Jenis Sosial Media Yang Wajib Dimiliki Pekerja Milenial Saat ini",
    category: "Tips Karir",
    date: "22 Des 21",
  },
  {
    image: "/images/Principle/Background/Cover.png",
    title: "Jenis Dompet Digital Yang Wajib Dimiliki Pekerja Milenial Saat ini",
    category: "Tips Karir",
    date: "23 Des 21",
  },
];

function Home() {
  const Mobile = isMobile();
  const Tablet = isTablet();
  const SmallScreen = isSmallScreen();
  const MediumScreen = isMediumScreen();
  const LargeScreen = isLargeScreen();
  const [scrollTop, setScrollTop] = useState(0);
  const [form, setForm] = useState({
    posisi_pekerjaan: ``,
    fungsi_pekerjaan: ``,
    tipe_pekerjaan: ``,
    lokasi: ``,
    gaji: 0,
  });
  const [show, setShow] = useState(false);

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
    <>
      <style jsx>{`
        .body {
          background: url("/images/Principle/Background/Background Homepage.png")
            no-repeat top;
          background-size: ${!Mobile && "100%"};
        }
        .banner-section {
          margin-bottom: 48px;
          padding: ${Mobile && "0 16px"};
        }
        .features-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: ${Mobile ? "32px" : "80px"};
          margin-bottom: ${Mobile ? "16px" : "48px"};
        }
        .recommendation-section {
          background: url("/images/Principle/Background/Background Peta.png")
            no-repeat Top;
          // background-size: 100%;
          padding: ${Mobile ? "8px 0" : "48px 0"};
          height: 100%;
          width: 100%;
          // min-width: 1362px;
          margin-bottom: ${!Mobile && "48px"};
        }
        .opportunities-section {
          background: url("/images/Principle/Background/Shapes Light Blue.png")
            no-repeat bottom;
          background-size: 100% 50%;
          padding: ${Mobile ? "8px 0" : "48px 0"};
          height: 100%;
          width: 100%;
          margin-bottom: ${!Mobile && "48px"};
          // min-width: 1362px;
        }
        .lowongan-mobile-section {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 16px;
          gap: 12px;
          width: 100%;
          height: 100%;
        }
        .inspiration-section {
          background: url("/images/Principle/Background/Light Blue Desktop.png")
            no-repeat bottom;
          background-size: 100% 50%;
          padding: ${Mobile ? 0 : "48px 0"};
          height: 100%;
          width: 100%;
          margin-bottom: 80px;
        }
        .hardsell-container {
          position: absolute;
          width: 100%;
          max-width: 588px;
          height: 202px;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          flex-direction: column;
          top: 105px;
          left: 40%;
        }
        .center-button {
          display: flex;
          justify-content: center;
          margin-top: ${Mobile ? 0 : "24px"};
        }
        .flex-button {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .form-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-top: 32px;
          margin-bottom: 8px;
        }
        .content-lowongan-mobile {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 0px;
          gap: 8px;
          overflow-x: auto;
          overflow-y: hidden;
          width: 100%;
          ::-webkit-scrollbar {
            display: none;
          }
        }
        .stack-lowongan-mobile {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 8px;
        }
        .slider-mobile {
          width: 100%;
          overflow-x: auto;
          display: flex;
          gap: 8px;
          padding: 4px 16px;
          ::-webkit-scrollbar-thumb {
            display: none;
          }
        }
      `}</style>
      <div style={{ overflowX: "hidden" }}>
        <div className="body">
          <Header type="Home" variant={scrollTop > 56 && "action"} />
          <Layout home sticky={scrollTop > 80}>
            <div className="banner-section">
              <Carousel
                state={Mobile ? `2:1` : `4:1`}
                image={image}
                size={Mobile ? "small" : "large"}
              />
            </div>
            <div className="features-section">
              <FeaturesCircleButton
                image="/images/Principle/Logo/Pencil.png"
                label="Tes Skill"
                text
              />
              <FeaturesCircleButton
                image="/images/Principle/Logo/Desktop.png"
                label="Kelas"
                text
              />
              <FeaturesCircleButton
                image="/images/Principle/Logo/Dompet.png"
                label="Topup"
                text
              />
            </div>
          </Layout>
        </div>
        {/* <div className="recommendation-section">
          <DesktopGrid>
            <div className="d-flex-fullwidth">
              {Mobile ? (
                <Heading5 color={`white`} marginLeft="16px">
                  Rekomendasi Lowongan Anda
                </Heading5>
              ) : (
                <Heading3 color={`white`}>Rekomendasi Lowongan Anda</Heading3>
              )}
              <RectangleButton
                variant="text"
                size={Mobile ? "small" : "large"}
                state="alternate"
              >
                {Mobile ? "Lihat Semua" : "Lihat Semua >"}
              </RectangleButton>
            </div>
            {Mobile ? (
              <div className="slider-mobile">
                {jobCards.map((item, index) => (
                  <JobCard
                    key={index}
                    title={item.title}
                    company={item.company}
                    salary={item.salary}
                    description={item.description}
                    profileMatch={item.profileMatch}
                    timestamp={item.timestamp}
                    fullWidth
                  />
                ))}
              </div>
            ) : (
              <div style={{ width: "100%", padding: "0 24px", marginTop: 24 }}>
                <JobCardCarousel
                  cards={jobCards}
                  slide={Tablet ? 2 : SmallScreen ? 3 : 4}
                />
              </div>
            )}
          </DesktopGrid>
        </div>
        <div className="opportunities-section">
          <DesktopGrid>
            <div className="d-flex-fullwidth">
              {Mobile ? (
                <Heading5
                  color={Colors.neutral.greyish_brown}
                  marginLeft="16px"
                >
                  Preferensi Lowongan Anda
                </Heading5>
              ) : (
                <Heading3 color={Colors.neutral.greyish_brown}>
                  Preferensi Lowongan Anda
                </Heading3>
              )}
              <RectangleButton variant="text" size={Mobile ? "small" : "large"}>
                {Mobile ? "Lihat Semua" : "Lihat Semua >"}
              </RectangleButton>
            </div>
            {Mobile ? (
              <div className="slider-mobile">
                {jobCards.map((item, index) => (
                  <JobCard
                    key={index}
                    title={item.title}
                    company={item.company}
                    salary={item.salary}
                    description={item.description}
                    profileMatch={item.profileMatch}
                    timestamp={item.timestamp}
                    fullWidth
                  />
                ))}
              </div>
            ) : (
              <div style={{ width: "100%", padding: "0 24px", marginTop: 24 }}>
                <JobCardCarousel
                  cards={jobCards}
                  slide={Tablet ? 2 : SmallScreen ? 3 : 4}
                />
              </div>
            )}
            <div className="center-button">
              <RectangleButton
                variant="ghost"
                size={Mobile ? "small" : "large"}
                customStyle={{ width: Mobile ? 160 : 382, margin: 0 }}
              >
                Ubah Preferensi
              </RectangleButton>
            </div>
          </DesktopGrid>
        </div> */}
        {Mobile ? (
          <>
            <div className="lowongan-mobile-section">
              <Heading5 color={Colors.neutral.greyish_brown}>
                Lowongan Kerja Terbanyak
              </Heading5>
              <div className="content-lowongan-mobile">
                <div className="stack-lowongan-mobile">
                  <JobFunctionCard
                    image="/images/Principle/Background/Cover.png"
                    title="Digital Marketing"
                    count={90}
                  />
                  <JobFunctionCard
                    image="/images/Principle/Background/Cover.png"
                    title="Digital Marketing"
                    count={90}
                  />
                  <JobFunctionCard
                    image="/images/Principle/Background/Cover.png"
                    title="Digital Marketing"
                    count={90}
                  />
                  <JobFunctionCard
                    image="/images/Principle/Background/Cover.png"
                    title="Digital Marketing"
                    count={90}
                  />
                </div>
                <div className="stack-lowongan-mobile">
                  <JobFunctionCard
                    image="/images/Principle/Background/Cover.png"
                    title="Digital Marketing"
                    count={90}
                  />
                  <JobFunctionCard
                    image="/images/Principle/Background/Cover.png"
                    title="Digital Marketing"
                    count={90}
                  />
                  <JobFunctionCard
                    image="/images/Principle/Background/Cover.png"
                    title="Digital Marketing"
                    count={90}
                  />
                  <JobFunctionCard
                    image="/images/Principle/Background/Cover.png"
                    title="Digital Marketing"
                    count={90}
                  />
                </div>
              </div>
            </div>
            <div className="lowongan-mobile-section">
              <Heading5 color={Colors.neutral.greyish_brown}>
                Industri Favorit
              </Heading5>
              <div className="content-lowongan-mobile">
                <div className="stack-lowongan-mobile">
                  <IndustriCard title="Digital Marketing" count={90} />
                  <IndustriCard title="Digital Marketing" count={90} />
                  <IndustriCard title="Digital Marketing" count={90} />
                </div>
                <div className="stack-lowongan-mobile">
                  <IndustriCard title="Digital Marketing" count={90} />
                  <IndustriCard title="Digital Marketing" count={90} />
                  <IndustriCard title="Digital Marketing" count={90} />
                </div>
              </div>
            </div>
            <div className="d-flex-fullwidth">
              <Heading5 color={Colors.neutral.greyish_brown} marginLeft="16px">
                Lowongan Kerja Pilihan
              </Heading5>
              <RectangleButton variant="text" size="small">
                Lihat Semua
              </RectangleButton>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 8,
              }}
            >
              <Carousel image={image} size={"small"} />
            </div>
            <div className="slider-mobile">
              <JobCard
                title="UI/UX Designer"
                company="PT. Qerja Manfaat Bangsa"
                salary="Rp 9,5 juta - 15,6 juta/bulan"
                description="Jakarta Selatan • Fulltime • Remote "
                profileMatch={59}
                timestamp="5 jam lalu"
              />
              <JobCard
                title="UI/UX Designer"
                company="PT. Qerja Manfaat Bangsa"
                salary="Rp 9,5 juta - 15,6 juta/bulan"
                description="Jakarta Selatan • Fulltime • Remote "
                profileMatch={59}
                timestamp="5 jam lalu"
              />
              <JobCard
                title="UI/UX Designer"
                company="PT. Qerja Manfaat Bangsa"
                salary="Rp 9,5 juta - 15,6 juta/bulan"
                description="Jakarta Selatan • Fulltime • Remote "
                profileMatch={59}
                timestamp="5 jam lalu"
              />
            </div>
          </>
        ) : (
          <DesktopGrid>
            <Heading3 color={Colors.neutral.greyish_brown} marginTop="40px">
              Lowongan Kerja Terbanyak
            </Heading3>
            <Row style={{ margin: `24px 0` }} gutterWidth={36}>
              <Column lg={3} md={4} sm={6} xs={6}>
                <JobFunctionCard
                  image="/images/Principle/Background/Cover.png"
                  title="Digital Marketing"
                  count={90}
                />
              </Column>
              <Column lg={3} md={4} sm={6} xs={6}>
                <JobFunctionCard
                  image="/images/Principle/Background/Cover.png"
                  title="Digital Marketing"
                  count={90}
                />
              </Column>
              <Column lg={3} md={4} sm={6} xs={6}>
                <JobFunctionCard
                  image="/images/Principle/Background/Cover.png"
                  title="Digital Marketing"
                  count={90}
                />
              </Column>
              <Column lg={3} md={4} sm={6} xs={6}>
                <JobFunctionCard
                  image="/images/Principle/Background/Cover.png"
                  title="Digital Marketing"
                  count={90}
                />
              </Column>
              <Column lg={3} md={4} sm={6} xs={6}>
                <JobFunctionCard
                  image="/images/Principle/Background/Cover.png"
                  title="Digital Marketing"
                  count={90}
                />
              </Column>
              <Column lg={3} md={4} sm={6} xs={6}>
                <JobFunctionCard
                  image="/images/Principle/Background/Cover.png"
                  title="Digital Marketing"
                  count={90}
                />
              </Column>
              <Column lg={3} md={4} sm={6} xs={6}>
                <JobFunctionCard
                  image="/images/Principle/Background/Cover.png"
                  title="Digital Marketing"
                  count={90}
                />
              </Column>
              <Column lg={3} md={4} sm={6} xs={6}>
                <JobFunctionCard
                  image="/images/Principle/Background/Cover.png"
                  title="Digital Marketing"
                  count={90}
                />
              </Column>
            </Row>
            <Heading3 color={Colors.neutral.greyish_brown}>
              Industri Favorit
            </Heading3>
            <Row style={{ margin: `24px 0` }} gutterWidth={32}>
              <Column lg={2} md={3} sm={4} xs={4}>
                <IndustriCard title="Digital Marketing" count={90} />
              </Column>
              <Column lg={2} md={3} sm={4} xs={4}>
                <IndustriCard title="Digital Marketing" count={90} />
              </Column>
              <Column lg={2} md={3} sm={4} xs={4}>
                <IndustriCard title="Digital Marketing" count={90} />
              </Column>
              <Column lg={2} md={3} sm={4} xs={4}>
                <IndustriCard title="Digital Marketing" count={90} />
              </Column>
              <Column lg={2} md={3} sm={4} xs={4}>
                <IndustriCard title="Digital Marketing" count={90} />
              </Column>
              <Column lg={2} md={3} sm={4} xs={4}>
                <IndustriCard title="Digital Marketing" count={90} />
              </Column>
              <Column lg={2} md={3} sm={4} xs={4}>
                <IndustriCard title="Digital Marketing" count={90} />
              </Column>
              <Column lg={2} md={3} sm={4} xs={4}>
                <IndustriCard title="Digital Marketing" count={90} />
              </Column>
              <Column lg={2} md={3} sm={4} xs={4}>
                <IndustriCard title="Digital Marketing" count={90} />
              </Column>
              <Column lg={2} md={3} sm={4} xs={4}>
                <IndustriCard title="Digital Marketing" count={90} />
              </Column>
              <Column lg={2} md={3} sm={4} xs={4}>
                <IndustriCard title="Digital Marketing" count={90} />
              </Column>
              <Column lg={2} md={3} sm={4} xs={4}>
                <IndustriCard title="Digital Marketing" count={90} />
              </Column>
            </Row>
            <div className="d-flex-fullwidth">
              <Heading3 color={Colors.neutral.greyish_brown}>
                Lowongan Kerja Pilihan
              </Heading3>
              <Link variant="icon right" type="clear blue" size="large">
                Lihat Semua
              </Link>
            </div>
            <Row style={{ marginTop: 24 }} gutterWidth={32}>
              <Col
                style={{
                  justifyContent: "center",
                  display: "flex",
                  marginBottom: "40px",
                }}
                lg={6}
                md={12}
                sm={12}
                xs={12}
              >
                <Carousel
                  image={image}
                  size={MediumScreen ? "semi large" : "large"}
                />
              </Col>
              <Col lg={6} md={12} sm={12} xs={12}>
                <Row gutterWidth={24}>
                  <Column lg={6} md={6} sm={6} xs={6}>
                    <JobCard
                      fullWidth
                      title="UI/UX Designer"
                      company="PT. Qerja Manfaat Bangsa"
                      salary="Rp 9,5 juta - 15,6 juta/bulan"
                      description="Jakarta Selatan • Fulltime • Remote "
                      profileMatch={59}
                      timestamp="5 jam lalu"
                    />
                  </Column>
                  <Column lg={6} md={6} sm={6} xs={6}>
                    <JobCard
                      fullWidth
                      title="UI/UX Designer"
                      company="PT. Qerja Manfaat Bangsa"
                      salary="Rp 9,5 juta - 15,6 juta/bulan"
                      description="Jakarta Selatan • Fulltime • Remote "
                      profileMatch={59}
                      timestamp="5 jam lalu"
                    />
                  </Column>
                  <Column lg={6} md={6} sm={6} xs={6}>
                    <JobCard
                      fullWidth
                      title="UI/UX Designer"
                      company="PT. Qerja Manfaat Bangsa"
                      salary="Rp 9,5 juta - 15,6 juta/bulan"
                      description="Jakarta Selatan • Fulltime • Remote "
                      profileMatch={59}
                      timestamp="5 jam lalu"
                    />
                  </Column>
                  <Column lg={6} md={6} sm={6} xs={6}>
                    <JobCard
                      fullWidth
                      title="UI/UX Designer"
                      company="PT. Qerja Manfaat Bangsa"
                      salary="Rp 9,5 juta - 15,6 juta/bulan"
                      description="Jakarta Selatan • Fulltime • Remote "
                      profileMatch={59}
                      timestamp="5 jam lalu"
                    />
                  </Column>
                </Row>
              </Col>
            </Row>
          </DesktopGrid>
        )}
        <div className="inspiration-section" id="inspirasi-karir">
          {Mobile ? (
            <>
              <div className="d-flex-fullwidth">
                <Heading5
                  color={Colors.neutral.greyish_brown}
                  marginLeft="16px"
                >
                  Inspirasi Karir
                </Heading5>
                <RectangleButton variant="text" size="small">
                  Lihat Semua
                </RectangleButton>
              </div>
              <div className="slider-mobile">
                {blogCards.map((item, index) => (
                  <BlogCard
                    key={index}
                    image={item.image}
                    title={item.title}
                    category={item.category}
                    date={item.date}
                  />
                ))}
              </div>
            </>
          ) : (
            <DesktopGrid>
              <Heading4 color={Colors.neutral.brown_grey} align={`center`}>
                Tips dan ulasan yang menemani perjalanan Karir
              </Heading4>
              <Heading2
                color={Colors.neutral.greyish_brown}
                align={`center`}
                marginBottom={`40px`}
              >
                Inspirasi Karir
              </Heading2>
              <div style={{ width: "100%", padding: "0 24px", marginTop: 24 }}>
                <BlogCardCarousel
                  cards={blogCards}
                  slide={MediumScreen || LargeScreen ? 3 : 2}
                />
              </div>
              <div className="center-button">
                <RectangleButton
                  variant="ghost"
                  size="large"
                  customStyle={{ width: 382 }}
                >
                  Lihat Inspirasi Karir Lainnya
                </RectangleButton>
              </div>
            </DesktopGrid>
          )}
        </div>
        {!Mobile && <Footer />}
      </div>
      <ModalContainer
        show={show}
        title="Preferensi Lowongan Kerja"
        submitBtnTitle="Simpan"
        cancelBtnTitle="Batal"
        handleBack={() => setShow(false)}
        handleSubmit={() => setShow(false)}
        handleCancel={() => setShow(false)}
        handleClose={() => setShow(false)}
      >
        <Heading2 color={Colors.neutral.greyish_brown}>
          Preferensi Pekerjaan
        </Heading2>
        <Body1 color={Colors.neutral.brown_grey}>
          Temukan lowongan sesuai Preferensi Anda! Jangan khawatir preferensi
          dapat Anda perbahurui kapanpun.
        </Body1>
        <div className="form-container">
          <InputSelectField
            multiple
            fullWidth
            label={`Posisi Pekerjaan*`}
            options={[
              { label: "Amerika Serikat", value: "Amerika Serikat" },
              { label: "Indonesia", value: "Indonesia" },
              { label: "Singapura", value: "Singapura" },
              { label: "Malaysia", value: "Malaysia" },
            ]}
            handleChange={(value) => {
              setForm({ ...form, posisi_pekerjaan: value });
            }}
          />
          <InputSelectField
            fullWidth
            label={`Fungsi Pekerjaan*`}
            defaultValue={form.fungsi_pekerjaan}
            options={[
              { label: "Amerika Serikat", value: "Amerika Serikat" },
              { label: "Indonesia", value: "Indonesia" },
              { label: "Singapura", value: "Singapura" },
              { label: "Malaysia", value: "Malaysia" },
            ]}
            handleChange={(value) =>
              setForm({ ...form, fungsi_pekerjaan: value })
            }
          />
          <InputSelectField
            fullWidth
            label={`Tipe Pekerjaan*`}
            defaultValue={form.tipe_pekerjaan}
            options={[
              { label: "Amerika Serikat", value: "Amerika Serikat" },
              { label: "Indonesia", value: "Indonesia" },
              { label: "Singapura", value: "Singapura" },
              { label: "Malaysia", value: "Malaysia" },
            ]}
            handleChange={(value) =>
              setForm({ ...form, tipe_pekerjaan: value })
            }
          />
          <InputSelectField
            fullWidth
            label={`Lokasi*`}
            defaultValue={form.lokasi}
            options={[
              { label: "Amerika Serikat", value: "Amerika Serikat" },
              { label: "Indonesia", value: "Indonesia" },
              { label: "Singapura", value: "Singapura" },
              { label: "Malaysia", value: "Malaysia" },
            ]}
            handleChange={(value) => setForm({ ...form, lokasi: value })}
          />
          <InputPrefixRp
            label={`Gaji Diinginkan`}
            helperText={`Masukan gaji Anda inginkan untuk meningkatkan pengalaman Anda dalam mencari lowongan.`}
            handleChange={(value) => setForm({ ...form, gaji: value })}
          />
        </div>
      </ModalContainer>
    </>
  );
}

export default Home;
