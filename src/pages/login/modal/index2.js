import React from "react";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import { Box, styled } from "@mui/system";
import Divider from "../../../components/Atom/Divider";
import { Heading3 } from "../../../components/Atom/Typography";
import { Elevation, Radius } from "../../../themes";

const ModalContainer = ({ show, children, zIndex }) => {
  const ModalStyles = {
    position: `fixed`,
    zIndex: 100,
    right: 0,
    top: 0,
    bottom: 0,
    // top: `42px`,
    // bottom: `42px`,
    left: 0,
    paddingTop: "42px",
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
    width: 382,
    height: "auto",
    background: `white`,
    boxShadow: Elevation.modal,
    borderRadius: Radius.medium,
    // padding: "24px",
  };

  return (
    <ModalUnstyled style={ModalStyles} open={show} BackdropComponent={Backdrop}>
      <Box sx={style}>{children}</Box>
    </ModalUnstyled>
  );
};

const Modal2 = (props) => {
  const { show, children } = props;
  return <ModalContainer show={show}>{children}</ModalContainer>;
};

const Header = ({ children }) => (
  <>
    <Heading3 style={{ marginBottom: 16 }}>{children}</Heading3>
  </>
);

const Body = ({ children, minHeight, haveFooter }) => {
  return (
    <div
      style={
        {
          // overflow: `auto`,
          // maxHeight: "470px",
        }
      }
    >
      {children}
    </div>
  );
};

const Footer = ({ children }) => (
  <>
    <div
      className="d-flex"
      style={{ justifyContent: `flex-end`, marginTop: 16 }}
    >
      {children}
    </div>
  </>
);

Modal2.Header = Header;
Modal2.Body = Body;
Modal2.Footer = Footer;

export default Modal2;
