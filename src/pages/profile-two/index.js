import Head from "next/head";
import { useSession, signIn, signOut, getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const userData = await getSession(context);

  if (!userData) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { user: userData || null } };
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

      {user && (
        <>
          <h4>You are logged as: {user.user.name}</h4>
          <div>
            <h4>Email: {user.user.email}</h4>
            <br />
            {user.user.image && (
              <span>
                <img src={user.user.image} alt={user.user.name} />
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
