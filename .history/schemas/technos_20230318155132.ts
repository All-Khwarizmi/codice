import { defineField } from "sanity";

export default {
  name: "technos",
  title: "Technos",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
    }),
  ],
};