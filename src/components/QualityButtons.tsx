import React from 'react'

type status = "authenticated" | "loading" | "unauthenticated";
const QualityButtons = (
  setQuality: React.Dispatch<React.SetStateAction<number>>,
  status: status,
  show: boolean
) => {
  return (
    <>
      {show && status === "authenticated" && (
        <div className="transition-300 grid grid-cols-5 gap-10 pt-5">
          <button
            onClick={() => {
              setQuality(0);
            }}
            className="transition-300 rounded-full bg-white/60 px-5 py-3 font-semibold uppercase text-red-500 no-underline transition hover:bg-white/20 md:px-10"
          >
            1
          </button>
          <button
            onClick={() => {
              setQuality(1);
            }}
            className="transition-300 rounded-full bg-white/60 px-5 py-3  font-semibold uppercase text-red-400 no-underline transition hover:bg-white/20 md:px-10"
          >
            2
          </button>
          <button
            onClick={() => {
              setQuality(2);
            }}
            className="transition-300 rounded-full bg-white/60 px-5 py-3 font-semibold  uppercase text-yellow-500 no-underline transition hover:bg-white/20 md:px-10"
          >
            3
          </button>
          <button
            onClick={() => {
              setQuality(0);
            }}
            className="rounded-full bg-white/60 px-5 py-3 font-semibold  uppercase text-green-400 no-underline transition hover:bg-white/20 md:px-10"
          >
            4
          </button>
          <button
            onClick={() => {
              setQuality(5);
            }}
            className="rounded-full bg-white/60 px-5 py-3 font-semibold  uppercase text-green-600 no-underline transition hover:bg-white/20 md:px-10"
          >
            5
          </button>
        </div>
      )}
    </>
  );
};

export default QualityButtons