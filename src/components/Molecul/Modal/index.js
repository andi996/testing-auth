import React from "react";
import ModalContainer from "../../Atom/Modal";
import { Box } from "@mui/system";
import RectangleButton from "../../Atom/Button/RectangleButton";
import Divider from "../../Atom/Divider";

const Modal = (props) => {
  const {
    show,
    children,
    width,
    height,
    padding,
    actionButton = true,
    primaryButtonText,
    secondaryButtonText,
  } = props;

  const button = {
    margin: 0,
    width: 240,
  };
  return (
    <ModalContainer show={show} width={width} height={height} padding={padding}>
      {children}

      {/* Footer */}

      {actionButton && (
        <>
          <Divider />
          <Box
            className="d-flex"
            justifyContent="flex-end !important"
            gap="24px"
            mt="16px"
          >
            <RectangleButton state="alternate" customStyle={button}>
              {secondaryButtonText}
            </RectangleButton>
            <RectangleButton customStyle={button}>
              {primaryButtonText}
            </RectangleButton>
          </Box>
        </>
      )}
    </ModalContainer>
  );
};

const Header = ({ children }) => {
  return (
    <>
      {children}
      <Divider />
    </>
  );
};

const Body = ({ children }) => {
  return (
    <Box maxHeight="360px" overflow="auto">
      {children}
    </Box>
  );
};

Modal.Header = Header;
Modal.Body = Body;

export default Modal;
