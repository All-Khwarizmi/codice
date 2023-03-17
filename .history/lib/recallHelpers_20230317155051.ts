'use client'
import {
  Calendar,
  IsMemoTime,
  IsMemoTimeReturn,
  MemoDateData,
  MemoDateFn,
} from './memoTypes';

import addDays from 'date-fns/addDays';
import addMonths from 'date-fns/addMonths';
import addWeeks from 'date-fns/addWeeks';
import format from 'date-fns/format';
import { differenceInDays } from 'date-fns';
import { MemoParser } from './memoTypes';

/**
 * @name calendar
 * @category Calendar
 * @summary Get an active recall calendar 
 *
 * @description
 * Get an active recall calendar 
 *
 * @returns an object containing the new calendar
 * @throws {TypeError} - 0 arguments required
 *
 * @example
 * // Get a calendar since 12 March 2023:
 * const result = calendar()
 * //=> 
 * {
  recallOne: '15 March 2023',
  recallTwo: '19 March 2023',
  recallThree: '26 March 2023',
  recallFour: '09 April 2023',
  recallFive: '30 April 2023',
  recallSix: '30 May 2023',
  recallSeven: '30 July 2023',
  recallEight: '30 October 2023',
  recallNine: '29 February 2024',
  recallTen: '29 July 2024'
}
 */
export const calendar: Calendar = () => {
  let recallOne = addDays(Date.parse(Date()), 3);
  let recallTwo = addWeeks(recallOne, 1);
  let recallThree = addWeeks(recallTwo, 2);
  let recallFour = addWeeks(recallThree, 2);
  let recallFive = addWeeks(recallFour, 3);
  let recallSix = addMonths(recallFive, 1);
  let recallSeven = addMonths(recallSix, 2);
  let recallEight = addMonths(recallSeven, 3);
  let recallNine = addMonths(recallEight, 4);
  let recallTen = addMonths(recallNine, 5);

  const calendar = {
    recallOne: format(recallOne, 'dd MMMM yyyy'),
    recallTwo: format(recallTwo, 'dd MMMM yyyy'),
    recallThree: format(recallThree, 'dd MMMM yyyy'),
    recallFour: format(recallFour, 'dd MMMM yyyy'),
    recallFive: format(recallFive, 'dd MMMM yyyy'),
    recallSix: format(recallSix, 'dd MMMM yyyy'),
    recallSeven: format(recallSeven, 'dd MMMM yyyy'),
    recallEight: format(recallEight, 'dd MMMM yyyy'),
    recallNine: format(recallNine, 'dd MMMM yyyy'),
    recallTen: format(recallTen, 'dd MMMM yyyy'),
  };

  return calendar;
};

/**
 * @name isMemoTime
 * @category Calendar
 * @summary Tells whether or not is time to take a recall based on a "memoDate"
 *
 * @description
 * Tells whether or not it's time to take a recall based on a "memoDate".
 * "memoTime" starts one day before the next recall date
 * @returns a boolean
 * @throws {TypeError} - 1 arguments required
 *
 * @example
 * // Set a new "memoDate" d
 *  let memoObj: MemoDateData = Object();
 *  memoObj.calendar = calendar();
 *  memoObj.lastRecallDay = Date();
 *  memoObj.nextRecallDay = addDays(Date.parse(Date()), 3) // The first recall happens 3 days from the moment of the firt test so it's not time and the function will return false
 *
 *  isMemoTime(memoObj)
 *  // => false
 */
export const isMemoTime: IsMemoTime = (memoDate) => {
  let returnObj: IsMemoTimeReturn = {
    isMemotime: false,
    difference: 0,
  };
  const result = differenceInDays(
    Date.parse(memoDate.nextRecallDay),
    Date.now()
  );
  returnObj.difference = result;

  if (result <= 1) {
    returnObj.isMemotime = true;
    return returnObj;
  } else {
    returnObj.isMemotime = false;
    return returnObj;
  }
};

/**
 * @name memoDate
 * @category Calendar
 * @summary Set a "memoDate" that is an active recall calendar, the last and next recall dates
 *
 * @description
 * Set a "memoDate" that is an active recall calendar, the last and next recall dates
 *
 * @returns an object containing the new calendar
 * @throws {TypeError} - 0 arguments required
 *
 * @example
 * // See :
 *  @function calendar
 *  @function isMemoTime
 *
 */

export const setMemoDate: MemoDateFn = () => {
  let memoObj: MemoDateData = Object();
  memoObj.calendar = calendar();
  memoObj.lastRecallDay = Date();
  memoObj.nextRecallDay = memoObj.calendar.recallOne;

  return memoObj;
};
export const log = console.log;

export const memoParser: MemoParser = (memoDateStr) => {
  let memo: MemoDateData = JSON.parse(memoDateStr);

  return memo;
};

type MemoDateCheckerReturn = {
  isMemoDate: boolean;
  memoDate?: IsMemoTimeReturn;
};
type MemoDateChecker = (memoName: string) => MemoDateCheckerReturn;
export const memoDateChecker: MemoDateChecker = (memoName) => {
  let memoDateCheckerReturn: MemoDateCheckerReturn = {
    isMemoDate: false,
  };
  const isMDInLocalStorage = localStorage.getItem(memoName);
  if (isMDInLocalStorage) {
    console.log('isMDInLocalStorage', isMDInLocalStorage);
    let memoDate = memoParser(isMDInLocalStorage!);
    const isTimeObj = isMemoTime(memoDate);
    console.log('isTimeObj', isTimeObj);
    memoDateCheckerReturn.isMemoDate = true
    memoDateCheckerReturn.memoDate = isTimeObj
    return memoDateCheckerReturn
  }

  return memoDateCheckerReturn

};

type UpdateMemoDate = (memoDate: MemoDateData) => void
export const updateMemoDate = () => {

}

export type GetNextRecallDay = (recallDay: string) => string
export const getNextRecallDay: GetNextRecallDay = (recallDay) => {
  if (recallDay === 'recallTen') {
    return 'recallTen';
  } else {
    const recallDays = [
      'recallOne',
      'recallTwo',
      'recallThree',
      'recallFour',
      'recallSix',
      'recallSeven',
      'recallEight',
      'recallNine',
      'recallTen',
    ];
    const indexOfRecallDay = recallDays.indexOf(recallDay);

    const nextRecallD = recallDays[indexOfRecallDay + 1];

    return nextRecallD;
  }
};
