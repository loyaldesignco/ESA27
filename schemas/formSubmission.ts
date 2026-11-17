import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A form submission (signed waiver or free class request), written by Loyal Design's shared forms
 * service (www.loyal.design/api/forms, code in the LDC26 repo: api/forms.ts).
 *
 * Submissions are created with IDs under the `submissions.` path, which Sanity never serves to
 * unauthenticated requests, so they stay private even though the dataset itself is public.
 * Everything the visitor sent is read-only; only the status and notes are for you to edit.
 */
export const formSubmission = defineType({
  name: "formSubmission",
  title: "Form submission",
  type: "document",
  liveEdit: true,
  fields: [
    defineField({
      name: "status",
      type: "string",
      initialValue: "new",
      options: { list: [{ title: "New", value: "new" }, { title: "Replied", value: "replied" }, { title: "Archived", value: "archived" }], layout: "radio", direction: "horizontal" },
    }),
    defineField({ name: "notes", type: "text", rows: 3, description: "Private notes. Not sent anywhere." }),
    defineField({ name: "submittedAt", title: "Submitted", type: "datetime", readOnly: true }),
    defineField({ name: "name", type: "string", readOnly: true }),
    defineField({ name: "email", type: "string", readOnly: true }),
    defineField({ name: "company", type: "string", readOnly: true, hidden: ({ document }) => !document?.company }),
    defineField({
      name: "fields",
      title: "Everything they sent",
      type: "array",
      readOnly: true,
      of: [
        defineArrayMember({
          type: "object",
          name: "formField",
          fields: [defineField({ name: "label", type: "string" }), defineField({ name: "key", type: "string" }), defineField({ name: "value", type: "text", rows: 3 })],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),
    defineField({ name: "site", type: "string", readOnly: true, description: "Which site's form this came from." }),
    defineField({ name: "page", type: "url", readOnly: true, description: "The page the form was sent from." }),
    defineField({
      name: "emailStatus",
      title: "Email notification",
      type: "string",
      readOnly: true,
      options: { list: [{ title: "Sent", value: "sent" }, { title: "Failed", value: "failed" }] },
    }),
    defineField({ name: "emailError", title: "Email error", type: "string", readOnly: true, hidden: ({ document }) => !document?.emailError }),
  ],
  orderings: [{ title: "Newest first", name: "submittedDesc", by: [{ field: "submittedAt", direction: "desc" }] }],
  preview: {
    select: { name: "name", email: "email", form: "fields.0.value", submittedAt: "submittedAt", status: "status" },
    prepare({ name, email, form, submittedAt, status }) {
      const when = submittedAt ? new Date(submittedAt).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }) : "";
      const mark = status === "new" ? "● " : "";
      return { title: `${mark}${name || email || "Unnamed submission"}`, subtitle: [form, when].filter(Boolean).join(" · ") };
    },
  },
});
