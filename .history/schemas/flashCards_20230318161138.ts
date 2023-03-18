import { defineField, defineType } from "sanity";

export default defineType({
  name: "flash card",
  title: "Flash Cards",
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
      name: "deck",
      title: "Deck",
      type: "reference",
      to: { type: "deck" },
    }),
    
    defineField({
      name: "question",
      title: "Description",
      type: "text",
    }),
  ],
});
