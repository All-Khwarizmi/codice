import { date, z } from "zod";
import {api}

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
      })
    )
    .mutation(async ({ ctx }) => {
        let memoDate = await ctx.prisma.memoDate.create({
          data: {
            name: "First Memo",
            last: new Date(),
            next: new Date(),
            userId: "dedede",
          },
        });
      return memoDate
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.memoDate.findMany();
  }),

  getMemo: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.memoDate.findFirst({
      where: {
        name: "First Memo",
      },
    });
  }),
});
