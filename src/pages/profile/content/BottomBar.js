import React from "react";
import { Box } from "@mui/system";
import RectangleButton from "../../../components/Atom/Button/RectangleButton";
import { isMobile } from "../../../utils/useMediaQuery";

export default function BottomBar({
  disable,
  cancelBtnTitle,
  submitBtnTitle,
  showCancelButton = true,
  handleCancel,
  handleSubmit,
}) {
  const Mobile = isMobile();
  return (
    <>
      {Mobile && (
        <Box
          className="d-flex-fullwidth"
          justifyContent="flex-end !important"
          position="fixed"
          left={0}
          bottom={0}
          gap="8px"
          p="12px 16px"
          zIndex={1000}
        >
          {showCancelButton && (
            <RectangleButton
              fullWidth
              state="alternate"
              customStyle={{ margin: 0 }}
              onClick={handleCancel}
            >
              {cancelBtnTitle}
            </RectangleButton>
          )}

          <RectangleButton
            fullWidth
            disable={disable}
            customStyle={{ margin: 0 }}
            onClick={handleSubmit}
          >
            {submitBtnTitle}
          </RectangleButton>
        </Box>
      )}

      {!Mobile && (
        <Box
          className="d-flex-fullwidth"
          justifyContent="flex-end !important"
          gap="24px"
          mt="40px"
        >
          {showCancelButton && (
            <RectangleButton
              state="alternate"
              customStyle={{ margin: 0, width: `100%`, maxWidth: `240px` }}
              onClick={handleCancel}
            >
              {cancelBtnTitle}
            </RectangleButton>
          )}

          <RectangleButton
            disable={disable}
            customStyle={{ margin: 0, width: `100%`, maxWidth: `240px` }}
            onClick={handleSubmit}
          >
            {submitBtnTitle}
          </RectangleButton>
        </Box>
      )}
    </>
  );
}
