import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WestIcon from "@mui/icons-material/West";
import { Box, styled } from "@mui/system";
import React from "react";
import RectangleButton from "../../../../components/Atom/Button/RectangleButton";
import {
  Heading2,
  Heading4,
  Heading5,
} from "../../../../components/Atom/Typography";
import { Colors, Elevation, Radius } from "../../../../themes";
import { isMobile } from "../../../../utils/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "../../../Atom/Divider";

const Backdrop = styled("div")`
  z-index: 999;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

export default function ModalContainer({
  loading,
  show,
  title,
  children,
  submitBtnTitle,
  cancelBtnTitle,
  handleSubmit,
  handleCancel,
  handleBack,
  handleClose,
  isDisabled,
  maxWidth = `800px`,
  maxHeight = `fit-content`,
}) {
  const Mobile = isMobile();

  const styles = {
    Container: {
      visibility: show ? `visible` : `hidden`,
      opacity: show ? 1 : 0,
    },
    Modal: {
      position: `fixed`,
      maxWidth: Mobile ? `100%` : maxWidth,
      height: Mobile ? `100%` : maxHeight,
      maxHeight: Mobile ? `100%` : `calc(100vh - 100px)`,
      top: 0,
      bottom: 0,
      left: Mobile ? 0 : `24px`,
      right: Mobile ? 0 : `24px`,
      margin: `auto`,
      padding: Mobile ? `16px` : `24px`,
      boxShadow: Mobile ? `none` : Elevation.navigationMenu,
      borderRadius: Mobile ? `none` : Radius.medium,
      background: `#fff`,
      zIndex: 1000,
    },
    Header: {
      display: `flex`,
      width: `100%`,
      alignItems: `center`,
      justifyContent: `space-between`,
      position: `relative`,
      padding: Mobile ? `16px` : 0,
      mb: Mobile ? 0 : `24px`,
    },
    Body: {
      maxHeight: Mobile ? `calc(100% - 110px)` : `calc(100vh - 308px)`,
      wordBreak: `break-all`,
      overflowY: `auto`,
    },
    Footer: {
      width: `100%`,
      display: `flex`,
      justifyContent: `flex-end`,
      maxHeight: Mobile ? `64px` : `fit-content`,
      mt: `24px`,
      py: 0,
      px: 0,
      Button: {
        margin: 0,
        width: `240px`,
      },
    },
  };

  return (
    <Box sx={styles.Container}>
      <Box onClick={handleClose}>
        <Backdrop />
      </Box>
      <Box sx={styles.Modal}>
        <Box sx={styles.Header}>
          {/* Title */}
          <Heading2>{title}</Heading2>

          {/* Close */}
          <Box
            className="d-flex pointer"
            sx={{ width: `fit-content !important` }}
            onClick={handleClose}
          >
            <CloseIcon />
          </Box>
        </Box>
        <Divider />
        <Box sx={styles.Body}>{children}</Box>
        <Divider />
        <Box sx={styles.Footer}>
          {loading ? (
            <CircularProgress sx={{ mr: `16px` }} />
          ) : (
            <>
              {submitBtnTitle && (
                <RectangleButton
                  disable={isDisabled}
                  size={Mobile ? `medium` : `large`}
                  customStyle={styles.Footer.Button}
                  onClick={handleSubmit}
                >
                  {submitBtnTitle}
                </RectangleButton>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
