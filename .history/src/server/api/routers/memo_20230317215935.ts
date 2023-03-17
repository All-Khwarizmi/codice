
import {  z } from "zod";

import format from "date-fns/format";


import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const memoRouter = createTRPCRouter({
  AddMemoDate: publicProcedure
    .input(
      z.object({
        name: z.string(),
        userName: z.string(),
        userEmail: z.string(),
        userImage: z.string(),
        userId: z.string(),
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
      })
    )
    .mutation(async ({ ctx, input }) => {
      const memoDate = await ctx.prisma.memoDate.create({
        data: {
          name: input.name,
          last: format(Date.now(), "dd MMMM yyyy"),
          next: format(Date.now(), "dd MMMM yyyy"),
          userId: input.userId,
          userEmail: input.userEmail,
          userImage: input.userImage,
          userName: input.userName,
          calendar: [
            input.calendar.recallOne,
            input.calendar.recallTwo,
            input.calendar.recallThree,
            input.calendar.recallFour,
            input.calendar.recallFive,
            input.calendar.recallSix,
            input.calendar.recallSeven,
            input.calendar.recallEight,
            input.calendar.recallNine,
            input.calendar.recallTen,
          ],
        },
      });
      return memoDate;
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.memoDate.findMany();
  }),

  getMemo: protectedProcedure.query(({ ctx }) => {
    const memo = ctx.prisma.memoDate.findMany({
      where: {
        next: format(Date.now(), "dd MMMM yyyy"),
      },
    });
    return memo;
  }),
  getMemoByUser: protectedProcedure.input(z.object({name})).query(({ ctx }) => {
    const memo = ctx.prisma.memoDate.findMany({
      where: {
        next: format(Date.now(), "dd MMMM yyyy"),
      },
    });
    return memo;
  }),
});
