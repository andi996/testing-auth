import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Colors, Elevation, Radius } from "../../themes";
import {
  Body1,
  Body2,
  Body3,
  Heading2,
  Heading3,
  Heading5,
} from "../../components/Atom/Typography";
import WestIcon from "@mui/icons-material/West";
import { Box } from "@mui/system";
import Logo from "../../components/Atom/Logo";
import Image from "next/image";
import Layout from "../../components/Layout/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InputTextField from "../../components/Atom/Input Field/TextField";
import RectangleButton from "../../components/Atom/Button/RectangleButton";
import Divider from "../../components/Atom/Divider";
import Link from "next/link";
import ModalPopup from "./popup/ModalPopup";
import InputPasswordField from "../../components/Atom/Input Field/PasswordField";
import CheckboxButton from "../../components/Atom/Selection Control/Checkbox";
import LoginContent from "./LoginContent";
import LupaPassword from "./LupaPassword";
import Toaster from "../../components/Molecul/Toaster";
import {
  isMobile,
  isMediumScreen,
  isLargeScreen,
  isTablet,
} from "../../utils/useMediaQuery";
import Cookies from "js-cookie";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

export default function Login() {
  const router = useRouter();

  const [content, setContent] = useState(1); // 1 = login content
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [inputEmailOrPonsel, setInputEmailOrPonsel] = useState("");
  const [inputIsNumber, setInputIsNumber] = useState(false);

  const [openToaster, setOpenToaster] = useState(false);
  const [errorToasterText, setErrorToasterText] = useState("");
  const [errorToasterText2Line, setErrorToasterText2Line] = useState(
    "Silahkan coba login kembali."
  );
  const [variantToaster, setVariantToaster] = useState("success");

  const Mobile = isMobile();
  const MediumScreen = isMediumScreen();
  const LargeScreen = isLargeScreen();
  const Tablet = isTablet();

  const classes = {
    BoxContainer: {
      background: `white`,
      borderRadius: Radius.medium,
      boxShadow: Elevation.navigationMenu,
      display: "flex",
      flexDirection: "column",
      width: 486,
    },
    Header: {
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
    dividerContainer: {
      position: `relative`,
      display: `flex`,
      alignItems: `center`,
      caption: {
        position: `absolute`,
        width: `fit-content`,
        backgroundColor: `white`,
        color: Colors.neutral.brown_light_grey,
        padding: `0 4px`,
        left: 0,
        right: 0,
        margin: `auto`,
      },
    },
    card: {
      width: `100%`,
      cursor: `pointer`,
      padding: `12px`,
      borderRadius: Radius.medium,
      boxShadow: Elevation.navigationMenu,
    },
    footerContainer: {
      padding: `12px 24px`,
      textAlign: `center`,
      backgroundColor: Colors.primary.pale_gray,
    },
  };

  // useEffect(() => {
  //   var isLogin = Cookies.get("token");
  //   if (isLogin) {
  //     window.location.href = "/";
  //   }
  // }, []);

  // const { data: session, status } = useSession();
  // const loading = status === "loading";

  useEffect(() => {
    const queryParameters = new URLSearchParams(window?.location?.search);
    const errorParams = queryParameters.get("error");
    if (errorParams) {
      setVariantToaster("error");
      setErrorToasterText("Login gagal!");
      setErrorToasterText2Line("Silahkan coba login kembali.");
      setOpenToaster(true);
    } else {
      setOpenToaster(false);
    }
  }, []);

  const handleModalPopup = (val) => {
    if (val === "open") {
      setShowModal(true);
    } else if (val === "close") {
      setShowModal(false);
    }
  };

  const handleContent = (val) => {
    setContent(val);
    setStep(1);
  };

  const handleStep = (val) => {
    if (content === 1) {
      if (val === 0) {
        window.location.href = "/register";
      } else {
        setStep(val);
      }
    }

    if (content === 2) {
      if (val === 0) {
        setContent(1);
        setStep(1);
      } else {
        setStep(val);
      }
    }
  };

  const handleBack = () => {
    if (content === 1) handleStep(step - 1);
    if (content === 2) {
      if (step - 1 === 3) {
        handleStep(2);
      } else {
        handleStep(step - 1);
      }
    }
  };

  const handleInput = (val) => {
    setInputEmailOrPonsel(val);
  };

  const handleIsNumber = (val) => {
    setInputIsNumber(val);
  };

  return (
    <>
      <style jsx>
        {`
          .body {
            background: url("/images/Principle/Background/Background Homepage.png")
              no-repeat top;
            background-size: 100%;
            // min-height: ${step == 3 ? "0" : Mobile ? 0 : "900px"};
          }

          .container {
            display: flex;
            justify-content: space-between;
          }

          .wrapper-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            // margin-top: -40px;
            padding-top: 64px;
            margin-bottom: 64px;
          }

          .wrapper-ilustrasi {
            width: 588px;
            height: 430px;
          }

          .wrapper-row {
            display: flex;
            flex-direction: row;
            gap: 24px;
          }

          .wrapper-row:not(:last-child) {
            margin-bottom: 42px;
          }

          .box-ilustrasi {
            width: 282px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 0px;
          }

          .box-deskripsi {
            width: 100%;
            margin-top: 20px;
          }

          .link {
            color: ${Colors.primary.mid_blue};
          }
        `}
      </style>
      <ModalPopup
        show={showModal}
        setShowModal={(val) => setShowModal(val)}
        inputEmailOrPonsel={inputEmailOrPonsel?.email}
        inputIsNumber={inputIsNumber}
      />

      <Toaster
        variant={variantToaster}
        size={variantToaster == "success" ? "1 line" : "2 line"}
        open={openToaster}
        label={errorToasterText}
        subLabel={errorToasterText2Line}
        setOpen={() => setOpenToaster(false)}
        noBar
      />

      <div className="body">
        {/* {session && (
          <div
            style={{
              backgroundColor: "salmon",
              width: "max-content",
              position: "absolute",
              top: "20px",
              left: "20px",
            }}
          >
            <Body2>{session?.user?.email}</Body2>
            <Body2>{session?.user?.name}</Body2>
            <img
              src={session?.user?.image}
              width="100px"
              heigh="100px"
              alt="user image"
            />
            <br></br>
            <RectangleButton onClick={() => signOut()}>Logout</RectangleButton>
          </div>
        )} */}
        {Mobile && (
          <Box style={classes.Header}>
            <WestIcon style={classes.Backspace} onClick={() => handleBack()} />
            <Logo width={79} height={24} margin={0} />
          </Box>
        )}

        {!Mobile && (
          <div className="wrapper-logo">
            <Logo width={193} height={59} margin={0} />
          </div>
        )}

        <Box
          px={
            MediumScreen ? `32px` : LargeScreen ? `120px` : Tablet ? "90px" : 0
          }
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {content == 1 && (
            <LoginContent
              handleModalPopup={handleModalPopup}
              setContent={handleContent}
              step={step}
              handleStep={handleStep}
              setInput={handleInput}
              setIsNumber={handleIsNumber}
            />
            // <TesLoginContent />
          )}

          {content == 2 && (
            <LupaPassword
              setContent={handleContent}
              step={step}
              handleStep={handleStep}
              setOpenToaster={setOpenToaster}
              setErrorToasterText={setErrorToasterText}
              setVariantToaster={setVariantToaster}
              setErrorToasterText2Line={setErrorToasterText2Line}
            />
          )}
        </Box>
      </div>
    </>
  );
}
