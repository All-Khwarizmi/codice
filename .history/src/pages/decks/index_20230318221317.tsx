import { client } from 'lib/sanity-client';
import { NextPage } from 'next';
import { useRouter } from "next/router";
import { DECKBYTECHNO } from 'queries/queries';




const Decks: NextPage = () => {
    const router = useRouter();
    const { techno } = router.query;
    console.log(techno)
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"></main>
    </>
  );
};

export default Decks


export const getStaticProps = async () => {
  const deck = await client.fetch(DECKBYTECHNO);

  return {
    props: {
      deck,
    },
  };
};