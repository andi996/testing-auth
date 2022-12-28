import React, { useEffect, useState } from "react";
import { Col, Hidden, Row } from "react-grid-system";
import SocialCircleButton from "../../components/Atom/Button/CircleButton/Social";
import { Body2, Heading3, Heading4 } from "../../components/Atom/Typography";
import Layout from "../../components/Layout/Layout";
import Sidebar from "../../components/Molecul/Sidebar";
import Footer from "../../components/Organism/Footer";
import Header from "../../components/Organism/Header";
import HeaderCompany from "../../components/Organism/Header/HeaderCompany";
import { Colors, Elevation, Radius } from "../../themes";
import ReactPlayer from "react-player/lazy";
import JobCard from "../../components/Organism/Card/JobCard";
import RectangleButton from "../../components/Atom/Button/RectangleButton";
import ImageCarousel from "../../components/Molecul/ImageCarousel";
import GoogleMapComponent from "../../components/Atom/GoogleMap";
import Link from "react-scroll/modules/components/Link";
import useMediaQuery, {
  isLargeScreen,
  isMediumScreen,
  isMobile,
} from "../../utils/useMediaQuery";
import { getCompany } from "../../redux/action/CompanyActions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import parse from "html-react-parser";
// import { useParams } from "react-router";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const CarouselImages = [
  `https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80`,
  `https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80`,
  `https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80`,
  `https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80`,
  `https://thumbs.dreamstime.com/b/stunning-landscape-iamge-river-flowing-lush-green-forest-summer-61650087.jpg`,
  `https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg`,
  `https://www.ilmubahasainggris.com/wp-content/uploads/2017/03/NGC.jpg`,
];

export default function CompanyDetailPage() {
  const router = useRouter();
  const companyId = parseInt(router?.query?.index);
  const Mobile = isMobile();
  const MediumScreen = isMediumScreen();
  const LargeScreen = isLargeScreen();
  const SpecialScreen = useMediaQuery("(max-width: 1008px)");
  // const [scrollTop, setScrollTop] = useState(0);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" && window.screen.availWidth
  );
  const [sidebar, setSidebar] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);

  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state?.company);

  moment.locale("id");
  useEffect(() => {
    if (companyId) dispatch(getCompany(companyId));
  }, [companyId]);

  useEffect(() => {
    const terakhirDilihat = Cookies.get("terakhir_dilihat")
      ? JSON.parse(Cookies.get("terakhir_dilihat"))
      : [];
    if (!loading && data) {
      let newData = true;
      terakhirDilihat.map((el) => {
        if (el.url === `/company-detail/${data.id}`) newData = false;
      });
      if (newData) {
        if (terakhirDilihat.length > 3) {
          terakhirDilihat.shift();
          terakhirDilihat.push({
            url: "/company-detail/" + data.id,
            title: data.name,
          });
        } else {
          terakhirDilihat.push({
            url: "/company-detail/" + data.id,
            title: data.name,
          });
        }
      }
      Cookies.set("terakhir_dilihat", JSON.stringify(terakhirDilihat));
    }
  }, [loading]);

  useEffect(() => {
    if (SpecialScreen && typeof window !== "undefined")
      setScreenWidth(window.screen.availWidth - 368);
  }, [SpecialScreen]);

  useEffect(() => {
    const onResize = (e) => {
      setScreenWidth(e.target.screen.availWidth - 307);
    };
    // console.log(screenWidth);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [screenWidth]);

  return (
    <>
      <style jsx>
        {`
          .body {
            background: url("/images/Principle/Background/Light Blue Desktop.png")
              no-repeat top;
            background-size: 100%;
          }
          .content-container {
            display: flex;
            flex-direction: column;
          }
          .header-container {
            display: flex;
            alignitems: center;
            // margin-top: 24px;
            margin-bottom: 24px;
          }
          .container-top {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 24px;
            // position: static;
            margin-bottom: 16px;
            background-color: white;
            border-radius: ${Radius.medium};
            box-shadow: ${Elevation.card};
            max-width: 894px;
            // margin-top: scrollTop > 220 && 60px;
          }
          .container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 24px;
            // position: static;
            max-width: 894px;
            margin-bottom: 16px;
            background-color: white;
            border-radius: ${Radius.medium};
            box-shadow: ${Elevation.card};
          }
          .container-small {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 24px;
            position: static;
            margin-bottom: 16px;
            background-color: white;
            border-radius: ${Radius.medium};
            box-shadow: ${Elevation.card};
          }
          .center-button {
            display: block;
            margin: auto;
            margin-top: -12px;
            margin-bottom: -4px;
          }
          .header-sticky {
            display: flex;
            position: sticky;
            top: 80px;
            z-index: 13;
            margin-bottom: 24px;
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
          ul {
            padding: 0 24px;
            margin-block-start: 0;
            margin-block-end: 0;
          }
        `}
      </style>
      <div className="body">
        <Header
          variant="action"
          title="Microsoft Indonesia"
          state="sticky"
        ></Header>
        <Layout>
          <div className={(MediumScreen || LargeScreen) && "header-container"}>
            <HeaderCompany
              size={MediumScreen || LargeScreen ? "large" : "small"}
              variant={"With Image"}
              image="https://img.freepik.com/free-psd/real-estate-house-property-web-banner-template_120329-1947.jpg"
              title={data?.name}
              location={data?.location?.name}
              website={data?.website}
              btnText={data?.subscribed ? "Subscribed" : "Subscribe"}
              subscribed={data?.subscribed}
            />
          </div>
          {(MediumScreen || LargeScreen) && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 24,
              }}
            >
              <div className="sidebar">
                {/* --------------SIDEBAR---------------- */}

                <Sidebar>
                  <Link
                    to="informasi-perusahaan"
                    spy={true}
                    smooth={true}
                    offset={-110}
                    onSetActive={() =>
                      setSidebar([true, false, false, false, false, false])
                    }
                    style={{ width: `100%`, marginBottom: 8 }}
                  >
                    <Sidebar.Content isSelected={sidebar[0]}>
                      Informasi Perusahaan
                    </Sidebar.Content>
                  </Link>
                  <Link
                    to="tentang-perusahaan"
                    spy={true}
                    smooth={true}
                    offset={-110}
                    onSetActive={() =>
                      setSidebar([false, true, false, false, false, false])
                    }
                    style={{ width: `100%`, marginBottom: 8 }}
                  >
                    <Sidebar.Content
                      notification={false}
                      isSelected={sidebar[1]}
                    >
                      Tentang Perusahaan
                    </Sidebar.Content>
                  </Link>
                  <Link
                    to="visi-misi"
                    spy={true}
                    smooth={true}
                    offset={-110}
                    onSetActive={() =>
                      setSidebar([false, false, true, false, false, false])
                    }
                    style={{ width: "100%", marginBottom: 8 }}
                  >
                    <Sidebar.Content
                      notification={false}
                      isSelected={sidebar[2]}
                    >
                      Visi dan Misi
                    </Sidebar.Content>
                  </Link>
                  <Link
                    to="culture-benefit"
                    spy={true}
                    smooth={true}
                    offset={-110}
                    onSetActive={() =>
                      setSidebar([false, false, false, true, false, false])
                    }
                    style={{ width: `100%`, marginBottom: 8 }}
                  >
                    <Sidebar.Content
                      notification={false}
                      isSelected={sidebar[3]}
                    >
                      Culture dan Benefit
                    </Sidebar.Content>
                  </Link>
                  <Link
                    to="foto-video"
                    spy={true}
                    smooth={true}
                    offset={-110}
                    onSetActive={() =>
                      setSidebar([false, false, false, false, true, false])
                    }
                    style={{ width: `100%`, marginBottom: 8 }}
                  >
                    <Sidebar.Content
                      notification={false}
                      isSelected={sidebar[4]}
                    >
                      Foto dan Video Perusahaan
                    </Sidebar.Content>
                  </Link>
                  <Link
                    to="lowongan-kerja"
                    spy={true}
                    smooth={true}
                    offset={-110}
                    onSetActive={() =>
                      setSidebar([false, false, false, false, false, true])
                    }
                    style={{ width: `100%` }}
                  >
                    <Sidebar.Content
                      notification={false}
                      isSelected={sidebar[5]}
                    >
                      Lowongan Kerja di Microsoft
                    </Sidebar.Content>
                  </Link>
                </Sidebar>
                {/* --------------END SIDEBAR---------------- */}
              </div>
              <div className="content-container" style={{ width: screenWidth }}>
                <div className="container-top" id="informasi-perusahaan">
                  <Heading3
                    color={Colors.secondary.clear_blue}
                    marginBottom="16px"
                  >
                    Informasi Perusahaan
                  </Heading3>
                  <Row style={{ marginBottom: 16, width: `100%` }}>
                    <Col>
                      <Heading4 color={Colors.neutral.greyish_brown}>
                        Industri
                      </Heading4>
                      <Body2
                        color={Colors.neutral.brown_light_grey}
                        marginBottom="16px"
                      >
                        Teknologi Informatika
                      </Body2>
                      <Heading4 color={Colors.neutral.greyish_brown}>
                        Hari Kerja
                      </Heading4>
                      <Body2 color={Colors.neutral.brown_light_grey}>
                        {data?.start_working_day === 1
                          ? "Senin"
                          : data?.start_working_day === 2
                          ? "Selasa"
                          : data?.start_working_day === 3
                          ? "Rabu"
                          : data?.start_working_day === 4
                          ? "Kamis"
                          : data?.start_working_day === 5
                          ? "Jumat"
                          : data?.start_working_day === 6
                          ? "Sabtu"
                          : "Minggu"}{" "}
                        -{" "}
                        {data?.end_working_day === 1
                          ? "Senin"
                          : data?.end_working_day === 2
                          ? "Selasa"
                          : data?.end_working_day === 3
                          ? "Rabu"
                          : data?.end_working_day === 4
                          ? "Kamis"
                          : data?.end_working_day === 5
                          ? "Jumat"
                          : data?.end_working_day === 6
                          ? "Sabtu"
                          : "Minggu"}
                      </Body2>
                    </Col>
                    <Col>
                      <Heading4 color={Colors.neutral.greyish_brown}>
                        Jumlah Karyawan
                      </Heading4>
                      <Body2
                        color={Colors.neutral.brown_light_grey}
                        marginBottom="16px"
                      >
                        {data?.company_size ? data?.company_size : ">0 Orang"}
                      </Body2>
                      <Heading4 color={Colors.neutral.greyish_brown}>
                        Jam Kerja
                      </Heading4>
                      <Body2 color={Colors.neutral.brown_light_grey}>
                        {moment(data?.start_working_time).format("hh:mm")} -{" "}
                        {moment(data?.end_working_time).format("hh:mm")} WIB
                      </Body2>
                    </Col>
                    <Col>
                      <Heading4 color={Colors.neutral.greyish_brown}>
                        Dress Code
                      </Heading4>
                      <Body2
                        color={Colors.neutral.brown_light_grey}
                        marginBottom="16px"
                      >
                        {data?.dress_code ? data?.dress_code : "Casual"}
                      </Body2>
                    </Col>
                  </Row>
                  <div className="d-flex">
                    <SocialCircleButton variant="linkedin" />
                    <SocialCircleButton variant="instagram" />
                    <SocialCircleButton variant="facebook" />
                    <SocialCircleButton variant="twitter" />
                    <SocialCircleButton variant="tiktok" />
                  </div>
                </div>

                <div className="container" id="tentang-perusahaan">
                  <Heading3
                    color={Colors.secondary.clear_blue}
                    marginBottom="16px"
                  >
                    Tentang Perusahaan
                  </Heading3>
                  <Body2
                    marginBottom="16px"
                    color={Colors.neutral.brown_light_grey}
                    textAlign={`justify`}
                  >
                    {data?.description}
                  </Body2>
                  <Heading3
                    color={Colors.secondary.clear_blue}
                    marginBottom="16px"
                  >
                    Lokasi
                  </Heading3>
                  <Row style={{ marginBottom: 16 }}>
                    <Col lg={4}>
                      <Heading4 color={Colors.neutral.greyish_brown}>
                        Kota
                      </Heading4>
                      <Body2 color={Colors.neutral.brown_light_grey}>
                        {data?.location.name}
                      </Body2>
                    </Col>
                    <Col lg={8}>
                      <Heading4 color={Colors.neutral.greyish_brown}>
                        Alamat
                      </Heading4>
                      <Body2 color={Colors.neutral.brown_light_grey}>
                        {data?.address}
                      </Body2>
                    </Col>
                  </Row>
                  <Heading4
                    color={Colors.neutral.greyish_brown}
                    marginBottom="8px"
                  >
                    Peta
                  </Heading4>
                  <GoogleMapComponent
                    isMarkerShown={true}
                    // onMarkerClick={this.handleMarkerClick}
                  />
                </div>
                <div className="container" id="visi-misi">
                  <Heading3
                    color={Colors.secondary.clear_blue}
                    marginBottom="16px"
                  >
                    Visi
                  </Heading3>
                  <Body2
                    marginBottom="16px"
                    color={Colors.neutral.brown_light_grey}
                  >
                    {data?.vision_mission}
                  </Body2>
                  <Heading3
                    color={Colors.secondary.clear_blue}
                    marginBottom="16px"
                  >
                    Misi
                  </Heading3>
                  <Body2 color={Colors.neutral.brown_light_grey}>
                    Microsoft's mission statement is “to empower every person
                    and every organization on the planet to achieve more.”
                    'Empowerment' is the key term in this mission statement. It
                    represents the primary objective of the company and what the
                    strategic tactics of the organization seek to achieve.
                  </Body2>
                </div>
                <div className="container" id="culture-benefit">
                  <Heading3
                    color={Colors.secondary.clear_blue}
                    marginBottom="16px"
                  >
                    Culture
                  </Heading3>
                  <Body2
                    marginBottom="16px"
                    color={Colors.neutral.brown_light_grey}
                  >
                    Microsoft employees are passionate about giving time, money,
                    and skills to address the issues facing our world. Giving is
                    ingrained in our culture—it’s how we live our mission to
                    empower every person on the planet to achieve more.
                  </Body2>
                  <Heading3
                    color={Colors.secondary.clear_blue}
                    marginBottom="16px"
                  >
                    Benefit
                  </Heading3>
                  <Row>
                    <Col>
                      <ul>
                        <li>
                          <Body2 color={Colors.neutral.brown_light_grey}>
                            Transportasi
                          </Body2>
                        </li>
                        <li>
                          <Body2 color={Colors.neutral.brown_light_grey}>
                            Rumah
                          </Body2>
                        </li>
                        <li>
                          <Body2 color={Colors.neutral.brown_light_grey}>
                            Pendidikan
                          </Body2>
                        </li>
                        <li>
                          <Body2 color={Colors.neutral.brown_light_grey}>
                            Komunikasi
                          </Body2>
                        </li>
                      </ul>
                    </Col>
                    <Col>
                      <ul>
                        <li>
                          <Body2 color={Colors.neutral.brown_light_grey}>
                            Transportasi
                          </Body2>
                        </li>
                        <li>
                          <Body2 color={Colors.neutral.brown_light_grey}>
                            Rumah
                          </Body2>
                        </li>
                        <li>
                          <Body2 color={Colors.neutral.brown_light_grey}>
                            Pendidikan
                          </Body2>
                        </li>
                        <li>
                          <Body2 color={Colors.neutral.brown_light_grey}>
                            Komunikasi
                          </Body2>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </div>
                <div className="container" id="foto-video">
                  <Heading3
                    color={Colors.secondary.clear_blue}
                    marginBottom="16px"
                  >
                    Foto Perusahaan
                  </Heading3>
                  <ImageCarousel images={CarouselImages} />
                  <Heading3
                    color={Colors.secondary.clear_blue}
                    marginBottom="16px"
                    marginTop="32px"
                  >
                    Video Perusahaan
                  </Heading3>
                  <div style={{ display: `block`, margin: `auto` }}>
                    <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
                  </div>
                </div>
                <div className="container" id="lowongan-kerja">
                  <Heading3
                    color={Colors.secondary.clear_blue}
                    marginBottom="16px"
                  >
                    Lowongan Kerja di Microsoft
                  </Heading3>
                  <Row style={{ marginBottom: 12 }} gutterWidth={24}>
                    <Col lg={6}>
                      <JobCard
                        fullWidth
                        title="UI/UX Designer"
                        company="PT. Qerja Manfaat Bangsa"
                        salary="Rp 9,5 juta - 15,6 juta/bulan"
                        description="Jakarta Selatan • Fulltime • Remote "
                        profileMatch={59}
                        timestamp="5 jam lalu"
                        margin="0 0 24px 0"
                      />
                    </Col>
                    <Col lg={6}>
                      <JobCard
                        fullWidth
                        title="UI/UX Designer"
                        company="PT. Qerja Manfaat Bangsa"
                        salary="Rp 9,5 juta - 15,6 juta/bulan"
                        description="Jakarta Selatan • Fulltime • Remote "
                        profileMatch={59}
                        timestamp="5 jam lalu"
                        margin="0 0 24px 0"
                      />
                    </Col>
                    <Col lg={6}>
                      <JobCard
                        fullWidth
                        title="UI/UX Designer"
                        company="PT. Qerja Manfaat Bangsa"
                        salary="Rp 9,5 juta - 15,6 juta/bulan"
                        description="Jakarta Selatan • Fulltime • Remote "
                        profileMatch={59}
                        timestamp="5 jam lalu"
                        margin="0 0 24px 0"
                      />
                    </Col>
                    <Col lg={6}>
                      <JobCard
                        fullWidth
                        title="UI/UX Designer"
                        company="PT. Qerja Manfaat Bangsa"
                        salary="Rp 9,5 juta - 15,6 juta/bulan"
                        description="Jakarta Selatan • Fulltime • Remote "
                        profileMatch={59}
                        timestamp="5 jam lalu"
                        margin="0 0 24px 0"
                      />
                    </Col>
                    <Col lg={6}>
                      <JobCard
                        fullWidth
                        title="UI/UX Designer"
                        company="PT. Qerja Manfaat Bangsa"
                        salary="Rp 9,5 juta - 15,6 juta/bulan"
                        description="Jakarta Selatan • Fulltime • Remote "
                        profileMatch={59}
                        timestamp="5 jam lalu"
                        margin="0 0 24px 0"
                      />
                    </Col>
                    <Col lg={6}>
                      <JobCard
                        fullWidth
                        title="UI/UX Designer"
                        company="PT. Qerja Manfaat Bangsa"
                        salary="Rp 9,5 juta - 15,6 juta/bulan"
                        description="Jakarta Selatan • Fulltime • Remote "
                        profileMatch={59}
                        timestamp="5 jam lalu"
                        margin="0 0 24px 0"
                      />
                    </Col>
                  </Row>
                  <div className="center-button">
                    <RectangleButton
                      variant="ghost"
                      customStyle={{ width: 240 }}
                    >
                      Lihat Semua Pekerjaan
                    </RectangleButton>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Layout>
        {!Mobile && <Footer />}
      </div>
    </>
  );
}
