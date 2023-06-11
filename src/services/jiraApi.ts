import got from 'got';
import { Component } from 'types/Component';
import { Issue } from 'types/Issue';
import server from 'server';

export const getJiraComponents = async (project: string): Promise<Component[]> => {
  const data = await got(`${server.config.JIRA_HOST}/project/${project}/components`, {
    responseType: 'json',
    resolveBodyOnly: true,
  }).json<Component[]>();
  return data as Component[];
};

export const getJiraIssues = async (project: string): Promise<Issue[]> => {
  const data = await got
    .get(`${server.config.JIRA_HOST}/search?jql=project=${project}&fields=id,components`, {
      responseType: 'json',
      resolveBodyOnly: true,
    })
    .json<{ issues: Issue[] }>();
  return data.issues as Issue[];
};
