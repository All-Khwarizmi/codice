import { date, z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const memoRouter = createTRPCRouter({
  AddMemoDate: publicProcedure
    .input(z.object({
        text: z.string(),
        use
    }))
    .mutation(({ ctx }) => {
      return ctx.prisma.memoDate.create({
        data: {
          name: "First Memo",
          last: new Date(),
          next: new Date(),
          userId: "dedede",
        },
      });
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
