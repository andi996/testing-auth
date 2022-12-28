import { Colors, Radius, Variants } from "../../../../themes";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckIcon from "@mui/icons-material/Check";
import { Button, styled, CircularProgress, Skeleton } from "@mui/material";
import { Label } from "../../Typography";
import { padding } from "@mui/system";
import useMediaQuery from "../../../../utils/useMediaQuery";

export default function RectangleButton(props) {
  const {
    children,
    disable,
    loading,
    icon,
    state,
    onClick,
    iconOnly,
    skeleton,
    size = "medium",
    variant = "filled",
    zIndex,
    label,
    selected,
    customStyle,
    fullWidth,
    iconOut,
    subscribe = false,
  } = props;

  const isMobile = useMediaQuery("(max-width: 640px)");

  const Rectangle = styled(Button)({
    zIndex: zIndex,
    margin: customStyle ? customStyle.margin : 4,
    minWidth: undefined,
    width: iconOnly
      ? (size === "large" && 48) ||
        (size === "medium" && 40) ||
        (size === "small" && 32) ||
        (size === "micro" && 24)
      : fullWidth
      ? "100%"
      : "fit-content",
    padding: 8,
    borderRadius: Radius.medium,
    textTransform: "none",
    backgroundColor:
      state === "alternate"
        ? Variants[variant].alternate.backgroundColor
        : state === "error"
        ? Variants[variant].error.backgroundColor
        : variant === "ghost" && selected
        ? Colors.primary.very_light_blue
        : Variants[variant].backgroundColor,
    color:
      state === "alternate"
        ? Variants[variant].alternate.color
        : state === "error"
        ? Variants[variant].error.color
        : Variants[variant].color,
    border:
      state === "alternate"
        ? Variants[variant].alternate.border
        : state === "error"
        ? Variants[variant].error.border
        : Variants[variant].border,
    position: Variants[variant].position,
    pointerEvents: label && `none`,
    "&:active": Variants[variant].active,
    "&:hover": state !== "alternate" && Variants[variant].hover,
    "&::after": Variants[variant].after,
    "&:hover::after": Variants[variant].afterHover,
    "&:active::after": Variants[variant].afterActive,
    height:
      (size === "large" && 48) ||
      (size === "medium" && 40) ||
      (size === "small" && 32) ||
      (size === "micro" && 24) ||
      (size === "xtra large" && 64),
    "&:disabled": {
      backgroundColor:
        variant === "filled" && `${Colors.neutral.very_light_grey} !important`,
      color:
        variant === "filled" && `${Colors.neutral.brown_light_grey} !important`,
      border:
        variant === "ghost" &&
        `1px solid ${Colors.neutral.light_grey} !important`,
    },
    "& svg": {
      color: variant === "filled" ? "white" : Colors.primary.mid_blue,
      padding: 8,
      margin: 4,
      height:
        (size === "large" && 40) ||
        (size === "medium" && 32) ||
        (size === "small" && 24) ||
        (size === "micro" && 16),
      width:
        (size === "large" && 40) ||
        (size === "medium" && 32) ||
        (size === "small" && 24) ||
        (size === "micro" && 16),
    },
    ...customStyle,
  });

  return skeleton ? (
    <Skeleton
      variant="rectangular"
      animation="wave"
      height={
        (size === "large" && 48) ||
        (size === "medium" && 40) ||
        (size === "small" && 32) ||
        (size === "micro" && 24)
      }
      width={
        iconOnly
          ? (size === "large" && 48) ||
            (size === "medium" && 40) ||
            (size === "small" && 32) ||
            (size === "micro" && 24)
          : "fit-content"
      }
      sx={{ borderRadius: Radius.medium }}
    />
  ) : (
    <Rectangle
      sx={{
        ".MuiButton-startIcon": {
          marginRight: 0,
          svg: {
            padding: "4px",
            fontSize: "16px",
          },
        },
        ".MuiButton-endIcon": {
          marginLeft: 0,
          svg: {
            padding: "4px",
            fontSize: "16px",
          },
        },
      }}
      disabled={disable}
      loading={loading}
      variant={variant}
      startIcon={
        loading ? null : icon || iconOut ? (
          icon === "left" && iconOut ? (
            disable ? (
              <LogoutIcon
                style={{
                  transform: "rotate(180deg)",
                  marginRight: -10,
                  color: Colors.neutral.brown_grey,
                }}
              />
            ) : (
              <LogoutIcon
                style={{
                  transform: "rotate(180deg)",
                  marginRight: 0,
                  color: Colors.primary.mid_blue,
                }}
              />
            )
          ) : icon === "left" ? (
            <ArrowForwardIcon
              style={{
                color:
                  variant !== "filled" &&
                  state == "error" &&
                  Colors.secondary.red,
              }}
            />
          ) : null
        ) : subscribe ? (
          <img
            src="/images/Principle/Logo/Checklist.svg"
            alt="checklist-image"
            style={{
              margin: 0,
              marginRight: 4,
              padding: 0,
              width: isMobile ? 14 : 24,
              height: isMobile ? 14 : 24,
              fill: Colors.secondary.clear_blue,
            }}
          />
        ) : null
      }
      endIcon={
        loading
          ? null
          : icon === "right" && (
              <ArrowForwardIcon
                style={{
                  color:
                    variant !== "filled" &&
                    state == "error" &&
                    Colors.secondary.red,
                }}
              />
            )
      }
      onClick={onClick}
      fullWidth={fullWidth}
    >
      {loading ? (
        <CircularProgress />
      ) : iconOnly ? (
        <ArrowForwardIcon />
      ) : (
        <Label size={size} value={children} />
      )}
    </Rectangle>
  );
}
