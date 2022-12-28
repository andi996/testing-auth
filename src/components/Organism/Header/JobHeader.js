import React, { useState, useEffect, useRef } from "react";
import { AccessTimeOutlined } from "@mui/icons-material";
import { Radius, Elevation, Colors } from "../../../themes";
import "moment/locale/id";
import moment from "moment/moment";
import {
  Small,
  Body1,
  Body2,
  Body3,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Font,
} from "../../Atom/Typography";
import RectangleAvatar from "../../Atom/Avatar/Rectangle";
import InputTextArea from "../../Atom/Input Field/TextArea";
import RadioButton from "../../Atom/Selection Control/Radio";
import InputPictureField from "../../Atom/Input Field/PictureField";
import ProfileMatch from "../../Atom/Label/ProfileMatch";
import RectangleButton from "../../Atom/Button/RectangleButton";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TabLeft from "../../Molecul/Tab/TabLeft";
import { Box, Tab } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { Col, Row } from "react-grid-system";
import ActionChip from "../../Atom/Selection Control/Chips/ActionChip";
import GoogleMapComponent from "../../Atom/GoogleMap";
import Ticker from "../../Molecul/Ticker";
import ModalPopup from "./ModalPopup";
import Toaster from "../../Molecul/Toaster";
import useOutsideAlerter from "../../../utils/handleClickOutside";
import { makeStyles } from "@mui/styles";
import BottomSheet from "../Bottom Sheet";
import { isMobile, isTablet } from "../../../utils/useMediaQuery";
import { saveOpportunity } from "../../../redux/action/OpportunityAction";
import { useSelector, useDispatch } from "react-redux";
import ReportPopup from "./ReportPopup";

const DropDownList = styled("ul")`
  position: absolute;
  // top: 37px;
  top: 20px;
  right: -24px;
  background-color: white;
  min-width: 220px;
  overflow: auto;
  box-shadow: ${Elevation.navigationMenu};
  border: 0.5px solid #d2d2d2;
  z-index: 12;
  margin-top: 0;
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
  text-align: left;
  text-decoration: none;
  display: block;
  cursor: pointer;
  color: ${Colors.neutral.brown_grey};

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
  ({ isMobile }) => ({
    textTransform: "none",
    color: Colors.neutral.brown_grey,
    "&.Mui-selected": {
      color: Colors.primary.mid_blue,
    },
    minWidth: 0,
    minHeight: 0,
    padding: isMobile ? "10px 8px" : "14px 16px",
    ":first-child": { paddingLeft: isMobile ? 8 : 24 },
    ":last-child": { paddingRight: isMobile ? 8 : 24 },
  })
);

export default function JobHeader(props) {
  const { userId, data, size = "large", onClick } = props;

  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.opportunity?.loading);

  const Mobile = isMobile();
  const Tablet = isTablet();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false); // open dropdown share & lapor lowongan
  const [shareToaster, setShareToaster] = useState(false);
  const [isShow, setIsShow] = useState(false); // report toaster
  const [tab, setTab] = useState(0);
  const [postedDate, setPostedDate] = useState("");

  const [submitLaporan, setSubmitLaporan] = useState(false);

  const handleChange = (event, newValue) => {
    setTab(newValue);
    var wrapper = document.querySelector("#job-header-wrapper");
    var element = document.getElementById(`menu-${newValue}`);
    if (wrapper) {
      wrapper.scroll({ top: element?.offsetTop - 15, behavior: "smooth" });
    } else {
      window.scrollTo({
        top: element?.offsetTop - (Mobile ? 20 : 15),
        behavior: "smooth",
      });
    }
  };

  const salaryFormat = (number) => {
    let satuan = "";

    const salary = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    })
      .format(number)
      .split(".");

    if (salary?.length === 1) {
      satuan = "perak";
    } else if (salary?.length === 2) {
      satuan = "ribu";
    } else if (salary?.length === 3) {
      satuan = "juta";
    } else if (salary?.length === 4) {
      satuan = "M";
    } else if (salary?.length === 5) {
      satuan = "T";
    }

    const arr = salary.filter((x, index) => (index === 0 || index === 1) && x);

    const salary_text = `${arr[0]}${
      arr[1][0] !== "0" ? `,${arr[1][0]}` : ``
    } ${satuan}`;

    return salary_text;
  };

  useEffect(() => {
    moment.locale("id");
    let date = moment(data?.posted_at);
    let monthDiff = date.diff(moment(), "months");
    if (monthDiff <= -3) {
      date = `${date.format("DD MMMM")} '${date.format("YY")}`;
    } else {
      date = moment(date)
        .fromNow()
        .replace("yang lalu", "lalu")
        .replace("semenit", "1 menit")
        .replace("sejam", "1 jam")
        .replace("sehari", "1 hari")
        .replace("sebulan", "1 bulan");

      // if (isUpdated) date = `diperbarui ${date}`;
    }
    setPostedDate(date);
  }, [data?.posted_at]);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setIsOpen);

  const useStyles = makeStyles({
    container: {
      backgroundColor: `white`,
      borderRadius: Mobile ? 0 : Radius.medium,
      boxShadow: Elevation.card,
      paddingTop: `12px`,
      paddingBottom: size === "small" || Mobile ? 0 : `12px`,
      marginBottom: `16px`,
      zIndex: 100,
    },
    content: {
      position: `relative`,
      display: `flex`,
      gap: Mobile ? `12px` : `16px`,
      margin: Mobile
        ? `12px 16px`
        : size === "small"
        ? `10px 24px`
        : `12px 24px`,
    },
    company_logo: {
      width: Mobile ? `64px` : `80px`,
      height: Mobile ? `64px` : `80px`,
    },

    job_title: {
      maxWidth: Tablet ? `352px` : `calc(100% - 32px)`,
      marginBottom: Mobile ? `4px` : 0,
    },

    morehorizon: {
      position: `absolute`,
      top: 0,
      right: 0,
      cursor: `pointer`,
    },

    button_wrapper_dekstop: {
      position: "absolute",
      bottom: 0,
      right: 0,
      display: `flex`,
      flexDirection: Tablet ? `column` : `row`,
      gap: `8px`,
    },
    button_wrapper_mobile: {
      width: `100%`,
      background: `#fff`,
      position: `fixed`,
      left: 0,
      bottom: 0,
      display: `flex`,
      gap: `8px`,
      padding: `12px 16px`,
      boxShadow: Elevation.card,
      zIndex: 100,
    },
  });

  const classes = useStyles();

  const styles = {
    row_wrapper: {
      width: `100%`,
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 16,
    },
  };

  return (
    <>
      <style jsx>{`
        .container2 {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: ${Mobile ? `16px` : `24px`};
          position: static;
          margin-bottom: ${Mobile ? `8px` : `16px`};
          background-color: white;
          border-radius: ${Mobile ? 0 : Radius.medium};
          box-shadow: ${Elevation.card};
          .button-right {
            display: flex;
            padding: 24px 24px 24px 0;
            flex-direction: column;
            align-items: flex-end;
            cursor: pointer;
            height: 100%;
          }
          .wrapper-company {
            display: flex;
            flex-direction: row;
            width: 100%;
          }
          .logo-company {
            // margin-right: 24px;
            padding: 24px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .info-company {
            width: 100%;
            padding: 24px 24px 24px 0;
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: center;
          }
          .center {
            display: block;
            margin: auto;
          }
          ul {
            padding: ${Mobile ? "0 16px" : "0 24px"};
            margin-block-start: 0;
            margin-block-end: 0;
          }
        }
      `}</style>

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

      <ReportPopup
        isOpen={isShow}
        userId={userId}
        opportunityId={data?.id}
        handleClose={() => setIsShow(false)}
      />

      <Box
        ref={ref}
        className={classes.container}
        style={{
          width: `100%`,
          position: Mobile || Tablet ? `sticky` : `relative`,
          top: Mobile || Tablet ? ref.current?.clientHeight * -1 + 80 : 0,
          transition: "all 0.2s ease",
          zIndex: `2`,
        }}
      >
        <Box className={classes.content}>
          <Box className={classes.company_logo}>
            <img
              src={data?.company_logo}
              // src="/images/Principle/Logo/Karir/Avatar/Karir=White.png"
              width={Mobile ? `64px` : `80px`}
              height={Mobile ? `64px` : `80px`}
              alt="company-logo"
            />
          </Box>

          <Box width="100%">
            {/* Job Title */}
            <Box className={classes.job_title}>
              <Font type={Mobile ? `Heading5` : `Heading4`}>
                {data?.job_position}
              </Font>
            </Box>

            {/* Company & Location */}
            <Box className="d-flex" gap="4px" sx={{ wordBreak: `break-word` }}>
              <Font
                type={Mobile ? `Body3` : `Body2`}
                color={Colors.secondary.clear_blue}
              >
                {data?.company_name}
              </Font>
              <Font
                type={Mobile ? `Body3` : `Body2`}
                color={Colors.neutral.brown_grey}
              >
                •
              </Font>
              <Font
                type={Mobile ? `Body3` : `Body2`}
                color={Colors.neutral.brown_grey}
              >
                {data?.location}
              </Font>
            </Box>

            {/* Salary */}
            <div>
              <Font
                type={Mobile ? `Body3` : `Body2`}
                color={Colors.secondary.highlight_green}
              >
                {/* Rp 10.8 juta - Rp 16.6 juta/bulan */}
                {data?.salary_lower && salaryFormat(data?.salary_lower)}
                {data?.salary_upper &&
                  ` - ${salaryFormat(data?.salary_upper)}/bulan`}
              </Font>
            </div>

            {/* Profile Match */}
            <Box className="d-flex" gap="10px" mt="8px">
              {userId && (
                <ProfileMatch
                  value={data?.match_percentage}
                  variant={Mobile ? `micro` : `default`}
                />
              )}

              <Box className="d-flex">
                <AccessTimeOutlined
                  style={{
                    color: Colors.neutral.brown_light_grey,
                    marginRight: 4,
                  }}
                  fontSize="12px"
                />
                <Font
                  type={Mobile ? `Small` : `Body2`}
                  color={Colors.neutral.brown_light_grey}
                >
                  {postedDate}
                </Font>
              </Box>
            </Box>

            {/* Meatball Menu */}
            <Box
              className={classes.morehorizon}
              ref={wrapperRef}
              onClick={() => setIsOpen(!isOpen)}
            >
              <MoreHorizIcon color={Colors.neutral.brown_grey} />

              {Mobile ? (
                <BottomSheet
                  visible={isOpen}
                  variant="list"
                  onClose={setIsOpen}
                >
                  <Box
                    key={1}
                    className="d-flex"
                    gap="32px"
                    py="16px"
                    onClick={() => setShareToaster(true)}
                  >
                    <img
                      src="/images/Principle/Logo/ShareBlue.svg"
                      alt="share.svg"
                    />
                    <Body1 color={Colors.primary.mid_blue}>Share</Body1>
                  </Box>
                  <Box
                    key={2}
                    className="d-flex"
                    gap="32px"
                    py="16px"
                    onClick={() => {
                      if (userId) {
                        setIsOpen(false);
                        setIsShow(true);
                      } else {
                        window.location.href = "/login";
                      }
                    }}
                  >
                    <img
                      src="/images/Principle/Logo/FlagRed.svg"
                      alt="flag.svg"
                    />
                    <Body1 color={Colors.secondary.red}>Lapor Lowongan</Body1>
                  </Box>
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
                      onClick={() => {
                        if (userId) {
                          setIsShow(true);
                        } else {
                          window.location.href = "/login";
                        }
                      }}

                      // className={option == selectedOption ? "active" : null}
                    >
                      Lapor Lowongan
                    </ListItem>
                  </DropDownList>
                )
              )}
            </Box>

            {/* Action Button */}
            {!Mobile && (
              <Box className={classes.button_wrapper_dekstop}>
                <RectangleButton
                  customStyle={{ width: 132 }}
                  state={data?.saved ? `default` : `alternate`}
                  onClick={() => {
                    if (userId) {
                      dispatch(
                        saveOpportunity({
                          user_id: userId,
                          opportunities: [data?.id],
                        })
                      );
                    } else {
                      window.location.href = "/login";
                    }
                  }}
                >
                  {data?.saved ? (
                    `Tersimpan`
                  ) : (
                    <div className="d-flex">
                      <BookmarkBorderIcon
                        style={{
                          margin: 0,
                          padding: 2,
                          color: Colors.primary.mid_blue,
                        }}
                      />
                      Simpan
                    </div>
                  )}
                </RectangleButton>
                <RectangleButton
                  disable={data?.applied}
                  customStyle={{ width: !data?.applied ? 132 : 160 }}
                  onClick={() => {
                    userId
                      ? !data?.applied && onClick("apply")
                      : (window.location.href = "/login");
                  }}
                >
                  {!data?.applied ? `Lamar` : `Lamaran Terkirim`}
                </RectangleButton>
              </Box>
            )}
          </Box>
        </Box>

        {/* Tabs */}
        {(size === "small" || Mobile) && (
          <Box
            mt={Mobile ? `14px` : `0px`}
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
                isMobile={Mobile}
                value={0}
                label={
                  Mobile ? (
                    <Heading6>Informasi Lowongan</Heading6>
                  ) : (
                    <Heading5>Informasi Lowongan</Heading5>
                  )
                }
                {...a11yProps(0)}
              />
              <AntTab
                isMobile={Mobile}
                value={1}
                label={
                  Mobile ? (
                    <Heading6>Persyaratan</Heading6>
                  ) : (
                    <Heading5>Persyaratan</Heading5>
                  )
                }
                {...a11yProps(1)}
              />
              <AntTab
                isMobile={Mobile}
                value={2}
                label={
                  Mobile ? (
                    <Heading6>Skill yang dibutuhkan</Heading6>
                  ) : (
                    <Heading5>Skill yang dibutuhkan</Heading5>
                  )
                }
                {...a11yProps(2)}
              />
              <AntTab
                isMobile={Mobile}
                value={3}
                label={
                  Mobile ? (
                    <Heading6>Lokasi</Heading6>
                  ) : (
                    <Heading5>Lokasi</Heading5>
                  )
                }
                {...a11yProps(3)}
              />
              <AntTab
                isMobile={Mobile}
                value={4}
                label={
                  Mobile ? (
                    <Heading6>Tentang Perusahaan</Heading6>
                  ) : (
                    <Heading5>Tentang Perusahaan</Heading5>
                  )
                }
                {...a11yProps(4)}
              />
            </TabLeft>
          </Box>
        )}
      </Box>

      {/* TAB CONTENT (DEKSTOP)*/}
      {size === "small" && !Mobile && (
        <TabPanel value={0} index={0}>
          <div id="menu-0" className="container2">
            <Heading3 color={Colors.secondary.clear_blue} marginBottom="16px">
              Informasi Lowongan
            </Heading3>
            <Row style={styles.row_wrapper} nogutter>
              <Col>
                <Heading4 color={Colors.neutral.greyish_brown}>
                  Tipe Pekerjaan
                </Heading4>
                <Body2 color={Colors.neutral.greyish_brown} marginBottom="16px">
                  {data?.job_type}
                </Body2>
                <Heading4 color={Colors.neutral.greyish_brown}>
                  Remote/On-site
                </Heading4>
                <Body2 color={Colors.neutral.greyish_brown} marginBottom="16px">
                  {data?.workplace}
                </Body2>
              </Col>
              <Col>
                <Heading4 color={Colors.neutral.greyish_brown}>
                  Fungsi Pekerjaan
                </Heading4>
                <Body2 color={Colors.neutral.greyish_brown} marginBottom="16px">
                  {data?.job_functions?.map((item) => item).join(", ")}
                </Body2>
              </Col>
              <Col>
                <Heading4 color={Colors.neutral.greyish_brown}>
                  Jenjang Karir
                </Heading4>
                <Body2 color={Colors.neutral.greyish_brown} marginBottom="16px">
                  {data?.job_levels?.map((item) => item).join(", ")}
                </Body2>
              </Col>
            </Row>
            <Heading4 color={Colors.neutral.greyish_brown}>
              Job Deskripsi
            </Heading4>
            <Body2>
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.responsibilities,
                }}
              />
            </Body2>
          </div>
          <div id="menu-1" className="container2">
            <Heading3 color={Colors.secondary.clear_blue} marginBottom="16px">
              Persyaratan
            </Heading3>
            <Row style={styles.row_wrapper} nogutter>
              <Col>
                <Heading4 color={Colors.neutral.greyish_brown}>
                  Tingkat Pendidikan
                </Heading4>
                <Body2 color={Colors.neutral.greyish_brown} marginBottom="16px">
                  {data?.degrees?.map((item) => item).join(", ")}
                </Body2>
              </Col>
              <Col>
                <Heading4 color={Colors.neutral.greyish_brown}>
                  Jurusan Pendidikan
                </Heading4>
                <Body2 color={Colors.neutral.greyish_brown} marginBottom="16px">
                  {data?.majors?.map((item) => item).join(", ")}
                </Body2>
              </Col>
              <Col>
                <Heading4 color={Colors.neutral.greyish_brown}>
                  Minimal Pengalaman
                </Heading4>
                <Body2 color={Colors.neutral.greyish_brown} marginBottom="16px">
                  {data?.work_experience
                    ? data?.work_experience > 5
                      ? `>5 tahun`
                      : `${data?.work_experience} tahun`
                    : "-"}
                </Body2>
              </Col>
            </Row>
            <Heading4 color={Colors.neutral.greyish_brown}>
              Deskripsi Persyaratan
            </Heading4>
            <Body2 color={Colors.neutral.greyish_brown}>
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.requirements,
                }}
              />
            </Body2>
          </div>
          <div id="menu-2" className="container2">
            <Heading3 color={Colors.secondary.clear_blue} marginBottom="16px">
              Skill yang Dibutuhkan
            </Heading3>
            <div style={{ display: "flex", flexWrap: `wrap`, gap: "12px" }}>
              {data?.required_skills?.map((skill, index) => {
                return <ActionChip key={index}>{skill}</ActionChip>;
              })}
            </div>
          </div>
          <div id="menu-3" className="container2">
            <Heading3 color={Colors.secondary.clear_blue} marginBottom="16px">
              Lokasi
            </Heading3>
            <Row style={styles.row_wrapper} nogutter>
              <Col>
                <Heading4 color={Colors.neutral.greyish_brown}>Kota</Heading4>
                <Body2
                  color={Colors.neutral.brown_light_grey}
                  marginBottom="16px"
                >
                  {`${data?.location}${
                    data?.country ? `, ${data?.country}` : ""
                  }`}
                </Body2>
              </Col>
              <Col>
                <Heading4 color={Colors.neutral.greyish_brown}>Alamat</Heading4>
                <Body2 color={Colors.neutral.brown_light_grey}>
                  {data?.address}
                </Body2>
              </Col>
            </Row>
            <Heading4 color={Colors.neutral.greyish_brown}>Peta</Heading4>
            <GoogleMapComponent
              isMarkerShown={true}
              // onMarkerClick={this.handleMarkerClick}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <Ticker type="dekstop" variant="icon">
              Perhatian! Semua lowongan di Karir.com tidak dipungut biaya
              sepeserpun dalam bentuk apapapun. Lowongan ini bermasalah?
            </Ticker>
          </div>
          <div id="menu-4" className="container2">
            <Heading3 color={Colors.secondary.clear_blue} marginBottom="16px">
              Tentang Perusahaan
            </Heading3>
            <div className="d-flex-fullwidth" style={{ marginBottom: `16px` }}>
              <div className="d-flex" style={{ gap: `8px` }}>
                <img
                  src={data?.company?.logo}
                  alt="company logo"
                  style={{
                    height: 64,
                    width: 64,
                    objectFit: `cover`,
                  }}
                />
                <div>
                  <Heading3
                    color={Colors.neutral.greyish_brown}
                    style={{
                      overflow: `hidden`,
                      whiteSpace: `nowrap`,
                      textOverflow: `ellipsis`,
                      width: `100%;`,
                    }}
                  >
                    {data?.company?.name}
                  </Heading3>
                  <Body2 color={Colors.neutral.brown_grey}>
                    {data?.company?.subscribers <= 1
                      ? `${data?.company?.subscribers} subscriber`
                      : `${data?.company?.subscribers} subscribers`}
                  </Body2>
                </div>
              </div>

              <div>
                <RectangleButton
                  state={data?.company?.is_subscribed ? `default` : `alternate`}
                  size="small"
                  customStyle={{ width: 100 }}
                  onClick={() => {
                    if (userId) {
                      alert("Subscribed!");
                    } else {
                      window.location.href = "/login";
                    }
                  }}
                >
                  {data?.company?.is_subscribed ? `Disubscribe` : `Subscribe`}
                </RectangleButton>
              </div>
            </div>

            <Row style={styles.row_wrapper} nogutter>
              <Col>
                <Heading4 color={Colors.neutral.greyish_brown}>
                  Industri
                </Heading4>
                <Body2 color={Colors.neutral.brown_light_grey}>
                  {data?.company?.industry_name}
                </Body2>
              </Col>
              <Col>
                <Heading4 color={Colors.neutral.greyish_brown}>
                  Benefit
                </Heading4>
                <Body2 color={Colors.neutral.brown_light_grey}>
                  {data?.company?.benefits?.length > 0 &&
                    data?.company?.benefits?.map((item) => item).join(", ")}
                </Body2>
              </Col>
            </Row>
            <div style={{ marginBottom: 24 }}>
              <Heading4 color={Colors.neutral.greyish_brown}>
                Deskripsi Perusahaan
              </Heading4>
              <Body2 color={Colors.neutral.brown_light_grey}>
                {data?.company?.description}
              </Body2>
            </div>
            <RectangleButton
              size="medium"
              fullWidth
              variant="ghost"
              customStyle={{ margin: 0 }}
              onClick={() => alert("go to company detail")}
            >
              Lihat Perusahaan
            </RectangleButton>
          </div>
        </TabPanel>
      )}

      {/* TAB CONTENT (MOBILE) */}
      {Mobile && (
        <TabPanel value={0} index={0}>
          <div id="menu-0" className="container2">
            <Heading5 color={Colors.secondary.clear_blue} marginBottom="16px">
              Informasi Lowongan
            </Heading5>
            <Box width="100%" display="flex" gap="14px" mb="16px">
              <Box sx={{ flex: 1 }}>
                <Heading6 color={Colors.neutral.greyish_brown}>
                  Tipe Pekerjaan
                </Heading6>
                <Body3 color={Colors.neutral.greyish_brown}>
                  {data?.job_type}
                </Body3>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Heading6 color={Colors.neutral.greyish_brown}>
                  Fungsi Pekerjaan
                </Heading6>
                <Body3 color={Colors.neutral.greyish_brown}>
                  {data?.job_functions?.map((item) => item).join(", ")}
                </Body3>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Heading6 color={Colors.neutral.greyish_brown}>
                  Jenjang Karir
                </Heading6>
                <Body3 color={Colors.neutral.greyish_brown}>
                  {data?.job_levels?.map((item) => item).join(", ")}
                </Body3>
              </Box>
            </Box>

            <Box mb="16px">
              <Heading6 color={Colors.neutral.greyish_brown}>
                Remote/On-site
              </Heading6>
              <Body3 color={Colors.neutral.greyish_brown}>
                {data?.workplace}
              </Body3>
            </Box>

            <Heading6 color={Colors.neutral.greyish_brown}>
              Job Deskripsi
            </Heading6>
            <Body3>
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.responsibilities,
                }}
              />
            </Body3>
          </div>
          <div id="menu-1" className="container2">
            <Heading5 color={Colors.secondary.clear_blue} marginBottom="16px">
              Persyaratan
            </Heading5>

            <Box width="100%" display="flex" gap="14px" mb="16px">
              <Box sx={{ flex: 1 }}>
                <Heading6 color={Colors.neutral.greyish_brown}>
                  Tingkat Pendidikan
                </Heading6>
                <Body3 color={Colors.neutral.greyish_brown}>
                  {data?.degrees?.map((item) => item).join(", ")}
                </Body3>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Heading6 color={Colors.neutral.greyish_brown}>
                  Jurusan Pendidikan
                </Heading6>
                <Body3 color={Colors.neutral.greyish_brown}>
                  {data?.majors?.map((item) => item).join(", ")}
                </Body3>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Heading6 color={Colors.neutral.greyish_brown}>
                  Minimal Pengalaman
                </Heading6>
                <Body3 color={Colors.neutral.greyish_brown}>
                  {data?.work_experience
                    ? data?.work_experience > 5
                      ? `>5 tahun`
                      : `${data?.work_experience} tahun`
                    : "-"}
                </Body3>
              </Box>
            </Box>

            <Heading6 color={Colors.neutral.greyish_brown}>
              Deskripsi Persyaratan
            </Heading6>
            <Body3 color={Colors.neutral.greyish_brown}>
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.requirements,
                }}
              />
            </Body3>
          </div>
          <div id="menu-2" className="container2">
            <Heading5 color={Colors.secondary.clear_blue} marginBottom="16px">
              Skill yang Dibutuhkan
            </Heading5>
            <div style={{ display: "flex", flexWrap: `wrap`, gap: "12px" }}>
              {data?.required_skills?.map((skill, index) => {
                return (
                  <ActionChip key={index} size="small">
                    {skill}
                  </ActionChip>
                );
              })}
            </div>
          </div>
          <div id="menu-3" className="container2">
            <Heading5 color={Colors.secondary.clear_blue} marginBottom="16px">
              Lokasi
            </Heading5>
            <Row style={styles.row_wrapper} nogutter>
              <Col>
                <Heading6 color={Colors.neutral.greyish_brown}>Kota</Heading6>
                <Body3
                  color={Colors.neutral.brown_light_grey}
                  marginBottom="16px"
                >
                  {`${data?.location}${
                    data?.country ? `, ${data?.country}` : ""
                  }`}
                </Body3>
              </Col>
              <Col>
                <Heading6 color={Colors.neutral.greyish_brown}>Alamat</Heading6>
                <Body3 color={Colors.neutral.brown_light_grey}>
                  {data?.address}
                </Body3>
              </Col>
            </Row>
            <Heading6 color={Colors.neutral.greyish_brown}>Peta</Heading6>
            <GoogleMapComponent
              isMarkerShown={true}
              // onMarkerClick={this.handleMarkerClick}
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <Ticker type="dekstop" radius={false}>
              Perhatian! Semua lowongan di Karir.com tidak dipungut biaya
              sepeserpun dalam bentuk apapapun. Lowongan ini bermasalah?
            </Ticker>
          </div>
          <div id="menu-4" className="container2">
            <Heading5 color={Colors.secondary.clear_blue} marginBottom="16px">
              Tentang Perusahaan
            </Heading5>
            <div className="d-flex-fullwidth" style={{ marginBottom: `16px` }}>
              <div className="d-flex" style={{ gap: `8px` }}>
                <img
                  src={data?.company?.logo}
                  alt="company logo"
                  style={{
                    height: 64,
                    width: 64,
                    objectFit: `cover`,
                  }}
                />
                <div>
                  <Heading5
                    color={Colors.neutral.greyish_brown}
                    style={{
                      overflow: `hidden`,
                      whiteSpace: `nowrap`,
                      textOverflow: `ellipsis`,
                      maxWidth: `100px`,
                    }}
                  >
                    {data?.company?.name}
                  </Heading5>
                  <Body2 color={Colors.neutral.brown_grey}>
                    {data?.company?.subscribers <= 1
                      ? `${data?.company?.subscribers} subscriber`
                      : `${data?.company?.subscribers} subscribers`}
                  </Body2>
                </div>
              </div>

              <div>
                <RectangleButton
                  state={data?.company?.is_subscribed ? `default` : `alternate`}
                  size="small"
                  customStyle={{ width: 100 }}
                  onClick={() => {
                    if (userId) {
                      alert("Subscribed!");
                    } else {
                      window.location.href = "/login";
                    }
                  }}
                >
                  {data?.company?.is_subscribed ? `Disubscribe` : `Subscribe`}
                </RectangleButton>
              </div>
            </div>

            <Row style={styles.row_wrapper} nogutter>
              <Col>
                <Heading6 color={Colors.neutral.greyish_brown}>
                  Industri
                </Heading6>
                <Body3 color={Colors.neutral.brown_light_grey}>
                  {data?.company?.industry_name}
                </Body3>
              </Col>
              <Col>
                <Heading6 color={Colors.neutral.greyish_brown}>
                  Benefit
                </Heading6>
                <Body3 color={Colors.neutral.brown_light_grey}>
                  {data?.company?.benefits?.length > 0 &&
                    data?.company?.benefits?.map((item) => item).join(", ")}
                </Body3>
              </Col>
            </Row>
            <div style={{ marginBottom: 24 }}>
              <Heading6 color={Colors.neutral.greyish_brown}>
                Deskripsi Perusahaan
              </Heading6>
              <Body3 color={Colors.neutral.brown_light_grey}>
                {data?.company?.description}
              </Body3>
            </div>
            <RectangleButton
              size="medium"
              fullWidth
              variant="ghost"
              customStyle={{ margin: 0 }}
              onClick={() => alert("go to company detail")}
            >
              Lihat Perusahaan
            </RectangleButton>
          </div>
        </TabPanel>
      )}

      {Mobile && !isOpen && (
        <Box className={classes.button_wrapper_mobile}>
          <RectangleButton
            fullWidth
            state={data?.saved ? `default` : `alternate`}
            onClick={() => {
              if (userId) {
                dispatch(
                  saveOpportunity({
                    user_id: userId,
                    opportunities: [data?.id],
                  })
                );
              } else {
                window.location.href = "/login";
              }
            }}
          >
            {data?.saved ? (
              `Tersimpan`
            ) : (
              <div className="d-flex">
                <BookmarkBorderIcon
                  style={{
                    margin: 0,
                    padding: 2,
                    color: Colors.primary.mid_blue,
                  }}
                />
                Simpan
              </div>
            )}
          </RectangleButton>
          <RectangleButton
            disable={data?.applied}
            fullWidth
            onClick={() => {
              userId
                ? !data?.applied && onClick("apply")
                : (window.location.href = "/login");
            }}
          >
            {!data?.applied ? `Lamar` : `Lamaran Terkirim`}
          </RectangleButton>
        </Box>
      )}
    </>
  );
}
