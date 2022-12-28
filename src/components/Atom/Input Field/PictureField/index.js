import { CloseOutlined } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Colors, Radius } from "../../../../themes";
import RectangleButton from "../../Button/RectangleButton";
import Loader from "../../Loader";
import { Body3 } from "../../Typography";

export default function InputPictureField(props) {
  const { error, disable, value, onChange } = props;
  const [Value, setValue] = useState(value);
  useEffect(() => {
    setValue(value);
  }, [value]);
  return (
    <>
      <style jsx>
        {`
          input[type="file"] {
            visibility: hidden;
            width: 0;
            height: 0;
          }
          .container {
            width: 120px;
            height: 120px;
            position: relative;
          }
          .placeholder {
            object-fit: cover;
            width: 120px;
            height: 120px;
            position: absolute;
            top: 0;
            bottom: 0;
            cursor: pointer;
            border-radius: ${Radius.small};
          }
          .empty {
            cursor: pointer;
            border: 1.05px dashed
              ${error ? Colors.secondary.red : Colors.neutral.light_grey};
            box-sizing: border-box;
            border-radius: 4px;
            span {
              font-size: 24px;
              color: ${error
                ? Colors.secondary.red
                : Colors.neutral.light_grey};
            }
            :hover {
              border: 1.05px dashed ${Colors.primary.mid_blue};
              span {
                color: ${Colors.primary.mid_blue};
              }
            }
            :focused {
              border: 1.05px dashed ${Colors.primary.mid_blue};
              span {
                color: ${Colors.primary.mid_blue};
              }
            }
          }
          .indicator {
            display: flex;
            width: 120px;
            height: 120px;
            justify-content: center;
            align-items: center;
          }
          .overlay {
            width: 120px;
            height: 120px;
            position: absolute;
            top: 0;
            bottom: 0;
            cursor: pointer;
            border-radius: ${Radius.small};
            opacity: 0;
            :hover {
              display: flex;
              justify-content: center;
              align-items: center;
              opacity: 1;
              background: rgba(30, 30, 30, 0.5);
            }
          }
        `}
      </style>
      {/* {skeleton ? (
        <Skeleton
          variant="circular"
          animation="wave"
          height={160}
          width={160}
        />
      ) : (
        <> */}
      <div>
        {" "}
        <div className="container">
          {Value ? (
            <div onClick={() => setValue(false)}>
              <img alt="" src={Value} className="placeholder" />
              <span className="overlay">
                <CloseOutlined style={{ color: `white`, fontSize: 36 }} />
              </span>
            </div>
          ) : (
            <>
              <label htmlFor="file-input">
                <div className="empty">
                  <div className="indicator">
                    {!Value &&
                      (disable ? <Loader zIndex={3} /> : <span>+</span>)}
                  </div>
                </div>
              </label>
              <input
                id="file-input"
                type="file"
                disabled={disable}
                //   value={value}
                onChange={onChange}
                accept="image/png, image/jpeg, application/pdf"
              />
            </>
          )}
        </div>
        {!value && (
          <Body3
            color={error ? Colors.secondary.red : Colors.neutral.brown_grey}
          >
            png, jpeg, pdf maks 5mb
          </Body3>
        )}
      </div>
      {/* </>
      )} */}
    </>
  );
}
