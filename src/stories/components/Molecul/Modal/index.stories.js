import React from "react";
import { Body1 } from "../../../../components/Atom/Typography";
import Modal from "../../../../components/Molecul/Modal";
import { Box } from "@mui/system";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import CloseIcon from "@mui/icons-material/Close";
import { Heading3 } from "../../../../components/Atom/Typography";
import { Colors } from "../../../../themes";

export default {
  component: Modal,
  title: "Design System/Molecul/Modal",
};

const Template = (args) => (
  <Modal {...args}>
    <Modal.Header>
      <Box className="d-flex-fullwidth">
        <Box className="d-flex">
          <KeyboardBackspaceIcon
            className="pointer"
            onClick={() => console.log("clicked")}
            style={{ marginRight: 10 }}
          />
          <Heading3>
            Lamar ke
            <span style={{ color: Colors.primary.mid_blue }}>
              {` Microsoft `}
            </span>
            sebagai
            <span style={{ color: Colors.primary.mid_blue }}>
              {` UI/UX Designer `}
            </span>
          </Heading3>
        </Box>
        <CloseIcon
          style={{ cursor: `pointer` }}
          onClick={() => {
            console.log("clicked");
          }}
        />
      </Box>
    </Modal.Header>

    <Modal.Body>
      <Body1>
        Apakah Anda yakin ingin mengirim jawaban dan profil ke lowongan ini?
      </Body1>
    </Modal.Body>
  </Modal>
);

export const Default = Template.bind({});

Default.args = {
  show: true,
  primaryButtonText: "Lanjutkan",
  secondaryButtonText: "Review Profil",
};
