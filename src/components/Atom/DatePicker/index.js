import React, { useState } from "react";
// import dayjs, { Dayjs } from "dayjs";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import {
  isLargeScreen,
  isMediumScreen,
  isMobile,
  isSmallScreen,
  isTablet,
} from "../../../utils/useMediaQuery";
import { Body2 } from "../Typography";
import BottomSheet from "../../Organism/Bottom Sheet";
import { Radius, Colors } from "../../../themes";
import moment from "moment/moment";

export default function InputDatePicker({
  label,
  value,
  fullWidth,
  handleChange,
  isDisabled,
}) {
  const [visible, setVisible] = useState();
  const [date, setDate] = useState();
  const Mobile = isMobile();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {Mobile ? (
        <>
          <Box
            className="d-flex-fullwidth"
            onClick={() => !isDisabled && setVisible(!visible)}
            sx={{
              position: `relative`,
              padding: `8px 12px`,
              border: `1px solid ${
                isDisabled
                  ? Colors.neutral.light_grey
                  : Colors.neutral.brown_light_grey
              }`,
              color: isDisabled
                ? Colors.neutral.light_grey
                : Colors.neutral.brown_light_grey,
              borderRadius: Radius.small,
              cursor: `text`,
            }}
          >
            {!value && !date && <Body2>{label}</Body2>}

            {(value || date) && (
              <Body2>
                {/* value free text (string) ex: November - Desember/Des 2022/2022 */}
                {/* default value ex: 06 Desember 2022 */}
                {value || moment(new Date(date)).format("DD MMMM YYYY")}
              </Body2>
            )}

            <DateRangeIcon sx={{ width: `16px`, height: `16px` }} />
          </Box>
          <BottomSheet
            variant="modal"
            visible={visible}
            title="Date"
            submitBtnTitle="Terapkan"
            onSubmit={() => {
              setVisible(false);
              handleChange(date);
            }}
            onClose={() => setVisible(false)}
          >
            <Box
              pt="16px"
              sx={{
                "& .MuiCalendarOrClockPicker-root:first-child": {
                  maxHeight: `fit-content`,
                  "& div:first-child": { width: `100% !important`, margin: 0 },
                  "& .MuiCalendarPicker-root": {
                    width: `100%`,
                    "& .MuiPickersCalendarHeader-root": {
                      px: 0,
                      mb: `24px`,
                      justifyContent: `space-between`,
                      "& .MuiPickersFadeTransitionGroup-root": {
                        maxWidth: `fit-content !important`,
                      },
                      "& .MuiPickersArrowSwitcher-spacer": { width: 0 },
                    },
                    "& .MuiDayPicker-slideTransition": { minHeight: `220px` },
                    "& .MuiDayPicker-header": {
                      justifyContent: `space-between !important`,
                    },
                    "& .MuiDayPicker-weekContainer": {
                      margin: 0,
                      justifyContent: `space-between !important`,
                      "& div, button": {
                        maxWidth: `36px`,
                        margin: 0,
                      },
                    },
                  },
                },
              }}
            >
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                openTo="day"
                minDate={"01/01/1945"}
                value={date}
                onMonthChange={(newValue) => setDate(newValue)}
                onChange={(newValue) => setDate(newValue)}
                views={["year", "month", "day"]}
                renderInput={(params) => <TextField {...params} />}
              />
            </Box>
          </BottomSheet>
        </>
      ) : (
        <DesktopDatePicker
          label={label}
          inputFormat="MM/DD/YYYY"
          value={date}
          onChange={(newValue) => {
            setVisible(false);
            setDate(newValue);
            handleChange(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth={fullWidth}
              sx={{
                width: `100%`,
                background: `#fff`,
                "& .MuiInputBase-root": { height: `40px` },
              }}
            />
          )}
        />
      )}
    </LocalizationProvider>
  );
}
