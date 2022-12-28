import React, { useEffect, useState, useRef } from "react";
import { Colors, Elevation, Radius } from "../../../themes";
import {
  Body1,
  Body2,
  Body3,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "../../Atom/Typography";
import Images from "../../Atom/Image";
import RectangleAvatar from "../../Atom/Avatar/Rectangle";
import RectangleButton from "../../Atom/Button/RectangleButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Box, Tab } from "@mui/material";
import PropTypes from "prop-types";
import TabLeft from "../../Molecul/Tab/TabLeft";
import { styled } from "@mui/system";
import { Col, Row } from "react-grid-system";
import SocialCircleButton from "../../Atom/Button/CircleButton/Social";
import GoogleMapComponent from "../../Atom/GoogleMap";
// import JobCard from "../Card/JobCard";
import ReactPlayer from "react-player";
// import Column from "../../Layout/Grid/Column";
import ImageCarousel from "../../Molecul/ImageCarousel";
import useOutsideAlerter from "../../../utils/handleClickOutside";
import ModalPopup from "./ModalPopup";
import JobCard from "../Card/JobCard";
import { isMobile } from "../../../utils/useMediaQuery";
import { useInView } from "react-intersection-observer";
import BottomSheet from "../Bottom Sheet";
import { Flag, Share } from "@mui/icons-material";
import InputTextArea from "../../Atom/Input Field/TextArea";
import RadioButton from "../../Atom/Selection Control/Radio";
import InputPictureField from "../../Atom/Input Field/PictureField";
import Toaster from "../../Molecul/Toaster";

const CarouselImages = [
  `https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80`,
  `https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80`,
  `https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80`,
  `https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80`,
  `https://thumbs.dreamstime.com/b/stunning-landscape-iamge-river-flowing-lush-green-forest-summer-61650087.jpg`,
  `https://cdn.pixab
  ay.com/photo/2015/04/23/22/00/tree-736885__480.jpg`,
  `https://www.ilmubahasainggris.com/wp-content/uploads/2017/03/NGC.jpg`,
];

const DropDownList = styled("ul")`
  position: absolute;
  right: 0;
  background-color: white;
  min-width: 220px;
  overflow: auto;
  box-shadow: ${Elevation.navigationMenu};
  border: 0.5px solid #d2d2d2;
  z-index: 12;
  margin-top: 24px;
  // margin-top: 80px;
  margin-left: 48px;
  padding: 4px;

  list-style: none;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }
`;

const ListItem = styled("li")`
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    cursor: pointer;
    color: ${Colors.neutral.brown_grey} 

    :active {
      background-color: ${Colors.primary.mid_blue};
      color: white;
      border-radius: 8px;
    }

    :hover {
      background-color: ${Colors.primary.mid_blue};
      color: white;
      border-radius: 8px;
    }

    &.active {
      background-color: ${Colors.primary.mid_blue};
      color: white;
      border-radius: 8px;
    }
  `;
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

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ Mobile }) => ({
    textTransform: "none",
    color: Colors.neutral.brown_grey,
    "&.Mui-selected": {
      color: Colors.primary.mid_blue,
    },

    minWidth: 32,
    minHeight: Mobile ? 20 : 24,
    padding: Mobile ? "10px 8px" : "14px 16px",
    ":first-child": { paddingLeft: Mobile ? 16 : 24 },
    paddingTop: 0,
  })
);

export default function HeaderCompany(props) {
  const {
    size = `small`,
    variant = `Default`,
    title,
    category,
    location,
    website,
    image = "/images/Principle/Background/Cover.png",
    btnText,
    subscribed,
  } = props;

  const Mobile = isMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [shareToaster, setShareToaster] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [tab, setTab] = useState(0);
  const [imageFilled, setImageFilled] = useState(0);
  const [description, setDescription] = useState("");
  const [submitLaporan, setSubmitLaporan] = useState(false);

  const handleChange = (event, newValue) => {
    setTab(newValue);
    var wrapper = document.querySelector("#company-header-wrapper");
    var element = document.getElementById(`menu-${newValue}`);
    if (wrapper) {
      wrapper.scroll({ top: element?.offsetTop - 15, behavior: "smooth" });
    } else {
      window.scrollTo({ top: element?.offsetTop - 100, behavior: "smooth" });
    }
  };
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setIsOpen);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [imageValue, setImageValue] = useState([false, false, false]);

  function getBase64(e, index) {
    var file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let newValue = [...imageValue];
      newValue[index] = reader.result;
      setImageValue(newValue);
      setImageFilled(index + 1);
    };

    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  return (
    <>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: ${variant === `With Image` ? `column` : `column`};
            align-items: flex-start;
            box-shadow: ${Elevation.card};
            position: relative;
            border-radius: ${Mobile ? 0 : "8px"};
            // padding: 24px;
            background: white;
            width: 100%;
          }
          .center-button {
            display: block;
            margin: auto;
            margin-top: -12px;
            margin-bottom: -4px;
          }
          .wrapper-container {
            width: 100%;
          }
          .wrapper-company {
            display: flex;
            width: 100%;
            padding: ${Mobile ? "8px 16px" : "16px 24px"};
          }
          .wrapper-company-detail {
            display: flex;
            align-items: ${Mobile ? "flex-start" : "center"};
            gap: ${Mobile ? "4px" : "12px"};
            flex-direction: ${Mobile ? "column" : "row"};
            width: 100%;
          }

          .logo-company {
            // margin-right: 24px;
            // padding: 12px 12px 12px 24px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: ${(size === `small` && `center`) ||
            (size === `large` && `center`)};
          }
          .wrapper-info {
            width: 100%;
            display: flex;
            justify-content: space-between;
            // flex-direction: ${Mobile ? "column" : "row"};
          }
          .info-company {
            width: 100%;
            // padding: 12px 0;
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: ${(size === `small` && `center`) ||
            (size === `large` && `center`)};
          }
          .button-right {
            display: flex;
            // padding: 12px 24px 12px 0;
            flex-direction: column;
            align-items: flex-end;
            justify-content: space-between;
            cursor: pointer;
            // height: 100%;

            position: relative;
          }
          .menu-company {
            display: flex;
            flex-direction: row;
            list-style: none;
            overflow: auto;
            white-space: nowrap;
            scrollbar-width: none;
            width: 100%;
          }

          .menu-company::-webkit-scrollbar {
            display: none;
          }

          ul {
            padding: 0 24px;
            margin-block-start: 0;
            margin-block-end: 0;
          }
          .tab {
            display: flex;
            flex: 1;
            max-width: 100%;
            color: ${Colors.primary.mid_blue};
            text-transform: none !important;
            margin-top: -30px;
          }
          .container2 {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: ${Mobile ? "16px" : "24px"};
            position: static;
            margin-bottom: ${Mobile ? "8px" : "16px"};
            background-color: white;
            border-radius: ${!Mobile && Radius.medium};
            box-shadow: ${Elevation.card};
          }
          image-carousel {
            display: block;
            margin: auto;
            border-radius: ${Radius.medium};
            width: 600px;
            height: 282px;
            object-fit: cover;
          }
          .slider-mobile {
            width: 100%;
            overflow-x: auto;
            display: flex;
            gap: 12px;
            ::-webkit-scrollbar-thumb {
              display: none;
            }
          }
          .content-information {
            margin-bottom: 16px;
            height: 52px;
          }
        `}
      </style>

      <div className="container">
        <div className="wrapper-container" ref={ref}>
          {variant === `With Image` ? (
            <div>
              <Images
                variant="4:1"
                size={Mobile ? "small" : "large"}
                image={image}
              ></Images>
            </div>
          ) : null}
          <div className="wrapper-company">
            <div className="wrapper-company-detail">
              <div className="logo-company">
                <RectangleAvatar state="karir" type="white" />
              </div>
              <div className="info-company">
                {Mobile ? (
                  <Heading5
                    color={Colors.neutral.greyish_brown}
                    style={{
                      overflow: `hidden`,
                      whiteSpace: `nowrap`,
                      textOverflow: `ellipsis`,
                      width: `100%`,
                      color: Colors.neutral.greyish_brown,
                    }}
                  >
                    {title}
                  </Heading5>
                ) : (
                  <Heading3
                    color={Colors.neutral.greyish_brown}
                    style={{
                      overflow: `hidden`,
                      whiteSpace: `nowrap`,
                      textOverflow: `ellipsis`,
                      width: `100%`,
                      color: Colors.neutral.greyish_brown,
                    }}
                  >
                    {title}
                  </Heading3>
                )}
                {Mobile ? (
                  <>
                    <Body3 color={Colors.neutral.brown_grey}>{location}</Body3>
                    <Body3
                      color={Colors.secondary.clear_blue}
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                    >
                      {website}
                    </Body3>
                  </>
                ) : (
                  <>
                    <Body2 color={Colors.neutral.brown_grey}>{location}</Body2>
                    <Body2
                      color={Colors.secondary.clear_blue}
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                    >
                      {website}
                    </Body2>
                  </>
                )}
              </div>
            </div>
            <div className="button-right" ref={wrapperRef}>
              <div onClick={() => setIsOpen(!isOpen)}>
                <MoreHorizIcon />
              </div>
              {Mobile ? (
                <BottomSheet
                  variant="list"
                  onClose={setIsOpen}
                  visible={isOpen}
                >
                  <div
                    className="d-flex"
                    style={{ padding: `16px 0` }}
                    key="share"
                    onClick={() => {
                      setIsOpen(false);
                      setShareToaster(true);
                    }}
                  >
                    <Share
                      style={{
                        color: Colors.primary.mid_blue,
                        marginRight: "32px",
                      }}
                    />
                    <Body1 color={Colors.primary.mid_blue}>Share</Body1>
                  </div>
                  <div
                    className="d-flex"
                    style={{ padding: `16px 0` }}
                    key="lapor lowongan"
                  >
                    <img
                      src="/images/Principle/Logo/FlagRed.svg"
                      className="icon"
                      alt="flagRed.svg"
                      style={{
                        marginRight: "32px",
                      }}
                    />
                    <Body1
                      color={Colors.secondary.red}
                      onClick={() => {
                        setIsOpen(false);
                        setIsShow(true);
                      }}
                    >
                      Lapor Lowongan
                    </Body1>
                  </div>
                </BottomSheet>
              ) : (
                isOpen && (
                  <DropDownList>
                    <ListItem
                      onClick={() => setShareToaster(true)}
                      // className={option == selectedOption ? "active" : null}
                    >
                      Share
                    </ListItem>
                    <ListItem
                      onClick={() => setIsShow(true)}
                      // className={option == selectedOption ? "active" : null}
                    >
                      Lapor Lowongan
                    </ListItem>
                  </DropDownList>
                )
              )}
              <RectangleButton
                size={Mobile ? "small" : "medium"}
                customStyle={{
                  borderRadius: 4,
                  width: Mobile ? 80 : 160,
                  height: Mobile ? 32 : 40,
                }}
                variant={subscribed ? "ghost" : "filled"}
              >
                {btnText}
              </RectangleButton>
            </div>
          </div>
        </div>

        {(size === "small" || Mobile) && (
          <div
            style={{
              maxWidth: `100%`,
              marginTop: inView && Mobile ? 16 : 0,
              top: inView && Mobile ? 0 : 56,
              left: 0,
              position: inView && Mobile ? "relative" : "fixed",
              background: "white",
              zIndex: 99,
            }}
          >
            <TabLeft
              value={tab}
              onChange={handleChange}
              indicatorSpanStyles={{ maxWidth: "80%" }}
              fullWidth
            >
              <AntTab
                Mobile={Mobile}
                size={size}
                value={0}
                label={
                  Mobile ? (
                    <Heading6>Informasi Perusahaan</Heading6>
                  ) : (
                    <Heading5>Informasi Perusahaan</Heading5>
                  )
                }
                {...a11yProps(0)}
              />
              <AntTab
                Mobile={Mobile}
                size={size}
                value={1}
                label={
                  Mobile ? (
                    <Heading6>Tentang Perusahaan</Heading6>
                  ) : (
                    <Heading5>Tentang Perusahaan</Heading5>
                  )
                }
                {...a11yProps(1)}
              />
              <AntTab
                Mobile={Mobile}
                size={size}
                value={2}
                label={
                  Mobile ? (
                    <Heading6>Visi dan Misi</Heading6>
                  ) : (
                    <Heading5>Visi dan Misi</Heading5>
                  )
                }
                {...a11yProps(2)}
              />
              <AntTab
                Mobile={Mobile}
                size={size}
                value={3}
                label={
                  Mobile ? (
                    <Heading6>Culture dan Benefit</Heading6>
                  ) : (
                    <Heading5>Culture dan Benefit</Heading5>
                  )
                }
                {...a11yProps(3)}
              />
              <AntTab
                Mobile={Mobile}
                size={size}
                value={4}
                label={
                  Mobile ? (
                    <Heading6>Foto dan Video Perusahaan</Heading6>
                  ) : (
                    <Heading5>Foto dan Video Perusahaan</Heading5>
                  )
                }
                {...a11yProps(4)}
              />
              <AntTab
                Mobile={Mobile}
                size={size}
                value={5}
                label={
                  Mobile ? (
                    <Heading6>Lowongan Kerja</Heading6>
                  ) : (
                    <Heading5>Lowongan Kerja</Heading5>
                  )
                }
                {...a11yProps(5)}
              />
            </TabLeft>
          </div>
        )}
      </div>

      {(size === "small" || Mobile) && (
        <div style={{ marginTop: 16 }}>
          <TabPanel value={0} index={0}>
            {Mobile ? (
              <>
                <div id="menu-0" className="container2">
                  <Heading5
                    color={Colors.secondary.clear_blue}
                    marginBottom="16px"
                  >
                    Informasi Perusahaan
                  </Heading5>
                  <Row style={{ marginBottom: 16, width: `100%` }}>
                    <Col>
                      <div className="content-information">
                        <Heading6 color={Colors.neutral.greyish_brown}>
                          Industri
                        </Heading6>
                        <Body3 color={Colors.neutral.brown_light_grey}>
                          Teknologi Informatika
                        </Body3>
                      </div>
                      <Heading6 color={Colors.neutral.greyish_brown}>
                        Hari Kerja
                      </Heading6>
                      <Body3 color={Colors.neutral.brown_light_grey}>
                        Senin - Jumat
                      </Body3>
                    </Col>
                    <Col>
                      <div className="content-information">
                        <Heading6 color={Colors.neutral.greyish_brown}>
                          Jumlah Karyawan
                        </Heading6>
                        <Body3
                          color={Colors.neutral.brown_light_grey}
                          marginBottom="16px"
                        >
                          {`>100 orang`}
                        </Body3>
                      </div>
                      <Heading6 color={Colors.neutral.greyish_brown}>
                        Jam Kerja
                      </Heading6>
                      <Body3 color={Colors.neutral.brown_light_grey}>
                        08:00 - 17:00 WIB
                      </Body3>
                    </Col>
                    <Col>
                      <Heading6 color={Colors.neutral.greyish_brown}>
                        Dress Code
                      </Heading6>
                      <Body3
                        color={Colors.neutral.brown_light_grey}
                        marginBottom="16px"
                      >
                        Casual
                      </Body3>
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
                <div id="menu-1" className="container2">
                  <Heading5
                    color={Colors.secondary.clear_blue}
                    marginBottom="16px"
                  >
                    Tentang Perusahaan
                  </Heading5>
                  <Body3
                    marginBottom="16px"
                    color={Colors.neutral.brown_light_grey}
                    textAlign={`justify`}
                  >
                    Microsoft Corporation is an American multinational
                    technology corporation which produces computer software,
                    consumer electronics, personal computers, and related
                    services. Its best known software products are the Microsoft
                    Windows line of operating systems, the Microsoft Office
                    suite, and the Internet Explorer and Edge web browsers. Its
                    flagship hardware products are the Xbox video game consoles
                    and the Microsoft Surface lineup of touchscreen personal
                    computers. Microsoft ranked No. 21 in the 2020 Fortune 500
                    rankings of the largest United States corporations by total
                    revenue; it was the world's largest software maker by
                    revenue as of 2016. It is considered one of the Big Five
                    companies in the U.S. information technology industry, along
                    with Amazon, Google (Alphabet), Apple, and Facebook (Meta).
                  </Body3>
                  <Heading5
                    color={Colors.secondary.clear_blue}
                    marginBottom="16px"
                  >
                    Lokasi
                  </Heading5>
                  <Row style={{ marginBottom: 16 }}>
                    <Col lg={4}>
                      <Heading6 color={Colors.neutral.greyish_brown}>
                        Kota
                      </Heading6>
                      <Body3
                        color={Colors.neutral.brown_light_grey}
                        marginBottom="16px"
                      >
                        Jakarta Selatan, Indonesia
                      </Body3>
                    </Col>
                    <Col lg={8}>
                      <Heading6 color={Colors.neutral.greyish_brown}>
                        Alamat
                      </Heading6>
                      <Body3 color={Colors.neutral.brown_light_grey}>
                        Jakarta Stock Exchange Building Tower II, lantai 18
                        Sudirman Central Business District, Jl. Jend. Sudirman
                        No.Kav. 52-53, RT.5/RW.3, Senayan, Kec. Kby. Baru, Kota
                        Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12190
                      </Body3>
                    </Col>
                  </Row>
                  <Heading6
                    color={Colors.neutral.greyish_brown}
                    marginBottom="8px"
                  >
                    Peta
                  </Heading6>
                  <GoogleMapComponent
                    isMarkerShown={true}
                    // onMarkerClick={this.handleMarkerClick}
                  />
                </div>
                <div id="menu-2" className="container2">
                  <Heading5
                    color={Colors.secondary.clear_blue}
                    marginBottom="16px"
                  >
                    Visi
                  </Heading5>
                  <Body3
                    marginBottom="16px"
                    color={Colors.neutral.brown_light_grey}
                  >
                    Microsoft's corporate vision is “to help people and
                    businesses throughout the world realize their full
                    potential.” This vision statement shows that the company
                    presents its business and computing products as tools that
                    people and business organizations can use for their
                    development.
                  </Body3>
                  <Heading5
                    color={Colors.secondary.clear_blue}
                    marginBottom="16px"
                  >
                    Misi
                  </Heading5>
                  <Body3 color={Colors.neutral.brown_light_grey}>
                    Microsoft's mission statement is “to empower every person
                    and every organization on the planet to achieve more.”
                    'Empowerment' is the key term in this mission statement. It
                    represents the primary objective of the company and what the
                    strategic tactics of the organization seek to achieve.
                  </Body3>
                </div>
                <div id="menu-3" className="container2">
                  <Heading5
                    color={Colors.secondary.clear_blue}
                    marginBottom="16px"
                  >
                    Culture
                  </Heading5>
                  <Body3
                    marginBottom="16px"
                    color={Colors.neutral.brown_light_grey}
                  >
                    Microsoft employees are passionate about giving time, money,
                    and skills to address the issues facing our world. Giving is
                    ingrained in our culture—it’s how we live our mission to
                    empower every person on the planet to achieve more.
                  </Body3>
                  <Heading5
                    color={Colors.secondary.clear_blue}
                    marginBottom="16px"
                  >
                    Benefit
                  </Heading5>
                  <Row>
                    <Col>
                      <ul>
                        <li>
                          <Body3 color={Colors.neutral.brown_light_grey}>
                            Transportasi
                          </Body3>
                        </li>
                        <li>
                          <Body3 color={Colors.neutral.brown_light_grey}>
                            Rumah
                          </Body3>
                        </li>
                        <li>
                          <Body3 color={Colors.neutral.brown_light_grey}>
                            Pendidikan
                          </Body3>
                        </li>
                        <li>
                          <Body3 color={Colors.neutral.brown_light_grey}>
                            Komunikasi
                          </Body3>
                        </li>
                      </ul>
                    </Col>
                    <Col>
                      <ul>
                        <li>
                          <Body3 color={Colors.neutral.brown_light_grey}>
                            Transportasi
                          </Body3>
                        </li>
                        <li>
                          <Body3 color={Colors.neutral.brown_light_grey}>
                            Rumah
                          </Body3>
                        </li>
                        <li>
                          <Body3 color={Colors.neutral.brown_light_grey}>
                            Pendidikan
                          </Body3>
                        </li>
                        <li>
                          <Body3 color={Colors.neutral.brown_light_grey}>
                            Komunikasi
                          </Body3>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </div>
                <div id="menu-4" className="container2">
                  <Heading5
                    color={Colors.secondary.clear_blue}
                    marginBottom="16px"
                  >
                    Foto Perusahaan
                  </Heading5>
                  <ImageCarousel images={CarouselImages} />
                  <Heading5
                    color={Colors.secondary.clear_blue}
                    marginBottom="16px"
                    marginTop="32px"
                  >
                    Video Perusahaan
                  </Heading5>
                  <div
                    style={{
                      display: `flex`,
                      justifyContent: `center`,
                      width: `100%`,
                    }}
                  >
                    <ReactPlayer
                      url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                      width="100%"
                    />
                  </div>
                </div>
                <div id="menu-5" className="container2">
                  <div className="d-flex-fullwidth">
                    <Heading5
                      color={Colors.secondary.clear_blue}
                      marginBottom="16px"
                    >
                      Lowongan Kerja di Microsoft
                    </Heading5>
                    <RectangleButton variant="text" size="small">
                      Lihat semua
                    </RectangleButton>
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
                </div>
              </>
            ) : (
              <>
                <div id="menu-0" className="container2">
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
                        Senin - Jumat
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
                        {`>100 orang`}
                      </Body2>
                      <Heading4 color={Colors.neutral.greyish_brown}>
                        Jam Kerja
                      </Heading4>
                      <Body2 color={Colors.neutral.brown_light_grey}>
                        08:00 - 17:00 WIB
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
                        Casual
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
                <div id="menu-1" className="container2">
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
                    Microsoft Corporation is an American multinational
                    technology corporation which produces computer software,
                    consumer electronics, personal computers, and related
                    services. Its best known software products are the Microsoft
                    Windows line of operating systems, the Microsoft Office
                    suite, and the Internet Explorer and Edge web browsers. Its
                    flagship hardware products are the Xbox video game consoles
                    and the Microsoft Surface lineup of touchscreen personal
                    computers. Microsoft ranked No. 21 in the 2020 Fortune 500
                    rankings of the largest United States corporations by total
                    revenue; it was the world's largest software maker by
                    revenue as of 2016. It is considered one of the Big Five
                    companies in the U.S. information technology industry, along
                    with Amazon, Google (Alphabet), Apple, and Facebook (Meta).
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
                      <Body2
                        color={Colors.neutral.brown_light_grey}
                        marginBottom="16px"
                      >
                        Jakarta Selatan, Indonesia
                      </Body2>
                    </Col>
                    <Col lg={8}>
                      <Heading4 color={Colors.neutral.greyish_brown}>
                        Alamat
                      </Heading4>
                      <Body2 color={Colors.neutral.brown_light_grey}>
                        Jakarta Stock Exchange Building Tower II, lantai 18
                        Sudirman Central Business District, Jl. Jend. Sudirman
                        No.Kav. 52-53, RT.5/RW.3, Senayan, Kec. Kby. Baru, Kota
                        Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12190
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
                <div id="menu-2" className="container2">
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
                    Microsoft's corporate vision is “to help people and
                    businesses throughout the world realize their full
                    potential.” This vision statement shows that the company
                    presents its business and computing products as tools that
                    people and business organizations can use for their
                    development.
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
                <div id="menu-3" className="container2">
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
                <div id="menu-4" className="container2">
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
                  <div
                    style={{
                      display: `flex`,
                      justifyContent: `center`,
                      width: `100%`,
                    }}
                  >
                    <ReactPlayer
                      url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
                      width="100%"
                    />
                  </div>
                </div>
                <div id="menu-5" className="container2">
                  <Heading3
                    color={Colors.secondary.clear_blue}
                    marginBottom="16px"
                  >
                    Lowongan Kerja di Microsoft
                  </Heading3>
                  <Row style={{ marginBottom: 12 }} gutterWidth={16}>
                    <Col lg={6} md={6} sm={6} xs={6}>
                      <JobCard
                        fullWidth
                        title="UI/UX Designer"
                        company="PT. Qerja Manfaat Bangsa"
                        salary="Rp 9,5 juta - 15,6 juta/bulan"
                        description="Jakarta Selatan • Fulltime • Remote "
                        profileMatch={59}
                        timestamp="5 jam lalu"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={6}>
                      <JobCard
                        fullWidth
                        title="UI/UX Designer"
                        company="PT. Qerja Manfaat Bangsa"
                        salary="Rp 9,5 juta - 15,6 juta/bulan"
                        description="Jakarta Selatan • Fulltime • Remote "
                        profileMatch={59}
                        timestamp="5 jam lalu"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={6}>
                      <JobCard
                        fullWidth
                        title="UI/UX Designer"
                        company="PT. Qerja Manfaat Bangsa"
                        salary="Rp 9,5 juta - 15,6 juta/bulan"
                        description="Jakarta Selatan • Fulltime • Remote "
                        profileMatch={59}
                        timestamp="5 jam lalu"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={6}>
                      <JobCard
                        fullWidth
                        title="UI/UX Designer"
                        company="PT. Qerja Manfaat Bangsa"
                        salary="Rp 9,5 juta - 15,6 juta/bulan"
                        description="Jakarta Selatan • Fulltime • Remote "
                        profileMatch={59}
                        timestamp="5 jam lalu"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={6}>
                      <JobCard
                        fullWidth
                        title="UI/UX Designer"
                        company="PT. Qerja Manfaat Bangsa"
                        salary="Rp 9,5 juta - 15,6 juta/bulan"
                        description="Jakarta Selatan • Fulltime • Remote "
                        profileMatch={59}
                        timestamp="5 jam lalu"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={6}>
                      <JobCard
                        fullWidth
                        title="UI/UX Designer"
                        company="PT. Qerja Manfaat Bangsa"
                        salary="Rp 9,5 juta - 15,6 juta/bulan"
                        description="Jakarta Selatan • Fulltime • Remote "
                        profileMatch={59}
                        timestamp="5 jam lalu"
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
              </>
            )}
          </TabPanel>
        </div>
      )}

      {Mobile ? (
        <BottomSheet
          variant="modal"
          visible={isShow}
          onClose={() => setIsShow(false)}
          title="Lapor Perusahaan"
          submitBtnTitle="Lapor Perusahaan"
          onSubmit={() => {
            console.log("submit");
            setIsShow(false);
            setSubmitLaporan(true);
          }}
        >
          <div
            style={{
              margin: `24px 8px 32px 8px`,
              background: "white",
            }}
          >
            <Heading4 color={Colors.neutral.greyish_brown} marginBottom={`8px`}>
              Laporan
            </Heading4>
            <RadioButton
              type="mobile"
              variant="left"
              gap="16px"
              options={[
                { label: `Informasi Tidak Lengkap`, value: "1" },
                {
                  label: `Lowongan Penipuan (Meminta bayaran/ Lowongan Mencurigakan)`,
                  value: "2",
                },
                {
                  label: `Konten mengandung diskriminatif,dan sara`,
                  value: "3",
                },
                {
                  label: `Perusahaan tidak sesuai ( contoh: Alamat, Deskripsi)`,
                  value: "4",
                },
                { label: `Lainnya`, value: "5" },
              ]}
              // onChange={(e) => setSelectedReport(e.target.value)}
            />
            <Heading4
              color={Colors.neutral.greyish_brown}
              marginTop={`16px`}
              marginBottom={`8px`}
            >
              Kronologi
            </Heading4>
            <InputTextArea
              label={`Tuliskan kronologi penipuan, jika terdapat bukti video harap diungah melalui youtube dan dapat menyertakan link disini*`}
              inputValue={description}
              fullWidth={true}
              handleChange={(e) =>
                e.target.value.length <= 2000 && setDescription(e.target.value)
              }
              characterCount={2000}
              helperText="Minimal 30 kata"
            />
            <Heading4
              color={Colors.neutral.greyish_brown}
              marginTop={`16px`}
              marginBottom={`20px`}
            >
              Unggah Bukti
            </Heading4>
            <div className="slider-mobile">
              <InputPictureField
                value={imageValue[0]}
                onChange={(e) => getBase64(e, 0)}
              />
              {imageFilled > 0 && (
                <InputPictureField
                  value={imageValue[1]}
                  onChange={(e) => getBase64(e, 1)}
                />
              )}
              {imageFilled > 1 && (
                <InputPictureField
                  value={imageValue[2]}
                  onChange={(e) => getBase64(e, 2)}
                />
              )}
            </div>
          </div>
        </BottomSheet>
      ) : (
        <ModalPopup onClick={() => setIsShow(false)} isOpen={isShow} />
      )}

      <Toaster
        open={shareToaster}
        noBar
        variant={`success`}
        label={`Link Berhasil dicopy di Clipboard`}
        setOpen={() => setShareToaster(false)}
      />

      <Toaster
        setOpen={setSubmitLaporan}
        variant="success"
        open={submitLaporan}
        label="Laporan terkirim"
        noBar
      />
    </>
  );
}
