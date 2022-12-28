import React, { useState, useEffect } from "react";
import {
  Body1,
  Body2,
  Body3,
  Heading3,
  Heading4,
  Font,
} from "../../../components/Atom/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import parse from "html-react-parser";
import { Box } from "@mui/system";
import InputSelectField from "../../../components/Atom/Input Field/SelectField";
import InputTextField from "../../../components/Atom/Input Field/TextField";
import InputTextArea from "../../../components/Atom/Input Field/TextArea";
import InputAvatarField from "../../../components/Atom/Input Field/AvatarField";
import { Colors, Elevation, Radius } from "../../../themes";
import EditIcon from "@mui/icons-material/Edit";
import InputDatePicker from "../../../components/Atom/DatePicker";
import RectangleButton from "../../../components/Atom/Button/RectangleButton";
import RadioButton from "../../../components/Atom/Selection Control/Radio";
import BottomBar from "./BottomBar";
import { isMobile, isTablet } from "../../../utils/useMediaQuery";
import InputSearchField from "../../../components/Atom/Input Field/SearchField";
import moment from "moment";
import { AddButton, EditButton, ActionButton } from "./Button";

export default function Personal({
  Mobile,
  isLoading,
  data,
  handleSaveDB,
  showForm,
  setShowForm,
  master,
}) {
  // const Mobile = isMobile();
  const Tablet = isTablet();
  // const [isLoading, setIsLoading] = useState(true);
  const isEmpty = !data?.name;

  const [form, setForm] = useState();
  const [avatarError, setAvatarError] = useState();
  const [helperText, setHelperText] = useState("");

  const handleForm = (key, val) => setForm({ ...form, [key]: val });

  const onFileChange = (file) => {
    if (file) {
      const fileType = file.type;
      const fileSize = file.size;
      const filePath = URL.createObjectURL(file);

      if (fileType === "image/jpeg" || fileType === "image/png") {
        if (fileSize < 2097152) {
          handleForm("avatar", filePath);
          setAvatarError(false);
        } else {
          setAvatarError(true);
          setHelperText("Maksimum 2mb");
        }
      } else {
        setAvatarError(true);
        setHelperText("Pastikan file yang diupload JPG/PNG");
      }
    }
  };

  const CheckingForm = () => {
    // check all fields
    if (form?.name) return false;
    else return true;
  };

  useEffect(() => {
    if (isEmpty) {
      setForm(data);
      setShowForm({ status: true, value: `edit` });
    } else {
      setShowForm({ status: false });
    }
  }, []);

  const classes = {
    ProfileWrapper: {
      width: `100%`,
      display: `flex`,
      alignItems: Mobile ? `center` : `flex-start`,
      flexDirection: Mobile ? `column` : `row`,
      gap: Mobile ? `8px` : `24px`,
    },
    UserDetail: {
      width: `100%`,
      display: `flex`,
      flexDirection: `column`,
      gap: Mobile ? `16px` : `32px`,
    },
    Wrapper: {
      width: `100%`,
      display: `flex`,
      alignItems: `center`,
      gap: Mobile ? `8px` : `24px`,
    },
    NameWrapper: {
      display: `flex`,
      flexDirection: `column`,
      gap: Mobile ? `8px` : `16px`,
    },
  };

  const avatar_dummy = "/images/Principle/Logo/Karir/Avatar/State=Avatar.png";
  console.log("isLoading:", isLoading);
  return (
    <>
      {isLoading && (
        <Box className="center">
          <CircularProgress />
        </Box>
      )}

      {!isLoading && (
        <Box
        // sx={{ height: "100%", maxHeight: `100%`, overflow: `auto` }}
        >
          {/* Header */}
          <Box
            className="d-flex-fullwidth"
            position="relative"
            mb={Mobile ? 0 : `40px`}
          >
            {!Mobile && <Heading3>Biodata Diri</Heading3>}
            {!showForm?.status && (
              <EditButton
                handleEdit={() => {
                  setShowForm({ status: true, value: `edit` });
                }}
                sx={Mobile && { top: 0 }}
              />
            )}
          </Box>

          {/* FORM VIEW */}
          {showForm?.status && (
            <>
              <Box sx={classes.ProfileWrapper}>
                <InputAvatarField
                  value={form?.avatar}
                  error={avatarError}
                  helperText={helperText}
                  onChange={(val) => onFileChange(val)}
                />
                <Box sx={classes.UserDetail}>
                  <InputTextField
                    label="Nama Lengkap*"
                    defaultValue={form?.name}
                    handleChange={(val) => handleForm("name", val)}
                    minWidth="1px"
                    fullWidth
                  />

                  <InputTextField
                    minWidth="0px"
                    fullWidth
                    label="Email*"
                    defaultValue={form?.email}
                    handleChange={(val) => handleForm("name", val)}
                  />

                  <InputTextField
                    minWidth="0px"
                    fullWidth
                    label="Nomor Hp*"
                    defaultValue={form?.phone}
                    handleChange={(val) => handleForm("name", val)}
                  />
                </Box>
              </Box>
              <Box
                width="100%"
                className="d-flex"
                flexDirection="column"
                gap={Mobile ? `16px` : `32px`}
                my={Mobile ? `16px` : `32px`}
              >
                <Box sx={classes.Wrapper}>
                  <Box width="100%">
                    <InputSelectField
                      label="Negara*"
                      minWidth="0px"
                      fullWidth
                      defaultValue={
                        master?.countries?.find(
                          (x) => x.id === form?.country_id
                        )?.name
                      }
                      options={master?.countries?.map((country) => {
                        return { label: country?.name, value: country?.id };
                      })}
                      handleChange={(val) => {
                        if (val !== 62)
                          form?.location_id && handleForm("location_id", null);
                        handleForm("country_id", val);
                      }}
                    />
                  </Box>
                  <Box width="100%">
                    <InputSelectField
                      label="Provinsi*"
                      minWidth="0px"
                      fullWidth
                      defaultValue={
                        master?.countries?.find(
                          (x) => x.id === form?.country_id
                        )?.name
                      }
                      options={master?.countries?.map((country) => {
                        return { label: country?.name, value: country?.id };
                      })}
                      handleChange={(val) => {
                        if (val !== 62)
                          form?.location_id && handleForm("location_id", null);
                        handleForm("country_id", val);
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    ...classes.Wrapper,
                    alignItems: `flex-start !important`,
                  }}
                >
                  <Box width="100%">
                    <InputSelectField
                      disable={form?.country_id !== 62}
                      label="Kota*"
                      minWidth="0px"
                      fullWidth
                      defaultValue={
                        master?.locations?.find(
                          (x) => x.id === form?.location_id
                        )?.name
                      }
                      options={master?.locations?.map((location) => {
                        return { label: location?.name, value: location?.id };
                      })}
                      handleChange={(val) => handleForm("location_id", val)}
                    />
                  </Box>
                  <Box width="100%">
                    <InputTextField
                      label="Alamat Lengkap*"
                      defaultValue={form?.address}
                      handleChange={(val) => handleForm("address", val)}
                      minWidth="1px"
                      fullWidth
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    ...classes.Wrapper,
                    alignItems: `flex-start !important`,
                    flexDirection: Mobile ? `column-reverse !important` : `row`,
                  }}
                >
                  <Box width="100%">
                    <Body2
                      color={Colors.neutral.brown_light_grey}
                      mb={Mobile ? `8px` : `4px`}
                    >
                      Jenis Kelamin
                    </Body2>
                    <RadioButton
                      variant="left"
                      onChange={(e) => handleForm("gender", e.target.value)}
                      options={[
                        { label: `Pria`, value: `male` },
                        { label: `Wanita`, value: `female` },
                      ]}
                    />
                  </Box>
                  <Box width="100%">
                    <InputDatePicker
                      label="Tanggal Lahir*"
                      handleChange={
                        (val) => console.log("profile/content/personal")
                        // handleForm(
                        //   "birth",
                        //   moment(new Date(val)).format("DD-MM-YYYY")
                        // )
                      }
                    />
                  </Box>
                </Box>
              </Box>
              <InputTextArea
                fullWidth
                label="Ringkasan Profile*"
                inputValue="Asda"
              />
            </>
          )}

          {/* FILLED VIEW */}
          {!showForm?.status && (
            <>
              <Box className="d-flex" gap={Mobile ? `16px` : `24px`}>
                <img
                  src={form?.avatar || avatar_dummy}
                  alt="avatar"
                  style={{
                    maxWidth: Mobile ? `100px` : Tablet ? `80px` : `160px`,
                    maxHeight: Mobile ? `100px` : Tablet ? `80px` : `160px`,
                    objectFit: `cover`,
                    borderRadius: Radius.circle,
                  }}
                />
                <Box sx={classes.NameWrapper}>
                  <Font type={Mobile ? `Heading6` : `Heading3`}>
                    Maudy Gunawan
                  </Font>
                  <Font type={Mobile ? `Body3` : `Body1`}>
                    maudy123456789@gmail.com
                  </Font>
                  <Font type={Mobile ? `Body3` : `Body1`}>0812345678999</Font>
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                gap={Mobile ? `16px` : `40px`}
                my={Mobile ? `16px` : `40px`}
              >
                <Box display="flex" flexDirection="column" gap="8px">
                  <Font
                    type={Mobile ? `Heading6` : `Heading4`}
                    color={Colors.neutral.brown_light_grey}
                  >
                    Alamat
                  </Font>
                  <Font type={Mobile ? `Body3` : `Body1`}>
                    Jalan Pondok Indah no. 10, Jakarta Selatan, DKI Jakarta,
                    Indonesia
                  </Font>
                </Box>

                <Box
                  className="d-flex"
                  alignItems="flex-start !important"
                  gap={Mobile ? `24px` : Tablet ? `60px` : `160px`}
                >
                  <Box display="flex" flexDirection="column" gap="8px">
                    <Font
                      type={Mobile ? `Heading6` : `Heading4`}
                      color={Colors.neutral.brown_light_grey}
                    >
                      Jenis Kelamin
                    </Font>
                    <Font type={Mobile ? `Body3` : `Body1`}>
                      {form?.gender}
                    </Font>
                  </Box>

                  <Box display="flex" flexDirection="column" gap="8px">
                    <Font
                      type={Mobile ? `Heading6` : `Heading4`}
                      color={Colors.neutral.brown_light_grey}
                    >
                      Tanggal Lahir
                    </Font>
                    <Font type={Mobile ? `Body3` : `Body1`}>01-01-1900</Font>
                  </Box>
                </Box>

                <Box display="flex" flexDirection="column" gap="8px">
                  <Font
                    type={Mobile ? `Heading6` : `Heading4`}
                    color={Colors.neutral.brown_light_grey}
                  >
                    Ringkasan Profil
                  </Font>
                  <Font type={Mobile ? `Body3` : `Body1`}>
                    Seorang UI/UX Designer yang sudah berpengalaman selama 7
                    tahun dalam industri design. Mahir dalam menggunakan banyak
                    tools seperti Figma, Sketch, dan Adobe XD.
                  </Font>
                </Box>
              </Box>
            </>
          )}

          {/* BOTTOM BAR */}
          {showForm?.status && (
            <BottomBar
              // disable={CheckingForm()}
              disable={false}
              showCancelButton={Mobile ? true : !isEmpty}
              handleCancel={() => {
                setShowForm({ status: false });
                const el = document.getElementsByClassName("main-content")[0];
                window.scrollTo({
                  top: Mobile ? 0 : el.offsetTop - 80,
                  behavior: "smooth",
                });
              }}
              handleSubmit={() => {
                handleSaveDB({ personal: form });
                setShowForm({ status: false });
              }}
              cancelBtnTitle="BATAL"
              submitBtnTitle="SIMPAN"
            />
          )}
        </Box>
      )}
    </>
  );
}
