import { client } from 'lib/sanity-client';
import { NextPage } from 'next';
import { useRouter } from "next/router";
import { DeckByTechno, DECKBYTECHNO, DeckByTechnoArr } from 'queries/queries';




const Decks = ({ decks }: DeckByTechnoArr) => {
  const router = useRouter();
  const { techno } = router.query;
  console.log(techno, decks);
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"></main>
    </>
  );
};

export default Decks


export const getStaticProps = async ({params}: any) => {
console.log("Params", params)
  const decks = await client.fetch(DECKBYTECHNO, {technoName: "html"});

  return {
    props: {
      decks,
    },
  };
};