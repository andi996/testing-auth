import React, { useState, useEffect, useRef } from "react";
import {
  Body1,
  Body2,
  Body3,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Font,
} from "../../../components/Atom/Typography";
import AddIcon from "@mui/icons-material/Add";
import InputChip from "../../../components/Atom/Selection Control/Chips/InputChip";
import CircularProgress from "@mui/material/CircularProgress";
import parse from "html-react-parser";
import Radio from "@mui/material/Radio";
import RadioButton from "../../../components/Atom/Selection Control/Radio";
import { Error } from "@mui/icons-material";
import { Box } from "@mui/system";
import { RadioGroup } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material";
import InputSearchField from "../../../components/Atom/Input Field/SearchField";
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
import Dialog from "../../../components/Molecul/Modal/Dialog";
import BottomBar from "./BottomBar";
import {
  isMobile,
  isTablet,
  isSmallScreen,
} from "../../../utils/useMediaQuery";
import { AddButton, EditButton, ActionButton } from "./Button";

export default function CV({
  // Mobile,
  isLoading,
  data,
  handleSaveDB,
  showForm,
  setShowForm,
}) {
  const Mobile = isMobile();
  const Tablet = isTablet();
  const SmallScreen = isSmallScreen();

  const Dekstop = !Mobile && !Tablet && !SmallScreen;

  const isEmpty = data?.length === 0;

  const [form, setForm] = useState([]);
  const [selectedCV, setSelectedCV] = useState();
  const [removedCV, setRemovedCV] = useState();
  const [helperText, setHelperText] = useState("");
  const [show, setShow] = useState();
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleForm = (key, val) => setForm({ ...form, [key]: val });

  const handleAdd = (e) => e.keyCode === 13 && setForm([...form, input]);

  const handleBrowseFile = (name) => {
    document.getElementById(`select-${name}`).click();
  };

  const onFileChange = (e) => {
    const date = new Date();
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month =
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth();
    const year = date.getFullYear();
    const currentDate = `${day}/${month}/${year}`;

    const file = e.target.files[0];

    if (file) {
      const id = Math.floor(Math.random() * 899999) + 100000;
      const fileName = file.name;
      const uniqueFileName = `${fileName}-${date.getTime()}`;
      const fileType = file.type;
      const fileSize = file.size;

      if (fileType === "" || fileType === "application/pdf") {
        if (fileSize <= 5242880) {
          if (form?.length === 0) {
            setSelectedCV(id);
          }
          setForm([
            ...form,
            {
              id: id,
              fileName: fileName,
              filePath: URL.createObjectURL(file),
              uniqueFileName: uniqueFileName,
              upload_date: currentDate,
            },
          ]);
          setHelperText("");
        } else {
          setHelperText("maksimal 5MB (docs, .pdf)");
        }
      } else {
        setHelperText("Pastikan file yang diupload DOCS/PDF");
      }
    }

    e.target.value = null;
  };

  const handleDelete = () => {
    const arr = form?.filter((item) => item.id !== removedCV?.id);
    setShow(false);
    setForm(arr);
  };

  useEffect(() => {
    if (!Mobile && isEmpty) {
      setShowForm({ status: true, value: `add` });
    } else {
      setShowForm({ status: false });
    }
  }, [Mobile]);

  useEffect(() => {
    if (data?.length > 0) {
      const arr = data?.map((item) => {
        return {
          id: Math.floor(Math.random() * 899999) + 100000,
          fileName: item,
          upload_date: "21/10/2021",
        };
      });

      setForm([...arr]);
    }
  }, []);

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
            {/* {Mobile ? <Body2>100 skill</Body2> : <Heading3>Skill</Heading3>} */}
            {!Mobile && <Heading3>CV</Heading3>}
            {!showForm?.status && !Mobile && form?.length > 0 && (
              <EditButton
                type={Mobile ? `icon only` : ``}
                handleEdit={() => {
                  setShowForm({ status: true, value: `edit` });
                }}
                sx={{ position: `relative`, right: 0 }}
              />
            )}
          </Box>

          {/* FORM VIEW */}
          {showForm?.status && (
            <>
              <Box gap={Mobile ? `16px` : `24px`} mb={Mobile ? `16px` : `40px`}>
                <Font type={Mobile ? `Small` : `Heading5`} mb="16px">
                  Upload maksimum 5 CV yang masing-masing sesuai dengan
                  pekerjaan yang akan Anda lamar.
                </Font>

                <RadioGroup
                  // value={selectedCV}
                  defaultValue={selectedCV}
                  onChange={(e) => setSelectedCV(e.target.value)}
                >
                  {form?.map((item, index) => {
                    return (
                      <Box
                        key={index}
                        className="d-flex-fullwidth"
                        sx={{ ":not(:last-child)": { mb: `8px` } }}
                      >
                        <FormControlLabel
                          label={<Font type="Body2">{item?.fileName}</Font>}
                          value={item?.id}
                          control={<Radio checked={item?.id == selectedCV} />}
                          sx={{
                            ml: 0,
                            gap: `4px`,
                            "& .MuiRadio-root": {
                              padding: 0,
                              color:
                                item?.id === parseInt(selectedCV)
                                  ? Colors.primary.mid_blue
                                  : Colors.neutral.brown_light_grey,
                            },
                            "& .MuiFormControlLabel-label": {
                              color:
                                item?.id === parseInt(selectedCV)
                                  ? Colors.primary.mid_blue
                                  : Colors.neutral.brown_grey,
                              "& p": {
                                minWidth: Mobile ? `100px` : `300px`,
                                maxWidth: Mobile ? `100px` : `300px`,
                                whiteSpace: `nowrap`,
                                textOverflow: `ellipsis`,
                                overflow: `hidden`,
                              },
                            },
                          }}
                        />
                        <Box
                          className="d-flex pointer"
                          style={{
                            width: `fit-content`,
                            flexDirection: Mobile ? `row-reverse` : `row`,
                            gap: `8px`,
                          }}
                        >
                          <img
                            src="/images/Principle/Logo/Delete Trash.svg"
                            alt="delete"
                            onClick={() => {
                              setRemovedCV({
                                id: item?.id,
                                fileName: item?.fileName,
                              });
                              setShow(true);
                            }}
                          />
                          <Font
                            type="Body2"
                            color={Colors.secondary.clear_blue}
                          >
                            {`Diupload ${item?.upload_date}`}
                          </Font>
                        </Box>
                      </Box>
                    );
                  })}
                </RadioGroup>

                <RectangleButton
                  state="alternate"
                  disable={form?.length >= 5}
                  fullWidth={Mobile}
                  customStyle={{
                    minWidth: `240px`,
                    marginTop: Mobile ? `8px` : `24px`,
                    gap: `4px`,
                  }}
                  onClick={(e) => {
                    if (form?.length < 5) {
                      e.stopPropagation();
                      document.getElementById("select-file").click();
                    }
                  }}
                >
                  <input
                    id="select-file"
                    type="file"
                    onChange={(e) => onFileChange(e)}
                    style={{ display: `none` }}
                  />
                  {form?.length === 0 ? (
                    <Font type={Mobile ? `Label` : `Body1`} size="small">
                      Upload CV
                    </Font>
                  ) : (
                    <Box
                      className="d-flex"
                      gap="4px"
                      sx={{
                        "& svg": {
                          width: `24px !important`,
                          height: `24px !important`,
                          padding: `0px !important`,
                          margin: `0px !important`,
                        },
                      }}
                    >
                      <AddCircleIcon
                        sx={{
                          color: `${
                            form?.length < 5
                              ? Colors.primary.mid_blue
                              : Colors.neutral.brown_grey
                          } !important`,
                        }}
                      />
                      <Font type={Mobile ? `Heading6` : `Label`} size="medium">
                        Tambah
                      </Font>
                    </Box>
                  )}
                </RectangleButton>

                {helperText ? (
                  <Box className="d-flex" color={Colors.secondary.red}>
                    <Error style={{ width: 16, height: 16, marginRight: 4 }} />
                    <Body3 sx={{ pt: `2px` }}>{helperText}</Body3>
                  </Box>
                ) : (
                  <Body3 color={Colors.neutral.brown_grey}>
                    maksimal 5MB (docs, .pdf)
                  </Body3>
                )}
              </Box>
            </>
          )}

          {/* FILLED VIEW */}
          {!showForm?.status && (
            <Box
              display="flex"
              alignItems="flex-start"
              justifyContent="space-between"
              gap={Mobile ? `8px` : `40px`}
            >
              <RadioGroup
                // value={selectedCV}
                defaultValue={selectedCV}
                onChange={(e) => setSelectedCV(e.target.value)}
              >
                {form?.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      className="d-flex-fullwidth"
                      sx={{ ":not(:last-child)": { mb: `8px` } }}
                    >
                      <FormControlLabel
                        label={
                          <Font type={Mobile ? `Body2` : `Body1`}>
                            {item?.fileName}
                          </Font>
                        }
                        value={item?.id}
                        control={<Radio checked={item?.id === selectedCV} />}
                        sx={{
                          ml: 0,
                          gap: `4px`,
                          "& .MuiRadio-root": {
                            padding: 0,
                            color:
                              item?.id === parseInt(selectedCV)
                                ? Colors.primary.mid_blue
                                : Colors.neutral.brown_light_grey,
                          },
                          "& .MuiFormControlLabel-label": {
                            color:
                              item?.id === parseInt(selectedCV)
                                ? Colors.primary.mid_blue
                                : Colors.neutral.brown_grey,
                            "& p": {
                              minWidth: Mobile ? `100px` : `300px`,
                              maxWidth: Mobile ? `100px` : `300px`,
                              whiteSpace: `nowrap`,
                              textOverflow: `ellipsis`,
                              overflow: `hidden`,
                            },
                          },
                        }}
                      />
                    </Box>
                  );
                })}
              </RadioGroup>

              {Mobile && (
                <EditButton
                  type="icon only"
                  handleEdit={() => {
                    setShowForm({ status: true, value: `edit` });
                  }}
                  sx={{ position: `relative`, top: 0, right: 0 }}
                />
              )}
            </Box>
          )}

          {/* Popup */}
          <Dialog
            show={show}
            title="Hapus CV"
            description={`Apakah anda yakin untuk menghapus ${removedCV?.fileName}?`}
            primaryButtonText="Hapus"
            secondaryButtonText="Batal"
            handlePrimaryButton={() => handleDelete()}
            handleSecondaryButton={() => setShow(false)}
            handleClose={() => setShow(false)}
          />

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
                // if (showForm?.value === `add`) {
                //   arr.push({
                //     id: Math.floor(Math.random() * 899) + 100,
                //     ...form,
                //   });
                // }

                // Update
                // if (showForm?.value === `edit`) {
                //   const index = arr.findIndex((x) => x.id === form?.id);
                //   arr[index] = form;
                // }

                handleSaveDB({ skill: arr });
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
