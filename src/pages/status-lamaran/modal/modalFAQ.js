import React from "react";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import { Box, styled } from "@mui/system";
import Divider from "../../../components/Atom/Divider";
import { Heading3 } from "../../../components/Atom/Typography";
import { Elevation, Radius } from "../../../themes";
import useMediaQuery from "../../../utils/useMediaQuery";

const ModalContainer = ({ show, children, zIndex }) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(min-width:641px) and (max-width: 768px)");

  const StyledModal = styled(ModalUnstyled)`
    position: fixed;
    z-index: 100;
    right: 0;
    // bottom: 0;
    // top: 0;
    top: 42px;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const Backdrop = styled("div")`
    z-index: -1;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent;
  `;

  const style = {
    // position: "relative",
    // // width: isMediumScreen ? 736 : 800,
    // width: "auto",
    // height: `auto`,
    // maxWidth: "800px",
    // minWidth: "609px",
    // background: `white`,
    // boxShadow: Elevation.modal,
    // borderRadius: Radius.medium,
    // // padding: "24px",
    // margin: "0 16px",

    position: "relative",
    width: `100%`,
    maxWidth: isMobile ? "609px" : isTablet ? "736px" : "800px",
    height: `100%`, // if gap fixed to 42px
    background: `white`,
    boxShadow: Elevation.modal,
    borderRadius: Radius.medium,
  };

  return (
    <StyledModal open={show} slots={{ backdrop: Backdrop }}>
      <Box sx={style}>{children}</Box>
    </StyledModal>
  );
};

const Modal = (props) => {
  const { show, children } = props;
  return <ModalContainer show={show}>{children}</ModalContainer>;
};
const Header = ({ children }) => (
  <>
    <Heading3 style={{ marginBottom: 16 }}>{children}</Heading3>
    <Divider />
  </>
);
const Body = ({ children }) => {
  return (
    <div style={{ overflow: `auto`, padding: "24px 20px 0 20px" }}>
      {children}
    </div>
  );
};

const Footer = ({ children }) => (
  <>
    <Divider />
    <div
      className="d-flex"
      style={{ justifyContent: "space-between", marginTop: 16, gap: 24 }}
    >
      {children}
    </div>
  </>
);

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
