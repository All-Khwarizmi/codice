import { calendar } from "lib/recallHelpers";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { api } from "~/utils/api";

const Technos: NextPage = () => {
  const [form, setForm] = useState({
    techno: "",
    difficulty: "beginner",
  });
const [technosList, setTechnosList] = useState([
    "css", 'html', "javascript", "nextjs", "react", 
])
const filteredList = technosList.filter(item => item.includes(form.techno))
  // Getting user authentication info
  const { data: sessionData } = useSession();

  console.log("userID", sessionData?.user.id!, typeof sessionData?.user.id!);
  if (sessionData) {
    // console.log(sessionData);
    /* console.log(sessionData?.user.name);
    console.log(sessionData?.user.id);
    console.log(sessionData?.user.email);
    console.log(sessionData?.user.image); */
  }
  console.log("Form", form);
  console.log(
    "Filtered list", filteredList
    
  );

  const handleTechnoName = (e: any) => {
    e.preventDefault();
    let formObj = {
      techno: e.target.value,
      difficulty: form.difficulty,
    };
    setForm(formObj);
  };

  const handleDifficulty = (e: any) => {
    let formObj = {
      techno: form.techno,
      difficulty: e.target.value,
    };
    setForm(formObj);
  };
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="flex h-full w-full justify-center">
          <div
            className="flex max-w-md flex-col justify-center gap-4 rounded-xl bg-white/10 p-4
            text-white hover:bg-white/20"
          >
            <input
              className="text-black"
              value={form.techno}
              onChange={(e) => handleTechnoName(e)}
              type="text"
              placeholder="techno"
            />
            <div className={`${form.techno === "" && "hidden"}
            text-white`}>
                <ul>
 {filteredList.map((item) => {
                return <li key={item}>{item}</li>;
              })}
                </ul>
             
            </div>
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
            <div className="flex w-full justify-center">
              <Link
                className="w-full"
                href={`./decks/techno:${form.techno}/difficulty:${form.difficulty}`}
              >
                C'est parti
              </Link>
            </div>
            <div className="flex w-full justify-center">
              <Link
                className="w-full"
                href={{
                  pathname: "./decks",
                  query: { techno: form.techno, difficulty: form.difficulty },
                }}
              >
                C'est parti
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Technos;
