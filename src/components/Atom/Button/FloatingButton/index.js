import { Colors, Elevation, Radius } from "../../../../themes";
import { Heading4 } from "../../Typography";
import { Button, styled, CircularProgress, Skeleton } from "@mui/material";
import { isMobile } from "../../../../utils/useMediaQuery";

export default function FloatingButton(props) {
  const { size, disable, onClick, skeleton } = props;
  const Mobile = isMobile();

  const Rectangle = styled(Button)({
    boxShadow: Elevation.navigationMenu,
    minWidth: 48,
    width: `fit-content`,
    padding: 8,
    borderRadius: Radius.circle,
    textTransform: "none",
    backgroundColor: Colors.secondary.clear_blue,
    zIndex: 15,
    "&:hover": {
      backgroundColor: Colors.secondary.clear_blue,
    },
    height: 48,
    "& img": {
      padding: 4,
      height: 32,
      width: 32,
    },
    position: `fixed`,
    right: Mobile ? 8 : 20,
    bottom: Mobile ? 64 : 20,
  });

  return skeleton ? (
    <Skeleton
      style={{
        position: `fixed`,
        bottom: Mobile ? 64 : 20,
        right: Mobile ? 8 : 20,
        borderRadius: Radius.circle,
        boxShadow: Elevation.navigationMenu,
      }}
      variant="rectangle"
      animation="wave"
      height={48}
      width={size === `medium` ? 124 : 48}
    />
  ) : (
    <Rectangle disabled={disable} onClick={onClick}>
      <div className="d-flex">
        <img alt="" src={`/images/Principle/Logo/Button/Karir Care.png`} />
        {size === `medium` && (
          <Heading4 color={`white`} marginRight={`8px`}>
            Bantuan
          </Heading4>
        )}
      </div>
    </Rectangle>
  );
}
