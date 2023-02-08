import Head from "next/head";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import checkUserIsSignIn from "../api/get-token-example";

export async function getServerSideProps(context) {
  var isAlreadyUser = await checkUserIsSignIn(context.req, context.res);
  // console.log("ISI SESSION", session);
  console.log("ISI TES", isAlreadyUser);

  if (!isAlreadyUser) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { user: isAlreadyUser || null } };
}

export default function Index({ user }) {
  console.log("INI ADALAH ISI USER", user);
  return (
    <div>
      <Head>
        <title>NextAuth Authentication</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>PROFILE PROTECTED </h1>

      {session && (
        <>
          <h4>You are logged as: {session.user.name}</h4>
          <div>
            <h4>Email: {session.user.email}</h4>
            <br />
            {session.user.image && (
              <span>
                <img src={session.user.image} alt={session.user.name} />
              </span>
            )}
          </div>
          <br />
          <br />
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      )}
    </div>
  );
}
