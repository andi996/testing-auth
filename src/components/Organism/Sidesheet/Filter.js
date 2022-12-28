import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Elevation } from "../../../themes";
import { isMobile } from "../../../utils/useMediaQuery";
import InputSearchField from "../../Atom/Input Field/SearchField";
import { Body1, Body2, Heading3, Heading4 } from "../../Atom/Typography";

export default function Filter() {
  const Mobile = isMobile();

  const checkboxes = {
    educations: [
      "SMA/SMK/Sederajat",
      "Diploma",
      "Sarjana (S1)",
      "Master (S2)",
      "Doktor (S3)",
    ],
    industries: [
      "E-Commerce",
      "Fintech",
      "Logistics",
      "Energy",
      "Farmtech",
      "Bank",
    ],
    companies: [
      "Tokopedia",
      "Payfazz",
      "Bridestory",
      "Gojek",
      "Tiket",
      "OVO",
      "Blibli",
      "Bukalapak",
    ],
    systems: ["On-Site", "Remote", "Hybrid"],
    postDates: ["Kapan Saja", "Hari ini", "1 Minggu", "1 Bulan"],
    workTypes: ["Fulltime", "Kontrak", "Internship", "Freelance", "Part-time"],
  };

  const Title = ({ children }) => {
    return Mobile ? (
      <Heading4>{children}</Heading4>
    ) : (
      <Heading3>{children}</Heading3>
    );
  };

  const Label = ({ children }) => {
    return Mobile ? <Body2>{children}</Body2> : <Body1>{children}</Body1>;
  };

  const styles = {
    container: {
      position: `absolute`,
      maxWidth: Mobile ? `360px` : `540px`,
      width: `100%`,
      height: `auto`,
      padding: Mobile ? 16 : 24,
      boxShadow: Elevation.modal,
    },
    content: {
      marginTop: Mobile ? `32px` : `40px`,
    },
    column: {
      display: `grid`,
      gridAutoFlow: `column`,
      gridTemplateRows: `repeat(3, 1fr)`,
      gap: `18px`,
      columnGap: 0,
    },
    checkBoxIcon: {
      "& .MuiSvgIcon-root": { fontSize: 20 },
      padding: 0,
    },
  };

  return (
    <Box style={styles.container}>
      <Box>
        <Title>Tingkat Pendidikan</Title>
        <FormGroup sx={{ mt: `16px` }}>
          <Box style={styles.column}>
            {checkboxes?.educations?.map((label, idx) => {
              return (
                <FormControlLabel
                  key={idx}
                  sx={{ margin: 0, gap: `4px` }}
                  control={<Checkbox sx={styles.checkBoxIcon} />}
                  label={<Label>{label}</Label>}
                />
              );
            })}
          </Box>
        </FormGroup>
      </Box>

      <Box style={styles.content}>
        <Title>Industri</Title>
        <Box mt="16px">
          <InputSearchField placeholder="Cari Industri" fullWidth />
        </Box>
        <FormGroup sx={{ mt: `16px` }}>
          <Box style={styles.column}>
            {checkboxes?.industries?.map((label, idx) => {
              return (
                <FormControlLabel
                  key={idx}
                  sx={{ margin: 0, gap: `4px` }}
                  control={<Checkbox sx={styles.checkBoxIcon} />}
                  label={<Label>{label}</Label>}
                />
              );
            })}
          </Box>
        </FormGroup>
      </Box>

      <Box style={styles.content}>
        <Title>Company Anda Subscribe</Title>
        <FormGroup sx={{ mt: `16px` }}>
          <Box style={styles.column}>
            {checkboxes?.companies?.map((label, idx) => {
              return (
                <FormControlLabel
                  key={idx}
                  sx={{ margin: 0, gap: `4px` }}
                  control={<Checkbox sx={styles.checkBoxIcon} />}
                  label={<Label>{label}</Label>}
                />
              );
            })}
          </Box>
        </FormGroup>
      </Box>

      <Box style={styles.content}>
        <Title>Remote/On Site</Title>
        <FormGroup sx={{ mt: `16px` }}>
          <Box style={styles.column}>
            {checkboxes?.systems?.map((label, idx) => {
              return (
                <FormControlLabel
                  key={idx}
                  sx={{ margin: 0, gap: `4px` }}
                  control={<Checkbox sx={styles.checkBoxIcon} />}
                  label={<Label>{label}</Label>}
                />
              );
            })}
          </Box>
        </FormGroup>
      </Box>

      <Box style={styles.content}>
        <Title>Waktu Ditayangkan</Title>
        <FormGroup sx={{ mt: `16px` }}>
          <Box style={styles.column}>
            {checkboxes?.postDates?.map((label, idx) => {
              return (
                <FormControlLabel
                  key={idx}
                  sx={{ margin: 0, gap: `4px` }}
                  control={<Checkbox sx={styles.checkBoxIcon} />}
                  label={<Label>{label}</Label>}
                />
              );
            })}
          </Box>
        </FormGroup>
      </Box>

      <Box style={styles.content}>
        <Title>Tipe Pekerjaan</Title>
        <FormGroup sx={{ mt: `16px` }}>
          <Box style={styles.column}>
            {checkboxes?.workTypes?.map((label, idx) => {
              return (
                <FormControlLabel
                  key={idx}
                  sx={{ margin: 0, gap: `4px` }}
                  control={<Checkbox sx={styles.checkBoxIcon} />}
                  label={<Label>{label}</Label>}
                />
              );
            })}
          </Box>
        </FormGroup>
      </Box>
    </Box>
  );
}
