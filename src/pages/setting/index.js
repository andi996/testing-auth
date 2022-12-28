import { useEffect, useState } from "react";
import { Colors, Radius } from "../../themes";
import {
  Body1,
  Heading2,
  Heading3,
  Heading4,
  Heading6,
} from "../../components/Atom/Typography";
import Header from "../../components/Organism/Header";
import Footer from "../../components/Organism/Footer";
import Sidebar from "../../components/Molecul/Sidebar/index";
import Layout from "../../components/Layout/Layout";
import PengaturanAkun from "./pengaturan-akun/index";
import Privasi from "./Privasi";
import HistoryLogin from "./HistoryLogin";
import Notifikasi from "./Notifikasi";
import Cookies from "js-cookie";
import useMediaQuery from "../../utils/useMediaQuery";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

import Divider from "../../components/Atom/Divider";
export default function Setting() {
  const isSmall = useMediaQuery("(max-width: 640px)");
  const isMobile = useMediaQuery("(max-width: 810px)");
  const isMediumScreen = useMediaQuery("(min-width: 800px)");

  const [userData, setUserData] = useState(null);
  // const { data: session, status } = useSession();

  useEffect(() => {
    var user = null;
    const localUser = Cookies.get("user");

    if (localUser) {
      console.log(JSON?.parse(localUser));
      user = JSON?.parse(localUser);
      // dispatch(getPreferensi(user.id));
      setUserData(JSON?.parse(localUser));
    }
    // else if (session?.user) {
    //   user = session?.user;
    //   setUserData(session?.user);
    // }
  }, []);

  console.log(userData);

  const [selectedSidebar, setSelectedSidebar] = useState([
    true,
    false,
    false,
    false,
  ]);

  const KlikMenu1 = (val) => {
    // setSelectedSidebar("Semua");
    val == 0 && setSelectedSidebar([true, false, false, false]);
    val == 1 && setSelectedSidebar([false, true, false, false]);
    val == 2 && setSelectedSidebar([false, false, true, false]);
    val == 3 && setSelectedSidebar([false, false, false, true]);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <style jsx>
        {`
          .body {
            background: ${isMobile
                ? `white`
                : `url("/images/Principle/Background/Light Blue Desktop.png")`}
              no-repeat top;
            background-size: 100%;
          }
          .container {
            margin-bottom: 4px;
            ::-webkit-scrollbar {
              height: 4px;
            }
            ::-webkit-scrollbar-track {
              background: ${Colors.neutral.light_grey};
              border-radius: ${Radius.circle};
            }
            ::-webkit-scrollbar-thumb {
              width: 3px;
              background: ${Colors.primary.mid_blue};
              border-radius: ${Radius.circle};
            }
            overflow-x: ${isMobile && `auto`};
          }
        `}
      </style>
      <div className="body">
        <Header type="Setting" title="Setting" state="sticky" />
        {isMobile ? (
          <Layout>
            {isSmall && (
              <Divider costumStyle={{ background: "#EEEEEE", margin: 0 }} />
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                margin: "16px",
              }}
            >
              <Heading4
                style={{
                  color: Colors.primary.mid_blue,
                }}
              >
                Pengaturan Akun
              </Heading4>
            </div>
            <PengaturanAkun userData={userData} />
            {isSmall && <Divider costumStyle={{ background: "#EEEEEE" }} />}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                margin: "16px",
              }}
            >
              <Heading4
                style={{
                  color: Colors.primary.mid_blue,
                }}
              >
                Privasi
              </Heading4>
            </div>
            <Privasi userData={userData} />
            {isSmall && <Divider costumStyle={{ background: "#EEEEEE" }} />}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                margin: "16px",
              }}
            >
              <Heading4
                style={{
                  color: Colors.primary.mid_blue,
                }}
              >
                Notifikasi
              </Heading4>
            </div>
            <Notifikasi />
            {isSmall && (
              <Divider costumStyle={{ background: "#EEEEEE", margin: 0 }} />
            )}
            <HistoryLogin />
          </Layout>
        ) : (
          <Layout>
            <div
              className="container"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: isMediumScreen ? "center" : "flex-start",
                // marginTop: "40px",
                // marginBottom: "40px",
                gap: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  // marginTop: "40px",
                  marginBottom: "40px",
                  position: "sticky",
                  top: isMobile ? 0 : "80px",
                  zIndex: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <Heading2
                    style={{
                      color: Colors.neutral.greyish_brown,
                      marginRight: "10px",
                    }}
                  >
                    Pengaturan
                  </Heading2>
                </div>

                {/* --------------SIDEBAR---------------- */}
                <Sidebar>
                  <Sidebar.Content
                    isSelected={selectedSidebar[0]}
                    onClick={() => KlikMenu1("0")}
                  >
                    Pengaturan Akun
                  </Sidebar.Content>
                  <Sidebar.Content
                    notification={false}
                    onClick={() => KlikMenu1("1")}
                    isSelected={selectedSidebar[1]}
                  >
                    Privasi
                  </Sidebar.Content>
                  <Sidebar.Content
                    notification={false}
                    onClick={() => KlikMenu1("2")}
                    isSelected={selectedSidebar[2]}
                  >
                    Notifikasi
                  </Sidebar.Content>
                  <Sidebar.Content
                    onClick={() => KlikMenu1("3")}
                    isSelected={selectedSidebar[3]}
                  >
                    History Login
                  </Sidebar.Content>
                </Sidebar>
              </div>
              {/* --------------END SIDEBAR---------------- */}
              <div
                style={{
                  // display: "flex",
                  marginBottom: "40px",
                  marginTop: "44px",
                  width: "100%",
                  minWidth: selectedSidebar[3] !== true ? 500 : 0,
                }}
              >
                {selectedSidebar[0] == true && (
                  <PengaturanAkun userData={userData} />
                )}
                {selectedSidebar[1] == true && <Privasi userData={userData} />}
                {selectedSidebar[2] == true && (
                  <Notifikasi userData={userData} />
                )}
                {selectedSidebar[3] == true && <HistoryLogin />}
              </div>
            </div>
          </Layout>
        )}
        <Footer />
      </div>
    </>
  );
}
