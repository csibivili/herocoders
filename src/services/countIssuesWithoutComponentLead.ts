import { Static, Type } from '@sinclair/typebox';
import { getJiraComponents, getJiraIssues } from './jiraApi';

export const ComponentsWithIssuesCountSchema = Type.Array(Type.Object({
  name: Type.String(),
  issuesCount: Type.Number(),
}));

export type ComponentsWithIssuesCount = Static<typeof ComponentsWithIssuesCountSchema>;

export const countIssuesWithoutComponentLead = async (
  project: string
): Promise<ComponentsWithIssuesCount> => {
  if (!project) { 
    return [];
  }
  const components = await getJiraComponents(project) ?? [];
  const componentsWithLeads = components.filter((c) => c.lead);
  await getJiraIssues(project, componentsWithLeads.map((c) => c.id)) ?? [];
  const result = componentsWithLeads.map((c) => ({ name: c.name, issuesCount: 1 }));
  return result;
};
