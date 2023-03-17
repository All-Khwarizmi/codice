import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { calendar } from "lib/recallHelpers";

const Home: NextPage = () => {
  const [form, setForm] = useState({
    techno: "",
    difficulty: "",
    name: "",
  });

  // Exemple query
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  // Getting user authentication info
  const { data: sessionData } = useSession();

  // Getting all Memos
  const memoDates = api.memo.getAll.useQuery();

  // Getting Memos that need to be studied today
  const memoOfTheDay = api.memo.getMemo.useQuery();

  // Getting Memos by User

  const memoByUser = api.memo.getMemoByUser.useQuery({
    userId: sessionData?.user.id!,
  });

  // Adding a memo && refecht all memos to avoid stale data
  const ctx = api.useContext();
  const { mutate } = api.memo.AddMemoDate.useMutation({
    onSuccess: () => ctx.memo.getAll.refetch(),
  });
  console.log("Memo today", memoOfTheDay);
  if (sessionData) {
    console.log(sessionData);
    /* console.log(sessionData?.user.name);
    console.log(sessionData?.user.id);
    console.log(sessionData?.user.email);
    console.log(sessionData?.user.image); */
  }

  const handleAdd = () => {
    const calendarVar = calendar();
    const memoDate = mutate({
      name: "Second Memo",
      userEmail: sessionData!.user.email!,
      userId: sessionData!.user.id,
      userImage: sessionData!.user.image!,
      userName: sessionData!.user.name!,
      calendar: calendarVar,
    });
    console.log("New memodate", memoDate);
  };

  const handleDifficulty = (e: any) => {
    e.preventDefault()
    console.log(e.target.value);
    setForm(e.target.value)
  }
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <div
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4
            text-white hover:bg-white/20"
            >
              <button type="button" onClick={handleAdd}>
                Add memoDate{" "}
              </button>
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="techno" />
              <form onChange={(e) => handleDifficulty(e)} className="flex flex-row justify-center space-x-5">
                <input id="difficulty" name="difficulty" type="radio" /> 1
                <input id="difficulty" name="difficulty" type="radio" /> 2
                <input id="difficulty" name="difficulty" type="radio" /> 3
              </form>
            </div>
            <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
              <p>All Memos</p>
              {memoDates.data?.map((memo) => {
                return <div key={memo.id}>{memo.name}</div>;
              })}
            </div>
            <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
              <p>Memos by User</p>
              {memoByUser.data?.map((memo) => {
                return <div key={memo.id}>{memo.name}</div>;
              })}
            </div>
            <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
              <p>Memos of the day</p>
              {memoOfTheDay.data?.map((memo) => {
                return <div key={memo.id}>{memo.name}</div>;
              })}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
