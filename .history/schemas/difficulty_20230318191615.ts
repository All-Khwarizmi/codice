import { defineField, defineType } from "sanity";

export default defineType({
  name: "difficulty",
  title: "Difficulty",
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
      name: "level",
      title: "Level",
      type: "string",
    }),
    defineField({
      name: "reponse",
      title: "Reponse",
      type: "text",
    }),
  ],
});
