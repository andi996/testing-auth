import { Colors, Elevation, Radius } from "../../../../themes";
import { Button, styled, CircularProgress, Skeleton } from "@mui/material";

const variants = {
  linkedin: `linkedin.png`,
  apple: `apple.png`,
  facebook: `facebook.png`,
  google: `google.png`,
  instagram: `instagram.png`,
  tiktok: `tiktok.png`,
  twitter: `twitter.png`,
};

export default function SocialCircleButton(props) {
  const { children, disable, onClick, skeleton, variant = `google` } = props;

  const Rectangle = styled(Button)({
    boxShadow: Elevation.card,
    margin: 4,
    minWidth: 40,
    width: 40,
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
    height: 40,
    "& img": {
      padding: 4,
      height: 32,
      width: 32,
    },
  });

  return skeleton ? (
    <Skeleton variant="circular" animation="wave" height={40} width={40} />
  ) : (
    <Rectangle disabled={disable} onClick={onClick}>
      <img alt="" src={`/images/Principle/Logo/Button/` + variants[variant]} />
    </Rectangle>
  );
}
