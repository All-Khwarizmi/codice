import React from "react";
import { client } from "lib/sanity-client";
import { DECKBYNAME } from "queries/queries";
import { Deck } from "typings";
const FlashCard = ({ data }: FlashData) => {
  console.log("Data in flash", data);
  console.log(
    "Data in flash",
    data.map((item) => console.log("item", item))
  );
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#FFA36A] to-[#00d4ff]">
        <section>
          {" "}
          {data.map((item) => {
            return (
              <h1
                key={item._id}
                className="text-3xl font-bold uppercase text-white"
              >
                {item.name}
              </h1>
            );
          })}{" "}
        </section>
        <section className="h-full w-full grid grid-cols-1 place-items-center">
          {data.map(item => item.flashCard.map(flash => {
            return (
              <div key={flash._key}>
                <div>

                </div>
                <div>
                  <p> </p>
                </div>
              </div>
            )
          }))}
        </section>
      </main>
    </>
  );
};

export default FlashCard;

export type FlashData = {
  data: Deck[];
};
export const getServerSideProps = async ({ params }: any) => {
  const data: FlashData = await client.fetch(DECKBYNAME, {
    name: params.slug.toString(),
  });

  return {
    props: {
      params,
      data,
    },
  };
};