import { useEffect, useState } from "react";
import {
  Body1,
  Body2,
  Body3,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Label,
} from "../../../components/Atom/Typography";
import Toaster from "../../../components/Molecul/Toaster";
import { Colors, Elevation, Radius } from "../../../themes";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { API, API2 } from "../../../api/service";
import { endpoints } from "../../../api/endpoint";

// const PengaturanAkun = ({ onClick, userData }) => {
import useMediaQuery from "../../../utils/useMediaQuery";
import { useRouter } from "next/router";
import ChangeEmail from "./ChangeEmail";
import ChangePonsel from "./ChangePonsel";
import ChangeEmailMobile from "./ChangeEmailMobile";
import ChangePonselMobile from "./ChangePonselMobile";
import ChangePassword from "./ChangePassword";
import ChangePasswordMobile from "./ChangePasswordMobile";
import NonaktifAkun from "./NonaktifAkun";
import HapusAkun from "./HapusAkun";
import NonaktiAkunMobile from "./NonaktiAkunMobile";
import HapusAkunMobile from "./HapusAkunMobile";

const state = {
  id: 1,
  name: "Maudy",
  email: "maudy123456789@gmail.com",
  password: "123456",
  ponsel: "081345678910",
};

const PengaturanAkun = ({ onClick, userData }) => {
  const router = useRouter();

  const isMobile = useMediaQuery("(max-width: 640px)");

  // SHOW MODAL on DESKTOP PAGE
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNoTlp, setIsOpenNoTlp] = useState(false);
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [isOpenNonaktifAkun, setIsOpenNonaktifAkun] = useState(false);
  const [isOpenHapusAkun, setIsOpenHapusAkun] = useState(false);

  // SHOW MODAL on MOBILE PAGE
  const [showEmail, setShowEmail] = useState(false);
  const [showPonsel, setShowPonsel] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNonaktifAkun, setShowNonaktifAkun] = useState(false);
  const [showHapusAcc, setShowHapusAcc] = useState(false);

  // TOASTER;
  const [openToaster, setOpenToaster] = useState(false);
  const [variantToaster, setVariantToaster] = useState("success");
  const [labelToaster, setLabelToaster] = useState("");

  // FUNCTION TO SHOW CONTENT DESKTOP
  const ClickEdit = (val) => {
    if (val == "email") {
      setIsOpen(!isOpen);
      setIsOpenNoTlp(false);
      setIsOpenPassword(false);
      setIsOpenNonaktifAkun(false);
      setIsOpenHapusAkun(false);
    }
    if (val == "nomor ponsel") {
      setIsOpenNoTlp(!isOpenNoTlp);
      setIsOpen(false);
      setIsOpenPassword(false);
      setIsOpenNonaktifAkun(false);
      setIsOpenHapusAkun(false);
    }
    if (val == "password") {
      setIsOpenPassword(!isOpenPassword);
      setIsOpenNoTlp(false);
      setIsOpen(false);
      setIsOpenNonaktifAkun(false);
      setIsOpenHapusAkun(false);
    }
    if (val == "nonaktif akun") {
      setIsOpenNonaktifAkun(!isOpenNonaktifAkun);
      setIsOpen(false);
      setIsOpenNoTlp(false);
      setIsOpenPassword(false);
      setIsOpenHapusAkun(false);
    }
    if (val == "hapus akun") {
      setIsOpenHapusAkun(!isOpenHapusAkun);
      setIsOpenNonaktifAkun(false);
      setIsOpen(false);
      setIsOpenNoTlp(false);
      setIsOpenPassword(false);
    }
  };

  // FUNCTION TO OPEN MODAL ON MOBILE PAGE
  const handleClose = () => {
    setShowEmail(false);
    setShowPonsel(false);
    setShowPassword(false);
    setShowNonaktifAkun(false);
    setShowHapusAcc(false);
  };

  //=========================

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
            // margin-bottom: 16px;
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

      {/* Modal Email Mobile*/}
      <ChangeEmailMobile
        showEmail={showEmail}
        handleClose={handleClose}
        userData={userData}
        setVariantToaster={setVariantToaster}
        setLabelToaster={setLabelToaster}
        setOpenToaster={setOpenToaster}
      />
      {/*End of Modal Email Mobile */}

      {/* Modal Ponsel Mobile */}
      <ChangePonselMobile
        showPonsel={showPonsel}
        state={state}
        userData={userData}
        handleClose={handleClose}
        setVariantToaster={setVariantToaster}
        setLabelToaster={setLabelToaster}
        setOpenToaster={setOpenToaster}
      />
      {/*End of Ponsel Mobile*/}

      {/* Modal Password Mobile */}
      <ChangePasswordMobile
        showPassword={showPassword}
        userData={userData}
        handleClose={handleClose}
        setVariantToaster={setVariantToaster}
        setLabelToaster={setLabelToaster}
        setOpenToaster={setOpenToaster}
      />
      {/*End of Password Mobile */}

      {/* Modal Nonaktif Akun Mobile*/}
      <NonaktiAkunMobile
        showNonaktifAkun={showNonaktifAkun}
        userData={userData}
        handleClose={handleClose}
        setVariantToaster={setVariantToaster}
        setLabelToaster={setLabelToaster}
        setOpenToaster={setOpenToaster}
      />
      {/* End Of Nonaktif Akun Mobile */}

      {/* Modal Hapus Akun Mobile*/}
      <HapusAkunMobile
        showHapusAcc={showHapusAcc}
        userData={userData}
        handleClose={handleClose}
        setVariantToaster={setVariantToaster}
        setLabelToaster={setLabelToaster}
        setOpenToaster={setOpenToaster}
      />
      {/* End Of Hapus Akun Mobile*/}

      {/* MOBILE VIEW MENU BAR */}
      {isMobile && (
        <div className="m-wrapper">
          <div
            className="wrap-edit"
            onClick={() => {
              setShowEmail(true);
            }}
          >
            <Heading6
              style={{
                color: Colors.neutral.greyish_brown,
              }}
            >
              Email
            </Heading6>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Heading6
                style={{
                  color: Colors.neutral.brown_light_grey,
                }}
              >
                {userData?.email}
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
          <div
            className="wrap-edit"
            onClick={() => {
              setShowPonsel(true);
            }}
          >
            <Heading6
              style={{
                color: Colors.neutral.greyish_brown,
              }}
            >
              Nomor Ponsel
            </Heading6>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Heading6
                style={{
                  color: Colors.neutral.brown_light_grey,
                }}
              >
                {state.ponsel}
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
          <div
            className="wrap-edit"
            onClick={() => {
              setShowPassword(true);
            }}
          >
            <Heading6
              style={{
                color: Colors.neutral.greyish_brown,
              }}
            >
              Password
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
              setShowNonaktifAkun(true);
            }}
          >
            <Heading6
              style={{
                color: Colors.neutral.greyish_brown,
              }}
            >
              Nonaktif Akun
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
              setShowHapusAcc(true);
            }}
          >
            <Heading6
              style={{
                color: Colors.neutral.greyish_brown,
              }}
            >
              Hapus Akun
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
      )}

      {/* DESKTOP VIEW CARD */}
      {!isMobile && (
        <div className="container">
          {/* ---------------- UBAH EMAIL ----------------- */}
          <ChangeEmail
            userData={userData}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            ClickEdit={ClickEdit}
            setVariantToaster={setVariantToaster}
            setLabelToaster={setLabelToaster}
            setOpenToaster={setOpenToaster}
          />
          {/* ------------- END UBAH EMAIL ------------ */}

          {/* ---------------- UBAH NOMOR PONSEL ----------------- */}
          <ChangePonsel
            userData={userData}
            isOpenNoTlp={isOpenNoTlp}
            state={state}
            ClickEdit={ClickEdit}
            setIsOpenNoTlp={setIsOpenNoTlp}
            setVariantToaster={setVariantToaster}
            setLabelToaster={setLabelToaster}
            setOpenToaster={setOpenToaster}
          />
          {/* ------------- END UBAH NOMOR PONSEL ------------ */}

          {/* ---------------- UBAH PASSWORD ----------------- */}
          <ChangePassword
            userData={userData}
            isOpenPassword={isOpenPassword}
            setIsOpenPassword={setIsOpenPassword}
            ClickEdit={ClickEdit}
            setVariantToaster={setVariantToaster}
            setLabelToaster={setLabelToaster}
            setOpenToaster={setOpenToaster}
          />
          {/* ------------- END UBAH PASSOWORD ------------ */}

          {/* ---------------- NONAKTIF AKUN ----------------- */}
          <NonaktifAkun
            userData={userData}
            isOpenNonaktifAkun={isOpenNonaktifAkun}
            setIsOpenNonaktifAkun={setIsOpenNonaktifAkun}
            ClickEdit={ClickEdit}
            setVariantToaster={setVariantToaster}
            setLabelToaster={setLabelToaster}
            setOpenToaster={setOpenToaster}
          />
          {/* ---------------- END NONAKTIF AKUN ----------------- */}

          {/* ---------------- HAPUS AKUN ----------------- */}
          <HapusAkun
            userData={userData}
            isOpenHapusAkun={isOpenHapusAkun}
            setIsOpenHapusAkun={setIsOpenHapusAkun}
            ClickEdit={ClickEdit}
            setVariantToaster={setVariantToaster}
            setLabelToaster={setLabelToaster}
            setOpenToaster={setOpenToaster}
          />
          {/* ---------------- END HAPUS AKUN ----------------- */}
        </div>
      )}

      <Toaster
        variant={variantToaster}
        open={openToaster}
        label={`${labelToaster}`}
        size={variantToaster == "error" ? "2 line" : "1 line"}
        subLabel={`Silahkan coba kembali.`}
        setOpen={() => setOpenToaster(false)}
      />
    </>
  );
};

export default PengaturanAkun;
