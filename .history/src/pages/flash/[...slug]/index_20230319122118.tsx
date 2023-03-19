import React, { useEffect, useState } from "react";
import { client } from "lib/sanity-client";
import { DECKBYNAME } from "queries/queries";
import { Deck } from "typings";
const FlashCard = ({ data }: FlashData) => {
  const [count, setCount] = useState<number>(0);

  // Keeping track of questions
  useEffect(() => {
    if (numberOfQuestion === count) {
      setIsLast(true);
      // console.log(numberOfQuestion, count);
    }
  }, [count]);

  const numberOfQuestion = quiz.questions.length - 1;
  /*  console.log("Data in flash", data);
  console.log(
    "Data in flash",
    data.map((item) => console.log("item", item))
  ); */
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
        <section className="grid h-full w-full grid-cols-1 place-items-center p-5">
          {data.map((item) =>
            item.flashCard.map((flash, index) => {
              return (
                <div className="h-full w-full bg-white/10 " key={flash._key}>
                  <div></div>
                  <div>
                    <p> {flash.question} </p>
                  </div>
                  <div>
                    <p> {flash.reponse} </p>
                  </div>
                </div>
              );
            })
          )}
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
