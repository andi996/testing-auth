import CloseIcon from "@mui/icons-material/Close";
import { Box, styled } from "@mui/system";
import React, { useState } from "react";
import RectangleButton from "../../../components/Atom/Button/RectangleButton";
import Divider from "../../../components/Atom/Divider";
import InputTextArea from "../../../components/Atom/Input Field/TextArea";
import ActionChip from "../../../components/Atom/Selection Control/Chips/ActionChip";
import { Body1, Body3, Heading3 } from "../../../components/Atom/Typography";
import BottomSheet from "../../../components/Organism/Bottom Sheet";
import { Colors, Elevation, Radius } from "../../../themes";
import { isMobile } from "../../../utils/useMediaQuery";

const Backdrop = styled("div")`
  z-index: 999;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

export default function ModalContainer({
  show,
  loading,
  title,
  notes,
  submitBtnTitle = "Tutup",
  handleSubmit,
  handleClose,
  isDisabled,
  isLoading,
  maxWidth = `800px`,
  maxHeight = `fit-content`,
}) {
  const Mobile = isMobile();

  const [accepted, setAccepted] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [reason, setReason] = useState("");

  const styles = {
    Container: {
      visibility: show ? `visible` : `hidden`,
    },
    Modal: {
      position: `fixed`,
      maxWidth: maxWidth,
      height: maxHeight,
      maxHeight: `calc(100vh - 100px)`,
      top: 0,
      bottom: 0,
      left: `24px`,
      right: `24px`,
      margin: `auto`,
      padding: `24px`,
      boxShadow: Elevation.navigationMenu,
      borderRadius: Radius.medium,
      background: `#fff`,
      zIndex: 1000,
    },
    Header: {
      display: `flex`,
      alignItems: `center`,
      justifyContent: `space-between`,
      position: `relative`,
      mb: `16px`,
    },
    Body: {
      maxHeight: Mobile ? `calc(100% - 110px)` : `calc(100vh - 308px)`,
      wordBreak: `break-word`,
      overflowY: `auto`,
    },
    Footer: {
      width: `100%`,
      maxHeight: `fit-content`,
      position: `relative`,
      mt: `24px`,
      left: 0,
      bottom: 0,
      py: 0,
      px: 0,
      Button: {
        margin: 0,
      },
    },
  };

  return (
    <>
      {!Mobile ? (
        <Box sx={styles.Container}>
          <Box onClick={handleClose}>
            <Backdrop />
          </Box>
          <Box sx={styles.Modal}>
            <Box sx={styles.Header}>
              {/* Title */}
              <Heading3>{title}</Heading3>

              {/* Close */}
              <CloseIcon
                sx={{ cursor: `pointer`, height: `24px`, width: `24px` }}
                onClick={handleClose}
              />
            </Box>
            <Divider />
            <Box sx={styles.Body}>
              <Box
                onClick={() => {
                  handleSubmit({
                    attend: true,
                    notes: reason,
                  });
                }}
              >
                CLICK (TESTING)
              </Box>
              <Body1>
                <div
                  dangerouslySetInnerHTML={{
                    __html: notes,
                  }}
                />
              </Body1>

              {title === "Konfirmasi Interview" && (
                <>
                  <Box className="d-flex" gap="12px">
                    <ActionChip
                      active={accepted}
                      onClick={() => {
                        setRejected(false);
                        setAccepted(!accepted);
                        setReason("");
                      }}
                    >
                      Terima
                    </ActionChip>
                    <ActionChip
                      active={rejected}
                      onClick={() => {
                        setAccepted(false);
                        setRejected(!rejected);
                      }}
                    >
                      Tolak
                    </ActionChip>
                  </Box>
                  {rejected && (
                    <Box mt="24px" maxWidth="480px">
                      <InputTextArea
                        fullWidth
                        label="Alasan ganti konfirmasi"
                        inputValue={reason}
                        helperText="Minimal 30 kata"
                        characterCount={30}
                        handleChange={(e) => setReason(e.target.value)}
                      />
                    </Box>
                  )}
                </>
              )}
            </Box>

            {title === "Konfirmasi Interview" && (
              <Box sx={styles.Footer}>
                <Box
                  className="d-flex"
                  sx={{
                    flexDirection: Mobile ? `row` : `column-reverse`,
                    gap: Mobile ? `8px` : `16px`,
                  }}
                >
                  {submitBtnTitle && (
                    <RectangleButton
                      disable={
                        (!accepted && !rejected) ||
                        (rejected && reason?.length < 30)
                      }
                      fullWidth
                      size={Mobile ? `medium` : `large`}
                      customStyle={styles.Footer.Button}
                      onClick={() => {
                        if (accepted || rejected) {
                          handleSubmit({
                            attend: accepted ? true : false,
                            notes: reason,
                          });
                        }
                      }}
                    >
                      {submitBtnTitle}
                    </RectangleButton>
                  )}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <BottomSheet
          visible={Mobile && show}
          variant="modal"
          title={title}
          submitBtnTitle={submitBtnTitle}
          onSubmit={handleSubmit}
          onClose={handleClose}
        >
          <Box my="16px">
            <Body3 color={Colors.neutral.greyish_brown}>
              <div
                dangerouslySetInnerHTML={{
                  __html: notes,
                }}
              />
            </Body3>
          </Box>
        </BottomSheet>
      )}
    </>
  );
}
