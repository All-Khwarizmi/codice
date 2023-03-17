import { calendar } from "lib/recallHelpers";
import { date, z } from "zod";


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
        let memoDate = await ctx.prisma.memoDate.create({
          data: {
            name: input.name,
            last: new Date(),
            next: new Date(),
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
                
            ]
          },
        });
      return memoDate
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.memoDate.findMany();
  }),

  getMemo: protectedProcedure.input(z.object({
    name : z.string()
  })).
  query(({ ctx, input }) => {
    return ctx.prisma.memoDate.findFirst({
      where: {
        : "Second Memo",
      },
    });
  }),
});
