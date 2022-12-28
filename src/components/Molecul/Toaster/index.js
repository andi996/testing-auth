import { Button, IconButton, Snackbar, SnackbarContent } from "@mui/material";
import { Body3, Heading4, Heading5 } from "../../Atom/Typography/index";
import React from "react";
import { CheckCircle, Close, Error } from "@mui/icons-material";
import { Colors, Radius } from "../../../themes";
import { isMobile } from "../../../utils/useMediaQuery";

export default function Toaster(props) {
  const {
    open,
    setOpen,
    variant,
    size,
    label,
    subLabel,
    handleClick,
    fullWidth,
    noBar,
    mobile = false,
  } = props;
  const Mobile = isMobile();

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={open}
      onClose={() => setOpen(false)}
      //   autoHideDuration={6000}
      style={{
        left: Mobile ? 8 : mobile ? null : 40,
        bottom: Mobile && noBar ? 16 : Mobile ? 64 : 40,
        right: Mobile && 8,
      }}
    >
      <SnackbarContent
        sx={{
          "&.MuiSnackbarContent-root": {
            width: fullWidth || Mobile ? "100%" : 384,
            backgroundColor:
              (variant === `success` && Colors.secondary.highlight_green) ||
              (variant === `error` && Colors.secondary.red) ||
              (variant === `undo` && Colors.primary.dark_blue),
            borderRadius: Radius.medium,
          },
          ".MuiSnackbarContent-action": {
            paddingLeft: Mobile ? "0" : "16px",
          },
          ".MuiButton-root": {
            paddingLeft: Mobile ? "8px" : 0,
            minWidth: Mobile ? 0 : "64px",
          },
        }}
        message={
          <div className="d-flex">
            {variant === `error` ? (
              <Error
                style={{
                  marginRight: `8px`,
                }}
              />
            ) : (
              <CheckCircle
                style={{
                  marginRight: `8px`,
                }}
              />
            )}
            <div>
              {Mobile ? (
                <Body3 color="white"> {label}</Body3>
              ) : (
                <Heading5 color="white">{label}</Heading5>
              )}
              {size === `2 line` &&
                (Mobile ? (
                  <Body3 color="white"> {subLabel}</Body3>
                ) : (
                  <Heading5 color="white">{subLabel}</Heading5>
                ))}
            </div>
          </div>
        }
        action={
          variant === `undo` ? (
            <Button
              color="inherit"
              size="small"
              onClick={handleClick && handleClick}
            >
              <Heading4 style={{ fontSize: Mobile ? "14px" : "16px" }}>
                Undo
              </Heading4>
            </Button>
          ) : (
            <IconButton color="inherit" onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          )
        }
      />
    </Snackbar>
  );
}
