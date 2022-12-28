import { Colors, Elevation, Radius } from "../../../../themes";
import { Button, styled, CircularProgress, Skeleton } from "@mui/material";
import { Heading3, Heading6 } from "../../Typography";

export default function FeaturesCircleButton(props) {
  const {
    children,
    disable,
    onClick,
    skeleton,
    size = "medium",
    text,
    label,
    image,
  } = props;

  const Rectangle = styled(Button)({
    boxShadow: Elevation.card,
    margin: 8,
    minWidth: 40,
    width: (size === "large" && 64) || (size === "medium" && 40),
    padding: 8,
    borderRadius: Radius.circle,
    textTransform: "none",
    backgroundColor: Colors.primary.very_light_blue,
    color: Colors.neutral.greyish_brown,
    "&:hover": {
      backgroundColor: Colors.primary.pale_gray,
    },
    "&:hover::after": {
      backgroundColor: Colors.primary.very_light_blue,
    },
    height: (size === "large" && 64) || (size === "medium" && 40),
    "& img": {
      color: Colors.primary.mid_blue,
      padding: size === "large" && 4,
      height: (size === "large" && 48) || (size === "medium" && 24),
      width: (size === "large" && 48) || (size === "medium" && 24),
    },
  });

  return skeleton ? (
    <Skeleton
      variant="circular"
      animation="wave"
      height={(size === "large" && 64) || (size === "medium" && 40)}
      width={(size === "large" && 64) || (size === "medium" && 40)}
    />
  ) : (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "78px",
        }}
      >
        <Rectangle disabled={disable} onClick={onClick}>
          <img alt="" src={image} />
        </Rectangle>
        <div style={{ textAlign: "center" }}>
          {text ? (
            size === "medium" ? (
              <Heading6>{label}</Heading6>
            ) : (
              <Heading3>{label}</Heading3>
            )
          ) : null}
        </div>
      </div>
    </>
  );
}
