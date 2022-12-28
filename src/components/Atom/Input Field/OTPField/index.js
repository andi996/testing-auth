import { Error } from "@mui/icons-material";
import React, { Fragment, useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { isMobile } from "../../../../utils/useMediaQuery";
import { Body3 } from "../../Typography";
import { Colors, Radius } from "../../../../themes";

export default function OTPField(props) {
  const { error, getInputOTP, numInputs = 6 } = props;
  const [Value, setValue] = useState("");
  const [Click, setClick] = useState(false);

  const Mobile = isMobile();

  const handleChangeOTP = (val) => {
    setValue(val);
    if (getInputOTP) {
      getInputOTP(val);
    }
  };

  return (
    <div onFocus={() => setClick(true)} onBlur={() => setClick(false)}>
      <OtpInput
        containerStyle={{ gap: `8px` }}
        inputStyle={{
          width: 46,
          height: 48,
          display: `flex`,
          flexDirection: `row`,
          alignItems: `center`,
          padding: `10px 12px`,
          border:
            Value !== "" || Click
              ? `1px solid ${Colors.primary.mid_blue}`
              : `1px solid ${Colors.neutral.light_grey}`,
          boxSizing: `border-box`,
          borderRadius: Radius.small,
          fontWeight: 600,
          fontSize: 24,
          lineHeight: `28px`,
          color: Colors.neutral.greyish_brown,
        }}
        focusStyle={{
          outline: `none`,
        }}
        errorStyle={{ border: `1px solid ${Colors.secondary.red}` }}
        value={Value}
        onChange={(val) => handleChangeOTP(val)}
        numInputs={numInputs}
        hasErrored={error}
      />
      {error && (
        <div className="d-flex" style={{ margin: 4 }}>
          <Error
            style={{
              width: 16,
              height: 16,
              marginRight: 4,
              color: Colors.secondary.red,
            }}
          />
          <Body3 color={Colors.secondary.red}>Verifikasi OTP tidak valid</Body3>
        </div>
      )}
    </div>
  );
}
