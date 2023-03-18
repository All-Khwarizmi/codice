import { client } from "lib/sanity-client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { DeckByTechno, DECKBYTECHNO, DeckByTechnoArr } from "queries/queries";

const Decks = ({ decks }: DeckByTechnoArr) => {
  console.log(decks)
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"></main>
    </>
  );
};

export default Decks;

type Params = {
  params: {slug : Array<string>}
}
export const getServerSideProps = async ({params}: Params) => {
  console.log(
    "Params",
    params.slug[0],
    params.slug.map((item) => item)
  );
  const decks = await client.fetch(DECKBYTECHNO, { technoName: params.slug.map(item => item)});

  return {
    props: {
      decks,
    },
  };
};
