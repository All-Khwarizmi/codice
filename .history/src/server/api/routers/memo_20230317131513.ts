import { date, z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const memoRouter = createTRPCRouter({
  AddMemoDate: publicProcedure.mutation(({ctx}) => {
     return ctx.prisma.memoDate.create({
        data: {
          name: "First Memo",
          last: Date(),
          next: Date(),
          calendar: {},
          user: {
            
          },
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.memoDate.findMany();
  }),

  getMemo: protectedProcedure.query(({ctx}) => {
    return ctx.prisma.memoDate.g
  }),
});
