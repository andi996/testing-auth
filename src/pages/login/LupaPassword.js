import React from "react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Colors, Elevation, Radius } from "../../themes";
import {
  Font,
  Label,
  Body1,
  Body2,
  Body3,
  Heading1,
  Heading2,
  Heading3,
  Heading5,
} from "../../components/Atom/Typography";
import { Box } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InputTextField from "../../components/Atom/Input Field/TextField";
import RectangleButton from "../../components/Atom/Button/RectangleButton";
import Link from "next/link";
import InputPasswordField from "../../components/Atom/Input Field/PasswordField";
import CheckboxButton from "../../components/Atom/Selection Control/Checkbox";
import OTPField from "../../components/Atom/Input Field/OTPField";
import useMediaQuery from "../../utils/useMediaQuery";
import axios from "axios";
import Toaster from "../../components/Molecul/Toaster";
import { API2 } from "../../api/service";
import { endpoints } from "../../api/endpoint";

const LupaPassword = ({
  handleModalPopup,
  step,
  handleStep,
  setContent,
  setOpenToaster,
  setErrorToasterText,
  setVariantToaster,
  setErrorToasterText2Line,
}) => {
  const router = useRouter();

  const [form, setForm] = useState({});
  const [error, setError] = useState({});
  const [inputEmailOrPonsel, setInputEmailOrPonsel] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");
  const [inputIsNumber, setInputIsNumber] = useState(false);

  const [counter, setCounter] = useState(0);

  const [verificationMethod, setVerificationMethod] = useState("email");

  const [code, setCode] = useState("123456"); // OTP
  const [inputOTP, setInputOTP] = useState("");
  const [errorOTP, setErrorOTP] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef(null);

  const whatsAppLinkChat =
    "https://api.whatsapp.com/send/?phone=6281314917268&text&type=phone_number&app_absent=0";

  const maxWidthSmall = useMediaQuery("(max-width: 640px)");

  const classes = {
    BoxContainer: {
      background: `white`,
      borderRadius: maxWidthSmall ? 0 : Radius.medium,
      boxShadow: maxWidthSmall ? `none` : Elevation.navigationMenu,
      display: "flex",
      flexDirection: "column",
      width: maxWidthSmall ? `100%` : 384,
      height: maxWidthSmall && `calc(100vh - 56px)`,
      paddingTop: maxWidthSmall ? `16px` : 0,
      // border: `1px solid red`,
    },
    BackspaceWrapper: {
      display: maxWidthSmall ? `none` : `flex`,
      justifyContent: `space-between`,
      alignItems: `center`,
      color: Colors.primary.mid_blue,
      marginBottom: `16px`,

      Button: {
        display: `flex`,
        alignItems: `center`,
        width: `fit-content`,
        gap: `4px`,
        cursor: `pointer`,
      },
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

  const handleChange = (key, val) => {
    const formKey = key === "password" ? "confirmPassword" : "password";
    const newError = {
      email: { status: false, text: "" },
      password: { status: false, text: "" },
      confirmPassword: { status: false, text: "" },
    };

    if (key == "email") {
      setError(newError);
      setInputEmailOrPonsel(val);
    }

    if (key === "password" || key === "confirmPassword") {
      if (key === "password") {
        if (!val?.match(`^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})`)) {
          newError.password.status = true;
          newError.password.text =
            "Minimal 8 karakter, huruf kapital, dan angka.";
        } else {
          setInputPassword(val);
        }
        if (val == "") {
          newError.password.text = "";
        }
      }

      if (key === "confirmPassword") {
        if (form?.hasOwnProperty("password")) {
          if (!form?.password?.match(`^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})`)) {
            newError.password.status = true;
          } else {
            setInputConfirmPassword(val);
          }
        }
      }

      if (val !== form[formKey]) {
        if (form.hasOwnProperty(formKey) && form[formKey] !== "") {
          newError.confirmPassword.status = true;
          newError.confirmPassword.text = "Password tidak sama";
        }
      }
    } else {
      if (form?.password !== form?.confirmPassword) {
        newError.confirmPassword.status = true;
        newError.confirmPassword.text = "Password tidak sama";
      }
    }

    setError({ ...error, ...newError });

    setForm({
      ...form,
      [key]: val,
    });
  };

  const onFormSubmitEmailOrPhone = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit();
  };

  const handleSubmit = () => {
    const newError = {
      email: { status: false, text: "" },
      confirmPassword: { status: false, text: "" },
    };

    var phoneCheck = new RegExp(/^[0-9\b]+$/);
    let isNumber = /^\d+$/.test(form?.email);

    if (isNumber == true) {
      if (!phoneCheck.test(form?.email)) {
        newError.email.status = true;
        newError.email.text = "Format nomor telepon harus seperti 08122334455.";
        return setError(newError);
      }
      // if (form?.email.length <= 10) {
      //   newError.email.status = true;
      //   newError.email.text = "no telepon kurang.";
      //   return setError(newError);
      // }
    } else {
      if (!form?.email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
        newError.email.status = true;
        newError.email.text = "Format email harus seperti email@karir.com.";
        return setError(newError);
      }
    }

    setError(newError);
    setInputIsNumber(isNumber);

    // if validation success

    // getLupaPassOTP(form?.email);
    checkUser(form?.email);
  };

  //CHECK APAKAH USER TERDAFTAR ATAU BELUM
  const checkUser = async (emailOrWa) => {
    const newError = {
      email: { status: false, text: "" },
    };

    setIsLoading(true);
    await API2({
      method: `POST`,
      url: endpoints.CheckUser,
      data: {
        email_or_phone: emailOrWa,
      },
    })
      .then((res) => {
        if (res?.data?.data?.exists == false) {
          setIsLoading(false);
          newError.email.status = true;
          newError.email.text = `Email atau Nomor Ponsel belum terdaftar`;
          setError(newError);
        } else {
          newError.email.status = false;
          newError.email.text = ``;
          setError(newError);
          getLupaPassOTP(emailOrWa);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setOpenToaster(true);
        setVariantToaster("error");
        setErrorToasterText(`Server error!`);
        setErrorToasterText2Line("Silahkan coba kembali.");
      });
  };

  const getLupaPassOTP = async (emailOrWa) => {
    const newError = {
      email: { status: false, text: "" },
      confirmPassword: { status: false, text: "" },
    };

    await API2({
      method: `POST`,
      url: endpoints.LupaPassword,
      data: {
        email: emailOrWa,
      },
    })
      .then((res) => {
        handleStep(2);
        counter === 0 && setCounter(30);

        setIsLoading(false);
        setErrorOTP(false);

        setOpenToaster(true);
        setVariantToaster("success");
        setErrorToasterText(`Kode berhasi dikirim.`);
        console.log("res: ", res?.data);
      })
      .catch((err) => {
        console.log("err", err.response);
        setIsLoading(false);
        newError.email.status = true;
        newError.email.text = `${err.response.data.message[0]}.`;
        setOpenToaster(true);
        setVariantToaster("error");
        setErrorToasterText(`${err.response.statusText}.`);
        setErrorToasterText2Line("silahkan coba kembali.");
        if (err.response.status >= 500) {
          setErrorToasterText(`${err.response.data.message[0]}.`);
        } else {
          setError(newError);
        }
      });
  };

  const handleResendOTP = () => {
    // setCode("123456") generate new otp
    setInputOTP;
    setCounter(30);
  };

  useEffect(() => {
    // step !== 2 && setCounter(0);
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  useEffect(() => {
    if (step === 1 && form?.email) inputRef.current.focus();
  }, [step]);

  const handleVerification = () => {
    setIsLoading(true);
    setErrorOTP(false);
    verifikasiOTP();
    // if (inputOTP === code) {
    //   handleStep(3);
    //   setErrorOTP(false);
    // } else {
    //   // otp is invalid
    //   setErrorOTP(true);
    // }
  };

  const verifikasiOTP = async () => {
    await axios
      .post(
        "https://karir-api.staging.qareer.com/v1/forgot-password/verification",
        {
          token: inputOTP,
        }
      )
      .then((res) => {
        handleStep(3);
        setErrorOTP(false);
        setIsLoading(false);

        console.log("res: ", res?.data);
      })
      .catch((err) => {
        console.log("err", err.response);
        setIsLoading(false);

        if (err.response.status >= 500) {
          setErrorToasterText(`${err.response.data.message[0]}.`);
          setVariantToaster("error");
          setErrorToasterText2Line("silahkan coba kembali.");
          setOpenToaster(true);
        } else {
          setErrorOTP(true);
        }
      });
  };

  const handleCreateNewPassword = () => {
    setErrorToasterText("Password baru berhasil dibuat.");
    setVariantToaster("success");
    setOpenToaster(true);
    setContent(1);
  };

  const changeVerificationMethod = (method, val) => {
    setInputEmailOrPonsel(val);
    setForm({ email: val });

    handleStep(2);
    counter === 0 && setCounter(30);
    // setVerificationMethod(method);
    setErrorOTP(false);
  };

  const checkPassword = () => {
    if (inputPassword && inputConfirmPassword) {
      if (inputPassword === inputConfirmPassword) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  const CardHeader = () => {
    return (
      <Box sx={classes.BackspaceWrapper}>
        <Box
          sx={classes.BackspaceWrapper.Button}
          onClick={() => handleStep(step === 4 ? 2 : step - 1)}
        >
          <ArrowBackIcon sx={{ height: `16px`, width: `16px` }} />
          <Heading5>Kembali</Heading5>
        </Box>

        <Box sx={classes.BackspaceWrapper.Button}>
          <HelpOutlineIcon sx={{ height: `16px`, width: `16px` }} />
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
            justify-content: center;
            // height: 120%;
          }

          .wrapper-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: -40px;
            margin-bottom: 40px;
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
      <div className="container">
        <Box sx={classes.BoxContainer} width="100%">
          <Box
            m={maxWidthSmall ? "12px 16px" : "24px"}
            mb={maxWidthSmall ? "32px" : "24px"}
          >
            {/* -------------- HEADER CARD ----------- */}
            <CardHeader />

            <Box>
              <Heading2 mb="4px">
                {step == 1 && "Lupa Kata Sandi"}
                {step == 2 && "Verifikasi Masuk"}
                {step == 3 && "Kata Sandi Baru"}
                {step == 4 && "Metode Verifikasi"}
              </Heading2>
              <Font
                type={maxWidthSmall ? `Body2` : `Body1`}
                color={Colors.neutral.brown_grey}
              >
                {step == 1 &&
                  "Masukkan e-mail atau nomor ponsel yang terdaftar untuk membuat kata sandi baru."}
                {step == 2 && "Kode verifikasi dikirimkan melalui:"}
                {step == 3 &&
                  "Minimal 8 karakter, menggunakan huruf kapital, besar, angka, dan tanda baca."}
                {step == 4 && `Pilih metode dibawah ini untuk `}
                {step == 4 && maxWidthSmall && <br />}
                {step == 4 && `mendapatkan kode verifikasi.`}
              </Font>
            </Box>
            {/* -------------- END HEADER CARD ----------- */}

            {/* -------------- STEP 1 ----------- */}
            {step == 1 && (
              <form onSubmit={onFormSubmitEmailOrPhone}>
                <Box
                  mt={maxWidthSmall ? "32px" : "24px"}
                  style={{ width: "100%" }}
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
                    minWidth={"0px"}
                  />
                </Box>
                <Box mt={maxWidthSmall ? "24px" : "32px"}>
                  <RectangleButton
                    disable={!inputEmailOrPonsel}
                    customStyle={{ padding: 0 }}
                    loading={isLoading}
                    fullWidth
                    onClick={() => handleSubmit()}
                    type="submit"
                  >
                    Lanjutkan
                  </RectangleButton>
                </Box>
              </form>
            )}
            {/* -------------- END CONTENT STEP 1 ----------- */}

            {/* -------------- STEP 2 (VERIFIKASI OTP) ----------- */}
            {/* -------------- CONTENT CARD ----------- */}
            {step == 2 && (
              <Box mt="24px">
                <Font
                  type={maxWidthSmall ? `Body3` : `Heading5`}
                  color={Colors.neutral.brown_grey}
                >
                  {inputIsNumber ? "Whatsapp" : "Email"}
                </Font>

                <div
                  style={{
                    display: "flex",
                    marginTop: maxWidthSmall ? 0 : 8,
                    alignItems: "baseline",
                    gap: 4,
                  }}
                >
                  <Font
                    type={maxWidthSmall ? `Body3` : `Body1`}
                    color={Colors.neutral.greyish_brown}
                  >
                    {inputEmailOrPonsel}
                  </Font>

                  <Body3
                    style={{
                      color: Colors.secondary.clear_blue,
                      cursor: "pointer",
                    }}
                    onClick={() => handleStep(1)}
                  >
                    Ubah
                  </Body3>
                </div>

                <Box
                  mt={maxWidthSmall ? "12px" : "32px"}
                  mb={maxWidthSmall ? "24px" : "32px"}
                  style={{ display: "flex", justifyContent: "flex-start" }}
                >
                  <OTPField
                    error={errorOTP}
                    numInputs={6}
                    getInputOTP={setInputOTP}
                  />
                </Box>
                <Box className="center">
                  <RectangleButton
                    customStyle={{
                      padding: 0,
                    }}
                    disable={!inputOTP && true}
                    fullWidth
                    loading={isLoading}
                    onClick={() => handleVerification()}
                  >
                    Verifikasi
                  </RectangleButton>
                </Box>
                <Box
                  mt={maxWidthSmall ? "12px" : "20px"}
                  sx={{ width: `fit-content`, mx: `auto` }}
                >
                  <Font
                    type={maxWidthSmall ? `Body3` : `Label`}
                    size="medium"
                    color={Colors.neutral.greyish_brown}
                  >
                    {counter > 0 ? (
                      <>
                        Kirim ulang kode? Mohon tunggu dalam{" "}
                        <span className="link pointer">{counter} detik</span>
                      </>
                    ) : (
                      <>
                        Tidak menerima kode?{" "}
                        <span
                          className="link pointer"
                          onClick={() => handleResendOTP()}
                        >
                          Kirim Ulang
                        </span>
                      </>
                    )}
                  </Font>
                </Box>
              </Box>
            )}
            {/* -------------- END CONTENT STEP 2 ----------- */}

            {/* -------------- STEP 3 (PASSWORD BARU) ----------- */}
            {/* -------------- CONTENT CARD ----------- */}
            {step == 3 && (
              <Box mt="24px">
                <Box mt="32px">
                  <InputPasswordField
                    label="Password Baru"
                    handleChange={(val) => handleChange("password", val)}
                    error={error?.password?.status && true}
                    helperText={
                      error?.password?.text !== "" && error?.password?.text
                    }
                    passwordStrength
                    fullWidth
                  />
                </Box>

                <Box mt={maxWidthSmall ? "24px" : "32px"}>
                  <InputPasswordField
                    label="Konfirmasi Password Baru"
                    handleChange={(val) => handleChange("confirmPassword", val)}
                    error={error?.confirmPassword?.status && true}
                    helperText={
                      error?.confirmPassword?.status &&
                      error?.confirmPassword?.text
                    }
                    fullWidth
                  />
                </Box>

                <Box className="center" mt={maxWidthSmall ? "24px" : "32px"}>
                  <RectangleButton
                    customStyle={{ padding: 0 }}
                    // disable={inputPassword === null}
                    disable={checkPassword()}
                    fullWidth
                    onClick={() => handleCreateNewPassword()}
                    type="submit"
                  >
                    Buat Password Baru
                  </RectangleButton>
                </Box>
              </Box>
            )}
            {/* -------------- END CONTENT STEP 3 ----------- */}
            {step == 4 && (
              <Box>
                {/* -------------- BUTTON VERIFIKASI EMAIl ----------- */}
                <Box
                  className="d-flex-fullwidth"
                  sx={classes.card}
                  mt={maxWidthSmall ? "32px" : "24px"}
                >
                  <Box
                    className="d-flex"
                    gap="8px"
                    onClick={() =>
                      changeVerificationMethod(
                        "email",
                        "mabcdefghijkan@gmail.com"
                      )
                    }
                  >
                    <img src="/images/Principle/Logo/Email.svg" alt="email" />
                    <Box>
                      <Heading5>Email</Heading5>
                      <Heading5
                        color={Colors.primary.mid_blue}
                        style={{ textTransform: "lowercase" }}
                      >
                        mxxxxxxxxxxxxan@gmail.com
                      </Heading5>
                    </Box>
                  </Box>

                  <img
                    src="/images/Principle/Logo/Right Arrow.svg"
                    alt="right-arrow"
                  />
                </Box>

                {/* -------------- BUTTON VERIFIKASI WHATSAPP ----------- */}
                <Box
                  className="d-flex-fullwidth"
                  sx={classes.card}
                  mt={maxWidthSmall ? "12px" : "16px"}
                >
                  <Box
                    className="d-flex"
                    gap="8px"
                    onClick={() =>
                      changeVerificationMethod("phone", "081234555")
                    }
                  >
                    <img src="/images/Principle/Logo/Phone.svg" alt="phone" />
                    <Box>
                      <Heading5>Whatsapp</Heading5>
                      <Heading5 color={Colors.primary.mid_blue}>
                        0xxxxxxxx55
                      </Heading5>
                    </Box>
                  </Box>

                  <img
                    src="/images/Principle/Logo/Right Arrow.svg"
                    alt="right-arrow"
                  />
                </Box>
              </Box>
            )}
          </Box>

          {/* -------------- FOOTER CARD ----------- */}
          <Box
            sx={classes.footerContainer}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Font
              type={maxWidthSmall ? `Body3` : `Body2`}
              style={{ width: step === 2 && "310px" }}
            >
              {step == 1 && `Butuh bantuan? Hubungi `}

              {step === 2 && `Tidak menerima Kode? `}
              {step === 2 && (
                <a className="link pointer" onClick={() => handleStep(4)}>
                  Ganti metode verifikasi
                </a>
              )}
              {step === 2 && ` atau hubungi bantuan `}

              {step == 3 && `Butuh bantuan? Hubungi$ `}

              {step === 4 && `E-mail/ No Telephone bermasalah? hubungi `}
              {step === 4 && <br></br>}
              {step === 4 && `bantuan `}

              <Link href={whatsAppLinkChat} passHref>
                <a className="link" target="_blank" rel="noopener noreferrer">
                  Karir Care
                </a>
              </Link>
            </Font>
          </Box>
          {/* -------------- END FOOTER CARD ----------- */}
        </Box>
      </div>
    </>
  );
};

export default LupaPassword;
