import { client } from "lib/sanity-client";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { DeckByTechno, DECKBYTECHNO, DeckByTechnoArr } from "queries/queries";

const Decks = ({ decks }: DeckByTechnoArr) => {
 // console.log(decks)
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#FFA36A] to-[#00d4ff]">
        <div className="grid grid-cols-1 gap-3 p-20  md:grid-cols-2 md:gap-32 xl:grid-cols-4 xl:gap-10 ">
          {decks.map((item) => {
            // console.log("item",item)
            return item.deck.map((deck) => {
              // console.log("deck", deck);
              return (
                <div className="max-w-md text-white " key={deck._id}>
                  <Link
                    href={{
                      pathname: `/flash/${deck.name}`,
                      query: { deck: deck.name },
                    }}
                  >
                    <img
                      className="rounded-lg rounded-b-none"
                      src={deck.image?.asset.url}
                      alt={`${deck.name} image`}
                    />
                    <div className="rounded-lg  rounded-t-none bg-slate-600">
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
                            #Facile{" "}
                          </button>
                        )}
                        {deck.difficulty?.level === "Inter" && (
                          <button className="rounded-lg bg-purple-700 py-1 px-2  text-sm">
                            {" "}
                            #Intermédiaire{" "}
                          </button>
                        )}
                        {deck.difficulty?.level === "Expert" && (
                          <button className="rounded-lg bg-red-700 py-1 px-2  text-sm">
                            {" "}
                            #Expert{" "}
                          </button>
                        )}
                      </div>
                      <div className="p-2"></div>
                    </div>
                  </Link>
                </div>
              );
            });
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
 
  const decks = await client.fetch(DECKBYTECHNO, { technoName: params.slug.toString()});

  return {
    props: {
      decks,
    },
  };
};