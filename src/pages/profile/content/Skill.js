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
import InputChip from "../../../components/Atom/Selection Control/Chips/InputChip";
import ChoiceChip from "../../../components/Atom/Selection Control/Chips/ChoiceChip";
import CircularProgress from "@mui/material/CircularProgress";
import parse from "html-react-parser";
import { Error } from "@mui/icons-material";
import { Box } from "@mui/system";
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
import BottomBar from "./BottomBar";
import {
  isMobile,
  isTablet,
  isSmallScreen,
} from "../../../utils/useMediaQuery";
import { AddButton, EditButton, ActionButton } from "./Button";

export default function Skill({
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
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleForm = (key, val) => setForm({ ...form, [key]: val });

  const handleAdd = (e) => e.keyCode === 13 && setForm([...form, input]);

  const handleDelete = (index) => {
    const arr = form?.filter((e, id) => id !== index);
    setForm(arr);
  };

  useEffect(() => {
    if (!Mobile && isEmpty) {
      setShowForm({ status: true, value: `add` });
    } else {
      setShowForm({ status: false });
    }
  }, [Mobile]);

  useEffect(() => data?.length > 0 && setForm([...data]), []);

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
            {!Mobile && <Heading3>Skill</Heading3>}
            {!showForm?.status && !Mobile && (
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
              {/*  NAMA SKILL */}
              <Box
                className="d-flex-fullwidth"
                flexDirection={Mobile ? `column-reverse` : `row`}
                gap={Mobile ? `16px` : `24px`}
                mb={Mobile ? `16px` : `40px`}
              >
                <Box width="100%">
                  <InputSearchField
                    fullWidth
                    disable={form?.length > 5 ? true : false}
                    options={suggestions}
                    placeholder="Cari skills"
                    label="Cari Skills"
                    variant="search function"
                    onChange={(e) => setInput(e.target.value)}
                    handleKeyDown={(e) => handleAdd(e)}
                    handleChangeSingle={(val) => handleForm("skill", [val])}
                    minWidth="0px"
                  />
                  <Body3 color={Colors.neutral.brown_light_grey} mt="8px">
                    Pilih Maksimal 6 Skills
                  </Body3>
                </Box>

                {form?.length > 0 && (
                  <Box width="100%">
                    <Body1>{`${form?.length} skills dipilih`}</Body1>
                    {form?.map((item, index) => {
                      return (
                        <InputChip
                          key={index}
                          onClick={() => handleDelete(index)}
                        >
                          {item}
                        </InputChip>
                      );
                    })}
                  </Box>
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
              <Box>
                <Body2>
                  {form?.length === 0 && "Tidak ada skill"}
                  {form?.length === 1 && "1 skill"}
                  {form?.length > 1 && `${form?.length} skills`}
                </Body2>
                {form?.map((item, index) => {
                  return (
                    <ChoiceChip key={index} size={Mobile ? `small` : `medium`}>
                      {item}
                    </ChoiceChip>
                  );
                })}
              </Box>

              {Mobile && (
                <EditButton
                  type="icon only"
                  handleEdit={() => {
                    setShowForm({ status: true, value: `edit` });
                  }}
                  sx={{ position: `relative`, right: 0 }}
                />
              )}
            </Box>
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
