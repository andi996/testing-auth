import React from "react";

function InterviewInvitationConfirmed() {
  return (
    <>
      <style jsx>
        {`
          table {
            border: 0;
            width: 100%;
          }
        `}
      </style>
      <table
        role="presentation"
        cellPadding={0}
        cellSpacing={0}
        style={{ margin: `auto`, maxWidth: `295px` }}
      >
        <tbody>
          <tr>
            <td
              style={{
                border: "1px solid #d2d2d2",
                borderBottom: "none",
                padding: "15px",
                paddingBottom: 0,
                verticalAlign: "top",
                textAlign: "center",
                backgroundImage:
                  "url(/images/Principle/Background/backgroundemail.jpeg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <img
                style={{
                  width: "60px",
                  height: "18.34px",
                  marginBottom: `9px`,
                }}
                src="/images/Principle/Logo/Karir/default.png"
                alt="karir.png"
              />
              <br />
              <table
                cellPadding={0}
                cellSpacing={0}
                style={{ minHeight: "65.75px", maxHeight: "65.75px" }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        width: "100%",
                        height: "inherit",
                        maxHeight: "inherit",
                        backgroundImage:
                          "url(/images/Principle/Background/EmailPlaceholder.png)",
                      }}
                    />
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td
              style={{
                backgroundColor: "#1d62ae",
                paddingBottom: "4px",
                verticalAlign: "top",
              }}
            >
              <table
                cellPadding={0}
                cellSpacing={12}
                style={{ borderSpacing: `16px 0px` }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        border: "none",
                        marginTop: 100,
                        borderBottomLeftRadius: "4px",
                        borderBottomRightRadius: "4px",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <table
                        cellPadding={0}
                        cellSpacing={12}
                        style={{ padding: 4 }}
                      >
                        <tbody>
                          <tr>
                            <td
                              style={{
                                textAlign: "center",
                                margin: "auto",
                                width: "fit-content",
                                fontSize: "12px",
                                lineHeight: "16px",
                                fontWeight: 600,
                                color: "#4c4c4c",
                              }}
                            >
                              Interview Invitation Confirmed : <br />
                              [nama perusahaan] - [job title]
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                fontWeight: 400,
                                fontSize: "10px",
                                lineHeight: "14px",
                                color: "#4c4c4c",
                              }}
                            >
                              Hi, [kandidat]
                            </td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                fontWeight: 400,
                                fontSize: "10px",
                                lineHeight: "14px",
                                color: "#4c4c4c",
                              }}
                            >
                              [nama perusahaan] telah mengubah jadwal meeting
                              dengan detil sebagai berikut:
                              <br />
                              <br />
                              Posisi : UI/UX (Do not Apply)
                              <br />
                              Perusahaan : karir.com
                              <br />
                              Tanggal : (Harap isi tanggal)
                              <br />
                              Waktu : (Harap isi waktu mulai) - (Harap isi waktu
                              akhir)
                              <br />
                              Lokasi : (Harap isi lokasi)
                              <br />
                              Pewawancara : (Harap isi pewawancara)
                              <br />
                              Contact Number : (Harap isi nomor kontak)
                              <br />
                              <br />
                              Pastikan untuk mencatat tanggal dan waktu di
                              kalendar Anda agar tidak terlupa.
                              <br />
                              Selamat berjuang!
                              <br />
                              <br />
                              Salam,
                              <br />
                              Tim Karir.com
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>

                  <table cellSpacing={12}>
                    <tr>
                      <td
                        style={{
                          fontWeight: 400,
                          fontSize: "10px",
                          lineHeight: "14px",
                          color: "#FFFFFF",
                          textAlign: "center",
                        }}
                      >
                        Keep in touch with us
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          display: "flex",
                          gap: "12px",
                          justifyContent: "center",
                          height: `fit-content`,
                        }}
                      >
                        <a
                          href="https://www.facebook.com/karirdotcom"
                          target="_blank"
                          rel="noreferrer"
                          style={{ display: `flex`, alignItems: `center` }}
                        >
                          <img
                            width="24px"
                            height="24px"
                            src="https://qareercom-kunkka.nos.jkt-1.neo.id/ATTACHMENT/3c48c664-436b-4a2b-9150-93f8d8005f73-facebook-png.png"
                            alt="facebook.png"
                          />
                        </a>
                        <a
                          href="https://www.instagram.com/karirdotcom/"
                          target="_blank"
                          rel="noreferrer"
                          style={{ display: `flex`, alignItems: `center` }}
                        >
                          <img
                            width="24px"
                            height="24px"
                            src="https://qareercom-kunkka.nos.jkt-1.neo.id/ATTACHMENT/439d8307-1bd5-49c2-8006-9be35a6e0954-instagram-png.png"
                            alt="instagram.png"
                          />
                        </a>
                        <a
                          href="https://twitter.com/karirdotcom"
                          target="_blank"
                          rel="noreferrer"
                          style={{ display: `flex`, alignItems: `center` }}
                        >
                          <img
                            width="24px"
                            height="24px"
                            src="https://qareercom-kunkka.nos.jkt-1.neo.id/ATTACHMENT/b881d5af-da42-4568-9192-3bc1bad0e773-twitter-png.png"
                            alt="twitter.png"
                          />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          fontWeight: 400,
                          fontSize: "10px",
                          lineHeight: "18px",
                          color: "#FFFFFF",
                          textAlign: "center",
                        }}
                      >
                        cs@karir.com | 6221 - 5020 - 2010
                        <br />
                        Copyright 2021 PT Qerja Manfaat Bangsa
                        <br />
                        Hak cipta dilindungi undang-undang
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          fontWeight: 400,
                          fontSize: "10px",
                          lineHeight: "18px",
                          color: "#FFFFFF",
                          textAlign: "center",
                          padding: 0,
                        }}
                      >
                        Gedung Mangkuluhur City Tower One Lantai 7, Suite 11
                        <br />
                        Jalan Jendral Gatot Subroto Kavling 1,
                        <br />
                        Kota Jakarta Selatan, 12930
                        <br />
                        Kebijakan Privasi | Syarat dan Ketentuan
                      </td>
                    </tr>
                  </table>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default InterviewInvitationConfirmed;
