import WestIcon from "@mui/icons-material/West";
import { Box } from "@mui/system";
import React, { useState } from "react";
import FloatingButton from "../../components/Atom/Button/FloatingButton";
import { Colors } from "../../themes";
import {
  isLargeScreen,
  isMediumScreen,
  isMobile,
  isSmallScreen,
  isTablet,
} from "../../utils/useMediaQuery";
import OnBoarding from "./OnBoarding";
import Registration from "./Registration";

export default function Register() {
  const [user, setUser] = useState();
  const [page, setPage] = useState("register");
  const [step, setStep] = useState(1);
  const [showInputPassword, setShowInputPassword] = useState(false);

  const Mobile = isMobile();
  const Tablet = isTablet();
  const SmallScreen = isSmallScreen();
  const MediumScreen = isMediumScreen();
  const LargeScreen = isLargeScreen();

  const handlePage = async (val) => {
    if (val === "onboarding") {
      await setStep(1);
      setPage("onboarding");
    }
  };

  const handleStep = (val) => {
    setStep(val);
  };

  const handleBack = () => {
    if (page === "onboarding" && (step === 2 || step === 5)) {
      window.location.href = "/";
    } else {
      setStep(step - 1);
    }
  };

  // Styles
  const classes = {
    Body: {
      background: `url("/images/Principle/Background/Background Splashscreen.png")`,
      backgroundRepeat: `no-repeat`,
      backgroundSize: `100%`,
      py: Mobile ? 0 : `40px`,
    },
    HeaderMobile: {
      backgroundColor: `#fff`,
      position: `sticky`,
      top: 0,
      display: `flex`,
      justifyContent: `center`,
      alignItems: `center`,
      textAlign: `center`,
      padding: 16,
      zIndex: 100,
    },
    Backspace: {
      position: `absolute`,
      left: 16,
      cursor: `pointer`,
      color: Colors.neutral.brown_grey,
    },
  };

  return (
    <>
      <Box sx={classes.Body}>
        {(page === "register" || (page === "onboarding" && step !== 1)) && (
          <>
            {Mobile && (
              <Box style={classes.HeaderMobile}>
                <WestIcon
                  style={classes.Backspace}
                  onClick={() =>
                    showInputPassword
                      ? setShowInputPassword(false)
                      : handleBack()
                  }
                />
                <img
                  src="/images/Principle/Logo/Karir/default.png"
                  style={{ width: 79, height: 24, marginBottom: `-3px` }}
                  alt="karir.png"
                />
              </Box>
            )}
          </>
        )}

        {!Mobile && (
          <Box sx={{ width: `fit-content`, mx: `auto`, mb: `40px` }}>
            <img
              src="/images/Principle/Logo/Karir/default.png"
              style={{ width: 193, height: 59, marginBottom: `-3px` }}
              alt="karir.png"
            />
          </Box>
        )}

        {page === "register" && (
          <Registration
            step={step}
            handlePage={handlePage}
            handleStep={handleStep}
            handleBack={handleBack}
            showInputPassword={showInputPassword}
            setShowInputPassword={setShowInputPassword}
            setUser={setUser}
          />
        )}

        {page === "onboarding" && (
          <OnBoarding
            step={step}
            handlePage={handlePage}
            handleStep={handleStep}
            handleBack={handleBack}
            user={user}
          />
        )}
      </Box>

      {!Mobile &&
        (page === "register" || (page === "onboarding" && step !== 1)) && (
          <FloatingButton size="medium" />
        )}
    </>
  );
}
