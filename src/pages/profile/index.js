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
  const { data: session, status, update: sessionUpdate } = useSession();

  const updateSession = async () => {
    // if(session)
    await sessionUpdate({
      newLevel: "AHLINYA AHLI INTINYA INTI",
    });
  };

  return (
    <div>
      <Head>
        <title>NextAuth Authentication</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>PROFILE PROTECTED </h1>

      <button
        onClick={() => console.log({ session })}
        style={{ marginBottom: 20 }}
      >
        console SESSION
      </button>
      <button onClick={updateSession} style={{ marginBottom: 20 }}>
        UPDATE SESSION
      </button>

      {user && (
        <>
          <h4>You Level are: {session?.user?.data?.level}</h4>
          <h4>You are logged as: {user.name}</h4>
          <div>
            <h4>Email: {user.email}</h4>
            <br />
            {user.image && (
              <span>
                <img src={user.image} alt={user.name} />
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
