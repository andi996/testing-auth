import { Colors, Elevation, Radius, Variants } from "../../../../themes";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button, styled, CircularProgress, Skeleton } from "@mui/material";
import { Label } from "../../Typography";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

export default function ChevronCircleButton(props) {
  const {
    children,
    disable,
    onClick,
    skeleton,
    size = "medium",
    variant = "left",
    customStyle,
  } = props;

  const Rectangle = styled(Button)({
    boxShadow: Elevation.card,
    margin: 8,
    minWidth: 40,
    width: (size === "large" && 48) || (size === "medium" && 40),
    padding: 8,
    borderRadius: Radius.circle,
    textTransform: "none",
    backgroundColor: `white`,
    "&:hover": {
      backgroundColor: Colors.primary.pale_gray,
    },
    "&:hover::after": {
      backgroundColor: Colors.primary.very_light_blue,
    },
    height: (size === "large" && 48) || (size === "medium" && 40),
    "& svg": {
      color: Colors.primary.mid_blue,
      padding: 4,
      height: (size === "large" && 40) || (size === "medium" && 32),
      width: (size === "large" && 40) || (size === "medium" && 32),
    },
    ...customStyle,
  });

  return skeleton ? (
    <Skeleton
      variant="circular"
      animation="wave"
      height={(size === "large" && 48) || (size === "medium" && 40)}
      width={(size === "large" && 48) || (size === "medium" && 40)}
    />
  ) : (
    <Rectangle disabled={disable} onClick={onClick}>
      {variant === `right` ? (
        <ArrowForwardIos />
      ) : (
        <ArrowBackIos style={{ marginLeft: 8 }} />
      )}
    </Rectangle>
  );
}
