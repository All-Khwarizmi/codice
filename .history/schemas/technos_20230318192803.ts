import { defineField, defineType } from "sanity";

export default defineType({
  name: "technos",
  title: "Technos",
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
      title: "Difficulty",
      type: "reference",
      to: { type: "difficulty" },
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
});