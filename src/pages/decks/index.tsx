import { client } from "lib/sanity-client";
import Link from "next/link";
import { AllDecks, ALLDECKS } from "queries/queries";
import Header from "~/components/Header";

// TODO
// Add zod validation and infer types from it

const Decks = ({ decks }: AllDecks) => {

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#FFA36A] to-[#00d4ff]">
        <div className="grid grid-cols-1 gap-3 p-20  md:grid-cols-2 md:gap-32 xl:grid-cols-4 xl:gap-10 ">
          {decks.map((item) => {
            return (
              <div className="max-w-md text-white lg:max-w-xs" key={item._id}>
                <Link
                  href={{
                    pathname: `/flash/${item.name}`,
                    query: { item: item.name },
                  }}
                >
                  <img
                    className="rounded-lg rounded-b-none w-full"
                    src={item.image?.asset.url}
                    alt={`${item.name} image`}
                  />
                  <div className="rounded-lg  rounded-t-none bg-slate-600">
                    <div className="px-5">
                      <p className="text-md pt-5 pb-3 font-bold uppercase">
                        {item.name}
                      </p>
                      <p className=" text-sm font-bold italic text-gray-400">
                        {item.description}
                      </p>
                      <div className="py-5"></div>
                      {item.difficulty?.level === "Beguinner" && (
                        <button className="rounded-lg bg-green-400 py-1 px-2  text-sm">
                          {" "}
                          #Facile{" "}
                        </button>
                      )}
                      {item.difficulty?.level === "Inter" && (
                        <button className="rounded-lg bg-purple-700 py-1 px-2  text-sm">
                          {" "}
                          #Intermédiaire{" "}
                        </button>
                      )}
                      {item.difficulty?.level === "Expert" && (
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
          })}
        </div>
      </main>
    </>
  );
};

export default Decks;

export const getStaticProps = async () => {
  const decks: AllDecks = await client.fetch(ALLDECKS);

  return {
    props: {
      decks,
    },
    revalidate: 3600
  };
};
