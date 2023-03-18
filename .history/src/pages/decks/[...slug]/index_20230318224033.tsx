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
        <div className="grid grid-cols-1 gap-3 p-10  md:grid-cols-3">
          {decks.map((deck) => {
            return (
              <div key={deck.}>
                <Link href={`./decks/${techno.name}`}>
                  <img
                    className="rounded-lg"
                    src={techno.image.asset.url}
                    alt={`${techno.name} image`}
                  />
                </Link>
              </div>
            );
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
