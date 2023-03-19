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
        <div className="grid grid-cols-1 gap-3 p-20  md:grid-cols-2 md:gap-32 xl:grid-cols-4 xl:gap-10 ">
          {decks.map((item) => {
            console.log("item",item)
           return item.deck.map(deck => {
            console.log("deck", deck);
              return (
                <div className="max-w-xs text-white lg:max-w-sm" key={deck._id}>
                  <Link href={`./decks/${deck.name}`}>
                    <img
                      className="rounded-lg rounded-b-none"
                      src={deck.image?.asset.url}
                      alt={`${deck.name} image`}
                    />
                    <div className="rounded-lg  rounded-t-none bg-gray-700">
                      <div className="pl-5">
                        <p className="text-md pt-5 pb-3 font-bold uppercase">
                          {deck.name}
                        </p>
                        <p className=" text-sm font-bold italic text-gray-400">
                          {deck.description}
                        </p>
                        <div className="py-5"></div>
                        {deck.difficulty?.level === "Beguinner" && (
                          <button className="rounded-lg bg-green-400 py-1 px-2  text-sm">
                            {" "}
                            Facile{" "}
                          </button>
                        )}
                        {deck.difficulty?.level === "Beguinner" && (
                          <button className="rounded-lg bg-stale-400 py-1 px-2  text-sm">
                            {" "}
                            Facile{" "}
                          </button>
                        )}
                        {deck.difficulty?.level === "Inter" && (
                          <button className="rounded-lg bg-red-400 py-1 px-2  text-sm">
                            {" "}
                            Facile{" "}
                          </button>
                        )}
                      </div>
                      <div className="p-2"></div>
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
