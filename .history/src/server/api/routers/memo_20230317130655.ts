import { date, z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const memoRouter = createTRPCRouter({
  AddMemoDate: publicProcedure.mutation(({ctx}) => {
      ctx.prisma.memoDate.create{
        data
      }
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
