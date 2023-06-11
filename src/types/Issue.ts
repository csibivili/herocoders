import { Static, Type } from "@sinclair/typebox";

export const IssueSchema = Type.Strict(
  Type.Object({
    id: Type.String()
  })
);

export type Issue = Static<typeof IssueSchema>;