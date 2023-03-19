import React, { useEffect, useState, useRef } from "react";
import { client } from "lib/sanity-client";
import { DECKBYNAME } from "queries/queries";
import { Deck } from "typings";
import { CgEditFlipH } from "react-icons/cg";
import { BiLeftArrow } from "react-icons/bi";
import { BiRightArrow } from "react-icons/bi";
// CgEditFlipH

const FlashCard = ({ data }: FlashData) => {
  const [count, setCount] = useState<number>(0);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [isFlip, setIsFlip] = useState<boolean>(false);

  // Keeping track of questions
  useEffect(() => {
    if (numberOfQuestion.current === count) {
      setIsLast(true);
    }
    console.log(numberOfQuestion.current, count);
  }, [count]);
  console.log(isLast);
  const dataRef = useRef(
    data.map((item) => item.flashCard.map((flash) => flash).length).toString()
  );
  // const flashCards = useRef(dataRef.current.map(item => item));
  const numberOfQuestion = useRef(parseInt(dataRef.current.toString()) - 1);
  /*  

  console.log(
    
        "dataRef",
        dataRef.current.toString(),
   
    "numberOfQuestion",
    numberOfQuestion
  );  */
  const handleFlip = () => {
    setIsFlip(!isFlip);
  };
  const setPrevFlash = () => {
    setIsFlip(false);
    setCount(count - 1);
  };
  const setNextFlash = () => {
    setIsFlip(false);
    setCount(count + 1);
  };
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
        <section className="container grid grid-cols-1 place-items-center p-5">
          {data.map((item) =>
            item.flashCard.map((flash, index) => {
              return (
                <div
                  className={`${count !== index && "hidden"}
            h-60 w-[95%] bg-white/10 text-white md:w-[75%] xl:w-[50%] `}
                  key={flash._key}
                >
                  <div className="flex flex-row justify-between p-2">
                    <div className="" onClick={handleFlip}>
                      {``}
                    </div>
                    <div className="" onClick={handleFlip}>
                      <CgEditFlipH className="text-3xl " />
                    </div>
                  </div>
                  <div
                    className={`${
                      isFlip && "hidden"
                    } flex h-[70%] items-center justify-center px-3 text-center`}
                  >
                    <p> {flash.question} </p>
                  </div>
                  <div
                    className={`${
                      !isFlip && "hidden"
                    } flex h-[70%] items-center justify-center px-3 text-center`}
                  >
                    <p> {flash.reponse} </p>
                  </div>
                </div>
              );
            })
          )}
          <div className="grid grid-cols-3 gap-10 py-5">
            {count === 0 ? (
              <button disabled>
                {" "}
                <BiLeftArrow className="text-3xl " />
              </button>
            ) : (
              <button onClick={setPrevFlash}>
                <BiLeftArrow className="text-3xl text-gray-300" />
              </button>
            )}
            <div className="font-bold uppercase text-white">Terminer</div>
            <div className="flex justify-end">
              {count === numberOfQuestion.current ? (
                <button className="text-gray-600" disabled>
                  {" "}
                  <BiRightArrow className="t text-3xl" />
                </button>
              ) : (
                <button onClick={setNextFlash}>
                  <BiRightArrow className="text-3xl text-gray-300" />
                </button>
              )}
            </div>
          </div>
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
