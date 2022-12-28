import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Carousel from "../../components/Molecul/Carousel";
import Header from "../../components/Organism/Header";
import FeaturesCircleButton from "../../components/Atom/Button/CircleButton/Features";
import { Colors, Elevation, Radius } from "../../themes";
import DesktopGrid from "../../components/Layout/Grid/Desktop";
import JobCard from "../../components/Organism/Card/JobCard";
import {
  Body1,
  Body2,
  Body3,
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
import ModalContainer from "../../components/Atom/Modal";
import {
  isLargeScreen,
  isMediumScreen,
  isMobile,
  isSmallScreen,
  isTablet,
} from "../../utils/useMediaQuery";
import FloatingButton from "../../components/Atom/Button/FloatingButton";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../redux/action/LandingActions";
import { getMasterJobFunctions } from "../../redux/action/MasterActions";
import {
  getBanners,
  getPreferensi,
  getPreferensiOpportunities,
  getRekomendasiOpportunities,
} from "../../redux/action/HomeActions";
import Cookies from "js-cookie";
import InputTextField from "../../components/Atom/Input Field/TextField";
import { API2 } from "../../api/service";
import { endpoints } from "../../api/endpoint";
import formatRupiah from "../../utils/formatRupiah";

const image = [
  "/images/Principle/Background/Cover.png",
  "/images/Principle/Background/Dark Blue Desktop.png",
  "/images/Principle/Background/Light Blue Desktop.png",
];

function Home(props) {
  const { userData } = props;
  const dispatch = useDispatch();
  const Mobile = isMobile();
  const Tablet = isTablet();
  const SmallScreen = isSmallScreen();
  const MediumScreen = isMediumScreen();
  const LargeScreen = isLargeScreen();
  const [scrollTop, setScrollTop] = useState(0);
  const [form, setForm] = useState({
    user_id: 0,
    user_preference: {
      expected_salary: false,
    },
    user_master_job_function_preferences: false,
    user_master_location_preferences: false,
    user_job_type_ids: false,
    user_job_position_preference: false,
  });
  const [show, setShow] = useState(false);
  const {
    blogs,
    masterLocations,
    masterJobFuntions,
    preferensi,
    preferensiOpportunities,
    rekomendasiOpportunities,
    banners,
  } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  // const user = typeof window !== "undefined" && JSON.parse(Cookies.get("user"));
  const user = JSON.parse(userData);
  // const { data: session, status } = useSession();

  const handleSavePreference = async () => {
    setLoading(true);
    let submitForm = form;
    submitForm.user_id = user.id;
    submitForm.user_master_job_function_preferences = form.user_master_job_function_preferences.map(
      (id) => {
        return { master_job_function_id: id };
      }
    );
    submitForm.user_master_location_preferences = form.user_master_location_preferences.map(
      (id) => {
        return { master_location_id: id };
      }
    );
    await API2({
      method: `POST`,
      url: endpoints.savePreferensi,
      data: submitForm,
    })
      .then(() => setShow(false))
      .catch((err) => console.log("err", err));
    setLoading(false);
  };

  useEffect(() => {
    dispatch(getBlogs());
    dispatch(getMasterJobFunctions());
    dispatch(getBanners());
    if (user) {
      dispatch(getPreferensi(user.id));
      dispatch(getRekomendasiOpportunities(user.id));
    }
  }, []);

  useEffect(() => {
    if (!preferensi.loading && preferensiOpportunities.loading) {
      dispatch(
        getPreferensiOpportunities(
          user.id,
          preferensi.data?.user_preference?.expected_salary || 0,
          preferensi.data?.user_master_job_function_preferences?.map(
            ({ master_job_function_id }) => master_job_function_id
          ) || [],
          preferensi.data?.user_master_location_preferences?.map(
            ({ master_location_id }) => master_location_id
          ) || []
        )
      );
      setForm({
        ...form,
        user_job_position_preference:
          preferensi.data?.user_job_position_preference,
        user_job_type_ids: preferensi.data?.user_job_type_ids,
        user_master_job_function_preferences: preferensi.data?.user_master_job_function_preferences?.map(
          ({ master_job_function_id }) => master_job_function_id
        ),
        user_master_location_preferences: preferensi.data?.user_master_location_preferences?.map(
          ({ master_location_id }) => master_location_id
        ),
        user_preference: {
          ...form.user_preference,
          expected_salary: preferensi.data?.user_preference?.expected_salary,
        },
      });
    }
  }, [preferensi]);

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
        .empty-recommendation-section {
          background: url("/images/Principle/Background/Empty Recommendation.png")
            no-repeat;
          background-position: ${Mobile ? "-280px -20px" : "Top"};
          background-size: ${Mobile ? "auto 360px" : "auto"};
          height: 100%;
          width: 100%;
          // min-width: 1362px;
          min-height: ${Mobile ? "315px" : "487px"};
          margin-bottom: ${!Mobile && "48px"};
          position: relative;
        }
        .empty-recommendation-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: ${Mobile ? "40px 80px" : "40px 0"};
          min-height: 487px;
          height: 100%;
          width: 100%;
        }
        .mobile-recommendation-title {
          position: absolute;
          width: 100%;
          height: 44px;
          left: 0px;
          top: 0px;
          background: ${Colors.primary.mid_blue};
        }
        .mobile-recommendation-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 12px;
          padding: 0 16px;
          width: 100%;
          height: 315px;
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
        .empty-opportunities-section {
          background: url("/images/Principle/Background/Empty Opportunities.png")
            no-repeat bottom;
          padding: 48px 0;
          height: 100%;
          width: 100%;
          position: relative;
          // min-width: 1200px;
          min-height: 360px;
        }
        .empty-opportunities-section-2 {
          background: url("/images/Principle/Background/Empty Opportunities 2.png")
            no-repeat bottom;
          display: flex;
          flex-direction: ${Mobile ? "column" : "row"};
          align-items: ${Mobile ? "flex-start" : "center"};
          justify-content: center;
          height: 100%;
          width: 100%;
          position: relative;
          min-height: 360px;
          padding: ${Mobile && "16px"};
          gap: ${Mobile && "12px"};
          background-size: ${Mobile && "100% 50%"};
        }
        .empty-opportunities-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          width: 100%;
          height: auto;
          box-shadow: ${Elevation.card};
          padding: 8px;
          background: white;
          border-radius: ${Radius.medium};
        }
        .cover {
          object-fit: cover;
          left: 0;
          right: 0;
          margin-top: 12px;
          width: 130px;
          height: 130px;
        }
        .hardsell-container {
          position: absolute;
          width: 100%;
          max-width: 588px;
          height: 202px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          top: 105px;
          left: 40%;
          gap: 52px;
        }
        .hardsell-container-2 {
          padding-top: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 52px;
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
          margin-bottom: ${Mobile ? "64px" : "80px"};
        }
        .center-button {
          display: flex;
          justify-content: center;
          margin-top: 24px;
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
                skeleton={banners.loading}
                size={Mobile ? "small" : "large"}
                state={Mobile ? `2:1` : `4:1`}
                data={!banners.loading && banners.data}
                steps={!banners.loading && banners.data?.length}
              />
            </div>
            {/* <div className="features-section">
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
            </div> */}
          </Layout>
        </div>
        {rekomendasiOpportunities.data &&
        rekomendasiOpportunities.data.length > 0 ? (
          <div className="recommendation-section">
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
                  {rekomendasiOpportunities.data.map((item, index) => (
                    <JobCard
                      key={index}
                      title={item.job_position}
                      company={item.company_name}
                      salary={
                        formatRupiah(item.salary_lower) +
                        " - " +
                        formatRupiah(item.salary_upper)
                      }
                      description={item.description}
                      profileMatch={item.match_percentage}
                      timestamp={item.posted_at}
                      fullWidth
                    />
                  ))}
                </div>
              ) : (
                <div
                  style={{ width: "100%", padding: "0 24px", marginTop: 24 }}
                >
                  <JobCardCarousel
                    cards={rekomendasiOpportunities.data}
                    slide={Tablet ? 2 : SmallScreen ? 3 : 4}
                  />
                </div>
              )}
            </DesktopGrid>
          </div>
        ) : (
          <div className="empty-recommendation-section">
            {Mobile ? (
              <div className="mobile-recommendation-content">
                <div className="mobile-recommendation-title">
                  <Heading5
                    color="white"
                    marginTop={`19px`}
                    marginLeft={`16px`}
                  >
                    Rekomendasi Lowongan Anda
                  </Heading5>
                </div>
                <Heading4 color="white" align="center">
                  Temukan Pekerjaan Impian Anda Sekarang
                </Heading4>
                <Body2 color="white" align="center">
                  Dapatkan Rekomendasi Lowongan dengan Lengkapi Profil Anda
                </Body2>
                <RectangleButton
                  state="alternate"
                  customStyle={{
                    position: "absolute",
                    bottom: 16,
                    width: "calc(100% - 32px)",
                  }}
                  onClick={() => setShow(true)}
                >
                  Isi Profil
                </RectangleButton>
              </div>
            ) : (
              <DesktopGrid>
                <div className="empty-recommendation-content">
                  <Heading3 color={`white`} align={`center`}>
                    Dapatkan Rekomendasi Lowongan dengan Lengkapi Profil Hingga
                    Amazing
                  </Heading3>
                  <div className="center-button">
                    <RectangleButton
                      size="large"
                      state="alternate"
                      customStyle={{ width: 382 }}
                      onClick={() => setShow(true)}
                    >
                      Isi Profil
                    </RectangleButton>
                  </div>
                </div>
              </DesktopGrid>
            )}
          </div>
        )}
        {preferensiOpportunities?.data &&
        preferensiOpportunities?.data?.opportunities?.length > 0 ? (
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
                <RectangleButton
                  variant="text"
                  size={Mobile ? "small" : "large"}
                >
                  {Mobile ? "Lihat Semua" : "Lihat Semua >"}
                </RectangleButton>
              </div>
              {Mobile ? (
                <div className="slider-mobile">
                  {preferensiOpportunities.data.opportunities.map(
                    (item, index) => (
                      <JobCard
                        key={index}
                        title={item.job_position}
                        company={item.company_name}
                        salary={
                          formatRupiah(item.salary_lower) +
                          " - " +
                          formatRupiah(item.salary_upper)
                        }
                        description={item.description}
                        profileMatch={item.match_percentage}
                        timestamp={item.posted_at}
                        fullWidth
                      />
                    )
                  )}
                </div>
              ) : (
                <div
                  style={{ width: "100%", padding: "0 24px", marginTop: 24 }}
                >
                  <JobCardCarousel
                    cards={preferensiOpportunities.data.opportunities}
                    slide={Tablet ? 2 : SmallScreen ? 3 : 4}
                  />
                </div>
              )}
              <div className="center-button">
                <RectangleButton
                  variant="ghost"
                  size={Mobile ? "small" : "large"}
                  customStyle={{ width: Mobile ? 160 : 382, margin: 0 }}
                  onClick={() => setShow(true)}
                >
                  Ubah Preferensi
                </RectangleButton>
              </div>
            </DesktopGrid>
          </div>
        ) : (
          <div
            className={
              MediumScreen || LargeScreen
                ? "empty-opportunities-section"
                : "empty-opportunities-section-2"
            }
          >
            {Mobile ? (
              <>
                <Heading5 color={Colors.neutral.greyish_brown}>
                  {" "}
                  Preferensi Lowongan Anda
                </Heading5>
                <div className="empty-opportunities-card">
                  <img
                    alt=""
                    src="/images/Principle/Illustration/empty-search-vacancy.png"
                    className="cover"
                  />
                  <Heading5 color={Colors.neutral.greyish_brown} align="center">
                    {" "}
                    Preferensi Lowongan tidak ditemukan
                  </Heading5>
                  <Body3 color={Colors.brown_grey} align="center">
                    Dapatkan lowongan sesuai dengan Preferensi Anda dengan
                    mengisi form Preferensi
                  </Body3>
                  <RectangleButton
                    customStyle={{
                      margin: 0,
                    }}
                    fullWidth
                    onClick={() => setShow(true)}
                  >
                    Isi Preferensi
                  </RectangleButton>
                </div>
              </>
            ) : (
              <div
                className={
                  MediumScreen || LargeScreen
                    ? "hardsell-container"
                    : "hardsell-container-2"
                }
              >
                <Heading4 color={Colors.neutral.brown_grey}>
                  Dapatkan Lowongan Sesuai Preferensi Anda
                </Heading4>
                <RectangleButton
                  size="large"
                  customStyle={{ width: 382 }}
                  onClick={() => setShow(true)}
                >
                  Isi Preferensi
                </RectangleButton>
              </div>
            )}
          </div>
        )}
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
          <DesktopGrid>
            {Mobile ? (
              <div className="d-flex-fullwidth">
                <Heading5
                  color={Colors.neutral.greyish_brown}
                  marginLeft="16px"
                >
                  Inspirasi Karir
                </Heading5>
                <RectangleButton
                  variant="text"
                  size="small"
                  onClick={() =>
                    (window.location.href =
                      "https://blog.karir.com/tag/artikel-pilihan/")
                  }
                >
                  Lihat semua
                </RectangleButton>
              </div>
            ) : (
              <>
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
              </>
            )}
            <div className="slider-mobile">
              {Mobile ? (
                blogs.loading ? (
                  <BlogCard sketelon />
                ) : (
                  blogs.data.map((el, idx) => (
                    <BlogCard
                      key={idx}
                      image={el.image_url}
                      title={el.title}
                      category={el.tags == null ? "" : el.tags.join(",")}
                      date={el.date}
                      onClick={() => (window.location.href = el.link)}
                    />
                  ))
                )
              ) : (
                <BlogCardCarousel
                  skeleton={blogs.loading}
                  cards={blogs.data}
                  slide={MediumScreen || LargeScreen ? 3 : 2}
                />
              )}
            </div>
            {!Mobile && (
              <div className="center-button">
                <RectangleButton
                  variant="ghost"
                  size="large"
                  customStyle={{ width: 382 }}
                  onClick={() =>
                    (window.location.href =
                      "https://blog.karir.com/tag/artikel-pilihan/")
                  }
                >
                  Lihat Inspirasi Karir Lainnya
                </RectangleButton>
              </div>
            )}
          </DesktopGrid>
        </div>

        {!Mobile && <Footer />}
      </div>
      {<FloatingButton size={Mobile ? `small` : `medium`} />}

      <ModalContainer
        show={show}
        title="Preferensi Lowongan Kerja"
        submitBtnTitle="Simpan"
        cancelBtnTitle="Batal"
        isLoading={loading}
        isDisabled={
          !form.user_job_position_preference ||
          !form.user_job_type_ids ||
          !form.user_master_job_function_preferences ||
          !form.user_master_location_preferences ||
          !form.user_preference.expected_salary
        }
        handleBack={() => setShow(false)}
        handleSubmit={handleSavePreference}
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
        {!preferensi.loading && (
          <div className="form-container">
            <InputTextField
              multiple
              label={`Posisi Pekerjaan*`}
              defaultValue={preferensi.data?.user_job_position_preference || ""}
              handleChange={(value) => {
                setForm({ ...form, user_job_position_preference: value });
              }}
            />
            <InputSelectField
              multiple
              fullWidth
              label={`Fungsi Pekerjaan*`}
              defaultValue={preferensi.data?.user_master_job_function_preferences?.map(
                ({ master_job_function_id }) => master_job_function_id
              )}
              options={masterJobFuntions.data?.map((item) => {
                return { label: item?.name, value: item?.id };
              })}
              handleChange={(value) =>
                setForm({
                  ...form,
                  user_master_job_function_preferences: value,
                })
              }
            />
            <InputSelectField
              multiple
              fullWidth
              label={`Tipe Pekerjaan*`}
              defaultValue={preferensi.data?.user_job_type_ids}
              options={[
                { value: 1, label: "Purna Waktu" },
                { value: 2, label: "Paruh Waktu" },
                { value: 3, label: "Magang" },
                { value: 4, label: "Sementara" },
                { value: 5, label: "Kontrak" },
              ]}
              handleChange={(value) =>
                setForm({ ...form, user_job_type_ids: value })
              }
            />
            <InputSelectField
              multiple
              fullWidth
              label={`Lokasi*`}
              defaultValue={preferensi.data?.user_master_location_preferences?.map(
                ({ master_location_id }) => master_location_id
              )}
              options={masterLocations.data?.map((item) => {
                return { label: item?.name, value: item?.id };
              })}
              handleChange={(value) =>
                setForm({ ...form, user_master_location_preferences: value })
              }
            />
            <InputPrefixRp
              label={`Gaji Diinginkan`}
              helperText={`Masukan gaji Anda inginkan untuk meningkatkan pengalaman Anda dalam mencari lowongan.`}
              defaultValue={preferensi.data?.user_preference?.expected_salary}
              handleChange={(value) =>
                setForm({
                  ...form,
                  user_preference: {
                    ...form.user_preference,
                    expected_salary: value,
                  },
                })
              }
            />
          </div>
        )}
      </ModalContainer>
    </>
  );
}

export async function getServerSideProps(context) {
  const userData = context.req.cookies["user"];
  // const session = await getSession(context);
  // console.log(userData);
  // console.log(session);

  if (!userData) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return { props: { userData } };
}

export default Home;
