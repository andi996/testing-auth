import React, { useState, useRef } from "react";
import { Box } from "@mui/system";
import { Heading4, Heading6, Font } from "../../../components/Atom/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Colors } from "../../../themes";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { isMobile } from "../../../utils/useMediaQuery";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Elevation, Radius } from "../../../themes";
import useOutsideAlerter from "../../../utils/handleClickOutside";

export function AddButton({ handleClick }) {
  const Mobile = isMobile();
  return (
    <>
      {/* ADD BUTTON */}
      {Mobile && (
        <Box
          position="fixed"
          top={16}
          right={16}
          zIndex={1000}
          onClick={handleClick}
          sx={{ cursor: `pointer` }}
          // onClick={() => {
          //   setForm({});
          //   setShowForm({ status: true, value: `add` });
          // }}
        >
          <AddIcon />
        </Box>
      )}

      {!Mobile && (
        <Box
          className="d-flex pointer"
          width="fit-content !important"
          color={Colors.primary.mid_blue}
          onClick={handleClick}
        >
          <AddCircleIcon sx={{ marginRight: `4px` }} />
          <Heading4>Tambah</Heading4>
        </Box>
      )}
    </>
  );
}

export function EditButton({ type, handleEdit, sx }) {
  const Mobile = isMobile();
  return (
    <Box
      sx={{
        display: `flex`,
        gap: `8px`,
        alignItems: `center`,
        position: `absolute`,
        right: Mobile ? `16px` : 0,
        color: Colors.primary.mid_blue,
        cursor: `pointer`,
        ...sx,
      }}
      onClick={handleEdit}
    >
      {type === "text only" && (
        <Font type={Mobile ? `Label` : `Heading4`} size="small">
          Edit
        </Font>
      )}
      {type === "icon only" && <EditIcon />}
      {(type !== "icon only" || type === "text only") && (
        <>
          <EditIcon />
          <Font type={Mobile ? `Label` : `Heading4`} size="small">
            Edit
          </Font>
        </>
      )}
    </Box>
  );
}

export function ActionButton({ id, handleEdit, handleDelete }) {
  const Mobile = isMobile();
  const [isOpen, setIsOpen] = useState(false);

  const dropDownRef = useRef(null);
  useOutsideAlerter(dropDownRef, setIsOpen);

  return (
    <>
      {Mobile && (
        <Box
          sx={{
            display: `flex`,
            color: Colors.primary.mid_blue,
            cursor: `pointer`,
          }}
          onClick={handleEdit}
        >
          <EditIcon />
          {/* <Font type="Label" size="small">
            Edit
          </Font> */}
        </Box>
      )}

      {!Mobile && (
        <Box
          className={`action-btn-${id}`}
          ref={dropDownRef}
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            position: `relative`,
            cursor: `pointer`,
          }}
        >
          <MoreHorizIcon color={Colors.neutral.brown_grey} />

          {isOpen && (
            <Box
              sx={{
                position: `absolute`,
                left: `-44px`,
                padding: `8px`,
                boxShadow: Elevation.navigationMenu,
                borderRadius: Radius.medium,
                background: `#fff`,
                zIndex: 100,
              }}
            >
              <Box
                className="d-flex pointer"
                color={Colors.primary.mid_blue}
                onClick={handleEdit}
                mb="5px"
              >
                <EditIcon sx={{ mr: `8px` }} />
                <Heading6>Edit</Heading6>
              </Box>
              <Box
                className="d-flex pointer"
                color={Colors.secondary.red}
                onClick={handleDelete}
              >
                <img
                  src="/images/Principle/Logo/Delete Trash.svg"
                  alt="Delete"
                  style={{ marginRight: `8px` }}
                />
                {/* <DeleteIcon sx={{ mr: `8px` }} /> */}
                <Heading6>Hapus</Heading6>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </>
  );
}

export default function Button() {
  return <Box></Box>;
}
