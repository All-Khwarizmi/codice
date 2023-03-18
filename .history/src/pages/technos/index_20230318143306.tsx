import { calendar } from 'lib/recallHelpers';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import React, { useState } from 'react'
import { api } from '~/utils/api';

const Technos: NextPage = () => {
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
       difficulty: "expert",
       techno: "html",
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
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <div
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4
            text-white hover:bg-white/20"
          >
            <button type="button" onClick={handleAdd}>
              Add memoDate{" "}
            </button>
            <input
              className="text-black"
              value={form.name}
              onChange={(e) => handleMemoDateName(e)}
              type="text-black"
              placeholder="Name"
            />
            <input
              className="text-black"
              value={form.techno}
              onChange={(e) => handleTechnoName(e)}
              type="text"
              placeholder="techno"
            />
            <form
              onChange={(e) => handleDifficulty(e)}
              className="flex flex-row justify-center space-x-5"
            >
              <input
                value="beguinner"
                defaultChecked
                id="difficulty"
                name="difficulty"
                type="radio"
              />{" "}
              1
              <input
                value="inter"
                id="difficulty"
                name="difficulty"
                type="radio"
              />{" "}
              2
              <input
                value="expert"
                id="difficulty"
                name="difficulty"
                type="radio"
              />{" "}
              3
            </form>
          </div>
         
        </div>
      </main>
    </>
  );
};

export default Technos