import { client } from "lib/sanity-client";
import Link from "next/link";
import { AllTechnos, ALLTECHNOS } from "queries/queries";
import Header from "~/components/Header";


const Technos = ({ technos }: AllTechnos) => {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#FFA36A] to-[#00d4ff]">
        <div className="grid grid-cols-1 gap-10 p-10 md:grid-cols-2  md:gap-32 md:p-20 xl:grid-cols-4">
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
        </div>
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
