import React from "react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Colors, Elevation, Radius } from "../../themes";
import {
  Label,
  Body1,
  Body2,
  Body3,
  Heading2,
  Heading3,
  Heading5,
  Font,
} from "../../components/Atom/Typography";
import { Box } from "@mui/system";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InputTextField from "../../components/Atom/Input Field/TextField";
import RectangleButton from "../../components/Atom/Button/RectangleButton";
import Divider from "../../components/Atom/Divider";
import Link from "next/link";
import InputPasswordField from "../../components/Atom/Input Field/PasswordField";
import CheckboxButton from "../../components/Atom/Selection Control/Checkbox";
import OTPField from "../../components/Atom/Input Field/OTPField";

import {
  isMobile,
  isTablet,
  isSmallScreen,
  isMediumScreen,
  isLargeScreen,
} from "../../utils/useMediaQuery";
import axios from "axios";
import Cookies from "js-cookie";
import Toaster from "../../components/Molecul/Toaster";
import CryptoJS from "crypto-js";

// import redux & nextauth
import { getUserLogin } from "../../redux/action/LoginActions";
import { useDispatch, useSelector } from "react-redux";
import { signIn, signOut, useSession } from "next-auth/react";

import { browserName, osName } from "react-device-detect";
import { API2 } from "../../api/service";
import { endpoints } from "../../api/endpoint";

const LoginContent = ({
  handleModalPopup,
  step,
  handleStep,
  setContent,
  setInput,
  setIsNumber,
}) => {
  const router = useRouter();

  //redux & session nextauth
  const dispatch = useDispatch();
  // const { data: session, status } = useSession();
  const { login } = useSelector((state) => state);

  const Mobile = isMobile();
  const Tablet = isTablet();
  const MediumScreen = isMediumScreen();
  const LargeScreen = isLargeScreen();

  const [userData, setUserData] = useState(null);

  const [isInputNumber, setIsInputNumber] = useState(false);
  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const [inputEmailOrPonsel, setInputEmailOrPonsel] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);

  const [counter, setCounter] = useState(0);
  const [verificationMethod, setVerificationMethod] = useState("email");
  const [valueVerification, setValueVerification] = useState("email");

  const [code, setCode] = useState("123456"); // OTP
  const [inputOTP, setInputOTP] = useState("");
  const [errorOTP, setErrorOTP] = useState(false);
  const [valueRememberMe, setValueRememberMe] = useState([false, false]);
  const [yourPassCookies, setYourPassCookies] = useState(null);
  const [emailXXX, setEmailXXX] = useState("");
  const [phoneXXX, setPhoneXXX] = useState("");
  const [methodOTP, setMethodOTP] = useState("");

  //toaster
  const [openToaster, setOpenToaster] = useState(false);
  const [variantToaster, setVariantToaster] = useState("success");
  const [labelToaster, setLabelToaster] = useState("");
  const [errorGetLogin, setErrorGetLogin] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [deviceInformation, setDeviceInformation] = useState("");

  const sKey =
    "kdXdpa2142534 $63a&2r5u8x/A?D(G+KbdPeShVmYq3t6v9y$B&E)H@McQfTjWnZr4u7x!z%C*F-JaNdRgUkXp2s5v8y/B?D(G+KbPeS@#!@&9sads}bdr@)5A1s?.<?{hVmYq3t6w9z$C&F)H@McQfTjWnZr4u7x!A%D*G-K";
  const inputRef = useRef(null);

  const whatsAppLinkChat =
    "https://api.whatsapp.com/send/?phone=6281314917268&text&type=phone_number&app_absent=0";

  const today = new Date();
  const cookieExp30Day = new Date(new Date().setDate(today.getDate() + 30));

  const classes = {
    BoxContainer: {
      background: `white`,
      borderRadius: Mobile ? `none` : Radius.medium,
      boxShadow: Mobile ? `none` : Elevation.navigationMenu,
      display: "flex",
      flexDirection: "column",
      width: `100%`,
      maxWidth: Mobile ? `100%` : `486px`,
      // width: Mobile ? `100%` : Tablet ? `384px` : `486px`,
      height: Mobile ? `calc(100vh - 56px)` : `100%`,
      paddingTop: Mobile ? `28px` : `24px`,
      mx: MediumScreen || LargeScreen ? 0 : `auto`,
      marginBottom: Mobile ? 0 : `40px`,
    },
    BackspaceWrapper: {
      display: Mobile ? `none` : `flex`,
      color: Colors.primary.mid_blue,
      marginBottom: 16,
    },
    BoxLeftContent: {
      maxWidth: 590,
      width: MediumScreen ? "48%" : 590,
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
      marginTop: Mobile ? `32px` : `24px`,
      padding: `12px 24px`,
      backgroundColor: Colors.primary.pale_gray,
    },
  };

  // useEffect(() => {
  //   // Getting the error details from URL
  //   if (router.query.error) {
  //     setOpenToaster(true);
  //     setLabelToaster(router.query.error); // Shown below the input field in my example
  //     setInputEmailOrPonsel(router.query.email); // To prefill the email after redirect
  //   }
  // }, [router]);

  const getDeviceInfo = async () => {
    await axios
      .get("https://geolocation-db.com/json/")
      .then((res) => {
        setDeviceInformation(`${browserName} ${osName} | ${res.data.IPv4}`);
        return `${browserName} ${osName} | ${res.data.IPv4}`;
      })
      .catch((err) => {
        console.log("error", err.response);
      });
    return;
  };

  useEffect(() => {
    getDeviceInfo();
  }, []);

  //CHECK APAKAH USER TERDAFTAR ATAU BELUM
  const checkUser = async () => {
    setIsLoading(true);
    await API2({
      method: `POST`,
      url: endpoints.CheckUser,
      data: {
        email_or_phone: inputEmailOrPonsel,
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res?.data?.data?.exists == false) {
          handleModalPopup("open");
        } else {
          getPassCookies();
          handleStep(2);
        }
      })
      .catch((err) => {
        setLabelToaster("Error!");
        setOpenToaster(true);
        setIsLoading(false);
      });
  };

  const handleLogin = () => {
    //dispatch getUserLogin harus dipindah saat verifikasi otp berhasil
    // dispatch(getUserLogin(form));
    loginUser();
  };

  // CALL API LOGIN USER
  const loginUser = async () => {
    setIsLoading(true);
    setIsPasswordError(false);
    await API2({
      method: `POST`,
      url: endpoints.Login,
      data: {
        email_or_phone: form?.email,
        password: form?.password,
        device_id: deviceInformation ? deviceInformation : "web",
      },
    })
      .then((res) => {
        setUserData(res?.data?.data);
        setIsLoading(false);
        // if (step == 2) {
        //   isSuccessLogin();
        // }
      })
      .catch((err) => {
        setIsLoading(false);
        if (err?.response?.status >= 500) {
          setIsPasswordError(false);
          setLabelToaster("Server error!");
          setErrorGetLogin(true);
          setOpenToaster(true);
        } else {
          setIsPasswordError(true);
        }
      });
  };

  useEffect(() => {
    if (step == 2 && userData) {
      changeStringToXXX();
      isSuccessLogin();
    }
  }, [userData]);

  //JIKA BERHASIL LOGIN, CHECK APAKAH USER SUDAH PERNAH LOGIN
  const isSuccessLogin = () => {
    // window.location.href = "/";

    // user is alr logged in (other device) or ever login
    var everLogin = Cookies.get("everLogin");
    if (!everLogin) {
      handleStep(3);
      return;
    } else {
      window.location.href("/home");
    }
  };

  //UBAH METODE KIRIM OTP (EMAIL/WA)
  const changeVerificationMethod = (method) => {
    var emailOrWa = method == "email" ? userData?.email : "089684239652";
    setValueVerification(emailOrWa);
    handleStep(4);

    //run getEmailOTP jika ganti method.
    if (methodOTP !== method) {
      getEmailOTP(emailOrWa, "kirim pertama");
    }
    // else {
    //   counter === 0 && getEmailOTP(emailOrWa, "kirim pertama");
    // }
    setMethodOTP(method);

    setVerificationMethod(method);
    setErrorOTP(false);
  };

  // GET KODE OTP
  const getEmailOTP = async (val, key) => {
    await axios
      .post("https://karir-api.staging.qareer.com/v1/email_verification/send", {
        name: userData?.first_name,
        email: val,
      })
      .then((res) => {
        setOpenToaster(true);
        setVariantToaster("success");
        setLabelToaster(
          `Kode berhasil dikirim${key == "resend" ? " ulang" : ""}.`
        );
        setCounter(30);
      })
      .catch((err) => {
        if (err.response) {
          setLabelToaster(err.response.data.message[0]);
          setErrorGetLogin(false);
          setOpenToaster(true);
        }
      });
  };

  //VERIFIKASI KODE OTP
  const verificationEmailOTP = async () => {
    setIsLoading(true);
    await axios
      .post(
        "https://karir-api.staging.qareer.com/v1/email_verification/verify",
        {
          email: userData?.email,
          otp: inputOTP,
        }
      )
      .then((res) => {
        setErrorOTP(false);
        setIsLoading(false);
        //SET USER DATA TO COOKIES
        Cookies.set("user", JSON.stringify(userData), cookieExp30Day);
        Cookies.set("Authorization", userData?.token, cookieExp30Day);
        //STORE REMEMBER TO COOKIES
        storeRememberToCookies();
        Cookies.set("everLogin", true);
        //toaster
        setOpenToaster(true);
        setVariantToaster("success");
        setLabelToaster("Login berhasil.");

        // IS MEDIUM USER, REDIRECT TO HOME, ELSE, REDIRECT TO PROFILE
        if (userData?.profile_completion < 70) {
          router.push("/home");
        } else {
          router.push("/profile");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response.status >= 500) {
          setLabelToaster(err.response.data.message[0]);
          setErrorGetLogin(false);
          setOpenToaster(true);
        } else {
          setErrorOTP(true);
        }
      });
  };

  const storeRememberToCookies = () => {
    // Encrypt
    var encryptedEmail = CryptoJS.AES.encrypt(
      inputEmailOrPonsel,
      sKey
    ).toString();
    var encryptedPassword = CryptoJS.AES.encrypt(
      inputPassword,
      sKey
    ).toString();

    var rememberIsArray = Array.isArray(valueRememberMe);

    if (
      (rememberIsArray && valueRememberMe.includes(true)) ||
      valueRememberMe == true
    ) {
      Cookies.set("EgUkXp2s5v8y/B?D(", encryptedEmail, {
        expires: cookieExp30Day,
      });
      Cookies.set("p6v9y$B&E)H+MbQe", encryptedPassword, {
        expires: cookieExp30Day,
      });
      Cookies.set("remember", Boolean(true), {
        expires: cookieExp30Day,
      });
    } else {
      Cookies.remove("EgUkXp2s5v8y/B?D(");
      Cookies.remove("p6v9y$B&E)H+MbQe");
      Cookies.remove("remember");
    }
  };

  const getPassCookies = () => {
    //===========================================================
    var isRemember = Cookies.get("remember");
    if (isRemember) {
      setValueRememberMe([true, true]);
    }
    //get email and password from cookies
    var cUserName = Cookies.get("EgUkXp2s5v8y/B?D(");
    var cPass = Cookies.get("p6v9y$B&E)H+MbQe");
    if (cPass) {
      // Decrypt
      var emailBytes = CryptoJS.AES.decrypt(cUserName, sKey);
      var passBytes = CryptoJS.AES.decrypt(cPass, sKey);
      var decryptedEmail = emailBytes.toString(CryptoJS.enc.Utf8);
      var decryptedPassword = passBytes.toString(CryptoJS.enc.Utf8);
      //===========================================================
      //set default password if username == username input
      decryptedEmail == inputEmailOrPonsel
        ? setYourPassCookies(`${decryptedPassword}`)
        : setYourPassCookies(null);
    }
    //=============================================================
  };

  //===========CHANGE STRING TO XXX===================
  const changeStringToXXX = () => {
    //SEARCH EMAIL STRING WANT TO CHANGE
    var matchedStringEmail = userData?.email.substr(
      1,
      userData?.email.indexOf("@") - 3
    );

    //SEARCH PHONE STRING WANT TO CHANGE
    var phn = "089684239652";
    var matchedStringPhone = phn.substr(1, phn.length - 3);

    const run = (str) =>
      str?.replace(
        str == userData?.email ? matchedStringEmail : matchedStringPhone,
        (a, b, c) => (c = a.replace(/[^\[\]]/g, (x) => (x = "x")))
      );

    setEmailXXX(run(userData?.email));
    setPhoneXXX(run("089684239652"));
  };
  //==============================

  const handleChange = (key, val) => {
    if (key == "email") {
      setInputEmailOrPonsel(val);
      setError(false);
    }
    if (key == "password") {
      setInputPassword(val);
      setIsPasswordError(false);
    }
    setForm({
      ...form,
      [key]: val,
      device_id: deviceInformation ? deviceInformation : "web",
    });

    // set input value to parent
    setInput({
      ...form,
      [key]: val,
      device_id: deviceInformation ? deviceInformation : "web",
    });
  };

  const handleSubmit = () => {
    const newError = {
      email: { status: false, text: "" },
    };

    var phoneCheck = new RegExp(/^[0-9\b]+$/);
    let number = /^\d+$/.test(form?.email);

    if (number == true) {
      setIsInputNumber(true);
      if (!phoneCheck.test(form?.email)) {
        return;
      }
    } else {
      setIsInputNumber(false);
      if (
        !form?.email.match(
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        )
      ) {
        newError.email.status = true;
        newError.email.text = "Format email harus seperti email@karir.com.";
        return setError(newError);
      }
    }

    setError(newError);

    setIsNumber(number);

    // if validation success
    if (!newError?.email?.status) {
      //CHECK APAKAH USER TERDAFTAR
      checkUser();
    }
  };

  const onFormSubmitEmailOrPhone = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit();
  };

  const onFormSubmitPassword = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleLogin();
  };

  useEffect(() => {
    // step !== 4 && setCounter(0);
    // counter == 0 && setCounter(0);
    // step == 4 &&
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  useEffect(() => {
    setErrorOTP(false);
  }, [inputOTP]);

  useEffect(() => {
    if (step === 1 && form?.email) inputRef.current.focus();
    if (step === 2) getPassCookies();
  }, [step]);

  const CardHeader = () => {
    return (
      <Box className="d-flex-fullwidth" style={classes.BackspaceWrapper}>
        <Box
          className="d-flex pointer"
          width="fit-content !important"
          gap="4px"
          onClick={() => {
            step === 1
              ? (window.location.href = "/register")
              : handleStep(step - 1);
          }}
        >
          <ArrowBackIcon style={{ height: 16, width: 16 }} />
          <Heading5>Kembali</Heading5>
        </Box>
        <Box
          className="d-flex pointer"
          width="fit-content !important"
          gap="4px"
          onClick={() =>
            window.open(
              "https://api.whatsapp.com/send/?phone=6281314917268&text&type=phone_number&app_absent=0",
              "_blank"
            )
          }
        >
          <HelpOutlineIcon style={{ height: 16, width: 16 }} />
          <Heading5>Bantuan</Heading5>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <style jsx>
        {`
          .body {
            background: url("/images/Principle/Background/Background Landing.png")
              no-repeat top;
            background-size: 100%;
            min-height: 900px;
          }

          .container {
            display: flex;
            justify-content: space-between;
            width: 100%;
            max-width: 1440px;
            height: 120%;
            gap: 24px;
          }

          .wrapper-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: -40px;
            margin-bottom: 40px;
          }

          .wrapper-ilustrasi {
            // width: 588px;
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

          //////////////////////////////////////////

          @media screen and (min-width: 1008px) {
            .box-ilustrasi {
              min-width: 205px;
              max-width: 282px;
              width: 100%;
            }
          }

          @media screen and (max-width: 1007px) {
            .container {
              justify-content: center;
            }
          }
        `}
      </style>
      <div className="container">
        {/* -------------- LEFT CONTENT ----------- */}

        <Box
          sx={classes.BoxLeftContent}
          style={{
            display: MediumScreen || LargeScreen ? `block` : `none`,
          }}
        >
          <div style={{ marginBottom: 42 }}>
            <Heading2>Mengapa cari pekerjaan di Karir.com?</Heading2>
          </div>
          <div className="wrapper-ilustrasi">
            {/* --------------top ilustrasi---------------- */}
            <div className="wrapper-row">
              <div className="box-ilustrasi">
                <Image
                  src="/images/Principle/Illustration/login-profile-cv-generator.svg"
                  alt="Picture of the author"
                  width={100}
                  height={100}
                />
                <div className="box-deskripsi">
                  <Heading3>Profile & CV Generator</Heading3>
                  <Body1 style={{ color: Colors.neutral.brown_grey }}>
                    Buat profil sesuai dengan dibutuhkan recruiter dan buat jadi
                    CV 1x klik
                  </Body1>
                </div>
              </div>
              <div className="box-ilustrasi">
                <Image
                  src="/images/Principle/Illustration/login-status-lamaran.svg"
                  alt="Picture of the author"
                  width={100}
                  height={100}
                />
                <div className="box-deskripsi">
                  <Heading3>Status Lamaran</Heading3>
                  <Body1 style={{ color: Colors.neutral.brown_grey }}>
                    Pantau status lamaran terbaru Anda dari awal-akhir dengan
                    mudah.
                  </Body1>
                </div>
              </div>
            </div>
            {/* --------------bottom ilustrasi---------------- */}
            <div className="wrapper-row">
              <div className="box-ilustrasi">
                <Image
                  src="/images/Principle/Illustration/login-preferensi-job.svg"
                  alt="Picture of the author"
                  width={100}
                  height={100}
                />
                <div className="box-deskripsi">
                  <Heading3>Preferensi & Job Alert</Heading3>
                  <Body1 style={{ color: Colors.neutral.brown_grey }}>
                    Cari lowongan sesuai preferensi Anda dalam hitungan detik
                  </Body1>
                </div>
              </div>
              <div className="box-ilustrasi">
                <Image
                  src="/images/Principle/Illustration/login-status-lamaran.svg"
                  alt="Picture of the author"
                  width={100}
                  height={100}
                />
                <div className="box-deskripsi">
                  <Heading3>Profile Matching</Heading3>
                  <Body1 style={{ color: Colors.neutral.brown_grey }}>
                    Dapatkan Informasi Lowongan yang cocok dengan profil Anda
                  </Body1>
                </div>
              </div>
            </div>
          </div>
        </Box>

        {/* -------------- RIGHT CONTENT ----------- */}
        <Box sx={classes.BoxContainer} width="100%">
          <Box mx={Mobile ? `16px` : `24px`}>
            <CardHeader />
            {(step === 1 || step === 2) && (
              <>
                <Heading2 mb="4px">Masuk</Heading2>
                {step === 1 && (
                  <>
                    <Font
                      type={Mobile ? "Body2" : "Body1"}
                      color={Colors.neutral.brown_grey}
                    >
                      Temukan karir impianmu disini.
                    </Font>
                    <form onSubmit={onFormSubmitEmailOrPhone}>
                      <Box
                        mt="32px"
                        ref={(el) =>
                          (inputRef.current =
                            el?.childNodes[
                              verificationMethod === "email" ? 0 : 1
                            ]?.childNodes[1]?.firstChild)
                        }
                      >
                        <InputTextField
                          defaultValue={form?.email ? form.email : null}
                          label="Email atau Nomor Ponsel"
                          helperText={
                            error?.email?.status == true
                              ? error?.email?.text
                              : "Contoh: email@karir.com atau 08128284455"
                          }
                          handleChange={(val) => handleChange("email", val)}
                          fullWidth
                          error={error?.email?.status && true}
                          MediumScreen
                          minWidth="0"
                        />

                        <RectangleButton
                          disable={!inputEmailOrPonsel}
                          customStyle={{
                            padding: 0,
                            marginTop: Mobile ? "24px" : "32px",
                          }}
                          fullWidth
                          loading={isLoading}
                          onClick={handleSubmit}
                          type="submit"
                        >
                          Lanjutkan
                        </RectangleButton>
                      </Box>
                    </form>
                    <Box
                      className="d-flex pointer"
                      justifyContent="center"
                      mt="20px"
                      onClick={() => (window.location.href = "/register")}
                    >
                      <Label
                        size="medium"
                        value="Buat Akun"
                        color={Colors.primary.mid_blue}
                      />
                    </Box>
                  </>
                )}

                {step == 2 && (
                  <form onSubmit={onFormSubmitPassword}>
                    <Box mt={Mobile ? "32px" : "24px"}>
                      <Font
                        type={Mobile ? `Body3` : `Heading5`}
                        color={Colors.neutral.brown_grey}
                      >
                        {isInputNumber ? "Nomor Telepon" : "Email"}
                      </Font>

                      <Box className="d-flex" mt={Mobile ? 0 : `8px`} gap="4px">
                        <Font
                          type={Mobile ? `Body2` : `Body1`}
                          color={Colors.neutral.greyish_brown}
                        >
                          {form.email}
                        </Font>
                        <Font
                          className="pointer"
                          type="Body3"
                          color={Colors.secondary.clear_blue}
                          onClick={() => handleStep(1)}
                        >
                          Ubah
                        </Font>
                      </Box>

                      <Box my={Mobile ? "12px" : "24px"}>
                        <InputPasswordField
                          label="Masukan Password"
                          defaultValue={
                            yourPassCookies ? yourPassCookies : inputPassword
                          }
                          handleChange={(val) => handleChange("password", val)}
                          fullWidth
                          error={isPasswordError}
                          helperText={
                            isPasswordError
                              ? "Password yang anda masukkan tidak valid"
                              : null
                          }
                        />
                      </Box>

                      <Box mb={Mobile ? "24px" : "16px"}>
                        <CheckboxButton
                          defaultValue={valueRememberMe}
                          variant="left"
                          options={[
                            {
                              label: "Ingatkan saya",
                              value: "",
                            },
                          ]}
                          customStyle={{
                            padding: 0,
                            marginLeft: 0,
                            checkbox: {
                              padding: 0,
                              marginLeft: 10,
                              marginRight: 6,
                            },
                          }}
                          onChange={(e) => {
                            setValueRememberMe(e.target.checked);
                          }}
                        />
                      </Box>

                      <Box>
                        <RectangleButton
                          customStyle={{ padding: 0 }}
                          disable={!inputPassword}
                          fullWidth
                          onClick={() => handleLogin()}
                          loading={isLoading}
                          type="submit"
                        >
                          Masuk
                        </RectangleButton>
                      </Box>

                      <Box
                        className="pointer"
                        width="fit-content"
                        mx="auto"
                        mt="18px"
                        onClick={() => setContent(2)}
                      >
                        <Label
                          size="medium"
                          value="Lupa Kata Sandi?"
                          color={Colors.primary.mid_blue}
                        />
                      </Box>
                    </Box>
                  </form>
                )}

                <Box mt="16px">
                  <Box sx={classes.dividerContainer}>
                    <Divider />
                    <Body3 sx={classes.dividerContainer.caption}>
                      atau masuk dengan
                    </Body3>
                  </Box>
                  <Box className="d-flex-fullwidth" mt="24px">
                    <RectangleButton
                      state="alternate"
                      customStyle={{ padding: 0, margin: 0 }}
                      fullWidth
                      onClick={
                        () => signIn("google", { callbackUrl: "/home" })
                        // signIn("google", { redirect: false })
                      }
                    >
                      <Box className="d-flex" gap="6px">
                        <img
                          src="/images/Principle/Logo/Google.svg"
                          alt="google"
                        />
                        Masuk dengan Google
                      </Box>
                    </RectangleButton>
                  </Box>
                  <Box className="d-flex-fullwidth" mt="8px">
                    <RectangleButton
                      state="alternate"
                      customStyle={{ padding: 0, margin: 0 }}
                      fullWidth
                      onClick={() =>
                        signIn("linkedin", {
                          callbackUrl: "/home",
                        })
                      }
                    >
                      <Box className="d-flex" gap="6px">
                        <img
                          src="/images/Principle/Logo/Linkedin.svg"
                          alt="linkedin"
                        />
                        Masuk dengan Linkedin
                      </Box>
                    </RectangleButton>
                  </Box>
                  <Box className="d-flex-fullwidth" mt="8px">
                    <RectangleButton
                      state="alternate"
                      customStyle={{ padding: 0, margin: 0 }}
                      fullWidth
                      onClick={() =>
                        signIn("facebook", {
                          callbackUrl: "/home",
                        })
                      }
                    >
                      <Box className="d-flex" gap="6px">
                        <img
                          src="/images/Principle/Logo/Facebook.svg"
                          alt="linkedin"
                        />
                        Masuk dengan Facebook
                      </Box>
                    </RectangleButton>
                  </Box>
                </Box>
              </>
            )}

            {step == 3 && (
              <>
                <Box>
                  <Heading2 mb="4px">Metode Verifikasi</Heading2>
                  <Font
                    type={Mobile ? `Body2` : `Body1`}
                    color={Colors.neutral.brown_grey}
                  >
                    Pilih metode dibawah ini untuk {Mobile && <br />}
                    mendapatkan kode verifikasi.
                  </Font>
                </Box>

                <Box
                  className="d-flex-fullwidth"
                  sx={classes.card}
                  mt={Mobile ? "32px" : "24px"}
                  onClick={() => changeVerificationMethod("email")}
                >
                  <Box className="d-flex" gap="8px">
                    <img src="/images/Principle/Logo/Email.svg" alt="email" />
                    <Box>
                      <Heading5>Email</Heading5>
                      <Heading5
                        color={Colors.primary.mid_blue}
                        style={{ textTransform: "lowercase" }}
                      >
                        {emailXXX}
                      </Heading5>
                    </Box>
                  </Box>

                  <img
                    src="/images/Principle/Logo/Right Arrow.svg"
                    alt="right-arrow"
                  />
                </Box>

                <Box
                  className="d-flex-fullwidth"
                  sx={classes.card}
                  mt={Mobile ? "12px" : "16px"}
                  onClick={() => changeVerificationMethod("phone")}
                >
                  <Box className="d-flex" gap="8px">
                    <img src="/images/Principle/Logo/Phone.svg" alt="phone" />
                    <Box>
                      <Heading5>Whatsapp</Heading5>
                      <Heading5 color={Colors.primary.mid_blue}>
                        {phoneXXX}
                      </Heading5>
                    </Box>
                  </Box>

                  <img
                    src="/images/Principle/Logo/Right Arrow.svg"
                    alt="right-arrow"
                  />
                </Box>
              </>
            )}

            {step == 4 && (
              <>
                <Box>
                  <Heading2 mb="4px">Verifikasi Masuk</Heading2>
                  <Font
                    type={Mobile ? `Body2` : `Body1`}
                    color={Colors.neutral.brown_grey}
                  >
                    Kode verifikasi dikirimkan melalui:
                  </Font>
                </Box>

                <Box mt={Mobile ? "32px" : "24px"}>
                  <Font
                    type={Mobile ? `Body3` : `Heading5`}
                    color={Colors.neutral.brown_grey}
                    style={{ textTransform: `capitalize` }}
                  >
                    {verificationMethod === "email" && "Email"}
                    {verificationMethod === "phone" && "Whatsapp"}
                  </Font>

                  <Box className="d-flex" mt={Mobile ? 0 : `8px`} gap="4px">
                    <Font
                      type={Mobile ? `Body2` : `Body1`}
                      color={Colors.neutral.greyish_brown}
                    >
                      {valueVerification}
                    </Font>

                    <Font
                      className="pointer"
                      type="Body3"
                      color={Colors.secondary.clear_blue}
                      onClick={() => handleStep(3)}
                    >
                      Ubah
                    </Font>
                  </Box>

                  <Box
                    mt={Mobile ? "12px" : "32px"}
                    mb={Mobile ? "24px" : "32px"}
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <OTPField
                      error={errorOTP}
                      numInputs={6}
                      getInputOTP={setInputOTP}
                    />
                  </Box>
                  <Box mb={Mobile ? "12px" : "20px"}>
                    <RectangleButton
                      disable={!inputOTP && true}
                      loading={isLoading}
                      onClick={() => verificationEmailOTP()}
                      customStyle={{ margin: 0 }}
                      fullWidth
                    >
                      Verifikasi
                    </RectangleButton>
                  </Box>

                  <Box className="d-flex" justifyContent="center">
                    {Mobile && (
                      <Font type="Body3">
                        {counter > 0 ? (
                          <>
                            Kirim ulang kode? Mohon tunggu dalam{" "}
                            <span
                              className="link pointer"
                              style={{ cursor: "default" }}
                            >
                              {counter} detik
                            </span>
                          </>
                        ) : (
                          <>
                            Tidak menerima kode?{" "}
                            <span
                              className="link pointer"
                              onClick={() =>
                                getEmailOTP(userData?.email, "resend")
                              }
                            >
                              Kirim Ulang
                            </span>
                          </>
                        )}
                      </Font>
                    )}

                    {!Mobile && (
                      <Label
                        size="medium"
                        color={Colors.neutral.greyish_brown}
                        value={
                          counter > 0 ? (
                            <>
                              Kirim ulang kode? Mohon tunggu dalam{" "}
                              <span
                                className="link pointer"
                                style={{ cursor: "default" }}
                              >
                                {counter} detik
                              </span>
                            </>
                          ) : (
                            <>
                              Tidak menerima kode?{" "}
                              <span
                                className="link pointer"
                                onClick={() =>
                                  getEmailOTP(userData?.email, "resend")
                                }
                              >
                                Kirim Ulang
                              </span>
                            </>
                          )
                        }
                      />
                    )}
                  </Box>
                </Box>
              </>
            )}
          </Box>

          <Box sx={classes.footerContainer}>
            {step === 1 && (
              <Font className="center" type={Mobile ? `Body3` : `Body2`}>
                Apakah Anda HR?{" "}
                <Link href="/login">
                  <a className="link">Buka Lowongan di Karir.com</a>
                </Link>
              </Font>
            )}

            {step === 2 && (
              <Font className="center" type={Mobile ? `Body3` : `Body2`}>
                Butuh Bantuan?{" "}
                <Link
                  href="https://api.whatsapp.com/send/?phone=6281314917268&text&type=phone_number&app_absent=0"
                  passHref
                >
                  <a className="link" target="_blank" rel="noopener noreferrer">
                    Hubungi Karir Care
                  </a>
                </Link>
              </Font>
            )}

            {step === 3 && (
              <Font className="center" type={Mobile ? `Body3` : `Body2`}>
                E-mail/ No Telephone bermasalah? <br /> hubungi bantuan{" "}
                <Link href={whatsAppLinkChat} passHref>
                  <a className="link" target="_blank" rel="noopener noreferrer">
                    Karir Care
                  </a>
                </Link>
              </Font>
            )}

            {step === 4 && (
              <Font className="center" type={Mobile ? `Body3` : `Body2`}>
                Tidak menerima Kode?{" "}
                <a className="link pointer" onClick={() => handleStep(3)}>
                  Ganti metode verifikasi
                </a>
                <br />
                atau hubungi bantuan{" "}
                <Link href={whatsAppLinkChat} passHref>
                  <a className="link" target="_blank" rel="noopener noreferrer">
                    Karir Care
                  </a>
                </Link>
              </Font>
            )}
          </Box>
        </Box>
      </div>

      <Toaster
        variant={variantToaster}
        size={variantToaster == "success" ? "2 line " : "1 line"}
        open={openToaster}
        label={labelToaster}
        subLabel={`Silahkan coba ${errorGetLogin ? ` login ` : ` `}kembali.`}
        setOpen={() => setOpenToaster(false)}
        noBar
      />
    </>
  );
};

export default LoginContent;
