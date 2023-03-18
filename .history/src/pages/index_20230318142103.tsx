import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRef, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { calendar } from "lib/recallHelpers";
import Image from "next/image";

const Home: NextPage = () => {
  //TODO
  // change to useRef
  // Fetch data on server

  const [form, setForm] = useState({
    techno: "",
    difficulty: "beginner",
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
    difficulty: 'expert',
    techno: 'html'
  });

  // Adding a memo && refecht all memos to avoid stale data
  const ctx = api.useContext();
  const { mutate } = api.memo.AddMemoDate.useMutation({
    onSuccess: () => ctx.memo.getAll.refetch(),
  });
  console.log("userID", sessionData?.user.id!, typeof sessionData?.user.id!);
  if (sessionData) {
    console.log(sessionData);
    /* console.log(sessionData?.user.name);
    console.log(sessionData?.user.id);
    console.log(sessionData?.user.email);
    console.log(sessionData?.user.image); */
  }
  console.log("Form", form);
  const handleAdd = () => {
    const calendarVar = calendar();
    const memoDate = mutate({
      name: form.name,
      techno: form.techno,
      difficulty: form.difficulty,
      userEmail: sessionData!.user.email!,
      userId: sessionData!.user.id,
      userImage: sessionData!.user.image!,
      userName: sessionData!.user.name!,
      calendar: calendarVar,
    });
    // console.log("New memodate", memoDate);
  };

  const handleMemoDateName = (e: any) => {
    e.preventDefault();
    let formObj = {
      techno: form.techno,
      difficulty: form.difficulty,
      name: e.target.value,
    };
    setForm(formObj);
  };
  const handleTechnoName = (e: any) => {
    e.preventDefault();
    let formObj = {
      techno: e.target.value,
      difficulty: form.difficulty,
      name: form.name,
    };
    setForm(formObj);
  };

  const handleDifficulty = (e: any) => {
 
   let formObj = {
     techno: form.techno,
     difficulty: e.target.value,
     name: form.name,
   };
   setForm(formObj);
  };
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="./Mon projet.png" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <Image
              src={"/Mon projet.png"}
              width={200}
              height={200}
              alt="codice logo"
            />
          </h1>

          <div className="flex flex-row items-center gap-2">
            <AuthShowcase />
            <Link
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
              {sessionData ? "Sign out" : "Sign in"}
            </Link>
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
     
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
