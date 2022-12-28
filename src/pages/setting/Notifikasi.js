import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import RectangleButton from "../../components/Atom/Button/RectangleButton";
import OTPField from "../../components/Atom/Input Field/OTPField";
import InputPasswordField from "../../components/Atom/Input Field/PasswordField";
import InputTextField from "../../components/Atom/Input Field/TextField";
import RadioButton from "../../components/Atom/Selection Control/Radio";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import {
  Body1,
  Body2,
  Body3,
  Heading2,
  Heading3,
  Heading6,
  Heading4,
  Label,
} from "../../components/Atom/Typography";
import Toaster from "../../components/Molecul/Toaster";
import { Colors, Elevation } from "../../themes";
import ModalPopupNotifLoker from "./popup/ModalPopupNotifLoker";
import useMediaQuery from "../../utils/useMediaQuery";
import { Dialog, AppBar, Toolbar, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Switch from "../../components/Atom/Switch";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import WebIcon from "@mui/icons-material/LanguageOutlined";
import InputSelectField from "../../components/Atom/Input Field/SelectField";
import InputPrefixRp from "../../components/Atom/Input Field/Prefix/PrefixRp";

//getAPI
import axios from "axios";
import { endpoints } from "../../api/endpoint";
import { API2 } from "../../api/service";

const options = {
  customOption: [
    {
      question: "Menerima notifikasi melalui Email",
      answers: ["Aktif", "Tidak Aktif"],
    },
    {
      question: "Menerima notifikasi melalui Website dan Apps",
      answers: ["Aktif", "Tidak Aktif"],
    },
  ],
};

const Notifikasi = (props) => {
  const { onClick, userData } = props;

  const [form, setForm] = useState({
    posisi_pekerjaan: ``,
    fungsi_pekerjaan: ``,
    tipe_pekerjaan: ``,
    lokasi: ``,
    gaji: 0,
  });

  const [state, setState] = useState({
    // id: 1,
    jobAlertPreferensi: { notifikasiViaEmail: true, notifikasiViaWeb: true },
    jobAlertRekomendasi: { notifikasiViaEmail: true, notifikasiViaWeb: true },
    subscribeCompany: { notifikasiViaEmail: true, notifikasiViaWeb: true },
  });

  const [dataNotif, setDataNotif] = useState(null);

  //==================================================
  const isMobile = useMediaQuery("(max-width: 640px)");

  const [isOpenJobAlertPreferensi, setIsOpenJobAlertPreferensi] = useState(
    false
  );
  const [isOpenJobAlertRekomendasi, setIsOpenJobAlertRekomendasi] = useState(
    false
  );
  const [isOpenSubscribeCompany, setIsOpenSubscribeCompany] = useState(false);
  const [
    isOpenPreferensiLowonganKerja,
    setIsOpenPreferensiLowonganKerja,
  ] = useState(false);

  const [show, setShow] = useState(false);

  const [openToaster, setOpenToaster] = useState(false);
  const [labelToaster, setLabelToaster] = useState("");

  // Value  from text field component
  const [email, setEmail] = useState("");
  const [nomorPonsel, setNomorPonsel] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  const [selectedAnswer1, setSelectedAnswer1] = useState([]);
  const [selectedAnswer2, setSelectedAnswer2] = useState([]);
  const [selectedAnswer3, setSelectedAnswer3] = useState([]);
  const [showJobAlertPreferensi, setShowJobAlertPreferensi] = useState(false);
  const [showJobAlertRekomendasi, setShowJobAlertRekomendasi] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [showLoker, setShowLoker] = useState(false);

  const [dataFilteredNotif, setDataFilteredNotif] = useState({});

  useEffect(() => {
    getUserNotification();
  }, []);

  useEffect(() => {
    if (dataNotif) {
      const objData = {
        jobAlertPreferensi: {
          notifikasiViaEmail: true,
          notifikasiViaWeb: true,
        },
        jobAlertRekomendasi: {
          notifikasiViaEmail: true,
          notifikasiViaWeb: true,
        },
        subscribeCompany: { notifikasiViaEmail: true, notifikasiViaWeb: true },
      };

      dataNotif?.forEach((value, idx) => {
        if (value.type == "JOB_ALERT_PREFERENSI_EMAIL") {
          objData.jobAlertPreferensi.notifikasiViaEmail = value?.status;
        }
        if (value.type == "JOB_ALERT_PREFERENSI_WEBSITE_AND_APPS") {
          objData.jobAlertPreferensi.notifikasiViaWeb = value?.status;
        }
        if (value.type == "JOB_ALERT_REKOMENDASI_EMAIL") {
          objData.jobAlertRekomendasi.notifikasiViaEmail = value?.status;
        }
        if (value.type == "JOB_ALERT_REKOMENDASI_WEBSITE_AND_APPS") {
          objData.jobAlertRekomendasi.notifikasiViaWeb = value?.status;
        }
        if (value.type == "SUBSCRIBE_COMPANY_EMAIL") {
          objData.subscribeCompany.notifikasiViaEmail = value?.status;
        }
        if (value.type == "SUBSCRIBE_COMPANY_WEBSITE_AND_APPS") {
          objData.subscribeCompany.notifikasiViaWeb = value?.status;
        }
      });
      setDataFilteredNotif(objData);
    }
  }, [dataNotif]);

  useEffect(() => {
    if (dataFilteredNotif) {
      setSelectedAnswer1([
        dataFilteredNotif?.jobAlertPreferensi?.notifikasiViaEmail == true
          ? "Aktif"
          : "Tidak Aktif",
        dataFilteredNotif?.jobAlertPreferensi?.notifikasiViaWeb == true
          ? "Aktif"
          : "Tidak Aktif",
      ]);
      setSelectedAnswer2([
        dataFilteredNotif?.jobAlertRekomendasi?.notifikasiViaEmail == true
          ? "Aktif"
          : "Tidak Aktif",
        dataFilteredNotif?.jobAlertRekomendasi?.notifikasiViaWeb == true
          ? "Aktif"
          : "Tidak Aktif",
      ]);
      setSelectedAnswer3([
        dataFilteredNotif?.subscribeCompany?.notifikasiViaEmail == true
          ? "Aktif"
          : "Tidak Aktif",
        dataFilteredNotif?.subscribeCompany?.notifikasiViaWeb == true
          ? "Aktif"
          : "Tidak Aktif",
      ]);
    }
  }, [dataFilteredNotif]);

  console.log("DATA USER NOTIF ", dataFilteredNotif);
  console.log("SELECTED FILTERED ", selectedAnswer1);

  const getUserNotification = async () => {
    await API2({
      method: `GET`,
      url: `${endpoints.getUserNotif}${userData?.source_id}`,
    })
      .then((res) => {
        setDataNotif(res?.data?.data);
        // dispatch(getPreferensi(userID));
        // setIsOpen(false);
        // setVariantToaster("success");
        // setErrorToasterText("Resume Search berhasil diupdate");
        // setOpenToaster(true);
        // setIsChecked(val);
      })
      .catch((err) => {
        console.log(err?.response);
      });
  };

  const handleSelectAnswer1 = (e, index) => {
    let answers = [...selectedAnswer1];
    answers[index] = e.target.value;
    setSelectedAnswer1(answers);
  };
  const handleSelectAnswer2 = (e, index) => {
    let answers = [...selectedAnswer2];
    answers[index] = e.target.value;
    setSelectedAnswer2(answers);
  };
  const handleSelectAnswer3 = (e, index) => {
    let answers = [...selectedAnswer3];
    answers[index] = e.target.value;
    setSelectedAnswer3(answers);
  };

  const handleSelectAnswerMobile1 = (e, index) => {
    let answers = [...selectedAnswer1];
    if (e.target.checked) {
      answers[index] = "Aktif";
    } else {
      answers[index] = "Tidak Aktif";
    }
    setSelectedAnswer1(answers);
  };

  const ClickEdit = (val) => {
    if (val == "Job Alert (Preferensi)") {
      setIsOpenJobAlertPreferensi(!isOpenJobAlertPreferensi);
      setIsOpenJobAlertRekomendasi(false);
      setIsOpenSubscribeCompany(false);
      setIsOpenPreferensiLowonganKerja(false);
    }
    if (val == "Job Alert (Rekomendasi)") {
      setIsOpenJobAlertRekomendasi(!isOpenJobAlertRekomendasi);
      setIsOpenJobAlertPreferensi(false);
      setIsOpenSubscribeCompany(false);
      setIsOpenPreferensiLowonganKerja(false);
    }
    if (val == "Subscribe Company") {
      setIsOpenSubscribeCompany(!isOpenSubscribeCompany);
      setIsOpenJobAlertRekomendasi(false);
      setIsOpenJobAlertPreferensi(false);
      setIsOpenPreferensiLowonganKerja(false);
    }
    if (val == "Preferensi Lowongan Kerja") {
      //   setIsOpenPreferensiLowonganKerja(!isOpenPreferensiLowonganKerja);
      setIsOpenJobAlertPreferensi(false);
      setIsOpenJobAlertRekomendasi(false);
      setIsOpenSubscribeCompany(false);
      handleModalPopup("open");
    }
  };

  const kirimKodeVerifikasi = (val) => {
    if (val == "email") {
      setIsKirimKodeEmail(true);
    }
    if (val == "nomor ponsel") {
      setIsKirimKodeTlp(true);
    }
  };

  const clickVerifikasi = (val) => {
    if (val == "email") {
      let updateEmail = {};
      updateEmail = { email: email };
      setState((state) => ({
        ...state,
        ...updateEmail,
      }));
      setIsKirimKodeEmail(false);
      setIsOpenJobAlertPreferensi(false);

      setOpenToaster(false);
      setTimeout(() => {
        setLabelToaster("Email");
        setOpenToaster(true);
      }, 100);
    }

    if (val == "nomor ponsel") {
      let updatePonsel = {};
      updatePonsel = { ponsel: nomorPonsel };
      setState((state) => ({
        ...state,
        ...updatePonsel,
      }));
      setIsKirimKodeTlp(false);
      setIsOpenJobAlertRekomendasi(false);

      setOpenToaster(false);
      setTimeout(() => {
        setLabelToaster("Nomor Ponsel");
        setOpenToaster(true);
      }, 100);
    }

    if (val == "password") {
      if (newPassword1 == newPassword2) {
        let updatePassword = {};
        updatePassword = { password: newPassword1 };
        setState((state) => ({
          ...state,
          ...updatePassword,
        }));
        setIsOpenSubscribeCompany(false);

        setOpenToaster(false);
        setTimeout(() => {
          setLabelToaster("Password");
          setOpenToaster(true);
        }, 100);
      }
    }
  };

  const handleModalPopup = (val) => {
    if (val === "open") {
      setShow(true);
    } else if (val === "close") {
      setShow(false);
    }
  };

  const handleClose = () => {
    setShowJobAlertPreferensi(false);
    setShowJobAlertRekomendasi(false);
    setShowSubscribe(false);
    setShowLoker(false);
  };

  const handleButton = (val) => {
    if (val === "continue") {
      // setIsDone(true);
      setShowLoker(false);
    } else if (val === "cancel") {
      setShowLoker(false);
    }
  };

  return (
    <>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            //   padding: 24px;
            position: static;
            width: 100%;
            height: 100%;
            // margin-left: 24px;
            // margin-top: 40px;
          }
          .box-card {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding: 24px;
            // margin-bottom: 24px;
            background-color: white;
            border-radius: 8px;
            box-shadow: ${Elevation.card};
            :not(:last-child) {
              margin-bottom: 16px;
            }
          }
          .wrap-content {
            width: 100%;
          }
          .wrap-edit {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
            cursor: pointer;
          }
          .m-wrapper {
            padding: 0px 16px 0px 16px;
            width: 100%;
          }
        `}
      </style>

      <ModalPopupNotifLoker show={show} setShow={(val) => setShow(val)} />

      {/* ===========DIALOG JOB ALERT PREFERENSI======== */}
      <Dialog fullScreen open={showJobAlertPreferensi} onClose={handleClose}>
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: "white",
            borderBottom: "1px solid #EEEEEE",
          }}
          elevation={0}
        >
          <Toolbar style={{ background: "white" }}>
            <IconButton
              edge="start"
              onClick={handleClose}
              aria-label="close"
              backgroundColor={Colors.neutral.brown_grey}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box m="auto">
              <Heading4
                style={{
                  color: Colors.primary.mid_blue,
                }}
              >
                Job Alert (Preferensi)
              </Heading4>
            </Box>
          </Toolbar>
        </AppBar>
        <div style={{ margin: "16px 16px" }}>
          <Body3>Menerima notifikasi melalui </Body3>
          <div className="wrap-edit" style={{ marginTop: "19px" }}>
            <div style={{ position: "relative" }}>
              <EmailIcon />
              <Heading6
                style={{
                  color: Colors.neutral.greyish_brown,
                  position: "absolute",
                  top: 3,
                  left: 30,
                }}
              >
                Email
              </Heading6>
            </div>

            <Switch
              onChange={(e) => handleSelectAnswerMobile1(e, 0)}
              active={selectedAnswer1[0] == "Aktif"}
            />
          </div>

          <div className="wrap-edit" style={{ marginTop: "19px" }}>
            <div style={{ position: "relative" }}>
              <WebIcon />
              <Heading6
                style={{
                  color: Colors.neutral.greyish_brown,
                  position: "absolute",
                  top: 3,
                  left: 30,
                  width: 100,
                }}
              >
                Website & Apps
              </Heading6>
            </div>

            <Switch />
          </div>
        </div>
      </Dialog>
      {/* =========== END OF DIALOG JOB ALERT PREFERENSI======== */}

      {/* ===========DIALOG JOB ALERT REKOMENDASI=============== */}
      <Dialog fullScreen open={showJobAlertRekomendasi} onClose={handleClose}>
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: "white",
            borderBottom: "1px solid #EEEEEE",
          }}
          elevation={0}
        >
          <Toolbar style={{ background: "white" }}>
            <IconButton
              edge="start"
              onClick={handleClose}
              aria-label="close"
              backgroundColor={Colors.neutral.brown_grey}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box m="auto">
              <Heading4
                style={{
                  color: Colors.primary.mid_blue,
                }}
              >
                Job Alert (Rekomendasi)
              </Heading4>
            </Box>
          </Toolbar>
        </AppBar>
        <div style={{ margin: "16px 16px" }}>
          <Body3>Menerima notifikasi melalui </Body3>
          <div className="wrap-edit" style={{ marginTop: "19px" }}>
            <div style={{ position: "relative" }}>
              <EmailIcon />
              <Heading6
                style={{
                  color: Colors.neutral.greyish_brown,
                  position: "absolute",
                  top: 3,
                  left: 30,
                }}
              >
                Email
              </Heading6>
            </div>

            <Switch />
          </div>

          <div className="wrap-edit" style={{ marginTop: "19px" }}>
            <div style={{ position: "relative" }}>
              <WebIcon />
              <Heading6
                style={{
                  color: Colors.neutral.greyish_brown,
                  position: "absolute",
                  top: 3,
                  left: 30,
                  width: 100,
                }}
              >
                Website & Apps
              </Heading6>
            </div>

            <Switch />
          </div>
        </div>
      </Dialog>
      {/* ===========END OF DIALOG JOB ALERT REKOMENDASI=============== */}

      {/* DIALOG SUBSCRIBE COMPANY */}
      <Dialog fullScreen open={showSubscribe} onClose={handleClose}>
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: "white",
            borderBottom: "1px solid #EEEEEE",
          }}
          elevation={0}
        >
          <Toolbar style={{ background: "white" }}>
            <IconButton
              edge="start"
              onClick={handleClose}
              aria-label="close"
              backgroundColor={Colors.neutral.brown_grey}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box m="auto">
              <Heading4
                style={{
                  color: Colors.primary.mid_blue,
                }}
              >
                Subscribe Company
              </Heading4>
            </Box>
          </Toolbar>
        </AppBar>
        <div style={{ margin: "16px 16px" }}>
          <Body3>Menerima notifikasi melalui </Body3>
          <div className="wrap-edit" style={{ marginTop: "19px" }}>
            <div style={{ position: "relative" }}>
              <EmailIcon />
              <Heading6
                style={{
                  color: Colors.neutral.greyish_brown,
                  position: "absolute",
                  top: 3,
                  left: 30,
                }}
              >
                Email
              </Heading6>
            </div>

            <Switch />
          </div>

          <div className="wrap-edit" style={{ marginTop: "19px" }}>
            <div style={{ position: "relative" }}>
              <WebIcon />
              <Heading6
                style={{
                  color: Colors.neutral.greyish_brown,
                  position: "absolute",
                  top: 3,
                  left: 30,
                  width: 100,
                }}
              >
                Website & Apps
              </Heading6>
            </div>

            <Switch />
          </div>
        </div>
      </Dialog>
      {/* END OF SUBSCRIBE COMPANY */}

      {/* DIALOG PREFERENSI PEKERJAAN */}
      <Dialog fullScreen open={showLoker} onClose={handleClose}>
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: "white",
            borderBottom: "1px solid #EEEEEE",
          }}
          elevation={0}
        >
          <Toolbar style={{ background: "white" }}>
            <IconButton
              edge="start"
              onClick={handleClose}
              aria-label="close"
              backgroundColor={Colors.neutral.brown_grey}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box m="auto">
              <Heading4
                style={{
                  color: Colors.primary.mid_blue,
                }}
              >
                Preferensi Pekerjaan
              </Heading4>
            </Box>
          </Toolbar>
        </AppBar>
        <div style={{ margin: "16px 16px" }}>
          <Body3 mt="4px" color={Colors.neutral.brown_grey}>
            Temukan lowongan sesuai Preferensi Anda! Jangan khawatir preferensi
            dapat Anda perbaharui kapanpun.
          </Body3>

          <Box
            mt="20px"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "22px",
            }}
          >
            <InputSelectField
              label="Posisi Pekerjaan*"
              fullWidth={true}
              defaultValue={form.posisi_pekerjaan}
              options={[
                {
                  label: "Product Designer",
                  value: "Product Designer",
                },
                { label: "DesignOps", value: "DesignOps" },
              ]}
              handleChange={(value) =>
                setForm({ ...form, posisi_pekerjaan: value })
              }
            />
            <InputSelectField
              label="Fungsi Pekerjaan*"
              fullWidth={true}
              defaultValue={form.fungsi_pekerjaan}
              options={[
                { label: "Kreatif", value: "Kreatif" },
                { label: "Administration", value: "Administration" },
                {
                  label: "Engineer, Agricultural",
                  value: "Engineer, Agricultural",
                },
                { label: "Arsitek", value: "Arsitek" },
                { label: "Chemist", value: "Chemist" },
                {
                  label: "Banking Operations",
                  value: "Banking Operations",
                },
                { label: "General Affairs", value: "General Affairs" },
                {
                  label: "Product Development",
                  value: "Product Development",
                },
              ]}
              handleChange={(value) =>
                setForm({ ...form, fungsi_pekerjaan: value })
              }
            />
            <InputSelectField
              label="Tipe Pekerjaan*"
              fullWidth={true}
              defaultValue={form.tipe_pekerjaan}
              options={[
                { label: "Designer", value: "Designer" },
                { label: "Full-time", value: "Full-time" },
                { label: "Internship", value: "Internship" },
                { label: "Temporary", value: "Temporary" },
                { label: "Contract", value: "Contract" },
              ]}
              handleChange={(value) =>
                setForm({ ...form, tipe_pekerjaan: value })
              }
            />
            <InputSelectField
              label="Lokasi*"
              fullWidth={true}
              defaultValue={form.lokasi}
              options={[
                { label: "Jakarta", value: "Jakarta" },
                { label: "Bogor", value: "Bogor" },
                { label: "Tangerang", value: "Tangerang" },
                { label: "Bekasi", value: "Bekasi" },
                { label: "Depok", value: "Depok" },
                { label: "Bandung", value: "Bandung" },
              ]}
              handleChange={(value) => setForm({ ...form, lokasi: value })}
            />
            <InputPrefixRp
              label={`Gaji Diinginkan`}
              defaultValue={form.gaji}
              helperText={`Masukan gaji Anda inginkan untuk meningkatkan pengalaman Anda dalam mencari lowongan.`}
              handleChange={(value) => setForm({ ...form, gaji: value })}
            />
          </Box>

          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              gap: "16px",
              marginTop: "24px",
            }}
          >
            <RectangleButton
              size="large"
              customStyle={{ width: "100%" }}
              onClick={() => handleButton("continue")}
              disable={
                form.fungsi_pekerjaan.length == 0 ||
                form.tipe_pekerjaan.length == 0 ||
                form.lokasi.length == 0 ||
                form.posisi_pekerjaan.length == 0 ||
                form.gaji == 0 ||
                form.gaji == ""
              }
            >
              Simpan
            </RectangleButton>

            <RectangleButton
              size="large"
              customStyle={{ width: "100%" }}
              onClick={() => handleButton("cancel")}
              variant="ghost"
            >
              Batal
            </RectangleButton>
          </div>
        </div>
      </Dialog>
      {/* END OF DIALOG PREFERENSI PEKERJAAN */}

      {isMobile ? (
        <div className="m-wrapper">
          <div
            className="wrap-edit"
            onClick={() => {
              setShowJobAlertPreferensi(true);
            }}
          >
            <Heading6
              style={{
                color: Colors.neutral.greyish_brown,
              }}
            >
              Job Alert (Preferensi)
            </Heading6>
            <div>
              <ArrowForwardIosRoundedIcon
                style={{
                  cursor: "pointer",
                  color: Colors.neutral.brown_light_grey,
                  width: 24,
                  height: 18,
                }}
              />
            </div>
          </div>
          <div
            className="wrap-edit"
            onClick={() => {
              setShowJobAlertRekomendasi(true);
            }}
          >
            <Heading6
              style={{
                color: Colors.neutral.greyish_brown,
              }}
            >
              Job Alert (Rekomendasi)
            </Heading6>
            <div>
              <ArrowForwardIosRoundedIcon
                style={{
                  cursor: "pointer",
                  color: Colors.neutral.brown_light_grey,
                  width: 24,
                  height: 18,
                }}
              />
            </div>
          </div>
          <div
            className="wrap-edit"
            onClick={() => {
              setShowSubscribe(true);
            }}
          >
            <Heading6
              style={{
                color: Colors.neutral.greyish_brown,
              }}
            >
              Subscribe Company
            </Heading6>
            <div>
              <ArrowForwardIosRoundedIcon
                style={{
                  cursor: "pointer",
                  color: Colors.neutral.brown_light_grey,
                  width: 24,
                  height: 18,
                }}
              />
            </div>
          </div>
          <div
            className="wrap-edit"
            onClick={() => {
              setShowLoker(true);
            }}
          >
            <Heading6
              style={{
                color: Colors.neutral.greyish_brown,
              }}
            >
              Preferensi Lowongan Kerja
            </Heading6>
            <div>
              <ArrowForwardIosRoundedIcon
                style={{
                  cursor: "pointer",
                  color: Colors.neutral.brown_light_grey,
                  width: 24,
                  height: 18,
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          {/* ---------------- EMAIL ----------------- */}
          <div className="box-card">
            <div className="wrap-content">
              <div className="wrap-edit">
                <Heading3>Job Alert (Preferensi)</Heading3>
                <RectangleButton
                  onClick={() => ClickEdit("Job Alert (Preferensi)")}
                  variant="text"
                  size="small"
                  customStyle={{ width: 42, height: 24, minWidth: "unset" }}
                >
                  {isOpenJobAlertPreferensi ? "Tutup" : "Edit"}
                </RectangleButton>
              </div>
              <div style={{ marginTop: "8px" }}>
                {isOpenJobAlertPreferensi ? (
                  <div>
                    {options?.customOption?.map((item, index) => {
                      return (
                        <>
                          <Box
                            style={{
                              width: "90%",
                              marginTop: index !== 0 && "17px",
                            }}
                          >
                            <Body1>{item?.question}</Body1>

                            <div
                              style={{
                                marginLeft: "4px",
                                marginTop: "9px",
                                marginBottom: "-16px",
                              }}
                            >
                              <RadioButton
                                value={selectedAnswer1[index] ?? ""}
                                onChange={(e) => handleSelectAnswer1(e, index)}
                                options={item.answers.map((answer) => {
                                  return { label: answer, value: answer };
                                })}
                                variant="left"
                                defaultValue={item.answers.map((answer) => {
                                  return selectedAnswer1[index] == answer;
                                })}
                                direction="row"
                              />
                            </div>
                          </Box>
                        </>
                      );
                    })}
                  </div>
                ) : (
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 6 }}
                  >
                    {options?.customOption?.map((item, index) => {
                      return (
                        <>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Body1>{item?.question}</Body1>
                            {dataFilteredNotif && (
                              <Body2>{selectedAnswer1[index]}</Body2>
                            )}
                          </div>
                        </>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* ------------- END EMAIL ------------ */}

          {/* ---------------- Job Alert (Rekomendasi) ----------------- */}
          <div className="box-card">
            <div className="wrap-content">
              <div className="wrap-edit">
                <Heading3>Job Alert (Rekomendasi)</Heading3>
                <RectangleButton
                  onClick={() => ClickEdit("Job Alert (Rekomendasi)")}
                  variant="text"
                  size="small"
                  customStyle={{ width: 42, height: 24, minWidth: "unset" }}
                >
                  {isOpenJobAlertRekomendasi ? "Tutup" : "Edit"}
                </RectangleButton>
              </div>
              <div style={{ marginTop: "8px" }}>
                {isOpenJobAlertRekomendasi ? (
                  <div>
                    {options?.customOption?.map((item, index) => {
                      return (
                        <>
                          <Box
                            style={{
                              width: "90%",
                              marginTop: index !== 0 && "17px",
                            }}
                          >
                            <Body1>{item?.question}</Body1>

                            <div
                              style={{
                                marginLeft: "4px",
                                marginTop: "9px",
                                marginBottom: "-16px",
                              }}
                            >
                              <RadioButton
                                value={selectedAnswer2[index]}
                                onChange={(e) => handleSelectAnswer2(e, index)}
                                options={item.answers.map((answer) => {
                                  return { label: answer, value: answer };
                                })}
                                variant="left"
                                defaultValue={item.answers.map((answer) => {
                                  return selectedAnswer2[index] == answer;
                                })}
                                direction="row"
                              />
                            </div>
                          </Box>
                        </>
                      );
                    })}
                  </div>
                ) : (
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 6 }}
                  >
                    {options?.customOption?.map((item, index) => {
                      return (
                        <>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Body1>{item?.question}</Body1>
                            <Body2>{selectedAnswer2[index]}</Body2>
                          </div>
                        </>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* ------------- END Job Alert (Rekomendasi) ------------ */}

          {/* ---------------- SUBSCRIBE COMPANY ----------------- */}
          <div className="box-card">
            <div className="wrap-content">
              <div className="wrap-edit">
                <Heading3>Subscribe Company</Heading3>
                <RectangleButton
                  onClick={() => ClickEdit("Subscribe Company")}
                  variant="text"
                  size="small"
                  customStyle={{ width: 42, height: 24, minWidth: "unset" }}
                >
                  {isOpenSubscribeCompany ? "Tutup" : "Edit"}
                </RectangleButton>
              </div>
              <div style={{ marginTop: "8px" }}>
                {isOpenSubscribeCompany ? (
                  <div>
                    {options?.customOption?.map((item, index) => {
                      return (
                        <>
                          <Box
                            style={{
                              width: "90%",
                              marginTop: index !== 0 && "17px",
                            }}
                          >
                            <Body1>{item?.question}</Body1>

                            <div
                              style={{
                                marginLeft: "4px",
                                marginTop: "9px",
                                marginBottom: "-16px",
                              }}
                            >
                              <RadioButton
                                value={selectedAnswer3[index]}
                                onChange={(e) => handleSelectAnswer3(e, index)}
                                options={item.answers.map((answer) => {
                                  return { label: answer, value: answer };
                                })}
                                variant="left"
                                defaultValue={item.answers.map((answer) => {
                                  return selectedAnswer3[index] == answer;
                                })}
                                direction="row"
                              />
                            </div>
                          </Box>
                        </>
                      );
                    })}
                  </div>
                ) : (
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 6 }}
                  >
                    {options?.customOption?.map((item, index) => {
                      return (
                        <>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Body1>{item?.question}</Body1>
                            <Body2>{selectedAnswer3[index]}</Body2>
                          </div>
                        </>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* ------------- END SUBSCRIBE COMPANY ------------ */}

          {/* ---------------- PREFERENSI LOWONGAN KERJA ----------------- */}
          <div className="box-card">
            <div className="wrap-content">
              <div className="wrap-edit">
                <Heading3>Preferensi Lowongan Kerja</Heading3>
                <RectangleButton
                  onClick={() => ClickEdit("Preferensi Lowongan Kerja")}
                  variant="text"
                  size="small"
                  customStyle={{ width: 42, height: 24, minWidth: "unset" }}
                >
                  {isOpenPreferensiLowonganKerja ? "Tutup" : "Edit"}
                </RectangleButton>
              </div>
            </div>
          </div>
          {/* ------------- END PREFERENSI LOWONGAN KERJA ------------ */}
        </div>
      )}

      <Toaster
        variant="success"
        open={openToaster}
        label={`${labelToaster} berhasil diganti.`}
        setOpen={() => setOpenToaster(false)}
      />
    </>
  );
};

export default Notifikasi;
