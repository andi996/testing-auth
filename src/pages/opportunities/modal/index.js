import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WestIcon from "@mui/icons-material/West";
import { Box, styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "../../../components/Atom/Divider";
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import RectangleButton from "../../../components/Atom/Button/RectangleButton";
import { Font, Heading4, Heading5 } from "../../../components/Atom/Typography";
import { Colors, Elevation, Radius } from "../../../themes";
import { isMobile } from "../../../utils/useMediaQuery";

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
  position,
  bottom = 0,
  left = `24px`,
  right = `24px`,
  maxWidth = `800px`,
  maxHeight = `fit-content`,
  zIndex = 1000,
}) {
  const Mobile = isMobile();

  const Backdrop = styled("div")`
    z-index: ${zIndex - 1};
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent;
  `;

  const styles = {
    Container: {
      visibility: show ? `visible` : `hidden`,
    },
    Modal: {
      position: position ? position : `fixed`,
      maxWidth: Mobile ? `100%` : maxWidth,
      height: Mobile ? `100%` : maxHeight,
      maxHeight: Mobile
        ? `100%`
        : submitBtnTitle || cancelBtnTitle
        ? `calc(100vh - 100px)`
        : `fit-content`,
      top: 0,
      bottom: bottom,
      left: Mobile ? 0 : left,
      right: Mobile ? 0 : right,
      margin: `auto`,
      padding: Mobile ? `16px` : `24px`,
      boxShadow: Mobile ? `none` : Elevation.navigationMenu,
      borderRadius: Mobile ? `none` : Radius.medium,
      background: `#fff`,
      zIndex: zIndex,
    },
    Header: {
      display: `flex`,
      alignItems: `center`,
      justifyContent: `space-between`,
      mb: Mobile ? 0 : `8px`,
    },
    Body: {
      my: Mobile && `8px`,
      maxHeight: Mobile
        ? `calc(100% - 110px)`
        : submitBtnTitle || cancelBtnTitle
        ? `calc(100vh - 300px)`
        : `calc(100vh - 180px)`,
      overflowY: `auto`,
    },
    Footer: {
      width: `100%`,
      maxHeight: Mobile ? `64px` : `fit-content`,
      position: Mobile ? `fixed` : `relative`,
      mt: Mobile ? 0 : `16px`,
      left: 0,
      bottom: 0,
      py: Mobile ? `12px` : 0,
      px: Mobile ? `16px` : 0,
      Button: {
        margin: 0,
        maxWidth: Mobile ? `100%` : `240px`,
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
            {Mobile && <CloseIcon className="pointer" onClick={handleClose} />}
            {!Mobile && (
              <>
                <Box className="d-flex" gap="8px">
                  {!Mobile && <ArrowBackIcon />}
                  <Font type={Mobile ? `Heading5` : `Heading3`}>
                    <Box>{title}</Box>
                  </Font>
                </Box>
                <CloseIcon className="pointer" onClick={handleClose} />
              </>
            )}
          </Box>
          {!Mobile && <Divider />}
          <Box sx={styles.Body}>
            <Box my={Mobile ? 0 : `16px`}>{children}</Box>
          </Box>
          {!Mobile && (submitBtnTitle || cancelBtnTitle) && <Divider />}

          {(cancelBtnTitle || submitBtnTitle) && (
            <Box sx={styles.Footer}>
              <Box
                className="d-flex"
                sx={{
                  justifyContent: !Mobile && `flex-end !important`,
                  gap: Mobile ? `8px` : `24px`,
                }}
              >
                {loading ? (
                  <CircularProgress sx={{ mx: `auto` }} />
                ) : (
                  <>
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
                        disable={isDisabled}
                        fullWidth
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
          )}
        </Box>
      </Box>
    </div>
  );
}
