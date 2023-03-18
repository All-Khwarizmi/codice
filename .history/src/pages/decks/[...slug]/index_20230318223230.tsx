import { client } from "lib/sanity-client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { DeckByTechno, DECKBYTECHNO, DeckByTechnoArr } from "queries/queries";

const Decks = ({ decks }: DeckByTechnoArr) => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"></main>
    </>
  );
};

export default Decks;

export const getServeProps = async (context: any) => {
  console.log("Params", context.params);
  const decks = await client.fetch(DECKBYTECHNO, { technoName: "html" });

  return {
    props: {
      decks,
    },
  };
};
