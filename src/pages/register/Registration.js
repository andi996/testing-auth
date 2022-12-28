import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Box } from "@mui/system";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import RectangleButton from "../../components/Atom/Button/RectangleButton";
import Divider from "../../components/Atom/Divider";
import OTPField from "../../components/Atom/Input Field/OTPField";
import InputPasswordField from "../../components/Atom/Input Field/PasswordField";
import InputTextField from "../../components/Atom/Input Field/TextField";
import axios from "axios";
import { endpoints } from "../../api/endpoint";
import { browserName, osName } from "react-device-detect";
import {
  Body1,
  Body3,
  Font,
  Heading2,
  Heading3,
  Heading5,
} from "../../components/Atom/Typography";
import { Colors, Elevation, Radius } from "../../themes";
import {
  isLargeScreen,
  isMediumScreen,
  isMobile,
  isSmallScreen,
  isTablet,
} from "../../utils/useMediaQuery";
import { API, API2 } from "../../api/service";

function Registration({
  step,
  showInputPassword,
  setShowInputPassword,
  handlePage,
  handleStep,
  handleBack,
  setUser,
}) {
  const inputRef = useRef(null);

  const [deviceInformation, setDeviceInformation] = useState();
  const [method, setMethod] = useState("email");
  const [form, setForm] = useState({});
  const [inputOTP, setInputOTP] = useState("");
  const [counter, setCounter] = useState(0);
  const [error, setError] = useState({});
  // const [errorOTP, setErrorOTP] = useState(false);

  // Resolutions
  const Mobile = isMobile();
  const Tablet = isTablet();
  const SmallScreen = isSmallScreen();
  const MediumScreen = isMediumScreen();
  const LargeScreen = isLargeScreen();

  // Functions
  const CheckIsButtonDisabled = () => {
    let status = false;
    let requiredFields = [];
    if (Mobile && !showInputPassword) {
      requiredFields = ["fullName", "email", "phone"];
    } else if (Mobile && showInputPassword) {
      requiredFields = ["password", "confirmPassword"];
    } else {
      requiredFields = [
        "fullName",
        "email",
        "phone",
        "password",
        "confirmPassword",
      ];
    }

    requiredFields?.forEach((field) => {
      if (form[field] === undefined || /^\s*$/.test(form[field])) status = true;
    });

    return status;
  };

  const handleChange = (key, val) => {
    // const formKey = key === "password" ? "confirmPassword" : "password";
    // const newError = {
    //   password: { status: false, text: "" },
    //   confirmPassword: { status: false, text: "" },
    // };

    // if (key === "password" || key === "confirmPassword") {
    //   if (key === "password") {
    //     if (!val?.match(`^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})`)) {
    //       newError.password.status = true;
    //     }
    //   }

    //   if (key === "confirmPassword") {
    //     if (form?.hasOwnProperty("password")) {
    //       if (!form?.password?.match(`^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})`)) {
    //         newError.password.status = true;
    //       }
    //     }
    //   }

    //   if (val !== form[formKey]) {
    //     if (form.hasOwnProperty(formKey) && form[formKey] !== "") {
    //       newError.confirmPassword.status = true;
    //       newError.confirmPassword.text = "Password tidak sama";
    //     }
    //   }
    // } else {
    //   if (form?.password !== form?.confirmPassword) {
    //     newError.confirmPassword.status = true;
    //     newError.confirmPassword.text = "Password tidak sama";
    //   }
    // }

    // setError({ ...error, ...newError });

    // setError((prev) => ({ ...prev, [key]: { status: false, text: "" } }));
    setForm({ ...form, [key]: val });
  };

  const handleSubmit = async () => {
    const newError = {
      fullName: { status: false, text: "" },
      email: { status: false, text: "" },
      phone: { status: false, text: "" },
      password: { status: false, text: "" },
      confirmPassword: { status: false, text: "" },
    };

    // Validasi Nama
    if (!form?.fullName) {
      newError.fullName.status = true;
      newError.fullName.text = "Nama lengkap tidak boleh kosong";
    }

    // Validasi Email
    if (form?.email) {
      if (
        !form?.email?.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        newError.email.status = true;
        newError.email.text = "Format email salah";
      }
    } else {
      newError.email.status = true;
      newError.email.text = "Email tidak boleh kosong";
    }

    // Validasi Nomor Telpon
    if (form?.phone) {
      if (!form?.phone?.match(`^[0-9]*$`)) {
        newError.phone.status = true;
        newError.phone.text = "Hanya boleh diisi angka";
      } else {
        if (form?.phone?.length < 10) {
          newError.phone.status = true;
          newError.phone.text = "Minimal 10 digit";
        }
        if (form?.phone?.length > 13) {
          newError.phone.status = true;
          newError.phone.text = "Maksimal 13 digit";
        }
      }
    } else {
      newError.phone.status = true;
      newError.phone.text = "Nomor tidak boleh kosong";
    }

    if (Mobile && !showInputPassword) {
      if (!newError?.email?.status && !newError?.phone?.status)
        setShowInputPassword(true);
    }

    if ((Mobile && showInputPassword) || !Mobile) {
      // Validasi Password
      if (!form?.password?.match(`^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})`)) {
        newError.password.status = true;
      }
      // Validasi Confirm Password
      if (form?.password && form?.confirmPassword !== form?.password) {
        newError.confirmPassword.status = true;
        newError.confirmPassword.text = "Password tidak sama";
      }

      if (
        !newError?.name?.status &&
        !newError?.email?.status &&
        !newError?.phone?.status &&
        !newError?.password?.status &&
        !newError?.confirmPassword?.status
      ) {
        await API2({
          method: `POST`,
          url: endpoints.checkUserEmail,
          data: { emails: [form?.email] },
        })
          .then((res) => {
            if (res?.data?.data[0].exists) {
              newError.email.status = true;
              newError.email.text = "Email sudah terdaftar";
            } else {
              handleSendOTP();
            }
          })
          .catch((err) => console.log(err));
      }
    }
    setError(newError);
  };

  const handleSendOTP = async (val) => {
    if (form?.fullName && form?.email && form?.phone) {
      let url = endpoints.sendEmailOTP;
      let data = { name: form?.fullName, email: form?.email };

      if (val === `phone`) {
        url = endpoints.sendWhatsappOTP;
        data = [
          {
            user_id: 0,
            phone_number: form?.phone.replace(form?.phone[0], `+62`),
          },
        ];
      }

      await API2({
        method: `POST`,
        url,
        data,
      })
        .then((res) => {
          setShowInputPassword(false);
          handleStep(2);
          counter === 0 && setCounter(30);
          console.log("send verification code successfully");
        })
        .catch((err) => console.log("send verification code failed"));
    } else {
      if (!form?.fullName)
        setError((prev) => ({
          ...prev,
          fullName: { status: true, text: `Nama lengkap tidak boleh kosong` },
        }));

      if (!form?.email)
        setError((prev) => ({
          ...prev,
          email: {
            status: true,
            text: `Format email salah / email tidak boleh kosong`,
          },
        }));
    }
  };

  const handleVerif = async () => {
    let url = endpoints.verifyEmailOTP;
    let data = { email: form?.email, otp: inputOTP };
    if (method === `phone`) {
      url = endpoints.verifyWhatsappOTP;
      data = [
        {
          user_id: 0,
          phone_number: form?.phone.replace(form?.phone[0], `+62`),
          otp: inputOTP,
        },
      ];
    }

    await API2({
      method: `POST`,
      url,
      data,
    })
      .then(async (res) => {
        setError({ ...error, OTP: false });
        // Success verify otp
        await API2({
          method: `POST`,
          url: endpoints.register,
          data: {
            full_name: form?.fullName,
            email: form?.email,
            phone: form?.phone,
            password: form?.password,
            confirm_password: form?.confirmPassword,
            device_id: deviceInformation ? deviceInformation : "web",
          },
        })
          .then((res) => {
            setUser(res?.data?.data);
            handlePage("onboarding");
          })
          .catch((err) => {
            console.log("err", err);
            // const errorMessage = err?.response?.data?.message[0];
            // if (errorMessage === "Email is already used by another user") {
            //   newError.email.status = true;
            //   newError.email.text = "Email sudah terdaftar";
            //   if (Mobile && showInputPassword) setShowInputPassword(false);
            // }
            // if(errorMessage === "Phone is already registered") { ... }
          });
      })
      .catch((err) => {
        setError({ ...error, OTP: true });
        console.log("err", err);
      });
  };

  const changeMethod = (method) => {
    setMethod(method);
    handleSendOTP(method);
  };

  useEffect(() => {
    if (step === 1 && form?.email && form?.phone) inputRef?.current?.focus();
  }, [step]);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  useEffect(async () => {
    await axios
      .get("https://geolocation-db.com/json/")
      .then((res) => {
        setDeviceInformation(`${browserName} ${osName} | ${res.data.IPv4}`);
      })
      .catch((err) => {
        console.log("error", err.response);
      });
  });

  // Styles
  const classes = {
    Container: {
      width: `100%`,
      display: `flex`,
      justifyContent: `space-between`,
      alignItems: `flex-start`,
      gap: `120px`,
      px: MediumScreen ? `32px` : LargeScreen ? `120px` : 0,
      mb: Mobile ? 0 : `40px`,
    },
    BoxContainer: {
      background: `white`,
      width: `100%`,
      maxWidth: Mobile ? `100%` : `486px`,
      height: `100%`,
      mx: Tablet || SmallScreen ? `auto` : 0,
      borderRadius: Mobile ? 0 : Radius.medium,
      boxShadow: Mobile ? `none` : Elevation.navigationMenu,
    },
    BackspaceWrapper: {
      display: Mobile ? `none` : `flex`,
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
    DividerContainer: {
      position: `relative`,
      display: `flex`,
      alignItems: `center`,
      my: `24px`,
      caption: {
        position: `absolute`,
        width: `fit-content`,
        backgroundColor: `white`,
        padding: `0 4px`,
        left: 0,
        right: 0,
        margin: `auto`,
      },
    },
    Card: {
      width: `100%`,
      cursor: `pointer`,
      padding: `12px`,
      borderRadius: Radius.medium,
      boxShadow: Elevation.navigationMenu,
    },
    FooterContainer: {
      marginTop: Mobile ? `32px` : `24px`,
      padding: `12px 24px`,
      textAlign: `center`,
      backgroundColor: Colors.primary.pale_gray,
    },
  };

  return (
    <Box sx={classes.Container}>
      {/* LEFT CONTAINER */}
      <Box
        sx={{
          display: MediumScreen || LargeScreen ? `block` : `none`,
          maxWidth: `600px`,
        }}
      >
        <Heading2>Mengapa cari pekerjaan di Karir.com?</Heading2>
        <Box sx={{ display: `flex`, gap: `24px`, mt: `40px` }}>
          <Box sx={{ width: `100%` }}>
            <img
              className="on-boarding-image"
              src="/images/Principle/Illustration/Landing-Card/3.png"
              alt="on-boarding-image"
            />
            <Heading3 sx={{ mb: "4px" }}>Profil & CV Generator</Heading3>
            <Body1>
              Buat profil sesuai dengan dibutuhkan recruiter dan buat jadi CV 1x
              klik
            </Body1>
          </Box>
          <Box sx={{ width: `100%` }}>
            <img
              className="on-boarding-image"
              src="/images/Principle/Illustration/Landing-Card/1.png"
              alt="on-boarding-image"
            />
            <Heading3 sx={{ mb: "4px" }}>Status Lamaran</Heading3>
            <Body1>
              Pantau status lamaran terbaru Anda dari awal-akhir dengan mudah.
            </Body1>
          </Box>
        </Box>

        <Box sx={{ display: `flex`, gap: `24px`, mt: `40px` }}>
          <Box sx={{ width: `100%` }}>
            <img
              className="on-boarding-image"
              src="/images/Principle/Illustration/Landing-Card/4.png"
              alt="on-boarding-image"
            />
            <Heading3 sx={{ mb: "4px" }}>Preferensi & Job Alert</Heading3>
            <Body1>
              Cari lowongan sesuai preferensi Anda dalam hitungan detik
            </Body1>
          </Box>
          <Box sx={{ width: `100%` }}>
            <img
              className="on-boarding-image"
              src="/images/Principle/Illustration/Landing-Card/2.png"
              alt="on-boarding-image"
            />
            <Heading3 sx={{ mb: "4px" }}>Profile Matching</Heading3>
            <Body1>
              Dapatkan Informasi Lowongan yang cocok dengan profil Anda
            </Body1>
          </Box>
        </Box>
      </Box>

      {/* RIGHT CONTAINER */}
      <Box sx={classes.BoxContainer}>
        <Box px={Mobile ? `16px` : `24px`} pt={Mobile ? `28px` : `24px`}>
          {/* CARD HEADER */}
          {step > 1 && (
            <Box sx={classes.BackspaceWrapper}>
              <Box
                sx={classes.BackspaceWrapper.Button}
                onClick={() => handleBack()}
              >
                <ArrowBackIcon sx={{ height: `16px`, width: `16px` }} />
                <Heading5>Kembali</Heading5>
              </Box>

              <Box sx={classes.BackspaceWrapper.Button}>
                <HelpOutlineIcon sx={{ height: `16px`, width: `16px` }} />
                <Heading5>Bantuan</Heading5>
              </Box>
            </Box>
          )}

          {/* INPUT ALL FIELDS */}
          {step === 1 && (
            <>
              {/* TITLE */}
              <Box className={!Mobile && "center"} mb="32px">
                <Heading2 mb="4px">Buat Akun</Heading2>
                <Font type={Mobile ? `Body2` : `Body1`}>
                  {Mobile ? (
                    <>
                      Punya akun?{" "}
                      <Link href="/login">
                        <a className="link">Sign in</a>
                      </Link>
                    </>
                  ) : (
                    <>
                      Sudah punya akun?{" "}
                      <Link href="/login">
                        <a className="link">Sign in</a>
                      </Link>
                    </>
                  )}
                </Font>
              </Box>

              {/* --------------------------------------------------- */}

              {/* INPUT NAME/EMAIL/PHONE */}
              {((Mobile && !showInputPassword) || !Mobile) && (
                <>
                  {/* 3P LOGIN BUTTON WRAPPER */}
                  <Box
                    className="d-flex-fullwidth"
                    gap="12px"
                    flexDirection={Mobile ? `column` : `row`}
                  >
                    {/* GOOGLE BUTTON */}
                    <RectangleButton
                      state="alternate"
                      fullWidth
                      customStyle={{ margin: 0 }}
                    >
                      <Box className="d-flex" gap="4px">
                        <img
                          src="/images/Principle/Logo/Google.svg"
                          alt="google"
                        />
                        Daftar dengan Google
                      </Box>
                    </RectangleButton>

                    {/* LINKEDIN BUTTON */}
                    <RectangleButton
                      state="alternate"
                      fullWidth
                      customStyle={{ margin: 0 }}
                    >
                      <Box className="d-flex" gap="4px">
                        <img
                          src="/images/Principle/Logo/Linkedin.svg"
                          alt="linkedin"
                        />
                        Daftar dengan Linkedin
                      </Box>
                    </RectangleButton>
                  </Box>

                  {/* Divider */}
                  <Box sx={classes.DividerContainer}>
                    <Divider />
                    <Body3 sx={classes.DividerContainer.caption}>
                      atau daftar dengan email
                    </Body3>
                  </Box>

                  {/* INPUT NAME */}
                  <Box mb={Mobile ? `16px` : `32px`}>
                    <InputTextField
                      label="Nama Lengkap*"
                      defaultValue={form?.fullName}
                      handleChange={(val) => handleChange("fullName", val)}
                      error={error?.fullName?.status}
                      helperText={
                        error?.fullName?.status && error?.fullName?.text
                      }
                      minWidth="1px"
                      fullWidth
                    />
                  </Box>

                  {/* INPUT EMAIL/PHONE */}
                  <Box
                    className="d-flex-fullwidth input-email-wa"
                    flexDirection={Mobile ? `column` : `row`}
                    alignItems="flex-start !important"
                    gap={Mobile ? `16px` : `14px`}
                    mb={Mobile ? `16px` : `32px`}
                    ref={(el) =>
                      (inputRef.current =
                        el?.childNodes[
                          method === "email" ? 0 : 1
                        ]?.childNodes[1]?.firstChild)
                    }
                  >
                    <InputTextField
                      label="Email*"
                      defaultValue={form?.email}
                      handleChange={(val) => handleChange("email", val)}
                      error={error?.email?.status && true}
                      helperText={error?.email?.status && error?.email?.text}
                      minWidth="1px"
                      fullWidth
                    />
                    <InputTextField
                      label="Nomor Ponsel*"
                      defaultValue={form?.phone}
                      handleChange={(val) => handleChange("phone", val)}
                      error={error?.phone?.status && true}
                      helperText={
                        error?.phone?.status
                          ? error?.phone?.text
                          : "Nomor terhubung dengan WhatsApp."
                      }
                      minWidth="1px"
                      fullWidth
                    />
                  </Box>
                </>
              )}

              {/* INPUT PASSWORD */}
              {((Mobile && showInputPassword) || !Mobile) && (
                <>
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={Mobile ? `16px` : `32px`}
                    mb={Mobile ? `16px` : `32px`}
                  >
                    <Box>
                      <InputPasswordField
                        label="Password Baru"
                        defaultValue={form?.password}
                        helperText="Minimal 8 karakter, huruf kapital, dan angka."
                        handleChange={(val) => handleChange("password", val)}
                        errorIcon={false}
                        error={error?.password?.status && true}
                        passwordStrength
                        fullWidth
                      />
                    </Box>

                    <Box>
                      <InputPasswordField
                        label="Konfirmasi Password Baru"
                        defaultValue={form?.confirmPassword}
                        handleChange={(val) =>
                          handleChange("confirmPassword", val)
                        }
                        error={error?.confirmPassword?.status && true}
                        helperText={
                          error?.confirmPassword?.status &&
                          error?.confirmPassword?.text
                        }
                        fullWidth
                      />
                    </Box>
                  </Box>

                  <Font
                    type={Mobile ? `Body3` : `Body2`}
                    mb={Mobile ? `8px` : `16px`}
                  >
                    Dengan mendaftar Anda menyetujui{" "}
                    <Link href="/login">
                      <a className="link">Syarat & Ketentuan</a>
                    </Link>
                    <br />
                    dan{" "}
                    <Link href="/login">
                      <a className="link">Kebijakan Privasi.</a>
                    </Link>
                  </Font>
                </>
              )}

              {/* --------------------------------------------------- */}

              {/* CONTINUE BUTTON */}
              <Box>
                <RectangleButton
                  fullWidth
                  // disable={CheckIsButtonDisabled()}
                  customStyle={{ margin: 0 }}
                  onClick={() => handleSubmit()}
                >
                  Lanjutkan
                </RectangleButton>
              </Box>
            </>
          )}

          {/* ENTER OTP CODE */}
          {step === 2 && (
            <>
              <Box mb={Mobile ? `32px` : `24px`}>
                <Heading2 mb="4px">Verifikasi Masuk</Heading2>
                <Font
                  type={Mobile ? `Body2` : `Body1`}
                  color={Colors.neutral.brown_grey}
                >
                  Kode verifikasi dikirimkan melalui:
                </Font>
              </Box>

              <Font
                type={Mobile ? `Body3` : `Heading5`}
                color={Colors.neutral.brown_grey}
                mb={Mobile ? 0 : `8px`}
              >
                {method === "email" && "Email"}
                {method === "phone" && "Whatsapp"}
              </Font>

              <Box className="d-flex" gap="4px" mb={Mobile ? `12px` : `32px`}>
                <Font type={Mobile ? `Body2` : `Body1`}>{form?.[method]}</Font>
                <Body3
                  className="pointer"
                  display="inline"
                  color={Colors.secondary.clear_blue}
                  onClick={() => handleStep(1)}
                >
                  Ubah
                </Body3>
              </Box>

              <Box mb={Mobile ? `24px` : `32px`}>
                <OTPField
                  error={error?.OTP}
                  numInputs={6}
                  getInputOTP={setInputOTP}
                />
              </Box>

              <Box mb={Mobile ? `12px` : `20px`}>
                <RectangleButton
                  fullWidth
                  disable={!inputOTP && true}
                  onClick={() => handleVerif()}
                  customStyle={{ margin: 0 }}
                >
                  Verifikasi
                </RectangleButton>
              </Box>

              <Box width="fit-content" mx="auto">
                <Font
                  type={Mobile ? `Body3` : `Label`}
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
                        onClick={() => handleSendOTP()}
                      >
                        Kirim Ulang
                      </span>
                    </>
                  )}
                </Font>
              </Box>
            </>
          )}

          {/* CHOOSE VERIFICATION METHOD */}
          {step === 3 && (
            <>
              <Box mb={Mobile ? `32px` : `24px`}>
                <Heading2 mb="4px">Metode Verifikasi</Heading2>
                <Font
                  type={Mobile ? `Body2` : `Body1`}
                  color={Colors.neutral.brown_grey}
                >
                  Pilih metode dibawah ini untuk <br /> mendapatkan kode
                  verifikasi.
                </Font>
              </Box>

              <Box
                className="d-flex-fullwidth pointer"
                sx={classes.Card}
                mb="16px"
                onClick={() => changeMethod("email")}
              >
                <Box className="d-flex" gap="8px">
                  <img src="/images/Principle/Logo/Email.svg" alt="email" />
                  <Box>
                    <Heading5>Email</Heading5>
                    <Heading5 color={Colors.primary.mid_blue}>
                      mxxxxxxxxxxxxan@gmail.com
                    </Heading5>
                  </Box>
                </Box>

                <img
                  src="/images/Principle/Logo/Right Arrow.svg"
                  alt="right-arrow"
                />
              </Box>

              <Box
                className="d-flex-fullwidth pointer"
                sx={classes.Card}
                onClick={() => changeMethod("phone")}
              >
                <Box className="d-flex" gap="8px">
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
            </>
          )}
        </Box>

        {/* CARD FOOTER */}
        <Box sx={classes.FooterContainer}>
          {step === 1 && (
            <>
              <Font type={Mobile ? `Body3` : `Body2`}>
                {Mobile && (
                  <>
                    Butuh bantuan? Hubungi{" "}
                    <Link href="">
                      <a className="link">Karir Care</a>
                    </Link>
                  </>
                )}

                {!Mobile && (
                  <>
                    Sudah punya akun?{" "}
                    <Link href="/login">
                      <a className="link">Sign in</a>
                    </Link>
                  </>
                )}
              </Font>
            </>
          )}

          {(step === 2 || step === 3) && (
            <>
              <Font type={Mobile ? `Body3` : `Body2`}>
                {step === 2 && (
                  <>
                    Tidak menerima Kode?{" "}
                    <span
                      className="link pointer"
                      onClick={() => handleStep(3)}
                    >
                      Ganti metode verifikasi
                    </span>
                    <br />
                    atau hubungi bantuan{" "}
                    <span className="link pointer">Karir Care</span>
                  </>
                )}

                {step === 3 && (
                  <>
                    E-mail/ No Telephone bermasalah? hubungi bantuan{" "}
                    <span className="link pointer">Karir Care</span>
                  </>
                )}
              </Font>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Registration;
