import { defineField, defineType } from "sanity";

export default defineType({
  name: "difficulty",
  title: "Flash Card",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),

    defineField({
      name: "question",
      title: "Question",
      type: "text",
    }),
    defineField({
      name: "reponse",
      title: "Reponse",
      type: "text",
    }),
  ],
});
