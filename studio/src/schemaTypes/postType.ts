import { defineArrayMember, defineField, defineType } from 'sanity';

const localizedString = (name: string, title: string, required = false) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({
        name: 'es',
        title: 'Español',
        type: 'string',
        validation: (rule) => (required ? rule.required() : rule),
      }),
      defineField({
        name: 'en',
        title: 'English',
        type: 'string',
        validation: (rule) => (required ? rule.required() : rule),
      }),
    ],
  });

const localizedBody = defineField({
  name: 'body',
  title: 'Contenido',
  type: 'object',
  fields: [
    defineField({
      name: 'es',
      title: 'Español',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Título', value: 'h2' },
            { title: 'Subtítulo', value: 'h3' },
            { title: 'Cita', value: 'blockquote' },
          ],
          lists: [
            { title: 'Viñetas', value: 'bullet' },
            { title: 'Numerada', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Cursiva', value: 'em' },
              { title: 'Código', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                title: 'Enlace',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) => rule.required(),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading', value: 'h2' },
            { title: 'Subheading', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullets', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) => rule.required(),
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative text',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
});

const localizedSeo = defineField({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    localizedString('title', 'Título SEO'),
    localizedString('description', 'Descripción SEO'),
  ],
});

export const postType = defineType({
  name: 'post',
  title: 'Artículo',
  type: 'document',
  fields: [
    localizedString('title', 'Título', true),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: { source: 'title.es', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    localizedString('excerpt', 'Resumen'),
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categorías',
      type: 'array',
      of: [
        defineArrayMember({ type: 'reference', to: [{ type: 'category' }] }),
      ],
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Nombre', type: 'string' }),
        defineField({ name: 'role', title: 'Rol', type: 'string' }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    localizedBody,
    localizedSeo,
  ],
  preview: {
    select: { title: 'title.es', subtitle: 'publishedAt', media: 'coverImage' },
    prepare: ({ title, subtitle, media }) => ({
      title: title ?? 'Sin título',
      subtitle: subtitle
        ? new Date(subtitle).toLocaleDateString('es-AR')
        : 'Borrador',
      media,
    }),
  },
  orderings: [
    {
      title: 'Más recientes',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
});
