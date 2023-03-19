import { client } from "lib/sanity-client";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { DeckByTechno, DECKBYTECHNO, DeckByTechnoArr } from "queries/queries";

const Decks = ({ decks }: DeckByTechnoArr) => {
  console.log(decks)
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="grid grid-cols-1 gap-3 p-10  md:grid-cols-2 md:gap-32 xl:grid-cols-4">
          {decks.map((item) => {
            console.log("item",item)
           return item.deck.map(deck => {
            console.log("deck", deck);
              return (
                <div className="text-white max-w-xs lg:max-w-sm" key={deck._id}>
                  <Link href={`./decks/${deck.name}`}>
                    <img
                      className="rounded-lg rounded-b-none"
                      src={deck.image?.asset.url}
                      alt={`${deck.name} image`}
                    />
                    <div className="bg-gray-700 h-32 rounded-lg rounded-t-none">
                      <p>{deck.name}</p>
                      <p>{deck.description}</p>
                      <p> {deck.difficulty?.name} </p>
                    </div>
                  </Link>
                </div>
              );
            })
            ;
          })}
        </div>
      </main>
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
    params.slug.map((item) => item).toString()
  );
  const decks = await client.fetch(DECKBYTECHNO, { technoName: params.slug.map(item => item).toString()});

  return {
    props: {
      decks,
    },
  };
};
