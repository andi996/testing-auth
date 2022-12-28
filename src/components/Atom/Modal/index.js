import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WestIcon from "@mui/icons-material/West";
import { Box, styled } from "@mui/system";
import React from "react";
import RectangleButton from "../../../components/Atom/Button/RectangleButton";
import { Heading4, Heading5 } from "../../../components/Atom/Typography";
import { Colors, Elevation, Radius } from "../../../themes";
import { isMobile } from "../../../utils/useMediaQuery";

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
  isLoading,
  maxWidth = `800px`,
  maxHeight = `fit-content`,
}) {
  const Mobile = isMobile();

  const styles = {
    Container: {
      visibility: show ? `visible` : `hidden`,
      opacity: show ? 1 : 0,
      transition: `opacity 300ms`,
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
      alignItems: `center`,
      justifyContent: `center`,
      position: `relative`,
      padding: Mobile ? `16px` : 0,
      mb: Mobile ? 0 : `24px`,
    },
    IconWrapper: {
      color: Colors.primary.mid_blue,
      gap: `4px`,
      cursor: `pointer`,
    },
    Body: {
      maxHeight: Mobile ? `calc(100% - 110px)` : `calc(100vh - 308px)`,
      wordBreak: `break-all`,
      overflowY: `auto`,
    },
    Footer: {
      width: `100%`,
      maxHeight: Mobile ? `64px` : `fit-content`,
      position: Mobile ? `fixed` : `relative`,
      mt: Mobile ? 0 : `24px`,
      left: 0,
      bottom: 0,
      py: Mobile ? `12px` : 0,
      px: Mobile ? `16px` : 0,
      Button: {
        margin: 0,
      },
    },
  };

  return (
    <div>
      <Box sx={styles.Container}>
        <Box onClick={handleClose}>
          <Backdrop />
        </Box>
        <Box sx={styles.Modal}>
          <Box sx={styles.Header}>
            {/* Back */}
            <Box sx={{ position: `absolute`, left: 0 }} onClick={handleBack}>
              {Mobile ? (
                <Box className="d-flex pointer">
                  <WestIcon sx={{ color: Colors.neutral.greyish_brown }} />
                </Box>
              ) : (
                <Box className="d-flex" sx={styles.IconWrapper}>
                  <ArrowBackIcon sx={{ height: `16px`, width: `16px` }} />
                  <Heading5>Kembali</Heading5>
                </Box>
              )}
            </Box>

            {/* Title */}
            {Mobile && (
              <Heading4 color={Colors.primary.mid_blue}>{title}</Heading4>
            )}

            {/* Help */}
            {!Mobile && (
              <Box sx={{ position: `absolute`, right: 0 }}>
                <Box className="d-flex" sx={styles.IconWrapper}>
                  <HelpOutlineIcon sx={{ height: `16px`, width: `16px` }} />
                  <Heading5>Bantuan</Heading5>
                </Box>
              </Box>
            )}
          </Box>
          <Box sx={styles.Body}>{children}</Box>
          <Box sx={styles.Footer}>
            <Box
              className="d-flex"
              sx={{
                flexDirection: Mobile ? `row` : `column-reverse`,
                gap: Mobile ? `8px` : `16px`,
              }}
            >
              {cancelBtnTitle && (
                <RectangleButton
                  fullWidth
                  size={Mobile ? `medium` : `large`}
                  state="alternate"
                  customStyle={styles.Footer.Button}
                  onClick={handleCancel}
                >
                  {cancelBtnTitle}
                </RectangleButton>
              )}

              {submitBtnTitle && (
                <RectangleButton
                  loading={isLoading}
                  disable={isDisabled}
                  fullWidth
                  size={Mobile ? `medium` : `large`}
                  customStyle={styles.Footer.Button}
                  onClick={handleSubmit}
                >
                  {submitBtnTitle}
                </RectangleButton>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
