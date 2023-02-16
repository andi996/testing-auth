import { Input } from "@mui/material";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

export default function Login() {
  return (
    <>
      <div style={{ display: "flex", gap: 8, margin: "20px 0" }}>
        <label for="default">input with default font:</label>
        <input id="default" type="text"></input>
      </div>
      <div style={{ display: "flex", gap: 8, margin: "20px 0" }}>
        <label for="small">input with small font:</label>
        <input id="small" type="text" className="input-small"></input>
      </div>
      <div style={{ display: "flex", gap: 8, margin: "20px 0" }}>
        <label for="medium">input with 16px font:</label>
        <input id="medium" type="text" className="input-medium"></input>
      </div>
      <div style={{ display: "flex", gap: 8, margin: "20px 0" }}>
        <label for="large">input with 16px font:</label>
        <input id="large" type="text" className="input-large"></input>
      </div>
      <div style={{ display: "flex" }}>
        <button onClick={() => signIn("google")}>LOGIN WITH GOOGLE</button>
        <button onClick={() => signIn("facebook")}>LOGIN WITH FACEBOOK</button>
      </div>
    </>
  );
}
