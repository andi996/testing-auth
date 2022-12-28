import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Hidden } from "react-grid-system";
import Layout from "../components/Layout/Layout";
import Footer from "../components/Organism/Footer";
import FloatingButton from "../components/Atom/Button/FloatingButton";
import {
  Body1,
  Body2,
  Body3,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Small,
} from "../components/Atom/Typography";
import { Colors, Elevation, Radius } from "../themes";
import SearchBar from "../components/Molecul/SearchBar";
import ActionChip from "../components/Atom/Selection Control/Chips/ActionChip";
import DesktopGrid from "../components/Layout/Grid/Desktop";
import ListFitur from "../components/Molecul/List/Fitur";
import BlogCardCarousel from "../components/Molecul/CardCarousel/BlogCardCarousel";
import RectangleButton from "../components/Atom/Button/RectangleButton";
import HeaderGuest from "../components/Organism/Header/Guest";
import Link from "react-scroll/modules/components/Link";
import {
  isLargeScreen,
  isMediumScreen,
  isMobile,
  isSmallScreen,
  isTablet,
} from "../utils/useMediaQuery";
import Header from "../components/Organism/Header";
import BlogCard from "../components/Organism/Card/BlogCard";
import {
  getAutoCompleteSearch,
  getBlogs,
  getPopularSearch,
} from "../redux/action/LandingActions";
import { Translate } from "react-auto-translate";
import { getMasterLocations } from "../redux/action/MasterActions";

const CompanyList = ["PT. code.id", "PT. Qerja Manfaat", "Karir.com"];

const JobList = ["Product Manager", "Tokopedia", "Gojek", "UI/UX Designer"];

const cards = [
  {
    image: "/images/Principle/Illustration/Landing-Card/1.png",
    title: `Profil & CV Generator`,
    desc: `Buat profil sesuai dengan dibutuhkan recruiter dan buat jadi CV 1x klik`,
  },
  {
    image: "/images/Principle/Illustration/Landing-Card/2.png",
    title: `Status Lamaran`,
    desc: `Pantau status lamaran terbaru Anda dari awal-akhir dengan mudah.`,
  },
  {
    image: "/images/Principle/Illustration/Landing-Card/3.png",
    title: `Preferensi & Job Alert`,
    desc: `Cari lowongan sesuai preferensi Anda dalam hitungan detik`,
  },
  {
    image: "/images/Principle/Illustration/Landing-Card/4.png",
    title: `Profile Matching`,
    desc: `Dapatkan Informasi Lowongan yang cocok dengan profil Anda`,
  },
];

const images = [
  "/images/Principle/Illustration/Landing-Company/Shopee.png",
  "/images/Principle/Illustration/Landing-Company/Ruangguru.png",
  "/images/Principle/Illustration/Landing-Company/Prakerja.png",
  "/images/Principle/Illustration/Landing-Company/Planet Surf.png",
  "/images/Principle/Illustration/Landing-Company/Pahamify.png",
  "/images/Principle/Illustration/Landing-Company/OLX.png",
  "/images/Principle/Illustration/Landing-Company/Kitabisa.png",
  "/images/Principle/Illustration/Landing-Company/Indomaret.png",
  "/images/Principle/Illustration/Landing-Company/Gowork.png",
  "/images/Principle/Illustration/Landing-Company/BTPN.png",
];

const steps = [
  {
    image: "/images/Principle/Illustration/Landing-Steps/1.png",
    title: `Temukan pekerjaan Impian Anda`,
    desc: `berdasarkan preferensi dan rekomendasi kami setelah mendaftar di Karir.com.`,
  },
  {
    image: "/images/Principle/Illustration/Landing-Steps/2.png",
    title: `Lengkapi Profil sesuai Rekomendasi kami`,
    desc: `Dapatkan persentase match dan tingkatkan diri Anda diterima pekerjaan.`,
  },
  {
    image: "/images/Principle/Illustration/Landing-Steps/3.png",
    title: `Apply lamaran`,
    desc: `Cek kembali informasi Anda, pastikan sesuai background and skill Anda.`,
  },
  {
    image: "/images/Principle/Illustration/Landing-Steps/4.png",
    title: `Cek Aktivitas Lamaran Anda`,
    desc: `Lihat status lamaran Anda, mulai interview, dan terima pekerjaan baru Anda.`,
  },
];

export default function Home() {
  const router = useRouter();
  const Mobile = isMobile();
  const Tablet = isTablet();
  const SmallScreen = isSmallScreen();
  const MediumScreen = isMediumScreen();
  const LargeScreen = isLargeScreen();
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [menu, setMenu] = useState([false, false, false, false]);
  const [searchValue, setSearchValue] = useState("");
  const [searchLocationValue, setSearchLocationValue] = useState("");
  const { popularSearch, blogs, autocompleteSearch, masterLocations } =
    useSelector((state) => state);

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);
    // console.log(scrollTop);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [scrollTop]);

  useEffect(() => {
    dispatch(getPopularSearch());
    dispatch(getBlogs());
    dispatch(getMasterLocations());
  }, []);

  useEffect(() => {
    if (searchValue?.length > 1) dispatch(getAutoCompleteSearch(searchValue));
  }, [searchValue.length]);

  return (
    <>
      <style jsx>{`
        .body {
          background: url("/images/Principle/Background/Background Landing.png")
            no-repeat top;
          // background-size: 100%;
          overflow-x: hidden;
        }
        .body2 {
          background: url("/images/Principle/Background/Background Homepage.png")
            no-repeat top;
          // background-size: 100%;
          overflow-x: hidden;
        }
        .top-section {
          display: flex;
          flex-direction: column;
          // align-items: center;
          height: 100%;
          justify-content: center;
          padding: ${Mobile ? "8px 16px 32px" : "130px 0 196px"};
        }
        .chip-stack {
          display: flex;
          align-items: center;
          margin-top: ${Mobile ? "12px" : "24px"};
          gap: 4px;
          flex-wrap: wrap;
        }
        .card {
          box-shadow: ${Elevation.card};
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 24px;
          gap: 8px;
          height: 268px;
          margin-bottom: 16px;
          border-radius: ${Radius.medium};
        }
        .card-mobile {
          margin: 8px 0;
          box-shadow: ${Elevation.card};
          height: 202px;
          min-width: 240px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 24px;
          gap: 8px;
          border-radius: ${Radius.medium};
        }
        .company-section {
          display: flex;
          gap: ${Mobile ? "12px" : "40px"};
          margin-bottom: ${Mobile ? "24px" : "80px"};
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .image-company {
          width: ${Mobile ? "80px" : "132px"};
          height: ${Mobile ? "40px" : "66px"};
          display: block;
          margin: auto;
        }
        .steps-section {
          background: url("/images/Principle/Background/Background Peta.png")
            no-repeat Top;
          padding: ${Mobile ? "12px 0" : "40px 0"};
          height: 100%;
          width: 100%;
          margin-bottom: ${Mobile ? "24px" : "48px"};
        }
        .steps-section-2 {
          background: url("/images/Principle/Background/Background Peta 2.png")
            no-repeat Top;
          padding: 40px 0;
          height: 100%;
          width: 100%;
          margin-bottom: 48px;
        }
        .inspiration-section {
          background: url("/images/Principle/Background/Light Blue Desktop.png")
            no-repeat bottom;
          background-size: 100% 50%;
          padding: ${!Mobile && "48px 0"};
          height: 100%;
          width: 100%;
          margin-bottom: 80px;
          // min-width: 1362px;
        }
        .center-button {
          display: flex;
          justify-content: center;
          margin-top: 40px;
        }
        .empty-opportunities-section {
          background: url("/images/Principle/Background/Empty Opportunities.png")
            no-repeat bottom;
          padding: 48px 0;
          height: 100%;
          width: 100%;
          position: relative;
          min-width: 1200px;
          min-height: 360px;
        }
        .empty-opportunities-section-2 {
          background: url("/images/Principle/Background/Empty Opportunities 2.png")
            no-repeat bottom;
          padding: 48px 0;
          height: 100%;
          width: 100%;
          position: relative;
          min-height: 360px;
        }
        .hardsell-container {
          position: absolute;
          width: 100%;
          max-width: 650px;
          height: 202px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          top: 105px;
          left: 35%;
        }
        .hardsell-container-2 {
          padding-top: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        .menu {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 20px;
          color: ${Colors.neutral.greyish_brown};
          cursor: pointer;
        }
        .active {
          color: ${Colors.primary.mid_blue} !important;
        }
        .why-join-carousel {
          width: 100%;
          overflow-x: auto;
          gap: 8px;
          display: flex;
          margin-bottom: 12px;
          padding: 0 16px;
        }
        .why-join-carousel::-webkit-scrollbar {
          display: none;
        }
        .blog-card-content {
          width: 100%;
          overflow-x: ${Mobile ? "auto" : "hidden"};
          display: ${Mobile ? "flex" : "contents"};
          gap: 8px;
          padding: ${Mobile && "2px 16px"};
        }
        .blog-card-content::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className={LargeScreen || MediumScreen ? "body" : "body2"}>
        {Mobile ? (
          <>
            <Header state="sticky" type="home" variant="notification">
              <RectangleButton variant="text" size="small" fullWidth>
                Employer
              </RectangleButton>
              <RectangleButton
                variant="ghost"
                customStyle={{ minWidth: 124 }}
                fullWidth
              >
                Masuk
              </RectangleButton>
              <RectangleButton customStyle={{ minWidth: 124 }} fullWidth>
                Buat Akun
              </RectangleButton>
            </Header>
          </>
        ) : (
          <HeaderGuest variant={scrollTop > 80 ? `default` : `no background`}>
            <Hidden md sm xs lg>
              <Link
                to="cari-pekerjaan"
                spy={true}
                smooth={true}
                offset={-80}
                onSetActive={() => setMenu([true, false, false, false])}
              >
                <span className={`menu ${menu[0] && `active`}`}>
                  <Translate>Cari Pekerjaan</Translate>
                </span>
              </Link>
              <Link
                to="kenapa-bergabung"
                spy={true}
                smooth={true}
                offset={-80}
                onSetActive={() => setMenu([false, true, false, false])}
              >
                <span className={`menu ${menu[1] && `active`}`}>
                  Kenapa Bergabung
                </span>
              </Link>
              <Link
                to="dapatkan-pekerjaan"
                spy={true}
                smooth={true}
                offset={-80}
                onSetActive={() => setMenu([false, false, true, false])}
              >
                <span className={`menu ${menu[2] && `active`}`}>
                  Dapatkan Pekerjaan
                </span>
              </Link>
              <Link
                to="inspirasi-karir"
                spy={true}
                smooth={true}
                offset={-80}
                onSetActive={() => setMenu([false, false, false, true])}
              >
                <span className={`menu ${menu[3] && `active`}`}>
                  Inspirasi Karir
                </span>
              </Link>
            </Hidden>
          </HeaderGuest>
        )}
        <Layout>
          <div className="top-section" id="cari-pekerjaan">
            {Mobile ? (
              <Heading3 color={Colors.neutral.greyish_brown}>
                Temukan Pekerjaan
              </Heading3>
            ) : (
              <Heading1
                color={Colors.neutral.greyish_brown}
                marginBottom={`16px`}
              >
                Temukan Pekerjaan
              </Heading1>
            )}
            {Mobile ? (
              <Heading3
                color={Colors.neutral.greyish_brown}
                marginBottom={`32px`}
              >
                Impianmu Mulai dari{" "}
                <span style={{ color: Colors.primary.mid_blue }}>
                  Karir.com
                </span>
              </Heading3>
            ) : (
              <Heading1
                color={Colors.neutral.greyish_brown}
                marginBottom={`40px`}
              >
                Impianmu Mulai dari{" "}
                <span style={{ color: Colors.primary.mid_blue }}>
                  Karir.com
                </span>
              </Heading1>
            )}
            {Mobile ? (
              <Heading5
                color={Colors.neutral.greyish_brown}
                marginBottom={`12px`}
              >
                Dapatkan pekerjaan cocok sesuai dengan profil Anda hari ini
              </Heading5>
            ) : (
              <Heading3
                color={Colors.neutral.greyish_brown}
                marginBottom={`16px`}
              >
                Dapatkan pekerjaan cocok sesuai dengan profil Anda hari ini
              </Heading3>
            )}
            <SearchBar
              inputValue={searchValue}
              inputValueLocation={searchLocationValue}
              setSearchValue={setSearchValue}
              handleChange={(value) => setSearchValue(value)}
              handleChangeLocation={(value) => setSearchLocationValue(value)}
              size={Mobile ? "small" : "large"}
              customStyle={{
                width: 164,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
              }}
              terakhirDilihat={CompanyList}
              riwayatPencarian={JobList}
              pencarianPopuler={popularSearch.data}
              searchResult={autocompleteSearch.data}
              searchResultLocation={masterLocations.data}
              isEmpty={
                autocompleteSearch.data?.job_position == null &&
                autocompleteSearch.data?.companies == null
              }
            />
            <div className="chip-stack">
              {Mobile ? (
                <Small color={Colors.neutral.brown_grey} flex="0 0 100%">
                  Pencarian Populer
                </Small>
              ) : (
                <Heading5
                  color={Colors.neutral.brown_grey}
                  marginRight={`12px`}
                >
                  Pencarian Populer
                </Heading5>
              )}
              {popularSearch.loading ? (
                <>
                  <ActionChip skeleton />
                  <ActionChip skeleton />
                  <ActionChip skeleton />
                  <ActionChip skeleton />
                  <ActionChip skeleton />
                </>
              ) : (
                popularSearch.data.map(
                  (el, idx) =>
                    idx < 5 && (
                      <ActionChip
                        key={idx}
                        onClick={() =>
                          router.push("/search-lowongan?keyword=" + el.keyword)
                        }
                        size="small"
                      >
                        {el.keyword}
                      </ActionChip>
                    )
                )
              )}
            </div>
          </div>
          <div id="kenapa-bergabung">
            {Mobile ? (
              <Heading5
                color={Colors.neutral.greyish_brown}
                align={`center`}
                marginBottom={`4px`}
              >
                Mengapa mencari pekerjaan di Karir.com?
              </Heading5>
            ) : (
              <Heading2
                color={Colors.neutral.greyish_brown}
                align={`center`}
                marginBottom={`40px`}
              >
                Mengapa mencari pekerjaan di Karir.com?
              </Heading2>
            )}
            {Mobile ? (
              <div className="why-join-carousel">
                {cards.map((el, idx) => (
                  <div className="card-mobile" key={idx}>
                    <img src={el.image} height={104} width={104} />
                    <Heading4
                      color={Colors.neutral.greyish_brown}
                      align={`center`}
                    >
                      {el.title}
                    </Heading4>
                    <Body3 color={Colors.neutral.brown_grey} align={`center`}>
                      {el.desc}
                    </Body3>
                  </div>
                ))}
              </div>
            ) : (
              <Row gutterWidth={24} style={{ marginBottom: `64px` }}>
                {cards.map((el, idx) => (
                  <Col lg={3} md={6} sm={6} xs={6} key={idx}>
                    <div className="card">
                      <img src={el.image} height={104} width={104} />
                      <Heading3
                        color={Colors.neutral.greyish_brown}
                        align={`center`}
                      >
                        {el.title}
                      </Heading3>
                      <Body1 color={Colors.neutral.brown_grey} align={`center`}>
                        {el.desc}
                      </Body1>
                    </div>
                  </Col>
                ))}
              </Row>
            )}
            <div className="company-section">
              {Mobile ? (
                <div>
                  <Heading4 color={Colors.neutral.brown_grey} align={`center`}>
                    Mudah Cari Lowongan
                  </Heading4>
                  <Heading5
                    color={Colors.neutral.greyish_brown}
                    align={`center`}
                  >
                    Lebih dari 500 Perusahaan Menanti Anda
                  </Heading5>
                </div>
              ) : (
                <div>
                  <Heading4 color={Colors.neutral.brown_grey} align={`center`}>
                    Mudah Cari Lowongan
                  </Heading4>
                  <Heading2
                    color={Colors.neutral.greyish_brown}
                    align={`center`}
                  >
                    Lebih dari 500 Perusahaan Menanti Anda
                  </Heading2>
                </div>
              )}
              <Row style={{ justifyContent: `center` }}>
                {images.map((el, idx) => {
                  if (
                    (Mobile || Tablet | SmallScreen) &&
                    idx < images.length - 2
                  ) {
                    return (
                      <Col
                        lg={2}
                        key={idx}
                        md={3}
                        sm={3}
                        xs={3}
                        style={{
                          width: Mobile && "25%",
                          maxWidth: Mobile && "25%",
                          flex: Mobile && "0 0 25%",
                        }}
                      >
                        <div className="image-company">
                          <img src={el} width={`100%`} height={`100%`} />
                        </div>
                      </Col>
                    );
                  }

                  if (MediumScreen || LargeScreen) {
                    return (
                      <Col lg={2} key={idx} md={3} sm={3} xs={3}>
                        <div className="image-company">
                          <img src={el} width={`100%`} height={`100%`} />
                        </div>
                      </Col>
                    );
                  }
                })}
              </Row>
              {!Mobile && (
                <div className="center-button">
                  <RectangleButton
                    variant="text"
                    size="large"
                    onClick={() =>
                      router.push("/search-lowongan?tab=perusahaan")
                    }
                  >
                    dan masih banyak lagi
                  </RectangleButton>
                </div>
              )}
            </div>
          </div>
        </Layout>
        <div
          className={MediumScreen ? "steps-section-2" : "steps-section"}
          id="dapatkan-pekerjaan"
        >
          <DesktopGrid>
            {Mobile ? (
              <Heading5 color={`white`} align={`center`}>
                Mulai Sekarang
              </Heading5>
            ) : (
              <Heading4 color={`white`} align={`center`}>
                Mulai Sekarang
              </Heading4>
            )}
            {Mobile ? (
              <Heading5 color={`white`} align={`center`} marginBottom={`12px`}>
                4 Langkah Mendapatkan Pekerjaan baru Anda
              </Heading5>
            ) : (
              <Heading2 color={`white`} align={`center`} marginBottom={`40px`}>
                4 Langkah Mendapatkan Pekerjaan baru Anda
              </Heading2>
            )}
            <Row
              style={{
                // width: "100%",
                justifyContent: "center",
                gap: MediumScreen ? 20 : 40,
              }}
            >
              <Hidden md sm xs>
                <Col lg={12} xl={5}>
                  <img
                    src={steps[step].image}
                    height={`348`}
                    width={`auto`}
                    style={{ display: "block", margin: "auto" }}
                  />
                </Col>
              </Hidden>
              <Col xs={12} sm={12} md={12} lg={12} xl={6}>
                <ListFitur
                  lists={steps}
                  selected={step}
                  setSelected={setStep}
                />
              </Col>
            </Row>
          </DesktopGrid>
        </div>
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
            <div className="blog-card-content">
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

        {!Mobile && (
          <>
            <div
              className={
                MediumScreen || LargeScreen
                  ? "empty-opportunities-section"
                  : "empty-opportunities-section-2"
              }
            >
              <div
                className={
                  MediumScreen || LargeScreen
                    ? "hardsell-container"
                    : "hardsell-container-2"
                }
              >
                <Heading4 color={Colors.neutral.brown_grey} align={`center`}>
                  Tunggu apa lagi
                </Heading4>
                <Heading2
                  color={Colors.neutral.greyish_brown}
                  align={`center`}
                  marginBottom={`40px`}
                >
                  Daftar dan dapatkan pekerjaan Anda hari ini
                </Heading2>
                <RectangleButton
                  size="large"
                  customStyle={{ width: 382, marginBottom: 16 }}
                  onClick={() => router.push("/register")}
                >
                  Buat Akun
                </RectangleButton>
                <RectangleButton
                  state="alternate"
                  size="large"
                  customStyle={{ width: 382 }}
                  onClick={() => router.push("/login")}
                >
                  Anda HR dan Membuka Lowongan?
                </RectangleButton>
              </div>
            </div>
            <Footer />
          </>
        )}
        <FloatingButton
          size={Mobile ? `small` : `medium`}
          onClick={() =>
            window.open(
              "https://api.whatsapp.com/send/?phone=6281314917268&text&type=phone_number&app_absent=0",
              "_blank"
            )
          }
        />
      </div>
    </>
  );
}
