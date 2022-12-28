import React from "react";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import { Box, styled } from "@mui/system";
import Divider from "../../../components/Atom/Divider";
import { Heading3 } from "../../../components/Atom/Typography";
import { Elevation, Radius } from "../../../themes";

const ModalContainer = ({ show, children, zIndex, variant }) => {
  // const StyledModal = styled(ModalUnstyled)`
  //   position: fixed;
  //   z-index: 100;
  //   right: 0;
  //   bottom: 0;
  //   top: 0;
  //   left: 0;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  // `;

  const ModalStyles = {
    position: `fixed`,
    zIndex: 100,
    right: 0,
    top: 0,
    bottom: 0,
    // top: `42px`,
    // bottom: `42px`,
    left: 0,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `center`,
    backgroundColor: "rgb(30, 30, 30, 0.5)",
  };

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
    position: "relative",
    width: variant == "notifLoker" ? 588 : 800,
    height: `auto`,
    // width: "auto",
    maxWidth: "800px",
    // minWidth: "609px",
    background: `white`,
    boxShadow: Elevation.modal,
    borderRadius: Radius.medium,
    // padding: "24px",
    margin: "0 16px",
  };

  return (
    <ModalUnstyled style={ModalStyles} open={show} BackdropComponent={Backdrop}>
      <Box sx={style}>{children}</Box>
    </ModalUnstyled>
  );
};

const Modal = (props) => {
  const { show, children, variant } = props;
  return (
    <ModalContainer show={show} variant={variant}>
      {children}
    </ModalContainer>
  );
};

const Header = ({ children, variant }) => (
  <>
    <Heading3 style={{ marginBottom: 16 }}>{children}</Heading3>
    {variant !== "notifLoker" && <Divider />}
  </>
);
const Body = ({ children, variant }) => {
  return (
    <div
      style={{
        overflow: `auto`,
        padding:
          variant == "notifLoker" || variant == "logout" ? 0 : "17px 0 0 0",
      }}
    >
      {children}
    </div>
  );
};

const Footer = ({ children, variant }) => (
  <>
    {variant !== "notifLoker" && <Divider />}
    <div
      className="d-flex"
      style={{
        justifyContent: `flex-end`,
        marginTop: variant == "logout" ? 0 : 16,
      }}
    >
      {children}
    </div>
  </>
);

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
