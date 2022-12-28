import React, { useRef, useState } from "react";
import Logo from "../../Atom/Logo";
import Link from "../../Atom/Link";
import CircleAvatar from "../../Atom/Avatar/Circle";
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
  Heading2,
  Heading3,
  Heading4,
  Label,
} from "../../Atom/Typography";
import { Colors, Elevation, Radius } from "../../../themes";
import Notification from "../../Atom/Badge/Notification";
import RectangleButton from "../../Atom/Button/RectangleButton";
import Divider from "../../Atom/Divider";
import { ModalUnstyled } from "@mui/base";
import { Box, styled } from "@mui/system";
import Images from "../../Atom/Image";
import FeaturesCircleButton from "../../Atom/Button/CircleButton/Features";
import useOutsideAlerter from "../../../utils/handleClickOutside";
import { useRouter } from "next/router";
import { ListItem } from ".";

export default function HeaderGuest(props) {
  const { variant, children } = props;
  const [Profile, setProfile] = useState(false);
  const [Language, setLanguage] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setProfile);
  const router = useRouter();

  return (
    <>
      <style jsx>
        {`
          .container {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 99;
            height: 80px;
            width: 100%;
            background: ${variant === `no background`
              ? `transparent`
              : `white`};
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: ${variant !== `no background` &&
            Elevation.navigationMenu};
            padding: 0 16px;
          }
          .stack {
            display: flex;
            align-items: center;
            cursor: pointer;
            position: relative;
          }
          .notification {
            position: absolute;
            top: -16px;
            right: -24px;
          }
          .parent-notification {
            position: relative;
            width: fit-content;
            display: flex;
            align-items: center;
          }
          .profile-dropdown {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding: 12px;
            box-shadow: ${Elevation.navigationMenu};
            border-radius: ${Radius.medium};
            position: fixed;
            top: 64px;
            right: 10px;
            background: white;
            z-index: 100;
          }
          .info-profile {
            margin: 8px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
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
          .card {
            display: flex;
            flex-direction: row;
            align-items: flex-start;

            padding: 16px;
            margin: 16px;
            width: 492px;
            height: 150px;
            box-shadow: ${Elevation.card};
            border-radius: ${Radius.medium};
          }
          .container-right {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin: 0px 16px;
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
            width: 100%;
            align-items: center;
            margin: 8px 0;
            cursor: pointer;
            justify-content: center;
            width: 40%;
          }
          .button-stack {
            display: flex;
            gap: 16px;
          }
        `}
      </style>
      <div style={{ position: "relative" }}>
        <div className="container" ref={wrapperRef}>
          <Logo width={105} height={32} onClick={() => router.push("/")} />
          {children}

          <div className="button-stack">
            <div className="stack" onClick={() => setLanguage(!Language)}>
              <img
                alt=""
                src="/images/Principle/Logo/Karir/Avatar/Indonesia@1x.png"
                width={16}
                height={16}
              />
              <Body2 margin={`0 4px `}>Bahasa</Body2>
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
            <RectangleButton variant="text" size="small">
              Employer
            </RectangleButton>
            <RectangleButton
              variant="ghost"
              customStyle={{ width: 124 }}
              onClick={() => router.push("/login")}
            >
              Masuk
            </RectangleButton>
            <RectangleButton
              customStyle={{ width: 124 }}
              onClick={() => router.push("/register")}
            >
              Buat Akun
            </RectangleButton>
          </div>
        </div>
      </div>
    </>
  );
}
