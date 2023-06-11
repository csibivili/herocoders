import { Static, Type } from '@sinclair/typebox';
import { getJiraComponents, getJiraIssues } from './jiraApi';

export const ComponentsWithIssuesCountSchema = Type.Array(
  Type.Object({
    name: Type.String(),
    issuesCount: Type.Number(),
  }),
);

export type ComponentsWithIssuesCount = Static<typeof ComponentsWithIssuesCountSchema>;

export const countIssuesWithoutComponentLead = async (
  project: string,
): Promise<ComponentsWithIssuesCount> => {
  const components = (await getJiraComponents(project)) ?? [];
  const componentsWithoutLeads = components.filter((c) => !c.lead);
  const issues = (await getJiraIssues(project)) ?? [];
  const result = componentsWithoutLeads.map((c) => ({
    name: c.name,
    issuesCount: issues.filter((i) => i.fields.components.some((ic) => ic.id === c.id)).length,
  }));
  return result;
};
