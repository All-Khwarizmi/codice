import { calendar } from "lib/recallHelpers";
import { client } from "lib/sanity-client";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React, {  useState } from "react";
import { api } from "~/utils/api";
import { QueryCache } from "@tanstack/react-query";
import { ALLTECHNOS } from "queries/queries";

// Enable NextJS to cache and dedupe queries


const Technos: NextPage = () => {
  const [form, setForm] = useState({
    techno: "",
    difficulty: "beginner",
  });
  const [isTechno, setIsTechno] = useState<boolean>(false);
  const [technosList, setTechnosList] = useState([
    "css",
    "html",
    "javascript",
    "nextjs",
    "react",
  ]);
  
  const filteredList = technosList.filter((item) => item.toLocaleLowerCase().includes(form.techno.toLocaleLowerCase()));
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
  console.log("Filtered list", filteredList);

  const handleTechnoName = (e: any) => {
    e.preventDefault();
    let formObj = {
      techno: e.target.value,
      difficulty: form.difficulty,
    };
    setForm(formObj);
    setIsTechno(false)
  };

  const handleDifficulty = (e: any) => {
    let formObj = {
      techno: form.techno,
      difficulty: e.target.value,
    };
    setForm(formObj);
  };
  const setSearch = (item: string) => {
    let formObj = {
      techno: item,
      difficulty: form.difficulty,
    };
    setForm(formObj);
    setIsTechno(true)
  };
  return (
   
  );
};

export default Technos;

export const getStaticProps = async () => {
  const technos = await client.fetch(ALLTECHNOS);

  return {
    props: {
      technos,
    },
  };
};