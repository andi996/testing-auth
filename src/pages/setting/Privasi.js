import React, { useMemo } from "react";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import RectangleButton from "../../components/Atom/Button/RectangleButton";
import OTPField from "../../components/Atom/Input Field/OTPField";
import InputPasswordField from "../../components/Atom/Input Field/PasswordField";
import InputTextField from "../../components/Atom/Input Field/TextField";
import {
  Body1,
  Body2,
  Heading2,
  Heading3,
  Heading6,
  Label,
  Small,
} from "../../components/Atom/Typography";
import { Colors, Elevation } from "../../themes";
import RadioButton from "../../components/Atom/Selection Control/Radio";
import Cookies from "js-cookie";
import axios from "axios";
//get data
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { getPreferensi } from "../../redux/action/HomeActions";
import { endpoints } from "../../api/endpoint";
import { API2 } from "../../api/service";
import Toaster from "../../components/Molecul/Toaster";

import useMediaQuery from "../../utils/useMediaQuery";
import Switch from "../../components/Atom/Switch";
const Privasi = (props) => {
  const { userData } = props;

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState({
    id: 1,
    name: "andri",
    email: "andri@gmail.com",
    password: "123456",
    ponsel: "089684239652",
    resumeSearch: true,
  });
  const isMobile = useMediaQuery("(max-width: 640px)");

  const [selectedAnswer, setSelectedAnswer] = useState(["Ya"]);
  const [resumeFromDB, setResumeFromDB] = useState(null);

  const [isChecked, setIsChecked] = useState(false);

  const [userID, setUserID] = useState(userData?.source_id);
  const { preferensi } = useSelector((state) => state);
  const [isLoading, setIsLoading] = useState(true);
  const [isValueChanged, setIsValueChanged] = useState(false);

  //toaster
  const [openToaster, setOpenToaster] = useState(false);
  const [errorToasterText, setErrorToasterText] = useState("");
  const [variantToaster, setVariantToaster] = useState("success");

  //data user
  // const { data: session, status } = useSession();

  const options = {
    customOption: [
      {
        question:
          "Apakah Anda bersedia dihubungi oleh HR melalui Resume Search di Karir.com?",
        subQuestion:
          "Jika bersedia, HR dapat mencari dan menawarkan pekerjaan untuk anda.",
        answers: ["Ya", "Tidak"],
      },
    ],
  };

  useEffect(() => {
    var user = null;
    if (userData) {
      dispatch(getPreferensi(userData?.source_id));
      setUserID(userData?.source_id);
    }
    // else if (session?.user) {
    //   user = session?.user;
    // }
  }, []);

  useEffect(() => {
    console.log(preferensi);
    //set value selected
    if (
      preferensi?.data?.user_preference?.received_information &&
      preferensi?.data?.user_preference?.actively_looking
    ) {
      setSelectedAnswer(["Ya"]);
      setIsChecked(true);
      setResumeFromDB(["Ya"]);
    } else {
      setSelectedAnswer(["Tidak"]);
      setIsChecked(false);
      setResumeFromDB(["Tidak"]);
    }

    if (preferensi?.loading == true) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [preferensi]);

  const handleSelectAnswer = (e, index) => {
    let answers = [...selectedAnswer];
    answers[index] = e.target.value;
    if (resumeFromDB == e.target.value) {
      setIsValueChanged(false);
    } else {
      setIsValueChanged(true);
    }
    setSelectedAnswer(answers);
  };

  const ClickEdit = () => {
    if (isOpen) {
      isValueChanged == true ? handleSavePreference() : setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleSavePreference = async (val, key) => {
    setIsLoading(true);
    setIsChecked(val);
    var inputValue = null;
    if (selectedAnswer == "Ya") {
      inputValue = true;
    } else {
      inputValue = false;
    }

    let submitForm = {
      user_id: userID,
      user_preference: {
        actively_looking: key == "mobile" ? val : inputValue,
        received_information: key == "mobile" ? val : inputValue,
      },
    };

    await API2({
      method: `POST`,
      url: endpoints.savePreferensi,
      data: submitForm,
    })
      .then(() => {
        dispatch(getPreferensi(userID));
        setIsOpen(false);
        setVariantToaster("success");
        setErrorToasterText("Resume Search berhasil diupdate");
        setOpenToaster(true);
        setIsChecked(val);
      })
      .catch((err) => {
        setVariantToaster("error");
        setOpenToaster(true);
        setIsChecked(!val);
        if (err.response.status >= 500) {
          setErrorToasterText("Server Error!");
          return;
        }
        setErrorToasterText("gagal menyimpan data");
      });
    setIsLoading(false);
  };

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
            // margin-bottom: 24px;
            background-color: white;
            border-radius: 8px;
            box-shadow: ${Elevation.card};
          }
          .wrap-content {
            width: 100%;
          }
          .wrap-edit {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          .m-wrapper {
            padding: 0px 16px 16px 16px;
            width: 100%;
          }
        `}
      </style>

      {/* MOBILE VIEW */}
      {isMobile && (
        <div className="m-wrapper">
          <div className="wrap-edit">
            <Heading6
              style={{
                color: Colors.neutral.greyish_brown,
              }}
            >
              Resume Search
            </Heading6>
            <Switch
              onChange={(e) => handleSavePreference(e.target.checked, "mobile")}
              active={isChecked == true}
              value={isChecked}
              checked={isChecked}
            />
          </div>
          <Small
            style={{
              marginTop: "8px",
            }}
          >
            Profil Anda dapat dilihat oleh HR dan Anda dapat dihubungi oleh HR
            di luar lowongan yang Anda lamar.
          </Small>
        </div>
      )}

      {/* DESKTOP VIEW */}
      {!isMobile && (
        <div className="container">
          {/* ---------------- RESUME SEARCH ----------------- */}
          <div className="box-card">
            <div className="wrap-content">
              <>
                <div className="wrap-edit" style={{ marginBottom: "16px" }}>
                  <Heading3>Resume Search</Heading3>

                  <RectangleButton
                    onClick={() =>
                      preferensi.data
                        ? ClickEdit("resume")
                        : dispatch(getPreferensi(userID))
                    }
                    variant="text"
                    size="small"
                    customStyle={{ width: 42, height: 24, minWidth: "unset" }}
                    loading={isLoading}
                  >
                    {preferensi.data ? (isOpen ? "Tutup" : "Edit") : "Refresh"}
                  </RectangleButton>
                </div>
                {!preferensi?.loading ? (
                  !preferensi.data ? (
                    <div>Gagal mendapatkan data</div>
                  ) : (
                    <div style={{ marginTop: "8px" }}>
                      {isOpen ? (
                        <div>
                          {options?.customOption?.map((item, index) => {
                            return (
                              <>
                                <Box style={{ width: "90%" }}>
                                  <Body1 style={{ marginTop: 24 }}>
                                    <b>{item?.question}</b> <br />
                                    {item?.subQuestion}
                                  </Body1>
                                </Box>
                                <div style={{ marginTop: 24, marginLeft: 4 }}>
                                  <Box key={index}>
                                    <Box mt="16px" ml="6px">
                                      <RadioButton
                                        value={selectedAnswer[index] ?? ""}
                                        defaultValue={item.answers.map(
                                          (answer) => {
                                            return selectedAnswer == answer;
                                          }
                                        )}
                                        onChange={(e) =>
                                          handleSelectAnswer(e, index)
                                        }
                                        options={item.answers.map((answer) => {
                                          return {
                                            label: answer,
                                            value: answer,
                                          };
                                        })}
                                        variant="left"
                                        direction="column"
                                      />
                                    </Box>
                                  </Box>
                                </div>

                                {/* <div style={{ marginTop: 24, marginBottom: 24 }}></div> */}
                              </>
                            );
                          })}
                        </div>
                      ) : (
                        <Body1>{selectedAnswer}</Body1>
                      )}
                    </div>
                  )
                ) : (
                  <div>Loading data...</div>
                )}
              </>
            </div>
          </div>

          {/* ---------------- END RESUME SEARCH ----------------- */}
        </div>
      )}
      <Toaster
        variant={variantToaster}
        size={variantToaster == "error" ? "2 line" : "1 line"}
        open={openToaster}
        label={errorToasterText}
        subLabel={`Silahkan coba kembali.`}
        setOpen={() => setOpenToaster(false)}
        noBar
      />
    </>
  );
};

export default Privasi;
