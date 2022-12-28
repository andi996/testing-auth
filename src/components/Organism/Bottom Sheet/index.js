import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Colors, Elevation } from "../../../themes";
import { Body1, Heading3 } from "../../../components/Atom/Typography";
import RectangleButton from "../../../components/Atom/Button/RectangleButton";
import InputSearchField from "../../../components/Atom/Input Field/SearchField";
import Divider from "../../Atom/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import { Fade } from "react-reveal";

export default function BottomSheet(props) {
  const {
    visible,
    variant,
    title,
    children,
    cancelBtnTitle,
    submitBtnTitle,
    onCancel,
    onSubmit,
    onClose,
    options,
    fixed,
    search,
    loading,
    isDisabled,
  } = props;

  return (
    <>
      <style jsx>
        {`
          .bottom-sheet-container {
            width: 100%;
            position: fixed;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1050;

            .background {
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              z-index: 10;
              background-color: rgba(0, 0, 0, 0.5);
            }

            .bottom-sheet-content {
              width: 100%;
              max-height: 100%;
              position: relative;
              border-radius: 12px 12px 0px 0px;
              box-shadow: ${Elevation.modal};
              z-index: 1100;

              .drag-handle-container {
                padding-top: 12px;
                padding-bottom: 6px;
                cursor: pointer;
                .drag-handle {
                  width: 65px;
                  height: 3px;
                  margin: auto;
                  border-radius: 4px;
                  background-color: ${Colors.neutral.light_grey};
                  z-index: 100;
                }
              }

              .bottom-sheet-header {
                position: relative;
                overflow-x: hidden;
                overflow-y: auto;
                border-radius: 12px 12px 0px 0px;
                background-color: #fff;
                border-bottom: ${variant === `modal`
                  ? `1px solid ${Colors.neutral.very_light_grey}`
                  : `none`};

                .header-title {
                  padding: 16px;
                }
              }

              .bottom-sheet-body {
                min-height: ${search && `160px`};
                max-height: ${variant === `modal`
                  ? `calc(100% - (${title ? "80px" : "21px"} ${
                      (submitBtnTitle || cancelBtnTitle) && "+ 64px"
                    }))`
                  : `160px`};
                padding: 0 16px;
                overflow-y: ${fixed ? "hidden" : "auto"};
                background: #fff;
              }

              .bottom-sheet-footer {
                position: relative;
                height: 64px;
                .button-wrapper {
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  gap: 100px;
                  width: 100%;
                  position: fixed;
                  bottom: 0;
                  left: 0;
                  background-color: #fff;
                  padding: 12px 16px;
                  z-index: 1000;
                }
              }
            }
          }
        `}
      </style>

      <div
        className="bottom-sheet-container"
        style={{ display: visible ? `flex` : `none` }}
      >
        <div className="background" onClick={() => onClose(false)} />
        <Fade bottom>
          <div className="bottom-sheet-content">
            <div className="bottom-sheet-header">
              <div
                className="drag-handle-container"
                onClick={() => onClose(false)}
              >
                <div className="drag-handle" />
              </div>
              {title && (
                <div className="header-title">
                  <Heading3>{title}</Heading3>
                </div>
              )}
              {/* {search && <div className="header-title"> {search} </div>} */}
            </div>
            <div className="bottom-sheet-body">{children}</div>
            {variant === `modal` && (submitBtnTitle || cancelBtnTitle) && (
              <div className="bottom-sheet-footer">
                <div className="button-wrapper">
                  {cancelBtnTitle && (
                    <RectangleButton
                      variant="text"
                      fullWidth
                      customStyle={{ margin: 0 }}
                      onClick={onClose}
                    >
                      {cancelBtnTitle}
                    </RectangleButton>
                  )}

                  {loading ? (
                    <CircularProgress sx={{ mx: `auto` }} />
                  ) : (
                    <RectangleButton
                      disable={isDisabled}
                      fullWidth
                      customStyle={{ margin: 0 }}
                      onClick={onSubmit}
                    >
                      {submitBtnTitle}
                    </RectangleButton>
                  )}
                </div>
              </div>
            )}
          </div>
        </Fade>
      </div>
    </>
  );
}
