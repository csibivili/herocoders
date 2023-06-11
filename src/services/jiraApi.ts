import { Component } from 'types/Component';
import { Issue } from 'types/Issue';

export const getJiraComponents = async (project: string): Promise<Component[]> => {
  console.log(project);
  return [];
};

export const getJiraIssues = async (project: string, componentIds: string[]): Promise<Issue[]> => {
  console.log(project, componentIds);
  return [];
};
