import { defineField, defineType } from 'sanity';

export const categoryType = defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre',
      type: 'object',
      fields: [
        defineField({
          name: 'es',
          title: 'Español',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title.es', subtitle: 'title.en' },
  },
});
