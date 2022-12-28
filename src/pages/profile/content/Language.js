import React, { useState, useEffect, useRef } from "react";
import {
  Body1,
  Body2,
  Body3,
  Heading3,
  Heading4,
  Heading6,
  Font,
} from "../../../components/Atom/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import parse from "html-react-parser";
import { Error } from "@mui/icons-material";
import { Box } from "@mui/system";
import InputTextField from "../../../components/Atom/Input Field/TextField";
import InputTextArea from "../../../components/Atom/Input Field/TextArea";
import InputSelectField from "../../../components/Atom/Input Field/SelectField";
import { Colors, Elevation, Radius } from "../../../themes";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RectangleButton from "../../../components/Atom/Button/RectangleButton";
import CheckboxButton from "../../../components/Atom/Selection Control/Checkbox";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import useOutsideAlerter from "../../../utils/handleClickOutside";
import BottomBar from "./BottomBar";
import {
  isMobile,
  isTablet,
  isSmallScreen,
} from "../../../utils/useMediaQuery";
import { AddButton, EditButton, ActionButton } from "./Button";

export default function Language({
  // Mobile,
  isLoading,
  data,
  handleSaveDB,
  showForm,
  setShowForm,
  master,
}) {
  const Mobile = isMobile();
  const Tablet = isTablet();
  const SmallScreen = isSmallScreen();

  const Dekstop = !Mobile && !Tablet && !SmallScreen;

  const isEmpty = data?.length === 0;

  const [form, setForm] = useState({});
  const [helperText, setHelperText] = useState();

  const handleForm = (key, val) => setForm({ ...form, [key]: val });

  const handleBrowseFile = (name) => {
    document.getElementById(`select-${name}`).click();
  };

  const onFileChange = (e, key) => {
    const file = e.target.files[0];

    if (file) {
      const fileName = file.name;
      const fileType = file.type;
      const fileSize = file.size;
      const filePath = URL.createObjectURL(file);

      if (fileType === "application/pdf") {
        if (fileSize <= 5242880) {
          setForm({
            ...form,
            [key]: {
              fileName: fileName.slice(0, -4),
              fileType: ".pdf",
              filePath: filePath,
            },
          });
        } else {
          setForm({
            ...form,
            [key]: {
              error: "Ukuran file melebihi 5MB!",
            },
          });
        }
      } else {
        // console.log("easdsadsa");
        setForm({
          ...form,
          [key]: {
            error: "Pastikan file yang diupload PDF",
          },
        });

        // setHelperText({
        //   ...helperText,
        //   [key]: "Pastikan file yang diupload PDF",
        // });
      }
    }

    e.target.value = null;
  };

  const handleRemoveFile = () => {
    alert("HAPUS FILE");
  };

  useEffect(() => {
    if (!Mobile && isEmpty) {
      setShowForm({ status: true, value: `add` });
    } else {
      setShowForm({ status: false });
    }
  }, [Mobile]);

  console.log("FORM: ", form);

  return (
    <>
      {isLoading && (
        <Box className="center">
          <CircularProgress />
        </Box>
      )}

      {!isLoading && (
        <Box>
          {/* Header */}
          <Box className="d-flex-fullwidth" mb={Mobile ? 0 : `40px`}>
            {!Mobile && <Heading3>Bahasa</Heading3>}
            {!showForm?.status && (
              <AddButton
                handleClick={() => {
                  setForm({});
                  setShowForm({ status: true, value: `add` });
                }}
              />
            )}
          </Box>

          {/* FORM VIEW */}
          {showForm?.status && (
            <>
              <Box width="100%" mb={Mobile ? `16px` : `40px`}>
                <InputSelectField
                  label="Bahasa*"
                  minWidth="0px"
                  fullWidth
                  defaultValue={
                    master?.countries?.find((x) => x.id === form?.country_id)
                      ?.name
                  }
                  options={master?.countries?.map((country) => {
                    return { label: country?.name, value: country?.id };
                  })}
                  handleChange={(val) => {
                    handleForm("country_id", val);
                  }}
                />
              </Box>

              <Box width="100%" mb={Mobile ? `16px` : `40px`}>
                <InputSelectField
                  label="Level Kemampuan*"
                  minWidth="0px"
                  fullWidth
                  defaultValue={
                    master?.countries?.find((x) => x.id === form?.country_id)
                      ?.name
                  }
                  options={master?.countries?.map((country) => {
                    return { label: country?.name, value: country?.id };
                  })}
                  handleChange={(val) => {
                    handleForm("country_id", val);
                  }}
                />
              </Box>

              {/* File */}
              <Box width="100%" mb={Mobile ? `16px` : `40px`}>
                <Font
                  type={Mobile ? `Body2` : `Heading5`}
                  color={Colors.neutral.brown_light_grey}
                  mb="4px"
                >
                  (Opsional)
                </Font>

                <Box className="d-flex" gap="12px" mb="4px">
                  <input
                    id="select-certificate"
                    type="file"
                    style={{ display: `none` }}
                    onChange={(e) => onFileChange(e, "certificate")}
                  />
                  <RectangleButton
                    state={form?.certificate?.fileName ? "" : "alternate"}
                    variant={form?.certificate?.fileName ? "ghost" : "filled"}
                    fullWidth
                    selected
                    customStyle={{
                      margin: 0,
                      maxWidth: Mobile ? `100%` : `282px`,
                    }}
                    onClick={() => handleBrowseFile("certificate")}
                  >
                    {form?.certificate?.fileName ? (
                      <span>
                        {form?.certificate?.fileName.substring(0, 20)}
                        {form?.certificate?.fileName.length > 20 && "..."}
                        {form?.certificate?.fileType}
                      </span>
                    ) : (
                      "Upload Ijazah"
                    )}
                  </RectangleButton>

                  {(Mobile || form?.certificate?.fileName) && (
                    <img
                      className="pointer"
                      src={`/images/Principle/Logo/${
                        form?.certificate?.fileName
                          ? "Delete Trash"
                          : "Delete Trash Grey"
                      }.svg`}
                      alt="delete"
                      onClick={() =>
                        form?.certificate?.fileName &&
                        handleRemoveFile("certificate")
                      }
                    />
                  )}
                </Box>
                {form?.certificate?.error ? (
                  <Box className="d-flex" color={Colors.secondary.red}>
                    <Error style={{ width: 16, height: 16, marginRight: 4 }} />
                    <Body3 sx={{ pt: `2px` }}>{form?.certificate?.error}</Body3>
                  </Box>
                ) : (
                  <Body3 color={Colors.neutral.brown_grey}>
                    maksimal 5MB (.pdf)
                  </Body3>
                )}
              </Box>

              {showForm?.value === `edit` && Mobile && (
                <Box
                  sx={{
                    width: `fit-content`,
                    margin: `24px auto 40px auto`,
                    cursor: `pointer`,
                  }}
                  onClick={() => alert("hapus")}
                >
                  <Font type="Label" size="small" color={Colors.secondary.red}>
                    Hapus Bahasa
                  </Font>
                </Box>
              )}
            </>
          )}

          {/* FILLED VIEW */}
          {!showForm?.status && (
            <>
              {!Mobile && (
                <Box className="d-flex" gap="24px" mb="24px">
                  <Heading4 sx={{ minWidth: `300px` }}>Nama Bahasa</Heading4>
                  <Heading4>Level Kemampuan</Heading4>
                </Box>
              )}

              <Box display="flex" flexDirection="column" gap="8px">
                {data?.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      className="d-flex-fullwidth"
                      sx={{
                        alignItems: `flex-start !important`,
                        borderRadius: Mobile ? Radius.medium : 0,
                        boxShadow: Mobile ? Elevation.card : 0,
                        padding: Mobile ? `8px` : 0,
                      }}
                    >
                      <Box
                        sx={{
                          display: `flex`,
                          flexDirection: Mobile ? `column` : `row`,
                          gap: Mobile ? 0 : `24px`,
                          width: `100%`,
                        }}
                      >
                        <Font
                          type={Dekstop ? `Body1` : `Heading6`}
                          sx={{ minWidth: `300px` }}
                        >
                          {item?.language}
                        </Font>
                        <Font type={Dekstop ? `Body1` : `Body3`}>
                          {item?.level}
                        </Font>
                      </Box>

                      <ActionButton
                        id={index}
                        handleEdit={() => {
                          setForm(item);
                          setShowForm({ status: true, value: `edit` });
                        }}
                        handleDelete={() => alert("Deleted Successfully!")}
                      />
                    </Box>
                  );
                })}
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
                // save to DB
                // ...
                // TESTING

                const arr = [...data];

                // Add
                if (showForm?.value === `add`) {
                  arr.push({
                    id: Math.floor(Math.random() * 899) + 100,
                    ...form,
                  });
                }

                // Update
                if (showForm?.value === `edit`) {
                  const index = arr.findIndex((x) => x.id === form?.id);
                  arr[index] = form;
                }

                handleSaveDB({ experience: arr });
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
