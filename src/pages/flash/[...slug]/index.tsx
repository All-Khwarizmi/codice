import React, { useEffect, useState, useRef, useMemo } from "react";
import { DECKBYNAME } from "queries/queries";
import { AddRecall, Deck } from "typings";
import { client } from "lib/sanity-client";
import { CgEditFlipH } from "react-icons/cg";
import { BiLeftArrow } from "react-icons/bi";
import { BiRightArrow } from "react-icons/bi";
import { useRouter } from "next/router";
import Header from "~/components/Header";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { AuthShowcase } from "~/pages";
import { env } from "~/env.mjs";
import { countingSort } from "~/Algorithm/countingSort";
import { sm2 } from "../../../Algorithm/sm-2";
import { addDays, differenceInDays, differenceInHours } from "date-fns";
import { calendar, getNextRecallDay } from "lib/recallHelpers";

// Zod schema
const recallsScquema = z.object({
  msg: z.string(),
  recall: z.array(
    z.object({
      topicName: z.string(),
      questionName: z.string(),
      interval: z.number(),
      repetitions: z.number(),

      easeFactor: z.number(),
      quality: z.number(),
      score: z.array(z.string()),
      studySessions: z.array(z.string()),
      userId: z.string(),
      userEmail: z.string().email(),
      userImage: z.string(),
      userName: z.string(),
      lastRecall: z.string(),
      nextRecall: z.string(),
      nextRecallName: z.string(),
      calendar: z.object({
        recallOne: z.string(),
        recallTwo: z.string(),
        recallThree: z.string(),
        recallFour: z.string(),
        recallFive: z.string(),
        recallSix: z.string(),
        recallSeven: z.string(),
        recallEight: z.string(),
        recallNine: z.string(),
        recallTen: z.string(),
      }),
      botUrl: z.string(),
    })
  ),
});
type RecallData = z.infer<typeof recallsScquema>;

const qualitySchema = z.number().min(1).max(5);
type Quality = z.infer<typeof qualitySchema>;

const FlashCard = ({ data }: FlashData) => {
  // Checking if user is authenticated, redirecting otherwise
  const router = useRouter();
  const { status, data: session } = useSession();
  const [question, setQuestion] = useState<string>("");
  const [isLast, setIsLast] = useState<boolean>(false);
  const [isFlip, setIsFlip] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(false);
  const [hasRecallBeenDoneToday, setHasRecallBeenDoneToday] =
    useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [numberOfQuestion, setNumberOfQuestion] = useState<number>(0);
  const [sortedRecalls, setsortedRecalls] = useState<Array<[string, number]>>(
    []
  );
  const [sortedRecallsFilterMode, setsortedRecallsFilterMode] = useState<
    Array<[string, number]>
  >([]);
  const [isStudyMode, setIsStudyMode] = useState<boolean>(true);
  const [isTestPossible, setIsTestPossible] = useState<boolean>(true);
  const [isFilterMode, setIsFilterMode] = useState<boolean>(false);
  const [fetchedData, setFetchedData] = useState<RecallData>();
  const [isError, setIsError] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [isRecallInDB, setIsRecallInDB] = useState<boolean>(false);

//  console.log("sortedRecallsFilterMode", sortedRecallsFilterMode);
  // Fetching all user recalls
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: env.NEXT_PUBLIC_API_AUTH_HEADERS_KEY_GET_USER_TOPIC_RECALL,
    },
    body: JSON.stringify({
      userId: session?.user.id,
      topicName: data.map((item) => item.slug.current).toString(),
    }),
  };
  useEffect(() => {
    if (status === "authenticated") {
      // console.log("status", status);
      // "http://localhost:3000/api/getUserRecalls"
      // env.NEXT_PUBLIC_API_GET_USER_RECALLS_ENDPOINT
      const dataRecall = fetch(
        "http://localhost:3000/api/getUserTopicRecall",
        options
      )
        .then((response) => {
          // console.log("Response", response);
          return response.json();
        })
        .then((dataRecall) => {
          // console.log("Data", data, "Data.message", data.message);
          if (dataRecall.message === "No recall in database") {
            setIsRecallInDB(false);
          }
          const typedData = recallsScquema.safeParse(dataRecall);
          if (typedData.success) {
            const safeData = typedData.data;
            console.log("safeData ", safeData);
            setIsError(false);
            setIsRecallInDB(true);
            setFetchedData(safeData);

            let preSortedRecallsFilter: any = [];
            let filterFilterMode: number = 3;
            const recallNameArr: string[] = [];
            fetchedData?.recall.map((item) =>
              recallNameArr.push(item.questionName)
            );

            data.map((deck) =>
              deck.flashCard.map((flashCard) => {
                safeData?.recall.map((recall) => {
                  if (recallNameArr.indexOf(flashCard.name) !== -1) {
                    if (recall.questionName === flashCard.name) {
                      if (recall.quality !== 5) {
                        filterFilterMode = recall.quality;
                        return preSortedRecallsFilter.push([
                          flashCard.name,
                          filterFilterMode,
                        ]);
                      }
                    }
                  }
                });
                if (recallNameArr.indexOf(flashCard.name) === -1) {
                  preSortedRecallsFilter.push([
                    flashCard.name,
                    filterFilterMode,
                  ]);
                }
              })
            );
            let sortedRecallsFilterMode = countingSort(preSortedRecallsFilter);

            setsortedRecallsFilterMode(sortedRecallsFilterMode);

            // Check if recall has been done today
            let hasRecallBeenDoneToday: any = [];
            safeData?.recall.map((item) => {
              if (
                differenceInDays(new Date(item.lastRecall), new Date()) === 0
              ) {
                hasRecallBeenDoneToday.push(item);
              }
            });
            console.log("hasRecallBeenDoneToday ", hasRecallBeenDoneToday);
            if (hasRecallBeenDoneToday.length) {
              // Check if all recall's quality = 5. If so display a message telling it
              setHasRecallBeenDoneToday(hasRecallBeenDoneToday.length);
              setIsFilterMode(true);
              setNumberOfQuestion(sortedRecallsFilterMode.length);
            } else {
              setNumberOfQuestion(sortedRecalls.length);
            }
            setRender(!render);
            console.log("isFiltermode", isFilterMode);
            console.log(
              "sortedRecallsFilterMode lenght",
              sortedRecallsFilterMode.length
            );
          } else if (!typedData.success) {
            setIsError(true);
          }
          // console.log("typeddata", typata);
          return dataRecall;
        })
        .catch((error) => {
          console.log(error);
        });
         console.log("count", count);
         console.log("question", question);
         console.log("sortedRecalls.length", sortedRecalls.length);
         if (isStudyMode) {
           if (sortedRecalls.length) {
             setQuestion(sortedRecalls[count]![0]);
             console.log(sortedRecalls[count]![0]);
           }
         } else {
           if (isFilterMode) {
             if (sortedRecallsFilterMode.length) {
               setQuestion(sortedRecallsFilterMode[count]![0]);
               console.log(sortedRecallsFilterMode[count]![0]);
             } else {
               setIsTestPossible(false);
             }
           } else {
             if (sortedRecalls.length) {
               setQuestion(sortedRecalls[count]![0]);
               console.log(sortedRecalls[count]![0]);
             }
           }
         }
    }
  }, [status]);

  // Fetching fresh recalls data when count changes
  useEffect(() => {
    if (!isStudyMode) {
      if (status === "authenticated") {
        // console.log("status", status);
        // "http://localhost:3000/api/getUserRecalls"
        // env.NEXT_PUBLIC_API_GET_USER_RECALLS_ENDPOINT
        console.log("Fetching fresh data when count changes");
        const dataRecall = fetch(
          "http://localhost:3000/api/getUserTopicRecall",
          options
        )
          .then((response) => {
            // console.log("Response", response);
            return response.json();
          })
          .then((dataRecall) => {
            // console.log("Data", data, "Data.message", data.message);
            if (dataRecall.message === "No recall in database") {
              setIsRecallInDB(false);
            }
            const typedData = recallsScquema.safeParse(data);
             if (typedData.success) {
               const safeData = typedData.data;
               console.log("safeData ", safeData);
               setIsError(false);
               setIsRecallInDB(true);
               setFetchedData(safeData);

               let preSortedRecallsFilter: any = [];
               let filterFilterMode: number = 3;
               const recallNameArr: string[] = [];
               fetchedData?.recall.map((item) =>
                 recallNameArr.push(item.questionName)
               );

               data.map((deck) =>
                 deck.flashCard.map((flashCard) => {
                   safeData?.recall.map((recall) => {
                     if (recallNameArr.indexOf(flashCard.name) !== -1) {
                       if (recall.questionName === flashCard.name) {
                         if (recall.quality !== 5) {
                           filterFilterMode = recall.quality;
                           return preSortedRecallsFilter.push([
                             flashCard.name,
                             filterFilterMode,
                           ]);
                         }
                       }
                     }
                   });
                   if (recallNameArr.indexOf(flashCard.name) === -1) {
                     preSortedRecallsFilter.push([
                       flashCard.name,
                       filterFilterMode,
                     ]);
                   }
                 })
               );
               let sortedRecallsFilterMode = countingSort(
                 preSortedRecallsFilter
               );

               setsortedRecallsFilterMode(sortedRecallsFilterMode);

               // Check if recall has been done today
               let hasRecallBeenDoneToday: any = [];
               safeData?.recall.map((item) => {
                 if (
                   differenceInDays(new Date(item.lastRecall), new Date()) === 0
                 ) {
                   hasRecallBeenDoneToday.push(item);
                 }
               });
               console.log("hasRecallBeenDoneToday ", hasRecallBeenDoneToday);
               if (hasRecallBeenDoneToday.length) {
                 // Check if all recall's quality = 5. If so display a message telling it
                 setHasRecallBeenDoneToday(hasRecallBeenDoneToday.length);
                 setIsFilterMode(true);
                 setNumberOfQuestion(sortedRecallsFilterMode.length);
               } else {
                 setNumberOfQuestion(sortedRecalls.length);
               }
               setRender(!render);
               console.log("isFiltermode", isFilterMode);
               console.log(
                 "sortedRecallsFilterMode lenght",
                 sortedRecallsFilterMode.length
               );
             } else if (!typedData.success) {
               setIsError(true);
             }
            // console.log("typeddata", typata);
            return data;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => setRender(!render));
      }

       console.log("count", count);
       console.log("question", question);
       console.log("sortedRecalls.length", sortedRecalls.length);
       console.log(
         "sortedRecallsFilterMode.length",
         sortedRecallsFilterMode.length
       );
       if (isStudyMode) {
         if (sortedRecalls.length) {
           setQuestion(sortedRecalls[count]![0]);
           console.log(sortedRecalls[count]![0]);
         }
       } else {
         if (isFilterMode) {
           if (sortedRecallsFilterMode.length) {
             setQuestion(sortedRecallsFilterMode[count]![0]);
             console.log(sortedRecallsFilterMode[count]![0]);
           } else {
             setIsTestPossible(false);
           }
         } else {
           if (sortedRecalls.length) {
             setQuestion(sortedRecalls[count]![0]);
             console.log(sortedRecalls[count]![0]);
           }
         }
       }
    }
  }, [count, isStudyMode]);

  useEffect(() => {
    let preSortedRecalls: any = [];
    let filter: number = 3;
    data.map((deck) =>
      deck.flashCard.map((flashCard) => {
        fetchedData?.recall.map((recall) => {
          if (recall.questionName === flashCard.name) {
            return (filter = recall.quality);
          }
        });
        preSortedRecalls.push([flashCard.name, filter]);
      })
    );
    let sortedRecalls = countingSort(preSortedRecalls);

    setsortedRecalls(sortedRecalls);

   

    // Check if recall has been done today
    let hasRecallBeenDoneToday: any = [];
    fetchedData?.recall.map((item) => {
      if (differenceInDays(new Date(item.lastRecall), new Date()) === 0) {
        hasRecallBeenDoneToday.push(item);
      }
    });
    console.log("hasRecallBeenDoneToday ", hasRecallBeenDoneToday);
    if (hasRecallBeenDoneToday.length) {
      // Check if all recall's quality = 5. If so display a message telling it
      setHasRecallBeenDoneToday(hasRecallBeenDoneToday.length);
      setIsFilterMode(true);
    }
  }, [fetchedData, count, render]);

  // Synchronizing flashCards / recalls / count
/*   useEffect(() => {
   
  }, [sortedRecalls, sortedRecallsFilterMode, numberOfQuestion, count]);
 */
  // Keeping track of questions
  useEffect(() => {
    if (numberOfQuestion === count) {
      setCount(0);
    }
  }, [count, numberOfQuestion, render]);

  // Switch between question and answer by changing display on element
  const handleFlip = () => {
    setShow(!show);
  };

  // Go back to previous or next card by mutating count which is used by element to display card
  const setPrevFlash = () => {
    setIsFlip(false);
    setCount(count + 1);
  };

  // TODO : choose between normal sorted and filtered
  const setNextFlash = () => {
    if (isFilterMode) {
      if (sortedRecallsFilterMode.length === 1 && count === 1) {
        setIsTestPossible(false);
      } else {
        if (count === sortedRecallsFilterMode.length - 1) {
          setIsFlip(false);
          setCount(0);
        } else {
          setIsFlip(false);
          setCount(count + 1);
        }
      }
    } else {
      if (count === sortedRecalls.length - 1) {
        setIsFlip(false);
        setCount(0);
      } else {
        setIsFlip(false);
        setCount(count + 1);
      }
    }
  };
  const switchMode = () => {
    setCount(0);
    setIsStudyMode(!isStudyMode);
  };

  const submitRecall = (quality: number) => {
    // console.log("Submit recall ", !fetchedData?.recall.length);
    if (
      status === "authenticated" &&
      fetchedData?.recall.length &&
      !isStudyMode
    ) {
      console.log("Submit recall conditional 1");
      console.log(
        "hasQuestionRecall(fetchedData!)",
        hasQuestionRecall(fetchedData!)
      );
      if (hasQuestionRecall(fetchedData!)?.length) {
        console.log("Submit recall update");
        handleUpdateRecall(quality);
      } else {
        console.log("Submit recall add");
        handleAddRecall(quality);
      }
    } else if (
      status === "authenticated" &&
      !fetchedData?.recall.length &&
      !isStudyMode
    ) {
      handleAddRecall(quality);
    }
  };

  const hasQuestionRecall = (data: RecallData) => {
    const oldRecallData = fetchedData?.recall.filter((item) => {
      if (item.questionName === question) return item;
    });
    return oldRecallData;
  };

  const handleAddRecall = (quality: number) => {
    // Declaring variables
    const intervalInput = 0;
    const repetitionsInput = 0;
    const easeFactorInput = 2.5;

    // Check quality is between 1-5
    const qualityCheck = qualitySchema.safeParse(quality);
    // console.log("qualityCheck", qualityCheck);
    const { interval, repetitions, easeFactor } = sm2(
      quality,
      intervalInput,
      repetitionsInput,
      easeFactorInput
    );
    type Score = number[];
    const score: Score = [quality * 20];

    type StudySessions = string[];
    const studySessions: StudySessions = [Date()];

    let topicName: string = "";
    data.map((item) => {
      if (item.slug.current !== topicName) {
        topicName = item.slug.current;
      }
    });

    // Creating new object with all the data needed to Add recall
    const recallData = {
      topicName,
      questionName: question,
      interval,
      repetitions,
      easeFactor,
      quality,
      score,
      studySessions,
      lastRecall: new Date(),
      nextRecall: addDays(new Date(), 1),
      nextRecallName: "recallOne",
      userId: session?.user.id,
      userEmail: session?.user.email,
      userImage: session?.user.image,
      userName: session?.user.name,
      calendar: calendar(),
      botUrl:
        "https://discord.com/api/webhooks/1088529850555433010/IDMlYPu-0FniRev8v3I2ziNbOR3136pMPq2qSSdO12IKA5knY5_6t-KCUOWLt2zIEcfh",
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: env.NEXT_PUBLIC_API_AUTH_HEADERS_ADD_RECALL,
      },
      body: JSON.stringify(recallData),
    };
    fetch("http://localhost:3000/api/addRecall", options)
      .then((response) => {
        console.log("Response in fetch Add recall with fresh data", response);
        if (quality === 5 && response.ok) {
          setsortedRecallsFilterMode((sortedRecallsFilterMode) => {
            return sortedRecallsFilterMode.filter((item) => {
              if (item[0] !== question) {
                return item;
              }
            });
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data in fetch Add recall with fresh data", data);
        return data;
      })
      .catch((error) =>
        console.log("Error in fetch update with fresh data", error)
      );
    setNextFlash();

    setShow(!show);
    setRender(!render);
  };
  const handleUpdateRecall = (quality: number) => {
    // Parsing all recalls to get the current one
    if (fetchedData?.recall.length) {
      /* ============= !!!!!!!!!!!!!!!!!!!! TODO !!!!!!!!!!!!!!!!!!!!!!!! ================ */

      // Getting the current question
      const oldRecallData = hasQuestionRecall(fetchedData);
      console.log(
        "oldRecallData",
        oldRecallData?.map((item) => {
          return {
            easeFactor: item.easeFactor,
            interval: item.interval,
            repetitions: item.repetitions,
          };
        })
      );
      // Declaring variables

      // Check quality is between 1-5
      const qualityCheck = qualitySchema.safeParse(quality);
      console.log("qualityCheck", qualityCheck);

      // Passing recall through sm2 algo to calculate performance
      const { interval, repetitions, easeFactor } = sm2(
        quality,
        parseInt(oldRecallData!.map((item) => item.interval).toString()),
        parseInt(oldRecallData!.map((item) => item.repetitions).toString()),
        parseInt(oldRecallData!.map((item) => item.easeFactor).toString())
      );
      console.log("After sm2", interval, repetitions, easeFactor);
      type Score = string;
      const score: Score = (quality * 20).toString();
      const newScore = oldRecallData?.map((item) => item.score);
      const newStudySessions = oldRecallData!.map((item) => item.studySessions);

      oldRecallData!.map((item) => item.score.push(score)).toString();

      let topicName: string = "";
      data.map((item) => {
        if (item.slug.current !== topicName) {
          topicName = item.slug.current;
        }
      });
      // Creating new object with all the data needed to Add recall
      const recallData = {
        topicName,
        userId: session?.user.id,
        questionName: question,
        interval,
        repetitions,
        easeFactor,
        quality,
        score: newScore![0],
        studySessions: newStudySessions![0],
        lastRecall: new Date(),
        nextRecall: addDays(new Date(), 1),
        nextRecallName: getNextRecallDay(
          oldRecallData!.map((item) => item.nextRecallName).toString()
        ),
      };

      console.log("recallData in update", recallData);
      console.log("quality in update", quality);
      // TODO
      // Update old recall data
      // score

      // Add the recall to the array if it's not been done today
      const isRecallDoneAlready: any = [];
      oldRecallData?.map((item) => {
        if (differenceInDays(new Date(item.lastRecall), new Date()) === 0) {
          isRecallDoneAlready.push(item);
        }
      });

      if (isRecallDoneAlready) {
        console.log("oldRecallData", oldRecallData);
        // Update recall with fresh data
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              env.NEXT_PUBLIC_API_AUTH_HEADERS_KEY_UPDATE_USER_RECALL,
          },
          body: JSON.stringify(recallData),
        };
        fetch("http://localhost:3000/api/updateRecall", options)
          .then((response) => {
            console.log("Response in fetch update with fresh data", response);
            if (quality === 5 && response.ok) {
              setsortedRecallsFilterMode((sortedRecallsFilterMode) => {
                return sortedRecallsFilterMode.filter((item) => {
                  if (item[0] !== question) {
                    return item;
                  }
                });
              });
            }
            return response.json();
          })
          .then((data) => {
            console.log("Data in fetch update with fresh data", data);
            return data;
          })
          .catch((error) =>
            console.log("Error in fetch update with fresh data", error)
          );
        setNextFlash();
        setShow(!show);
      } else {
        // TODO
        // Update with old data. Only change the study sessions and score
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: env.NEXT_PUBLIC_API_AUTH_HEADERS_ADD_RECALL,
          },
          body: JSON.stringify(oldRecallData),
        };
        fetch("http://localhost:3000/api/updateRecall", options)
          .then((response) => {
            console.log("Response in fetch update with old data", response);
            if (quality === 5 && response.ok) {
              setsortedRecallsFilterMode((sortedRecallsFilterMode) => {
                return sortedRecallsFilterMode.filter((item) => {
                  if (item[0] !== question) {
                    return item;
                  }
                });
              });
            }
            return response.json();
          })
          .then((data) => {
            console.log("Data in fetch update with old data", data);
            return data;
          });
        setNextFlash();
        setShow(!show);
        setRender(!render);
      }
    }
  };

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b  from-[#FFA36A] to-[#00d4ff] text-slate-100">
        {/* Title */}
        <section className="intems-start flex h-full w-full items-center">
          <div className="space-between flex w-full flex-row items-center gap-5 p-5 md:gap-7 md:p-10">
            <h1
              className="pb-2 font-bold first-letter:text-7xl  
  first-letter:font-bold first-letter:text-white first-line:uppercase
  first-line:tracking-widest md:text-5xl"
            >
              {" "}
              Codice
            </h1>
            <div className="flex w-full items-center justify-end">
              <AuthShowcase />
            </div>
            <div className="flex items-center justify-center"></div>
            <div className="flex items-center justify-end">
              {session?.user.image ? (
                <div>
                  <img
                    src={`${session.user.image}`}
                    width={60}
                    height={60}
                    alt="user image"
                    className="rounded-full"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </section>
        <section>
          <div className="pb-5 pt-10">
            {" "}
            {data.map((item) => {
              return (
                <h1
                  key={item._id}
                  className="text-3xl font-bold uppercase text-slate-100"
                >
                  {item.name}
                </h1>
              );
            })}{" "}
          </div>
          <div className="py-1"></div>
        </section>
        {/* Card */}
        <section className="container grid grid-cols-1 place-items-center p-5">
          {data.map((item) =>
            item.flashCard.map((flash, index) => {
              //console.log(flash)
              return (
                <div
                  className={`${
                    flash.name === question
                      ? !isStudyMode
                        ? isTestPossible
                          ? ""
                          : "hidden"
                        : ""
                      : "hidden"
                  }
            h-60 w-[95%] bg-white/10 text-slate-100 md:w-[75%] xl:w-[50%] `}
                  key={flash._key}
                >
                  {/* Flip icon & card count */}
                  <div className="flex flex-row justify-between p-2 p-2 text-sm uppercase">
                    <button
                      className=" text-sm font-bold uppercase tracking-wider"
                      onClick={() => switchMode()}
                    >
                      {/* TODO: remove when user not signed in */}
                      <p>
                        {isStudyMode ? (
                          <span className="text-green-300">Study mode</span>
                        ) : (
                          <span className="text-red-400">Test mode</span>
                        )}
                      </p>
                    </button>
                    <div className="flex items-center justify-center">
                      <p>
                        {" "}
                        Question {count + 1} / {numberOfQuestion}{" "}
                      </p>
                    </div>
                    <div className="" onClick={handleFlip}>
                      <CgEditFlipH className="cursor-pointer text-3xl" />
                    </div>
                  </div>
                  {/* Question */}
                  <div
                    className={`${
                      show && "hidden"
                    } flex h-[70%] items-center justify-center px-3 text-center`}
                  >
                    <p className="w-[70%] text-lg md:text-2xl ">
                      {" "}
                      {flash.question}{" "}
                    </p>
                  </div>
                  {/* Answer */}
                  <div
                    className={`${
                      !show && "hidden"
                    } flex h-[70%] items-center justify-center px-3 text-center`}
                  >
                    <p className="w-[90%] text-lg md:w-[70%] md:text-2xl  ">
                      {" "}
                      {flash.reponse}{" "}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          {!isStudyMode && !isTestPossible && (
            <div
              className={`
            h-60 w-[95%] bg-white/10 text-slate-100 md:w-[75%] xl:w-[50%] `}
            >
              {/* Flip icon & card count */}
              <div className="flex flex-row justify-between p-2 p-2 text-sm uppercase">
                <button
                  className=" text-sm font-bold uppercase tracking-wider"
                  onClick={() => setIsStudyMode(!isStudyMode)}
                >
                  <p>
                    {isStudyMode ? (
                      <span className="text-green-300">Study mode</span>
                    ) : (
                      <span className="text-red-400">Test mode</span>
                    )}
                  </p>
                </button>
                <div className="" onClick={handleFlip}>
                  <CgEditFlipH className="cursor-pointer text-3xl" />
                </div>
              </div>
              <div className="flex h-[70%] flex-col items-center justify-center px-3 text-center ">
                <p className="text-2xl font-bold uppercase">
                  Tests done for today
                </p>
                <p className="text-4xl">😎</p>
                <p className="text-lg italic text-gray-200">
                  Come back <strong className="text-gray-500">tomorrow</strong>{" "}
                  for more or switch to
                  <strong className="text-green-300"> study mode</strong> to
                  keep practicing
                </p>
              </div>
            </div>
          )}
          {/* Quality buttons  */}

          {show && status === "authenticated" && !isStudyMode && (
            <div className="transition-300 grid grid-cols-5 gap-10 pt-5">
              <button
                onClick={() => {
                  submitRecall(1);
                }}
                className="transition-300 rounded-full bg-white/60 px-5 py-3 font-semibold uppercase text-red-500 no-underline transition hover:bg-white/20 md:px-10"
              >
                1
              </button>
              <button
                onClick={() => {
                  submitRecall(2);
                }}
                className="transition-300 rounded-full bg-white/60 px-5 py-3  font-semibold uppercase text-red-400 no-underline transition hover:bg-white/20 md:px-10"
              >
                2
              </button>
              <button
                onClick={() => {
                  submitRecall(3);
                }}
                className="transition-300 rounded-full bg-white/60 px-5 py-3 font-semibold  uppercase text-yellow-500 no-underline transition hover:bg-white/20 md:px-10"
              >
                3
              </button>
              <button
                onClick={() => {
                  submitRecall(4);
                }}
                className="rounded-full bg-white/60 px-5 py-3 font-semibold  uppercase text-green-400 no-underline transition hover:bg-white/20 md:px-10"
              >
                4
              </button>
              <button
                onClick={() => {
                  submitRecall(5);
                }}
                className="rounded-full bg-white/60 px-5 py-3 font-semibold  uppercase text-green-600 no-underline transition hover:bg-white/20 md:px-10"
              >
                5
              </button>
            </div>
          )}
          {/* Arrow buttons */}
          <div
            className={`grid  gap-10 py-10 pt-5 ${
              status === "authenticated"
                ? isStudyMode
                  ? "grid-cols-4"
                  : "grid-cols-4"
                : "grid-cols-3"
            } `}
          >
            <div className="flex justify-center">
              {isStudyMode ? (
                count === 0 ? (
                  <button disabled>
                    {" "}
                    <BiLeftArrow className="text-3xl text-gray-500" />
                  </button>
                ) : (
                  <button onClick={setPrevFlash}>
                    <BiLeftArrow className="text-3xl " />
                  </button>
                )
              ) : null}
            </div>
            <button
              onClick={router.back}
              className="rounded-full bg-white/60 px-5 py-3 font-semibold uppercase uppercase text-gray-500 no-underline transition hover:bg-white/20 md:px-10"
            >
              <p>Retour</p>
            </button>
            {status === "authenticated" ? (
              isStudyMode ? (
                <button
                  onClick={() => switchMode()}
                  className="rounded-full bg-white/60 px-5 py-3 font-semibold uppercase uppercase text-green-500 no-underline transition hover:bg-white/20 md:px-10"
                >
                  <p className="text-red-500">Test</p>
                </button>
              ) : (
                <button
                  onClick={() => switchMode()}
                  className="rounded-full bg-white/60 px-5 py-3 font-semibold uppercase uppercase text-green-500 no-underline transition hover:bg-white/20 md:px-10"
                >
                  <p>Study</p>
                </button>
              )
            ) : null}

            {isStudyMode ? (
              count === numberOfQuestion - 1 ? (
                <div className="flex justify-center">
                  {" "}
                  <button disabled>
                    {" "}
                    <BiRightArrow className=" text-3xl text-gray-500" />
                  </button>
                </div>
              ) : (
                <div className="flex justify-center">
                  {" "}
                  <button onClick={setNextFlash}>
                    <BiRightArrow className="text-3xl " />
                  </button>{" "}
                </div>
              )
            ) : null}
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
