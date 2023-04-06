import { client } from "lib/sanity-client";
import Link from "next/link";
import { AllTechnos, ALLTECHNOS } from "queries/queries";
import Header from "~/components/Header";

// Page that works with the /decks[...slug] page. Cons: in order to add some filtering, I had to add some query params that obviously dont work in SSG. So since it uses SSR, it's stupidly slow. Often takes 4-5 secs to load from a cold start. I removed this technos filter page and fetched all the decks from getStaticProps. I"ll add a filtering logic later on. (I have a component already made, since it was the idea at the beginning anyway, just have to polish and get it right for the need)

const Technos = ({ technos }: AllTechnos) => {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#FFA36A] to-[#00d4ff]">
       {/*  <div className="grid grid-cols-1 gap-10 p-10 md:grid-cols-2  md:gap-32 md:p-20 xl:grid-cols-4">
          {technos.map((techno) => {
            return (
              <div className="" key={techno._id}>
                <Link className="" href={`./decks/${techno.name}`}>
                  <img
                    className="max-w-xs rounded-lg text-white lg:max-w-sm"
                    src={techno.image.asset.url}
                    alt={`${techno.name} image`}
                  />
                </Link>
              </div>
            );
          })}
        </div> */}
      </main>
    </>
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
