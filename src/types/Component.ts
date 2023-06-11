import { Static, Type } from "@sinclair/typebox";

export const ComponentSchema = Type.Strict(
  Type.Object({
    id: Type.String(),
    name: Type.String(),
    project: Type.String(),
    lead: Type.Object({
      accountId: Type.String(),
    }),
  })
);

export type Component = Static<typeof ComponentSchema>;