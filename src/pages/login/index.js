import { useSession, signIn, signOut, getSession } from "next-auth/react";

export default function Login() {
  return (
    <>
      <button onClick={() => signIn("google")}>LOGIN WITH GOOGLE</button>
    </>
  );
}
