import React, { useEffect, useRef, useState } from "react";
import Logo from "../../Atom/Logo";
import Link from "../../Atom/Link";
import {
  BookmarkOutlined,
  Close,
  CorporateFareOutlined,
  DateRangeOutlined,
  KeyboardArrowDown,
  KeyboardArrowRight,
  LogoutOutlined,
  ReceiptLongOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  Body1,
  Body2,
  Body3,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Small,
} from "../../Atom/Typography";
import { Colors, Elevation, Radius } from "../../../themes";
import Notification from "../../Atom/Badge/Notification";
import RectangleButton from "../../Atom/Button/RectangleButton";
import Divider from "../../Atom/Divider";
import { ModalUnstyled } from "@mui/base";
import { Box, styled, width } from "@mui/system";
import Images from "../../Atom/Image";
import FeaturesCircleButton from "../../Atom/Button/CircleButton/Features";
import useOutsideAlerter from "../../../utils/handleClickOutside";
import {
  isMediumScreen,
  isMobile,
  isSmallScreen,
  isTablet,
} from "../../../utils/useMediaQuery";
import { HamburgerCollapse } from "react-animated-burgers";
import MobileHeader from "./Mobile";
import { Skeleton } from "@mui/material";
import EmptyState from "../../Template/EmptyState";
import CircleAvatar from "../../Atom/Avatar/Circle";
import BottomSheet from "../Bottom Sheet";
import RadioButton from "../../Atom/Selection Control/Radio";
import StatusLamaranCard from "../Card/StatusLamaranCard";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboardApplications,
  getDashboardInterviews,
} from "../../../redux/action/DashboardActions";
import Cookies from "js-cookie";
import { signOut, useSession } from "next-auth/react";

export const ListItem = styled("li")`
    padding: 8px 16px;
    text-decoration: none;
    display: block;
    color: ${Colors.neutral.brown_grey}
    

    :active {
      background-color: ${Colors.primary.mid_blue};
      color: white;
      border-radius: 8px;
    }

    :hover {
      width: 100%;
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

const navigations = [
  {
    active: "/images/Principle/Logo/Mobile/Active-Home.png",
    inactive: "/images/Principle/Logo/Mobile/Inactive-Home.png",
    title: "Beranda",
  },
  {
    active: "/images/Principle/Logo/Mobile/Active-Save.png",
    inactive: "/images/Principle/Logo/Mobile/Inactive-Save.png",
    title: "Disimpan",
  },
  {
    active: "/images/Principle/Logo/Mobile/Active-Karir.png",
    inactive: "/images/Principle/Logo/Mobile/Inactive-Karir.png",
    title: "Lowongan",
  },
  {
    active: "/images/Principle/Logo/Mobile/Active-Status.png",
    inactive: "/images/Principle/Logo/Mobile/Inactive-Status.png",
    title: "Status",
  },
  {
    active: "/images/Principle/Logo/Mobile/Active-Profile.png",
    inactive: "/images/Principle/Logo/Mobile/Inactive-Profile.png",
    title: "Profil",
  },
];

export default function Header(props) {
  const {
    variant,
    state = "navigation",
    children,
    type,
    title,
    search,
    profile,
    skeleton,
    isEmpty,
    placeholder,
    onClickArrowBack,
    handleChange,
    riwayatPencarian,
    handleSubmitSearch,
    onDeleteRiwayat,
    searchResult,
    page,
  } = props;
  const dispatch = useDispatch();
  const [Profile, setProfile] = useState(false);
  const [Dashboard, setDashboard] = useState(false);
  const [Language, setLanguage] = useState(false);
  const [Navigation, setNavigation] = useState(0);
  const [Visible, setVisible] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setProfile);
  const MediumScreen = isMediumScreen();
  const SmallScreen = isSmallScreen();
  const Tablet = isTablet();
  const Mobile = isMobile();
  const router = useRouter();
  const [BurgerMenu, setBurgerMenu] = useState(false);
  const [isNotification, setNotification] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
    Cookies.remove("user");
    Cookies.remove("Authorization");
  };

  const { dashboardApplications, dashboardInterviews } = useSelector(
    (state) => state
  );
  const Content = styled(Box)({
    zIndex: 100,
    backgroundColor: `white`,
    width: Mobile ? 360 : 540,
    height: `100%`,
    overflow: `auto`,
    "&:focus": {
      outline: "none",
    },
    display: "flex",
    gap: 8,
    flexDirection: "column",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      let user = false;
      if (Cookies.get("user")) user = JSON.parse(Cookies.get("user"));

      // var userCookies = Cookies.get("user");

      if (window.location.pathname === `/home`) setNavigation(0);
      if (window.location.pathname === `/lowongan-simpan`) setNavigation(1);
      if (window.location.pathname === `/search-lowongan`) setNavigation(2);
      if (window.location.pathname === `/status-lamaran`) setNavigation(3);
      if (window.location.pathname === `/profile`) setNavigation(4);
      if (user) {
        dispatch(getDashboardApplications(user.id));
        dispatch(getDashboardInterviews(user.id));
      }
    }
    setNotification(window.location.pathname === `/notification`);
  }, []);

  return (
    <>
      <style jsx>
        {`
          .container-mobile {
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 99;
            width: 100%;
            background: white;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            box-shadow: ${Elevation.navigationMenu};
            height: 56px;
          }
          .container {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 99;
            height: 56px;
            width: 100%;
            background: ${variant === `no background`
              ? `transparent`
              : `white`};
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            box-shadow: ${Elevation.navigationMenu};
          }
          .stack {
            display: flex;
            align-items: center;
            cursor: pointer;
            postion: relative;
          }
          .notification {
            position: absolute;
            top: -16px;
            right: -24px;
          }
          .notification2 {
            position: absolute;
            top: -16px;
            right: -18px;
          }
          .parent-notification {
            position: relative;
            width: fit-content;
            display: flex;
            align-items: center;
          }
          .profile-dropdown {
            border: ${!Mobile && `0.5px solid ${Colors.neutral.light_grey}`};
            display: flex;
            flex-direction: column;
            justify-content: ${Mobile ? "flex-start" : "center"};
            align-items: flex-start;
            padding: ${Mobile ? "16px" : "12px"};
            box-shadow: ${!Mobile && Elevation.navigationMenu};
            border-radius: ${!Mobile && Radius.medium};
            position: fixed;
            top: ${Mobile ? "0" : "10px"};
            right: ${!Mobile && "10px"};
            left: ${Mobile && "0"};
            background: white;
            z-index: 100;
            width: ${Mobile && "100%"};
            height: ${Mobile && "100%"};
          }
          .language-dropdown {
            border: 0.5px solid ${Colors.neutral.light_grey};
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding: 4px;
            box-shadow: ${Elevation.navigationMenu};
            border-radius: ${Radius.medium};
            position: absolute;
            top: 16px;
            background: white;
            z-index: 100;
            width: 160px;
            right: 0;
          }
          .info-profile {
            width: 100%;
            margin: 8px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          .empty-card {
            margin: 0 16px 16px 16px;
            width: ${Mobile ? "328px" : "492px"};
            height: ${Mobile ? "146px" : "184px"};
            box-shadow: ${Elevation.card};
            border-radius: ${Radius.medium};
          }
          .status-container {
            width: 100%;
            display: flex;
            gap: 16px;
            padding-left: 16px;
            min-height: 250px;
            flex-grow: 1;
            overflow-x: scroll;
            overflow-y: hidden;
            ::-webkit-scrollbar {
              display: none;
            }
          }
          .container-right {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-left: 16px;
            gap: 8px;
          }
          .activity-tab {
            display: flex;
            width: 100%;
            align-items: center;
            margin: 8px 0;
            cursor: pointer;
          }
          .features-tab {
            display: flex;
            align-items: center;
            margin: 8px 0;
            cursor: pointer;
            gap: 32px;
          }
          .burger-menu {
            display: flex;
            padding: 36px 24px;
            gap: 40px;
            flex-direction: column;
            width: 100%;
            background: white;
            position: fixed;
            z-index: 99;
            top: 56px;
            box-shadow: ${Elevation.modal};
          }
          .button-stack {
            display: flex;
            gap: 8px;
            width: 100%;
            padding: 0 16px;
          }
          .navigation-button {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-evenly;
          }
        `}
      </style>
      <div style={{ position: "relative" }} ref={wrapperRef}>
        {Mobile && state == "navigation" ? (
          <>
            <MobileHeader
              type={type}
              variant={variant}
              title={title}
              search={search}
              setDashboard={setDashboard}
              setProfile={setProfile}
              dashboard={Dashboard}
              profile={Profile}
              wrapperRef={wrapperRef}
              isEmpty={isEmpty}
              placeholder={placeholder}
              onClickArrowBack={onClickArrowBack}
              handleChange={handleChange}
              riwayatPencarian={riwayatPencarian}
              handleSubmitSearch={handleSubmitSearch}
              onDeleteRiwayat={onDeleteRiwayat}
              searchResult={searchResult}
              page={page}
            />
            <div className="container-mobile">
              {navigations.map((el, idx) => (
                <div className="navigation-button" key={idx}>
                  <img
                    alt={el.title}
                    src={Navigation == idx ? el.active : el.inactive}
                  />
                  <Small
                    color={
                      Navigation == idx
                        ? Colors.primary.mid_blue
                        : Colors.neutral.brown_light_grey
                    }
                  >
                    {el.title}
                  </Small>
                </div>
              ))}
            </div>
          </>
        ) : Mobile && state == "sticky" ? (
          <>
            <MobileHeader
              type={type}
              variant={variant}
              title={title}
              search={search}
              setDashboard={setDashboard}
              setProfile={setProfile}
              dashboard={Dashboard}
              profile={Profile}
              wrapperRef={wrapperRef}
              isEmpty={isEmpty}
              placeholder={placeholder}
            />
            {children && (
              <div className="container-mobile">
                <div className="button-stack">{children}</div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="container">
              <Logo width={105} height={32} />
              {!Tablet && !SmallScreen && (
                <>
                  <Link>Home</Link>
                  <Link>Lowongan</Link>
                  <Link>Perusahaan</Link>
                  <Link>Inspirasi</Link>
                  <Link>Karir Apps</Link>
                </>
              )}
              <span style={{ width: SmallScreen || Tablet ? `40%` : 40 }} />
              <div style={{ display: "flex", gap: 24 }}>
                <div
                  className="stack"
                  onClick={() => {
                    setLanguage(!Language);
                    if (!Language == true) {
                      setDashboard(false);
                      setProfile(false);
                    }
                  }}
                >
                  <img
                    alt=""
                    src="/images/Principle/Logo/Karir/Avatar/Indonesia@1x.png"
                    width={16}
                    height={16}
                  />
                  {!MediumScreen && !Tablet && !SmallScreen && (
                    <Body2 margin={`0 4px `}>Bahasa</Body2>
                  )}
                  <KeyboardArrowDown />
                  {Language && (
                    <ul className="language-dropdown">
                      <ListItem>
                        <Body2>Bahasa Inggris</Body2>
                      </ListItem>
                      <ListItem>
                        <Body2>Bahasa Indonesia</Body2>
                      </ListItem>
                    </ul>
                  )}
                </div>
                <span
                  style={{
                    borderLeft: `1px solid ` + Colors.neutral.light_grey,
                    height: 24,
                  }}
                />
                <div className="parent-notification">
                  <img alt="" src="/images/Principle/Logo/Notification.png" />
                  <div className="notification2">
                    <Notification state="counter" />
                  </div>
                </div>
                <div
                  className="parent-notification pointer"
                  onClick={() => {
                    setDashboard(true);
                    setProfile(false);
                    setLanguage(false);
                  }}
                >
                  <img alt="" src="/images/Principle/Logo/Dashboard.png" />
                  {!MediumScreen && !Tablet && !SmallScreen && (
                    <Body2>Dashboard</Body2>
                  )}
                  {/* <div className="notification">
                    <Notification state="counter" value={16} />
                  </div> */}
                </div>
                <span
                  style={{
                    borderLeft: `1px solid ` + Colors.neutral.light_grey,
                    height: 24,
                  }}
                />
                <div
                  className="stack pointer"
                  onClick={() => {
                    setProfile(!Profile);
                    if (!Profile == true) {
                      setDashboard(false);
                      setLanguage(false);
                    }
                  }}
                >
                  <img
                    alt=""
                    src="/images/Principle/Logo/Karir/Avatar/State=Girl.png"
                    width={24}
                    height={24}
                  />
                  {!MediumScreen && !Tablet && !SmallScreen && (
                    <Body2
                      margin={`0 4px `}
                      color={
                        Profile
                          ? Colors.primary.mid_blue
                          : Colors.neutral.greyish_brown
                      }
                    >
                      Maudy Gunawan
                    </Body2>
                  )}
                  <KeyboardArrowDown />
                </div>
              </div>
              {(SmallScreen || Tablet) && (
                <HamburgerCollapse
                  buttonWidth={24}
                  barColor={Colors.primary.mid_blue}
                  isActive={BurgerMenu}
                  toggleButton={() => setBurgerMenu(!BurgerMenu)}
                ></HamburgerCollapse>
              )}
            </div>
          </>
        )}
        {BurgerMenu && (
          <div className="burger-menu">
            <Link>Home</Link>
            <Link>Lowongan</Link>
            <Link>Perusahaan</Link>
            <Link>Inspirasi</Link>
            <Link>Karir Apps</Link>
          </div>
        )}
        {Profile &&
          (skeleton ? (
            <div className="profile-dropdown" style={{ width: 333 }}>
              <div className="d-flex">
                <Skeleton
                  variant="circular"
                  animation="wave"
                  height={40}
                  width={40}
                />
                <div className="info-profile">
                  <Skeleton animation="wave" width="100%" />
                  <Skeleton animation="wave" width="100%" />
                </div>
                <KeyboardArrowRight
                  style={{
                    color: Colors.neutral.light_grey,
                    width: 32,
                    height: 32,
                  }}
                />
              </div>
              <Skeleton
                variant="rectangular"
                animation="wave"
                height="48px"
                width="100%"
                sx={{ borderRadius: "10px", margin: "4px" }}
              />
              <Skeleton
                variant="rectangular"
                animation="wave"
                height="48px"
                width="100%"
                sx={{ borderRadius: "10px", margin: "4px" }}
              />
              <Divider />
              <div className="d-flex" style={{ margin: 8 }}>
                <Skeleton
                  variant="circular"
                  animation="wave"
                  height={24}
                  width={24}
                />
                <Skeleton animation="wave" width="50%" />
              </div>
              <div className="d-flex" style={{ margin: 8 }}>
                <Skeleton
                  variant="circular"
                  animation="wave"
                  height={24}
                  width={24}
                />
                <Skeleton animation="wave" width="50%" />
              </div>
            </div>
          ) : (
            <div className="profile-dropdown">
              <div className="pointer" onClick={() => setProfile(false)}>
                <CloseIcon />
              </div>
              <Divider />
              <div className="d-flex">
                <img
                  alt=""
                  src="/images/Principle/Logo/Karir/Avatar/State=Girl.png"
                  width={40}
                  height={40}
                />
                <div className="info-profile">
                  <Heading4 color={Colors.primary.mid_blue}>
                    Maudy Gunawan
                  </Heading4>
                  <div className="stack">
                    {profile == "amazing" && (
                      <img
                        alt=""
                        src="/images/Principle/Logo/Amazing.png"
                        width={12}
                        height={12}
                      />
                    )}
                    {profile == "itermediate" && (
                      <img
                        alt=""
                        src="/images/Principle/Logo/Itermediate.png"
                        width={12}
                        height={12}
                      />
                    )}
                    {profile == "amazing" ? (
                      <Body2 color={Colors.neutral.greyish_brown}>
                        {" "}
                        Profil Profesional
                      </Body2>
                    ) : profile == "itermediate" ? (
                      <Body2 color={Colors.neutral.greyish_brown}>
                        Profil Medium{" "}
                        <span color={Colors.secondary.highlight_green}>
                          5/8
                        </span>
                      </Body2>
                    ) : (
                      <Body2 color={Colors.neutral.greyish_brown}>
                        Profil Belum Lengkap{" "}
                        <span color={Colors.secondary.highlight_green}>
                          0/8
                        </span>
                      </Body2>
                    )}
                  </div>
                </div>
                <KeyboardArrowRight
                  style={{
                    color: Colors.neutral.greyish_brown,
                    width: 32,
                    height: 32,
                  }}
                />
              </div>
              <RectangleButton
                fullWidth
                customStyle={{ margin: "16px 0 8px 0" }}
              >
                {" "}
                Lengkapi Profil
              </RectangleButton>
              <RectangleButton
                fullWidth
                variant="ghost"
                customStyle={{ margin: "0 0 8px 0" }}
              >
                Edit Preferensi
              </RectangleButton>
              <Divider variant="gray" />
              {Mobile && (
                <div
                  className="d-flex pointer"
                  style={{ margin: 8 }}
                  onClick={() => setVisible(true)}
                >
                  <CircleAvatar state="language" type="indonesia" size="18px" />
                  <Body2 color={Colors.neutral.greyish_brown}>Bahasa</Body2>
                </div>
              )}
              <div className="d-flex" style={{ margin: 8 }}>
                <SettingsOutlined style={{ color: Colors.primary.mid_blue }} />
                <Body2 color={Colors.neutral.greyish_brown}>Pengaturan</Body2>
              </div>
              <div className="d-flex" style={{ margin: 8 }}>
                <div
                  className="d-flex pointer max-content"
                  style={{ width: "max-content" }}
                  onClick={handleLogout}
                >
                  <LogoutOutlined style={{ color: Colors.secondary.red }} />
                  <Body2 color={Colors.neutral.greyish_brown}>Keluar</Body2>
                </div>
              </div>
            </div>
          ))}
        <BottomSheet
          onClose={() => setVisible(false)}
          visible={Visible}
          options={[
            <RadioButton
              key={1}
              variant="left"
              options={[
                { label: "Bahasa Indonesia", value: "" },
                { label: "Bahasa Inggris", value: "" },
              ]}
              customStyle={{ padding: "16px 20px" }}
            />,
          ]}
        ></BottomSheet>
        <Container
          open={Dashboard}
          onClose={() => setDashboard(false)}
          BackdropComponent={Backdrop}
        >
          <Content>
            <div
              className="d-flex-fullwidth"
              style={{ padding: "16px 16px 0 16px" }}
            >
              <Heading2
                colors={Colors.neutral.greyish_brown}
                align={Mobile ? "center" : "left"}
                flexGrow={1}
              >
                Dashboard
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
            <Divider
              costumStyle={{
                width: !Mobile && "calc(100% - 32px)",
                marginLeft: !Mobile && 16,
              }}
            />
            {Mobile ? (
              <div
                className="d-flex-fullwidth"
                style={{ padding: "0 16px 8px 16px" }}
              >
                <Heading4 color={Colors.neutral.greyish_brown}>
                  Status Lamaran Saya
                </Heading4>
                <Heading5
                  color={Colors.secondary.clear_blue}
                  className="pointer"
                  onClick={() => router.push("/status-lamaran")}
                >
                  Lihat Semua
                </Heading5>
              </div>
            ) : (
              <div
                className="d-flex-fullwidth"
                style={{ padding: "0 16px 8px 16px" }}
              >
                <Heading2 color={Colors.neutral.greyish_brown}>
                  Status Lamaran Saya
                </Heading2>
                <Heading4
                  color={Colors.secondary.clear_blue}
                  className="pointer"
                  onClick={() => router.push("/status-lamaran")}
                >
                  Lihat Semua
                </Heading4>
              </div>
            )}
            {!dashboardApplications.data ||
            dashboardApplications.data?.length == 0 ? (
              <div className="empty-card">
                <EmptyState variant="horizontal" button={!Mobile} />
              </div>
            ) : (
              <div className="status-container">
                {dashboardApplications.data.map((el, idx) => (
                  <StatusLamaranCard
                    key={idx}
                    title={el.opportunity.job_position}
                    company={el.opportunity.company.name}
                    location={el.opportunity.location.name}
                    profileMatch={el.match_percentage}
                    timestamp={el.created_at}
                    status={el.current_status.name}
                  />
                ))}
              </div>
            )}

            {Mobile ? (
              <div style={{ padding: 16 }}>
                <Heading4 color={Colors.neutral.greyish_brown}>
                  Aktivitas Saya
                </Heading4>
                <div
                  className="activity-tab"
                  onClick={() =>
                    router.push("/search-lowongan?show=rekomendasi-lowongan")
                  }
                >
                  <ReceiptLongOutlined
                    style={{
                      color: Colors.neutral.brown_grey,
                      height: 24,
                      width: 24,
                      margin: 8,
                    }}
                  />
                  <Heading5 color={Colors.neutral.brown_grey}>
                    Rekomendasi Lowongan
                  </Heading5>
                </div>
                <div
                  className="activity-tab"
                  onClick={() => router.push("/lowongan-simpan")}
                >
                  <BookmarkOutlined
                    style={{
                      color: Colors.neutral.brown_grey,
                      height: 24,
                      width: 24,
                      margin: 8,
                    }}
                  />
                  <Heading5 color={Colors.neutral.brown_grey}>
                    Lowongan Disimpan
                  </Heading5>
                </div>
                <div
                  className="activity-tab"
                  onClick={() =>
                    router.push("/lowongan-simpan?tab=perusahaan-disubscribe")
                  }
                >
                  <img
                    alt=""
                    src="/images/Principle/Logo/Perusahaan-inactive.png"
                    style={{
                      color: Colors.neutral.brown_grey,
                      height: 24,
                      width: 24,
                      margin: 8,
                    }}
                  />
                  <Heading5 color={Colors.neutral.brown_grey}>
                    Perusahaan yang Di-subscribe
                  </Heading5>
                </div>
                <div
                  className="activity-tab"
                  onClick={() =>
                    router.push("/status-lamaran?tab=jadwal-interview")
                  }
                >
                  <DateRangeOutlined
                    style={{
                      color: Colors.neutral.brown_grey,
                      height: 24,
                      width: 24,
                      margin: 8,
                    }}
                  />
                  <Heading5 color={Colors.neutral.brown_grey}>
                    Jadwal Interview
                  </Heading5>
                  {dashboardInterviews.data &&
                    dashboardInterviews.data.total !== 0 && (
                      <Notification
                        state="counter"
                        value={dashboardInterviews.data?.total}
                      />
                    )}
                </div>
                <div
                  className="activity-tab"
                  onClick={() => router.push("/home")}
                >
                  <img
                    alt=""
                    src="/images/Principle/Logo/Alamat.png"
                    style={{
                      color: Colors.neutral.brown_grey,
                      height: 24,
                      width: 24,
                      margin: 8,
                    }}
                  />
                  <Heading5 color={Colors.neutral.brown_grey}>
                    Kembali ke Home
                  </Heading5>
                </div>
              </div>
            ) : (
              <div style={{ padding: 16 }}>
                <Heading3 color={Colors.neutral.greyish_brown}>
                  Aktivitas Saya
                </Heading3>
                <div
                  className="activity-tab"
                  onClick={() =>
                    router.push("/search-lowongan?show=rekomendasi-lowongan")
                  }
                >
                  <ReceiptLongOutlined
                    style={{
                      color: Colors.neutral.brown_grey,
                      height: 24,
                      width: 24,
                      margin: 8,
                    }}
                  />
                  <Heading4 color={Colors.neutral.brown_grey}>
                    Rekomendasi Lowongan
                  </Heading4>
                </div>
                <div
                  className="activity-tab"
                  onClick={() => router.push("/lowongan-simpan")}
                >
                  <BookmarkOutlined
                    style={{
                      color: Colors.neutral.brown_grey,
                      height: 24,
                      width: 24,
                      margin: 8,
                    }}
                  />
                  <Heading4 color={Colors.neutral.brown_grey}>
                    Lowongan Disimpan
                  </Heading4>
                </div>
                <div
                  className="activity-tab"
                  onClick={() =>
                    router.push("/lowongan-simpan?tab=perusahaan-disubscribe")
                  }
                >
                  <img
                    alt=""
                    src="/images/Principle/Logo/Perusahaan-inactive.png"
                    style={{
                      color: Colors.neutral.brown_grey,
                      height: 24,
                      width: 24,
                      margin: 8,
                    }}
                  />
                  <Heading4 color={Colors.neutral.brown_grey}>
                    Perusahaan yang Di-subscribe
                  </Heading4>
                </div>
                <div
                  className="activity-tab"
                  onClick={() =>
                    router.push("/status-lamaran?tab=jadwal-interview")
                  }
                >
                  <DateRangeOutlined
                    style={{
                      color: Colors.neutral.brown_grey,
                      height: 24,
                      width: 24,
                      margin: 8,
                    }}
                  />
                  <Heading4
                    color={Colors.neutral.brown_grey}
                    className="pointer"
                  >
                    Jadwal Interview
                  </Heading4>
                  {dashboardInterviews.data &&
                    dashboardInterviews.data.total !== 0 && (
                      <Notification
                        state="counter"
                        value={dashboardInterviews.data?.total}
                      />
                    )}
                </div>
                <div
                  className="activity-tab"
                  onClick={() => router.push("/home")}
                >
                  <img
                    alt=""
                    src="/images/Principle/Logo/Alamat.png"
                    style={{
                      color: Colors.neutral.brown_grey,
                      height: 24,
                      width: 24,
                      margin: 8,
                    }}
                  />
                  <Heading4 color={Colors.neutral.brown_grey}>
                    Kembali ke Home
                  </Heading4>
                </div>
              </div>
            )}

            {/* <div style={{ padding: 16 }}>
              {Mobile ? (
                <Heading4 color={Colors.neutral.greyish_brown}>
                  Akses Fitur Karir.com
                </Heading4>
              ) : (
                <Heading3 color={Colors.neutral.greyish_brown}>
                  Akses Fitur Karir.com
                </Heading3>
              )}
              <div className="features-tab">
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
            </div> */}
            {Mobile ? (
              <div style={{ padding: 16 }}>
                <Heading5 color={Colors.neutral.greyish_brown}>
                  Pusat Bantuan
                </Heading5>
                <div
                  className="activity-tab"
                  onClick={() =>
                    window.open(
                      "https://api.whatsapp.com/send/?phone=6281314917268&text&type=phone_number&app_absent=0",
                      "_blank"
                    )
                  }
                >
                  <img
                    alt=""
                    src="/images/Principle/Logo/Karir Care.png"
                    style={{
                      color: Colors.neutral.brown_grey,
                      height: 24,
                      width: 24,
                      margin: 8,
                    }}
                  />
                  <Heading4 color={Colors.neutral.brown_grey}>
                    Karir Care
                  </Heading4>
                </div>
              </div>
            ) : (
              <div style={{ padding: 16 }}>
                <Heading4 color={Colors.neutral.greyish_brown}>
                  Pusat Bantuan
                </Heading4>
                <div
                  className="activity-tab"
                  onClick={() =>
                    window.open(
                      "https://api.whatsapp.com/send/?phone=6281314917268&text&type=phone_number&app_absent=0",
                      "_blank"
                    )
                  }
                >
                  <img
                    alt=""
                    src="/images/Principle/Logo/Karir Care.png"
                    style={{
                      color: Colors.neutral.brown_grey,
                      height: 24,
                      width: 24,
                      margin: 8,
                    }}
                  />
                  <Heading5 color={Colors.neutral.brown_grey}>
                    Karir Care
                  </Heading5>
                </div>
              </div>
            )}
          </Content>
        </Container>
      </div>
    </>
  );
}
