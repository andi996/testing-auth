import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";
import { useCallback, useEffect, useRef, useState } from "react";
import InputSearchField from "../../components/Atom/Input Field/SearchField";
import { Body3, Font, Heading4, Label } from "../../components/Atom/Typography";
import StatusLamaranCard from "../../components/Organism/Card/StatusLamaranCard";
import ActionChipDropdown from "../../components/Organism/Menu/Exposed Dropdown Menu/ActionChipDropdown";
import { Colors } from "../../themes";

import RadioButton from "../../components/Atom/Selection Control/Radio";
import BottomSheet from "../../components/Organism/Bottom Sheet";

import { SwapVert } from "@mui/icons-material";
import { isMobile } from "../../utils/useMediaQuery";
import EmptyState from "./EmptyState";

const Gagal = ({ data, keyword, handleButton }) => {
  const Mobile = isMobile();

  const [applications, setApplications] = useState([]);
  const [totalData, setTotalData] = useState();
  const [maxData, setMaxData] = useState(5);
  const [loading, setLoading] = useState(false);
  const [skeleton, setSkeleton] = useState(true);

  const [showFilter, setShowFilter] = useState(false); // showing BottomSheet
  const [resetRadio, setResetRadio] = useState(); // reset radio

  const optionsList = {
    status: ["Aktif", "Tidak Aktif"],
    profileMatch: ["Low Match", "Medium Match", "High Match"],
    sort: ["Paling Baru", "Paling Lama"],
  };
  const [filter, setFilter] = useState({
    keyword: "",
    status: null,
    profileMatch: null,
  });
  const [filterTemp_, setFilterTemp_] = useState({
    keyword: "",
    status: null,
    profileMatch: null,
  });

  const ref = useRef();
  const lastCardRef = useCallback(
    (node) => {
      if (ref.current) ref.current.disconnect();
      ref.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (maxData < totalData) {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              setMaxData(maxData + 5);
            }, [1500]);
          }
        }
      });

      if (node) ref.current.observe(node);
    },
    [applications]
  );

  const handleSearch = (value) => {
    setSkeleton(true);
    const search = setTimeout(() => {
      setFilter({ ...filter, keyword: value?.toLowerCase() });
      setSkeleton(false);
    }, 1000);
    return () => clearTimeout(search);
  };

  const handleClick = (key, val) => {
    setMaxData(5);
    setFilter({ ...filter, [key]: val === filter[key] ? null : val });
    setFilterTemp_({ ...filter, [key]: val === filter[key] ? null : val });
  };

  const handleSort = (val) => {
    setFilter({ ...filter, sort: val === filter.sort ? null : val });
  };

  useEffect(() => {
    let tempData = data;

    //  IF KEYWORD EXIST
    const keyword = filter?.keyword;
    if (keyword) {
      const newData = data?.filter((item) => {
        return (
          item?.opportunity?.job_position?.toLowerCase().includes(keyword) ||
          item?.opportunity?.company?.name?.toLowerCase().includes(keyword)
        );
      });
      tempData = newData;
    }

    // IF STATUS EXIST
    if (filter?.status !== null) {
      const is_expired = filter?.status === "Aktif" ? false : true;
      const newData = tempData?.filter((item, index) => {
        return item?.opportunity?.is_expired === is_expired;
      });
      tempData = newData;
    }

    // IF PROFILE MATCH EXIST
    if (filter?.profileMatch !== null) {
      const newData = tempData?.filter((item, index) => {
        if (filter?.profileMatch === "Low Match") {
          return item?.match_percentage < 60;
        } else if (filter?.profileMatch === "Medium Match") {
          return item?.match_percentage >= 60 && item?.match_percentage < 80;
        } else if (filter?.profileMatch === "High Match") {
          return item?.match_percentage >= 80 && item?.match_percentage <= 100;
        } else {
          return item;
        }
      });
      tempData = newData;
    }

    // SORT BY
    if (filter?.sort !== null) {
      if (filter?.sort === "Paling Lama") {
        const newData = tempData?.sort((a, b) => {
          return new Date(a.created_at) - new Date(b.created_at);
        });
        tempData = newData;
      } else {
        const newData = tempData
          ?.sort((a, b) => {
            return new Date(a.created_at) - new Date(b.created_at);
          })
          .reverse();
        tempData = newData;
      }
    }

    setTotalData(tempData?.length);
    tempData = tempData?.slice(0, maxData).map((item) => {
      return item;
    });

    setApplications(tempData);
  }, [filter, maxData]);

  useEffect(() => {
    const newData = data?.slice(0, maxData).map((item) => {
      return item;
    });

    setTotalData(data?.length);
    setApplications(newData);

    const timer = setTimeout(() => {
      setSkeleton(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [data]);

  useEffect(() => {
    setFilter({ ...filter, keyword });
    setFilterTemp_({ ...filterTemp_, keyword });
  }, [keyword]);

  return (
    <Box>
      {!Mobile && (
        <>
          <Box maxWidth="450px">
            <InputSearchField
              fullWidth
              placeholder="Cari Lowongan atau Perusahaan"
              onChange={(e) => handleSearch(e.target.value)}
              handleClear={() => handleSearch("")}
            />
          </Box>
          <Box className="d-flex" gap="12px" m="24px 0">
            <ActionChipDropdown
              chevron="true"
              optionList={optionsList.status}
              handleClick={(val) => handleClick("status", val)}
            >
              Status Lowongan
            </ActionChipDropdown>
            <ActionChipDropdown
              chevron="true"
              optionList={optionsList.profileMatch}
              handleClick={(val) => handleClick("profileMatch", val)}
            >
              Profile Match
            </ActionChipDropdown>
          </Box>
        </>
      )}

      <Box className="d-flex-fullwidth" mb={Mobile ? `4px` : `16px`}>
        <Box className="d-flex" gap="8px">
          <Font type={Mobile ? `Heading5` : `Heading3`}>
            {!skeleton && totalData > 0 && `${totalData} Lamaran`}
          </Font>
        </Box>

        <Box sx={{ display: `flex`, alignItems: `center`, gap: `4px` }}>
          {Mobile && (
            <Box
              sx={{
                display: `flex`,
                alignItems: `center`,
                gap: `4px`,
                padding: `4px 8px`,
                border: `1px solid ${Colors.neutral.brown_light_grey}`,
                borderRadius: `24px`,
                color: Colors.neutral.brown_grey,
                cursor: `pointer`,
              }}
              onClick={() => setShowFilter(!showFilter)}
            >
              <FilterAltIcon sx={{ width: `16px`, height: `16px` }} />
              <Body3>Filter</Body3>
            </Box>
          )}

          <ActionChipDropdown
            icon={<SwapVert />}
            chevron="true"
            size={Mobile ? `mobile` : `small`}
            optionList={optionsList.sort}
            handleClick={handleSort}
          >
            Urutkan
          </ActionChipDropdown>
        </Box>

        {/*  Filter */}
        <BottomSheet
          visible={showFilter}
          variant="modal"
          title={
            <>
              Filter{" "}
              <span style={{ color: Colors.primary.mid_blue }}>Semua</span>
            </>
          }
          submitBtnTitle="Terapkan"
          onSubmit={() => {
            setShowFilter(false);
            setFilter(filterTemp_);
          }}
          onClose={() => setShowFilter(false)}
        >
          <Box my="16px">
            <Box mb="16px">
              <Box className="d-flex-fullwidth" mb="16px">
                <Heading4>Status Lamaran</Heading4>
                <Box
                  className="pointer"
                  onClick={() => {
                    setFilterTemp_((prev) => ({
                      ...prev,
                      status: null,
                      profileMatch: null,
                    }));
                    setResetRadio(true);
                    setTimeout(() => {
                      setResetRadio(false);
                    }, 1000);
                  }}
                >
                  <Label
                    value="Atur Ulang"
                    size="medium"
                    color={Colors.primary.mid_blue}
                  />
                </Box>
              </Box>

              <RadioButton
                type="mobile"
                variant="left"
                gap="16px"
                defaultValue={optionsList?.status?.map((item) =>
                  item === filterTemp_?.status ? true : false
                )}
                reset={resetRadio}
                options={optionsList?.status?.map((item) => {
                  return { label: item, value: item };
                })}
                onChange={(e) =>
                  setFilterTemp_((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
              />
            </Box>
            <Box mb="16px">
              <Heading4 mb="16px">Profile Match</Heading4>
              <RadioButton
                type="mobile"
                variant="left"
                gap="16px"
                defaultValue={optionsList?.profileMatch?.map((item) =>
                  item === filterTemp_?.profileMatch ? true : false
                )}
                reset={resetRadio}
                options={optionsList?.profileMatch?.map((item) => {
                  return { label: item, value: item };
                })}
                onChange={(e) =>
                  setFilterTemp_((prev) => ({
                    ...prev,
                    profileMatch: e.target.value,
                  }))
                }
              />
            </Box>
          </Box>
        </BottomSheet>
      </Box>

      {skeleton ? (
        <StatusLamaranCard skeleton />
      ) : (
        <>
          {totalData > 0 ? (
            <Box sx={{ display: `flex`, flexDirection: `column`, gap: `16px` }}>
              {applications?.map((item, index) => {
                if (applications?.length === index + 1) {
                  return (
                    <Box key={index} ref={lastCardRef}>
                      <StatusLamaranCard
                        data={item}
                        handleClick={handleButton}
                      />
                    </Box>
                  );
                } else {
                  return (
                    <Box key={index}>
                      <StatusLamaranCard
                        data={item}
                        handleClick={handleButton}
                      />
                    </Box>
                  );
                }
              })}

              {loading && <StatusLamaranCard skeleton />}
            </Box>
          ) : (
            <EmptyState />
          )}
        </>
      )}
    </Box>
  );
};

export default Gagal;
