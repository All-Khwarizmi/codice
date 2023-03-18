import { defineField, defineType } from "sanity";

export default defineType({
  name: "deck",
  title: "Deck",
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
      name: "technos",
      title: "Technos",
      type: "reference",
      to: { type: "technos" },
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
      name: "flash cardd",
      title: "Flash Card",
      type: "reference",
      to: { type: "technos" },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
});
