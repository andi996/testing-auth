import React from "react";
import SearchBar from "../../Molecul/SearchBar";
import { Colors, Radius } from "../../../themes";
import { Heading4 } from "../../Atom/Typography";
import Logo from "../../Atom/Logo";
import { Hidden } from "react-grid-system";
import useMediaQuery, { isMobile } from "../../../utils/useMediaQuery";
import {
  getAutoCompleteSearch,
  getBlogs,
  getPopularSearch,
} from "../../../redux/action/LandingActions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getMasterLocations } from "../../../redux/action/MasterActions";

const CompanyList = ["PT. code.id", "PT. Qerja Manfaat", "Karir.com"];

const JobList = ["Product Manager", "Tokopedia", "Gojek", "UI/UX Designer"];

export default function Subheader(props) {
  const { title, sticky, lowongan } = props;
  const isTablet = useMediaQuery("(max-width: 1008px)");
  const isSmallScreen = useMediaQuery("(max-width: 1200px)");

  const dispatch = useDispatch();
  const { popularSearch, autocompleteSearch, masterLocations } = useSelector(
    (state) => state
  );
  const [searchValue, setSearchValue] = useState("");
  const [searchLocationValue, setSearchLocationValue] = useState("");
  const Mobile = isMobile();

  useEffect(() => {
    dispatch(getPopularSearch());
    dispatch(getMasterLocations());
  }, []);

  useEffect(() => {
    if (searchValue?.length > 1) dispatch(getAutoCompleteSearch(searchValue));
  }, [searchValue.length]);

  return (
    <>
      <style jsx>
        {`
          .container {
            background: ${Colors.primary.mid_blue};
            height: 64px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 56px;
          }
          .sticky-container {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 98;
            height: 64px;
            width: 100%;
            background: ${Colors.primary.mid_blue};
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>

      <div className={sticky ? "sticky-container" : "container"}>
        {lowongan ? (
          <Logo width={105} height={32} type={`white`} />
        ) : (
          !isTablet && (
            <Heading4
              style={{
                fontSize: "18px",
                fontWeight: 500,
                color: "white",
              }}
            >
              {title}
            </Heading4>
          )
        )}

        <div
          style={{
            position: "relative",
            marginLeft: isTablet ? 8 : isSmallScreen ? 40 : 120,
          }}
        >
          <div
            style={{
              position: "absolute",
              borderRadius: Radius.small,
              backgroundColor: "white",
              height: "100%",
              width: "calc(100% - 48px)",
            }}
          />
          <SearchBar
            inputValue={searchValue}
            inputValueLocation={searchLocationValue}
            setSearchValue={setSearchValue}
            handleChange={(value) => setSearchValue(value)}
            handleChangeLocation={(value) => setSearchLocationValue(value)}
            size={Mobile ? "small" : "medium"}
            customStyle={{
              width: 164,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              backgroundColor: Colors.secondary.clear_blue,
            }}
            terakhirDilihat={CompanyList}
            riwayatPencarian={JobList}
            pencarianPopuler={popularSearch.data}
            searchResult={autocompleteSearch.data}
            searchResultLocation={masterLocations.data}
            isEmpty={
              autocompleteSearch.data?.job_position == null &&
              autocompleteSearch.data?.companies == null
            }
            lowongan={lowongan}
          />
        </div>
      </div>
    </>
  );
}
