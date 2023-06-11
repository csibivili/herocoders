import { Static, Type } from '@sinclair/typebox';

export const IssueSchema = Type.Strict(
  Type.Object({
    id: Type.String(),
    fields: Type.Object({
      components: Type.Array(Type.Object({ id: Type.String() })),
    }),
  }),
);

export type Issue = Static<typeof IssueSchema>;
