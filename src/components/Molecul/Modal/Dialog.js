import React from "react";
import ModalContainer from "../../Atom/Modal";
import { Box, styled } from "@mui/system";
import { Body1, Heading3 } from "../../Atom/Typography";
import { Colors, Radius, Elevation } from "../../../themes";
import RectangleButton from "../../Atom/Button/RectangleButton";
import { isMobile } from "../../../utils/useMediaQuery";

export default function Dialog(props) {
  const {
    show,
    state = `default`,
    variant = `horizontal action right`,
    title,
    description,
    primaryButtonText,
    secondaryButtonText,
    handlePrimaryButton,
    handleSecondaryButton,
    handleClose,
  } = props;

  const Mobile = isMobile();

  const changeDirection = () => {
    if (variant === "horizontal action left") return "row-reverse !important";
    if (variant === "vertical action") return "column-reverse !important";
  };

  const Backdrop = styled("div")`
    z-index: 1099;
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
      position: `fixed`,
      maxWidth: Mobile ? `100%` : `382px`,
      height: `fit-content`,
      top: 0,
      bottom: 0,
      left: Mobile ? `16px` : 0,
      right: Mobile ? `16px` : 0,
      margin: `auto`,
      padding: Mobile ? `16px` : `24px`,
      boxShadow: Elevation.navigationMenu,
      borderRadius: Radius.medium,
      background: `#fff`,
      zIndex: 1100,
    },
    Header: { textAlign: `center` },
    Body: {
      mt: `12px`,
      mb: `16px`,
      textAlign: `center`,
      wordBreak: `break-word`,
    },
    Footer: { width: `100%` },
  };

  return (
    <Box sx={styles.Container}>
      <Box onClick={handleClose}>
        <Backdrop />
      </Box>
      <Box sx={styles.Modal}>
        <Box sx={styles.Header}>
          <Heading3>{title}</Heading3>
        </Box>
        <Box sx={styles.Body}>
          <Body1>
            <Box
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          </Body1>
        </Box>
        <Box sx={styles.Footer}>
          <Box className="d-flex" flexDirection={changeDirection()} gap="8px">
            {variant !== "single action" && (
              <RectangleButton
                state="alternate"
                fullWidth
                customStyle={{ margin: 0 }}
                onClick={handleSecondaryButton}
              >
                {secondaryButtonText}
              </RectangleButton>
            )}
            <RectangleButton
              fullWidth
              customStyle={{ margin: 0 }}
              onClick={handlePrimaryButton}
            >
              {primaryButtonText}
            </RectangleButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
