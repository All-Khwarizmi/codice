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
        calendar: z.string(),
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
            userName: input.userName
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
        name: "Second Memo",
      },
    });
  }),
});
