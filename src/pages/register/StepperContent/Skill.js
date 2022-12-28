import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InputSearchField from "../../../components/Atom/Input Field/SearchField";
import InputChip from "../../../components/Atom/Selection Control/Chips/InputChip";
import { Body1, Body3 } from "../../../components/Atom/Typography";
import { Colors } from "../../../themes";

const Skill = ({ Mobile, form, handleForm, handleDelete, isExperienced }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const handleAdd = (e) => e.keyCode === 13 && handleForm("skill", [input]);

  useEffect(() => {
    const searching = setTimeout(() => {
      axios
        .get(
          `https://karir-ms.staging.qareer.com/v1/search/skills?keyword=${input}&limit=10`
        )
        .then((res) => {
          setSuggestions(res?.data?.data.map((item) => item?.name));
        })
        .catch((err) => console.log("err", err));
    }, 100);

    return () => clearTimeout(searching);
  }, [input]);

  const classes = {
    FormWrapper: {
      display: `flex`,
      alignItems: "flex-start",
      flexDirection: Mobile ? `column-reverse` : `row`,
      width: `100%`,
    },
  };

  return (
    <Box sx={{ ml: Mobile ? 0 : `64px` }} mb={Mobile ? 0 : `40px`}>
      <Box sx={classes.FormWrapper} gap={Mobile ? `8px` : `40px`}>
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
                <InputChip key={index} onClick={() => handleDelete(index)}>
                  {item}
                </InputChip>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Skill;
